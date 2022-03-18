
//-----------------------RESPUESTA A MANDAR A LA API -------------------------
String data;
//----------------------------------------------------------------------------

//########################################################
//------------------------- pines-----------------------
// Configuramos los pines del sensor Trigger y Echo
const int PinTrig = 7;
const int PinEcho = 6;

// PIN SENSOR DE HUMEDAD EN EL SUELO 
int SensorPinHumedad = A15;

// PIN FOTODIODOS 
const int PinSensorFotodiodo1 = A0;
const int PinSensorFotodiodo2 = A1;

//########################################################
// ############## VARIABLES ##############################
// #######################################################

 //----- VARIABLE PARA SENSOR DE HUMEDAD EN LA TIERRA ----
 
float humedad;

//----------------------- VELOCIDAD ---------------------
// Constante velocidad sonido en cm/s
const float VelSon = 34000.0;


 // --------------- DISTANCIAS MEDIDAS -------------------
// Distancia a los 100 ml y vacío 
const float distancia100 = 2.15;
const float distanciaVacio = 11.41;


//##########################################################################################

void setup()
{
  // Iniciamos el monitor serie para mostrar el resultado
  Serial.begin(9600);
  // Ponemos el pin Trig en modo salida
  pinMode(PinTrig, OUTPUT);
  // Ponemos el pin Echo en modo entrada
  pinMode(PinEcho, INPUT);

}

void loop()
{
 data = ""; 
 humedad = 0;
  
  data.concat(getDistancia());
  data.concat(",");
  data.concat(getHumedad());
  data.concat(",");
  data.concat(getEstadoAguaVivienda());
  data.concat(",");
  data.concat(getEstadoAguaFiltrada());
  data.concat(";");


  //################# ENVIO DE DATA POR PUERTO SERIAL#####################################
  Serial.println(data);
  //######################################################################################

}


// #####################################################################################

// Método que inicia la secuencia del Trigger para comenzar a medir
void iniciarTrigger()
{
  // Ponemos el Triiger en estado bajo y esperamos 2 ms
  digitalWrite(PinTrig, LOW);
  delayMicroseconds(2);
 
  // Ponemos el pin Trigger a estado alto y esperamos 10 ms
  digitalWrite(PinTrig, HIGH);
  delayMicroseconds(10);
 
  // Comenzamos poniendo el pin Trigger en estado bajo
  digitalWrite(PinTrig, LOW);
}


// ####################################################################################
// SENSOR ULTRASONICO
float getDistancia (){
 
  iniciarTrigger();
 
  // La función pulseIn obtiene el tiempo que tarda en cambiar entre estados, en este caso a HIGH
  unsigned long tiempo = pulseIn(PinEcho, HIGH);
 
  // Obtenemos la distancia en cm, hay que convertir el tiempo en segudos ya que está en microsegundos
  // por eso se multiplica por 0.000001
  float distancia = tiempo * 0.000001 * VelSon / 2.0;
    
  float distanciaLleno = distanciaVacio - distancia;
  float cantidadLiquido = distanciaLleno * 100 / distancia100;
  
  return cantidadLiquido;// ml

  delay(500);
}

// #############################################################################

// SENSOR DE HUMEDAD EN TIERRA 

 float getHumedad() {  
  //obtenemos valor analogo del sensor de humedad
   float humedad = analogRead(SensorPinHumedad);
   return humedad;
 }

//#############################################################################

// SENSOR DE AGUA SUCIA FOTODIODO 1

 float getEstadoAguaVivienda(){
  float lecturaFotodiodo1 = 0;
  lecturaFotodiodo1 = analogRead(PinSensorFotodiodo1);

  return lecturaFotodiodo1;
 }

 //#############################################################################

// SENSOR DE SUCIEDAD EN AGUA LIMPIA FOTODIODO 2

 float getEstadoAguaFiltrada(){
  float lecturaFotodiodo2 = 0;
  lecturaFotodiodo2 = analogRead(PinSensorFotodiodo2);

  return lecturaFotodiodo2;
 }
