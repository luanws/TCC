#include <Arduino.h>
#include "src/utils/wifi.h"
#include "src/utils/firebase.h"
#include <ReactESP.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_task_wdt.h>
#include "config.h"

#define FIREBASE_SYNC_DELAY 500
#define SERVO_MOTOR_1_PIN 25
#define SERVO_MOTOR_2_PIN 26
#define SERVO_MOTOR_3_PIN 27
#define MAIN_MOTOR_PIN 32

using namespace reactesp;

ReactESP appReactESP;
ReactESP proReactESP;

bool isServoMotor1Enabled = false;
bool isServoMotor2Enabled = false;
bool isServoMotor3Enabled = false;
bool isMainMotorEnabled = false;

void TaskAppCPU(void* arg) {
	for (;;) {
		appReactESP.tick();
	}
}

void TaskProCPU(void* arg) {
	esp_task_wdt_init(1 * 60 * 60, false);
	for (;;) {
		proReactESP.tick();
	}
}

void printStatus() {
	Serial.println("--------------------");
	Serial.println("Status:");
	Serial.print("servoMotor1: ");
	Serial.println(isServoMotor1Enabled ? "ON" : "OFF");
	Serial.print("servoMotor2: ");
	Serial.println(isServoMotor2Enabled ? "ON" : "OFF");
	Serial.print("servoMotor3: ");
	Serial.println(isServoMotor3Enabled ? "ON" : "OFF");
	Serial.print("mainMotor: ");
	Serial.println(isMainMotorEnabled ? "ON" : "OFF");
	Serial.println("--------------------");
}

void firebaseSync() {
	FirebaseJson json;
	FirebaseUtils::getJson("beltStatus", &json);

	FirebaseJsonData servoMotor1JsonData;
	json.get(servoMotor1JsonData, "servoMotor1");
	isServoMotor1Enabled = servoMotor1JsonData.to<bool>();

	FirebaseJsonData servoMotor2JsonData;
	json.get(servoMotor2JsonData, "servoMotor2");
	isServoMotor2Enabled = servoMotor2JsonData.to<bool>();

	FirebaseJsonData servoMotor3JsonData;
	json.get(servoMotor3JsonData, "servoMotor3");
	isServoMotor3Enabled = servoMotor3JsonData.to<bool>();

	FirebaseJsonData mainMotorJsonData;
	json.get(mainMotorJsonData, "mainMotor");
	isMainMotorEnabled = mainMotorJsonData.to<bool>();

	printStatus();
}

void writePins() {
	digitalWrite(SERVO_MOTOR_1_PIN, isServoMotor1Enabled ? HIGH : LOW);
	digitalWrite(SERVO_MOTOR_2_PIN, isServoMotor2Enabled ? HIGH : LOW);
	digitalWrite(SERVO_MOTOR_3_PIN, isServoMotor3Enabled ? HIGH : LOW);
	digitalWrite(MAIN_MOTOR_PIN, isMainMotorEnabled ? HIGH : LOW);
}

void setup() {
	Serial.begin(9600);
	WiFiUtils::connect(WIFI_SSID, WIFI_PASSWORD);
	FirebaseUtils::init(FIREBASE_API_KEY, FIREBASE_DATABASE_URL);

	pinMode(SERVO_MOTOR_1_PIN, OUTPUT);
	pinMode(SERVO_MOTOR_2_PIN, OUTPUT);
	pinMode(SERVO_MOTOR_3_PIN, OUTPUT);
	pinMode(MAIN_MOTOR_PIN, OUTPUT);

	appReactESP.onTick(writePins);
	proReactESP.onRepeat(FIREBASE_SYNC_DELAY, firebaseSync);

	xTaskCreatePinnedToCore(TaskAppCPU, "TaskAppCPU", 10000, NULL, 1, NULL, APP_CPU_NUM);
	xTaskCreatePinnedToCore(TaskProCPU, "TaskProCPU", 10000, NULL, 1, NULL, PRO_CPU_NUM);
}

void loop() {}
