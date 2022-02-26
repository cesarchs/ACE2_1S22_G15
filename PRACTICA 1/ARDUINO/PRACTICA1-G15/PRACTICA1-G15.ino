//LIBRERIAS PARA SENSOR DE TENPERATURA

//-----------------------RESPUESTA A MANDAR A LA API -------------------------
String data;
//----------------------------------------------------------------------------
                 // VARIABLES PARA CADA SENSOR DE TEMPERARUTA
float dht_temperatura;
float dht_temperatura2;
                // VARIABLE PARA SENSOR DE HUMEDAD EN LA TIERRA
float humedad;
                // VARIABLES PARA SENSOR DE LUZ
float luz;
                // VARIABLES PARA SENSOR DE CO2
float Co2;
//----------------------------------------------------------------------------

// PIN SENSOR DE HUMEDAD EN EL SUELO 
int SensorPinHumedad = A15;

// SENSOR DE TEMPERATURA esta conectado al pin D2, D4
const int dht_pin = A2;
const int dht_pin2 = A4;


//DHT dht(dht_pin, dht_tipo);
//DHT dht2(dht_pin2, dht_tipo);

// SENSOR DE LUZ ----------------------------------------

const int ldr_pin = A9;

// SENSOR DE CO2--------------------------------------------
int SensorPinCO2 = A0;


//----------------------------------------------------------------------------
void setup() {
  // INICIALIZACION DE PINES
  //pinMode (ldr_pin, INPUT);
  //pinMode (dht_pin, INPUT);
  //pinMode (dht_pin2, INPUT);
  
  // INICIALIZAMOS PUERTO SERIAL
  Serial.begin(9600);

  //INICIALIZAMOS SENSOR DE TEMPERATURA 
  //dht.begin();
  
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
  delay(1000);

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
  float dht_temperatura = analogRead(dht_pin);
  float temperatura = (dht_temperatura * 2.0 * 100.0)/1023.0;
  return temperatura;
}

// SENSOR DE TEMPERATURA 2
float getTemperaturaExterior (){
  
  // Lee los valores de temperatura
  //float dht_temperatura2 = dht2.readTemperature();
  float dht_temperatura2 = analogRead(dht_pin2);
  float temperatura2 = (dht_temperatura2 * 2.0 * 100.0)/1023.0;
  return temperatura2;
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
  luz = analogRead (ldr_pin);
  return luz;
}

// SENSOR DE CO2, MEDIMOS LA CALIDAD DEL AIRE

int getCo2 (){
  Co2 = analogRead(SensorPinCO2);
  char offset_calibracion[100];
  int offset_calibracion_convertido = atoi(offset_calibracion);
  int offstet_mq_135 = 400;  
  int t = Co2 + offstet_mq_135 + offset_calibracion_convertido;
  return t;
}
