#include <WiFi.h>

struct WiFiUtils {
	static void connect(char* ssid, char* password);
	static void disconnect();
};

void WiFiUtils::connect(char* ssid, char* password) {
	WiFi.begin(ssid, password);
	Serial.print("Connecting to Wi-Fi");
	while (WiFi.status() != WL_CONNECTED) {
		Serial.print(".");
		delay(500);
	}
	Serial.println();
	Serial.print("Connected with IP: ");
	Serial.println(WiFi.localIP());
	Serial.println();
}

void WiFiUtils::disconnect() {
	WiFi.disconnect();
	Serial.println("Disconnected from Wi-Fi");
	Serial.println();
}