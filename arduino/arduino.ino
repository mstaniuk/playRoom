#define PIR_RIGHT_PIN 3
#define PIR_LEFT_PIN 2
#define OUTPUT_PIN 13
#define DEBUG false
#define IFDEBUG (defined(DEBUG) && DEBUG == true)

bool lastState = false;
volatile bool state = false;
bool updated = true;

unsigned long lastTimestamp = 0L;
unsigned long const cooldown = 10 * 1000; // 10s

#if IFDEBUG
int tempOutputState = LOW;
#endif

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
    if (state == true) {
      setOutputState(true);
    } else {
      updated = false;
      lastTimestamp = millis();
    }
  }

  if (!updated) {
    unsigned long currentTimestamp = millis();

    if (currentTimestamp - lastTimestamp >= cooldown) {
      setOutputState(false);
    }
  }

#if IFDEBUG
  Serial.print("R:");
  Serial.print((digitalRead(PIR_RIGHT_PIN) == HIGH));
  Serial.print(" L:");
  Serial.print((digitalRead(PIR_LEFT_PIN) == HIGH));
  Serial.print(" O:");
  Serial.print((tempOutputState == HIGH));
  Serial.print(" U:");
  Serial.println(updated);
#endif
}

void pinterruptHandler() {
  int rightPirState = digitalRead(PIR_RIGHT_PIN);
  int leftPirState = digitalRead(PIR_LEFT_PIN);
  state = rightPirState == HIGH || leftPirState == HIGH;
}

void(* softRestart) (void) = 0;

void setOutputState(bool state) {
  digitalWrite(OUTPUT_PIN, state ? HIGH : LOW);
  updated = true;

#if IFDEBUG
  tempOutputState = state ? HIGH : LOW;
#endif
}
