//LIBRERIAS PARA SENSOR DE TENPERATURA
#include "DHT.h"
#include <Adafruit_Sensor.h>

//-----------------------RESPUESTA A MANDAR A LA API -------------------------

String data;

//----------------------------------------------------------------------------
                 // VARIABLES PARA CADA SENSOR DE TEMPERARUTA
float dht_temperatura;
float dht_temperatura2;
                // VARIABLE PARA SENSOR DE HUMEDAD EN LA TIERRA
int humedad;
                // VARIABLES PARA SENSOR DE LUZ
float luz;
                // VARIABLES PARA SENSOR DE CO2
int Co2;
//----------------------------------------------------------------------------

// PIN SENSOR DE HUMEDAD EN EL SUELO 
int SensorPinHumedad = A0;

// SENSOR DE TEMPERATURA esta conectado al pin D2, D4
const int dht_pin = 2;
const int dht_pin2 = 4;

const int dht_tipo = DHT11;

DHT dht(dht_pin, dht_tipo);
DHT dht2(dht_pin2, dht_tipo);

// SENSOR DE LUZ ----------------------------------------

const int ldr_pin = 7;

// SENSOR DE CO2--------------------------------------------
int SensorPinCO2 = A1;


//----------------------------------------------------------------------------
void setup() {
  // INICIALIZACION DE PINES
  pinMode (ldr_pin, INPUT);
  //pinMode (dht_pin, INPUT);
  //pinMode (dht_pin2, INPUT);
  
  // INICIALIZAMOS PUERTO SERIAL
  Serial.begin(9600);

  //INICIALIZAMOS SENSOR DE TEMPERATURA 
  dht.begin();
  
}

void loop() {
  // ----- BORRAR DATOS DE VARIABLE DE DATA ---------------
  data = ""; 
  dht_temperatura = 0;
  dht_temperatura2 = 0; 
  humedad = 0;
  luz = 0;
  Co2 = 0;
  //-------------------------------------------------------
  // Espera 2 segundos para que finalice la conversion
  delay(2000);

  // RECOLECCION DE DATA Y DISEÑO DE ENVIO DE DATOS

  data.concat(getTemperaturaInterior());
  data.concat(",");
  data.concat(getTemperaturaExterior());
  data.concat(",");
  data.concat(getHumedad());
  data.concat(",");
  data.concat(getLuz());
  data.concat(",");
  data.concat(getCo2());
  data.concat(";");
  
  
//################# ENVIO DE DATA POR PUERTO SERIAL##################
  Serial.println(data);
//###################################################################
  
}

// SENSOR DE TEMPERATURA 1
float getTemperaturaInterior (){
  
  // Lee los valores de humedad y temperatura
  //float dht_humedad = dht.readHumidity(); 
  float dht_temperatura = dht.readTemperature();

  // Envia las lecturas
  //Serial.print(dht_humedad); el porcentaje
  //Serial.print(dht_temperatura); // en centigrados 

  return dht_temperatura;
}

// SENSOR DE TEMPERATURA 2
float getTemperaturaExterior (){
  
  // Lee los valores de temperatura
  float dht_temperatura2 = dht2.readTemperature();

  return dht_temperatura2;
}

// SENSOR DE HUMEDAD EN TIERRA 

 int getHumedad() {  
  //obtenemos valor analogo del sensor de humedad
   int humedad = analogRead(SensorPinHumedad);
   
   return humedad;
 }

// SENSOR DE LUZ 

int getLuz () {
  // obtenemos valor digital del sensor de luz
  luz = digitalRead (ldr_pin);

  return luz;
}

// SENSOR DE CO2, MEDIMOS LA CALIDAD DEL AIRE

int getCo2 (){
  Co2 = analogRead(SensorPinCO2); 

  return Co2;
}
