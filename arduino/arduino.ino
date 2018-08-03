#include <ArduinoJson.h>
#include <ESP8266WiFi.h>

#define PIR_PIN D8
#define ROOM_ID "Playstation"
#define DEVICE_ID "Janusz"

#define WIFI_SSID "******"
#define WIFI_PASSWORD "******"
#define API_HOST "******"
#define API_PORT 3000

const size_t bufferSize = JSON_OBJECT_SIZE(3) + 120;

bool lastState = false;
bool state = false;

void setup() {
  pinMode(PIR_PIN, INPUT);

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
  state = digitalRead(PIR_PIN) == HIGH
    ? true
    : false;
  
  if (lastState != state) {
    lastState = state;
    handleStateChange(state);
  }
}

void handleStateChange(bool state) {
  sendRequest(getResponseJSON(state));
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

String createPostRequest(String endpoint, String jsonData) {
  return String("POST ") + endpoint + " HTTP/1.1\r\n" +
         "Host: " + API_HOST + ":" + API_PORT + "\r\n" +
         "content-type: application/json\r\n" +
         "Content-Length: " + jsonData.length() + "\r\n" +
         "\r\n" + jsonData + "\r\n\r\n";
}

bool sendRequest(String jsonData) {
  WiFiClient client;
  String postRequest = createPostRequest("/update", jsonData);

  Serial.printf("\n[Connecting to %s ... ", API_HOST);
  if (client.connect(API_HOST, API_PORT)) {
    Serial.println("connected]");

    Serial.println("[Sending a request]");
    Serial.println(postRequest);
    
    client.print(postRequest);
    
    client.stop();
    Serial.println("\n[Disconnected]");

    return true;
  } else {
    Serial.println("connection failed!]");
    client.stop();

    return false;
  }
}


