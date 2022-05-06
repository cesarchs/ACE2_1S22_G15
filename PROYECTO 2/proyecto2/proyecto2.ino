#include <SoftwareSerial.h>

SoftwareSerial BTserial(16, 17); // BTserial(10, 11) Setup of Bluetooth module on pins 10 (TXD) and 11 (RXD);

//###############RESPUESTA A MANDAR A LA API##########
String dataApi;
String dataApp;

//#####################################################
//############### PINES ###############################

int SensorPinCH4 = A0;
const int dht_pin = A2;             // TEMPERATURA
const int pinAperturaMetanoSalida = 12;
const int pinChispaSalida = 13;
//#####################################################

//############## VARIABLES PARA SENSORES ##############
float CH4;
float dht_temperatura;
float chispa;
float flujoGas;
// PARA BLUETOOTH DE APP
char lectura;
char varLectura;
// PARA BLUETOOTH DE API
char lectura2;
char varLectura2;

//#####################################################


void setup() {
  setupPins();
  BTserial.begin(9600); // Bluetooth at baud 9600 for talking to the node server
  Serial.begin(4800); // Default Serial on Baud 4800 for printing out some messages in the Serial Monitor
  Serial1.begin(19200);
}

void loop() {
     // ----- BORRAR DATOS DE VARIABLE DE DATA ---------------
      dataApi = "";
      dataApp = ""; 
      dht_temperatura = 0;
      CH4 = 0;
  //-------------------------------------------------------
     delay(1000);
  // RECOLECCION DE DATA Y DISEÑO DE ENVIO DE DATOS

  // recoleccion de datos para api
  dataApi.concat(getTemperatura());
  dataApi.concat(",");
  dataApi.concat(getCH4());
  dataApi.concat(",");
  dataApi.concat(chispa);
  dataApi.concat(",");
  dataApi.concat(flujoGas);
  dataApi.concat(";");

  // recoleccion de datos para APP
  dataApp.concat(getTemperatura());
  dataApp.concat(",");
  dataApp.concat(getCH4());
  dataApp.concat(";");
  
//################# ENVIO DE DATA POR BLUETOOTH PARA APP ##################
    if(Serial1.available()>0){
      lectura = Serial1.read();
      Serial.println(lectura);
      varLectura = lectura;
      Serial.println(varLectura);
      if (varLectura == '1'){
        digitalWrite(pinAperturaMetanoSalida, HIGH);
          flujoGas = 1;
          Serial.println("apertuda de llave de gas");
        } else if (varLectura == '2') {
          digitalWrite(pinAperturaMetanoSalida, LOW);
          flujoGas = 0;
          Serial.println("cierre de llave de gas");
        }else if (varLectura == '3') {
          chispa = 1;
          digitalWrite(pinChispaSalida, HIGH);
          Serial.println("encendido de chispero");
        }else if (varLectura == '4') {
          digitalWrite(pinChispaSalida, LOW);
          chispa = 0;
          Serial.println("apagado de chispero");
        }
     }else{
      Serial1.println(dataApp);
  }
  
//###############################################################
//################# ENVIO DE DATA POR BLUETOOTH PARA API ##################
  if (getCH4()> 0){
      // Calls on BTSerial and sends the string to any connected devices.
      BTserial.print(dataApi + "\n"); 
      Serial.println("enviando datos a la api");

  // readStringUntil()
  // Reads all bytes off of the the Serial buffer until it finds the escape character '/n'
  // And then removes these bytes from the buffer
  // Returns the value as a string, which we print to the Serial monitor
   // Serial.println(BTserial.readStringUntil('\n'));
  }

 //###############################################################
//################# ENVIO DE DATA POR BLUETOOTH PARA API ##################

}


float getTemperatura (){
  
  // Lee los valores de humedad y temperatura
  float dht_temperatura = analogRead(dht_pin);
  float temperatura = (dht_temperatura * 2.0 * 100.0)/1023.0;
  return temperatura;
}

int getCH4 (){
  CH4 = analogRead(SensorPinCH4);
  char offset_calibracion[100];
  int offset_calibracion_convertido = atoi(offset_calibracion);
  int offstet_mq_4 = 400;  
  int t = CH4 + offstet_mq_4 + offset_calibracion_convertido;
  return t;
}

void setupPins(){
//pinMode(pinAperturaMetanoSalida, OUTPUT);
  pinMode(pinAperturaMetanoSalida, OUTPUT);
  pinMode(pinChispaSalida, OUTPUT);
  pinMode(SensorPinCH4, INPUT);
  pinMode(dht_pin, INPUT);
}
