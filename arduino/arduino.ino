#include <Arduino.h>
#include <Servo.h>

#define LIB
#ifndef LIB
#include "lib/arduino/Arduino.h"
#include "lib/Servo/src/Servo.h"
#endif

#define INPUT_SERVO_MOTOR_1_PIN 2
#define INPUT_SERVO_MOTOR_2_PIN 3
#define INPUT_SERVO_MOTOR_3_PIN 4

#define OUTPUT_SERVO_MOTOR_1_PIN 5
#define OUTPUT_SERVO_MOTOR_2_PIN 6
#define OUTPUT_SERVO_MOTOR_3_PIN 7

#define POWER_BUTTON_INPUT_PIN 8
#define REVERT_BUTTON_INPUT_PIN 9
#define MAIN_MOTOR_CLOCKWISE_PIN 10
#define MAIN_MOTOR_ANTICLOCKWISE_PIN 11

#define INACTIVE_SERVO_MOTOR_ANGLE 45
#define ACTIVE_SERVO_MOTOR_ANGLE 0

Servo servoMotor1;
Servo servoMotor2;
Servo servoMotor3;

bool isClockwise = true;

void enableServoMotor(Servo servoMotor) {
	servoMotor.write(ACTIVE_SERVO_MOTOR_ANGLE);
}

void disableServoMotor(Servo servoMotor) {
	servoMotor.write(INACTIVE_SERVO_MOTOR_ANGLE);
}

void updateServoMotorPositions() {
	if (digitalRead(INPUT_SERVO_MOTOR_1_PIN) == HIGH) {
		enableServoMotor(servoMotor1);
	} else {
		disableServoMotor(servoMotor1);
	}

	if (digitalRead(INPUT_SERVO_MOTOR_2_PIN) == HIGH) {
		enableServoMotor(servoMotor2);
	} else {
		disableServoMotor(servoMotor2);
	}

	if (digitalRead(INPUT_SERVO_MOTOR_3_PIN) == HIGH) {
		enableServoMotor(servoMotor3);
	} else {
		disableServoMotor(servoMotor3);
	}
}

void updateMainMotorState() {
	bool isMainMotorEnabled = digitalRead(POWER_BUTTON_INPUT_PIN) == HIGH;
	bool isClockwise = digitalRead(REVERT_BUTTON_INPUT_PIN) == HIGH;
	if (isMainMotorEnabled) {
		if (isClockwise) {
			digitalWrite(MAIN_MOTOR_CLOCKWISE_PIN, HIGH);
			digitalWrite(MAIN_MOTOR_ANTICLOCKWISE_PIN, LOW);
		} else {
			digitalWrite(MAIN_MOTOR_CLOCKWISE_PIN, LOW);
			digitalWrite(MAIN_MOTOR_ANTICLOCKWISE_PIN, HIGH);
		}
	} else {
		digitalWrite(MAIN_MOTOR_CLOCKWISE_PIN, LOW);
		digitalWrite(MAIN_MOTOR_ANTICLOCKWISE_PIN, LOW);
	}
}

void setup() {
	pinMode(INPUT_SERVO_MOTOR_1_PIN, INPUT);
	pinMode(INPUT_SERVO_MOTOR_2_PIN, INPUT);
	pinMode(INPUT_SERVO_MOTOR_3_PIN, INPUT);
	pinMode(POWER_BUTTON_INPUT_PIN, INPUT);
	pinMode(REVERT_BUTTON_INPUT_PIN, INPUT);
	pinMode(MAIN_MOTOR_CLOCKWISE_PIN, OUTPUT);
	pinMode(MAIN_MOTOR_ANTICLOCKWISE_PIN, OUTPUT);

	servoMotor1.attach(OUTPUT_SERVO_MOTOR_1_PIN);
	servoMotor2.attach(OUTPUT_SERVO_MOTOR_2_PIN);
	servoMotor3.attach(OUTPUT_SERVO_MOTOR_3_PIN);

	digitalWrite(MAIN_MOTOR_ANTICLOCKWISE_PIN, LOW);
	digitalWrite(MAIN_MOTOR_CLOCKWISE_PIN, LOW);
}

void loop() {
	updateServoMotorPositions();
	updateMainMotorState();
}