#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

FirebaseData fbdo;
FirebaseAuth firebaseAuth;
FirebaseConfig firebaseConfig;
bool signupOk = false;

struct FirebaseUtils {
	static void init(char* apiKey, char* databaseUrl);
	static void signUp();
	static bool ready();
	static void getJson(String path, FirebaseJson* json);
};

void FirebaseUtils::signUp() {
	if (Firebase.signUp(&firebaseConfig, &firebaseAuth, "", "")) {
		Serial.println("ok");
		signupOk = true;
	} else {
		Serial.printf("%s\n", firebaseConfig.signer.signupError.message.c_str());
	}
}

bool FirebaseUtils::ready() {
	return Firebase.ready() && signupOk;
}

void FirebaseUtils::init(char* apiKey, char* databaseUrl) {
	firebaseConfig.api_key = apiKey;
	firebaseConfig.database_url = databaseUrl;
	FirebaseUtils::signUp();
	firebaseConfig.token_status_callback = tokenStatusCallback;
	Firebase.begin(&firebaseConfig, &firebaseAuth);
	Firebase.reconnectWiFi(true);
}

void FirebaseUtils::getJson(String path, FirebaseJson* json) {
	Firebase.RTDB.getJSON(&fbdo, path);
	json->setJsonData(fbdo.payload());
}