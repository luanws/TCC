#include <Arduino.h>
#include "src/utils/wifi.h"
#include <ReactESP.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_task_wdt.h>
#include "config.h"

using namespace reactesp;

ReactESP appReactESP;
ReactESP proReactESP;

void TaskAppCPU(void* arg) {
	for (;;) {
		appReactESP.tick();
	}
}

void TaskProCPU(void* arg) {
	esp_task_wdt_init(60, false);
	for (;;) {
		proReactESP.tick();
	}
}

void setup() {
	Serial.begin(9600);
	WiFiUtils::connect(WIFI_SSID, WIFI_PASSWORD);

	xTaskCreatePinnedToCore(TaskAppCPU, "TaskAppCPU", 10000, NULL, 1, NULL, APP_CPU_NUM);
	xTaskCreatePinnedToCore(TaskProCPU, "TaskProCPU", 10000, NULL, 1, NULL, PRO_CPU_NUM);
}

void loop() {}
