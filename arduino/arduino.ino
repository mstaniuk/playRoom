#include <ArduinoJson.h>
#include <MD5.h>

#define ARRAY_LEN(x)    (sizeof(x) / sizeof(x[0]))
#define PIR_RIGHT_PIN 3
#define PIR_LEFT_PIN 2
#define OUTPUT_PIN 13
#define ROOM_ID "PLAY ROOM"
#define DEVICE_ID 1
#define JSON_BUFFER_SIZE 250

const size_t bufferSize = JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3);

bool lastState = false;
volatile bool state = false;
bool updated = true;
char jsonBuffer[JSON_BUFFER_SIZE];
unsigned long lastTimestamp = 0L;
unsigned long const cooldown = 10 * 1000; // 10s

void setup() {
  pinMode(PIR_RIGHT_PIN, INPUT_PULLUP);
  pinMode(PIR_LEFT_PIN, INPUT_PULLUP);
  pinMode(OUTPUT_PIN, OUTPUT);

  attachInterrupt(digitalPinToInterrupt(PIR_RIGHT_PIN), pinterruptHandler, CHANGE);
  attachInterrupt(digitalPinToInterrupt(PIR_LEFT_PIN), pinterruptHandler, CHANGE);

  Serial.begin(9600);
}

void loop() {
  if (lastState != state) {
    lastState = state;
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

void getResponseJSON(char *arr, bool state) {
  DynamicJsonBuffer dynamicJsonBuffer(bufferSize);

  JsonObject& root = dynamicJsonBuffer.createObject();
  JsonObject& room = root.createNestedObject("room");

  unsigned char* hash;
  char *md5str;

  room["id"] = ROOM_ID;
  room["deviceId"] = DEVICE_ID;
  room["status"] = state ? "OCCUPIED" : "FREE";

  room.printTo(arr, JSON_BUFFER_SIZE);

  hash = MD5::make_hash(arr, JSON_BUFFER_SIZE);
  md5str = MD5::make_digest(hash, 16);

  root["hash"] = md5str;
  root.printTo(arr, JSON_BUFFER_SIZE);

  free(hash);
  free(md5str);
}

void setOutputState(bool state) {
  digitalWrite(OUTPUT_PIN, state ? HIGH : LOW);
  updated = true;
}

void sendResponse(char *arr) {
  // ...
}

void handleStateChange(bool state) {
  if (state == true) {
    setOutputState(state);
    getResponseJSON(jsonBuffer, state);
    sendResponse(jsonBuffer);
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
      getResponseJSON(jsonBuffer, false);
      sendResponse(jsonBuffer);
    }
  }
}


