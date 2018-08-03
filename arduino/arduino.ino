#include <ArduinoJson.h>
#include <ESP8266WiFi.h>

#define PIR_RIGHT_PIN D6
#define PIR_LEFT_PIN D5
#define OUTPUT_PIN 13
#define ROOM_ID "Play station"
#define DEVICE_ID "Janusz"

#define WIFI_SSID "********"
#define WIFI_PASSWORD "********"
#define API_HOST "********"
#define API_PORT 80

const size_t bufferSize = JSON_OBJECT_SIZE(3) + 120;

bool lastState = false;
volatile bool state = false;
bool updated = true;
unsigned long lastTimestamp = 0L;
unsigned long const cooldown =  30 * 1000; // 30s

void setup() {
  pinMode(PIR_RIGHT_PIN, INPUT_PULLUP);
  pinMode(PIR_LEFT_PIN, INPUT_PULLUP);
  pinMode(OUTPUT_PIN, OUTPUT);

  attachInterrupt(digitalPinToInterrupt(PIR_RIGHT_PIN), pinterruptHandler, CHANGE);
  attachInterrupt(digitalPinToInterrupt(PIR_LEFT_PIN), pinterruptHandler, CHANGE);

  Serial.begin(9600);

  Serial.println();

  Serial.printf("Connecting to %s ", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (lastState != state) {
    lastState = state;
    Serial.println("State changed");
    handleStateChange(state);
  }

  handleStateCooldown();
}

void(* softRestart) (void) = 0;

void pinterruptHandler() {
  int rightPirState = digitalRead(PIR_RIGHT_PIN);
  int leftPirState = digitalRead(PIR_LEFT_PIN);
  state = rightPirState == HIGH || leftPirState == HIGH;
}

String getResponseJSON(bool state) {
  String json;
  DynamicJsonBuffer dynamicJsonBuffer(bufferSize);

  JsonObject& root = dynamicJsonBuffer.createObject();

  root["id"] = ROOM_ID;
  root["deviceId"] = DEVICE_ID;
  root["status"] = state ? "OCCUPIED" : "FREE";

  root.printTo(json);

  return json;
}

void setOutputState(bool state) {
  digitalWrite(OUTPUT_PIN, state ? HIGH : LOW);
  updated = true;
}

String createPostRequest(String endpoint, String jsonData) {
  return String("POST ") + endpoint + " HTTP/1.1\r\n" +
         "Host: " + API_HOST + ":" + API_PORT + "\r\n" +
         "content-type: application/json\r\n" +
         "Content-Length: " + jsonData.length() + "\r\n" +
         "\r\n" + jsonData + "\r\n\r\n";
}

String createGetRequest(String endpoint) {
  return String("GET ") + endpoint + " HTTP/1.1\r\n" +
         "Host: " + API_HOST + ":" + API_PORT + "\r\n\r\n";
}

bool parseResponse(String response) {
  DynamicJsonBuffer dynamicJsonBuffer(bufferSize);
  JsonObject& root = dynamicJsonBuffer.parseObject(response);

  return root["success"];
}

bool sendRequest(String jsonData) {
  WiFiClient client;
  String postRequest = createPostRequest("/update", jsonData);

  Serial.printf("\n[Connecting to %s ... ", API_HOST);
  if (client.connect(API_HOST, API_PORT)) {
    String response = "";
    Serial.println("connected]");

    Serial.println("[Sending a request]");
    Serial.println(postRequest);
    
    client.print(postRequest);

    Serial.println("[Response:]");
    while (client.connected()) {
      if (client.available()) {
        response.concat(client.readString());
      }
    }
    
    client.stop();
    Serial.println("\n[Disconnected]");

    return parseResponse(response);
  } else {
    Serial.println("connection failed!]");
    client.stop();

    return false;
  }
}

void handleStateChange(bool state) {
  if (state == true) {
    setOutputState(state);
    sendRequest(getResponseJSON(state));
  } else {
    updated = state;
    lastTimestamp = millis();
  }
}

void handleStateCooldown() {
  if (!updated) {
    unsigned long currentTimestamp = millis();

    if (currentTimestamp - lastTimestamp >= cooldown) {
      setOutputState(false);
      sendRequest(getResponseJSON(false));
    }
  }
}


