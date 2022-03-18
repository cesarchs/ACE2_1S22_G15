
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
const int lightSensorPin = A0;
const int lightSensorPin2 = A1;

//########################################################
// ############## VARIABLES ##############################
// #######################################################

 //----- VARIABLE PARA SENSOR DE HUMEDAD EN LA TIERRA ----
 
float humedad;

//----------------------- VELOCIDAD ---------------------
// Constante velocidad sonido en cm/s
const float VelSon = 34000.0;


// Número de muestras
const int numLecturas = 100;


 // --------------- DISTANCIAS MEDIDAS -------------------
// Distancia a los 100 ml y vacío 
const float distancia100 = 2.15;
const float distanciaVacio = 11.41;

//########################################################
// VARIABLES PARA CONTROL DE CANTIDAD DE AGUA EN EL RECIPIENTE

float lecturas[numLecturas]; // Array para almacenar lecturas
int lecturaActual = 0; // Lectura por la que vamos
float total = 0; // Total de las que llevamos
float media = 0; // Media de las medidas
bool primeraMedia = false; // Para saber que ya hemos calculado por lo menos una


//##########################################################################################

void setup()
{
  // Iniciamos el monitor serie para mostrar el resultado
  Serial.begin(9600);
  // Ponemos el pin Trig en modo salida
  pinMode(PinTrig, OUTPUT);
  // Ponemos el pin Echo en modo entrada
  pinMode(PinEcho, INPUT);
 
  // Inicializamos el array
  for (int i = 0; i < numLecturas; i++)
  {
    lecturas[i] = 0;
  }
}

void loop()
{
 data = ""; 
 humedad = 0;
 
 data.concat(getDistancia());
 data.concat(",");
 data.concat(getHumedad());
 data.concat(",");
 
 data.concat(";");

 Serial.println(data);
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
  
    // Eliminamos la última medida
  total = total - lecturas[lecturaActual];
 
  iniciarTrigger();
 
  // La función pulseIn obtiene el tiempo que tarda en cambiar entre estados, en este caso a HIGH
  unsigned long tiempo = pulseIn(PinEcho, HIGH);
 
  // Obtenemos la distancia en cm, hay que convertir el tiempo en segudos ya que está en microsegundos
  // por eso se multiplica por 0.000001
  float distancia = tiempo * 0.000001 * VelSon / 2.0;
 
  // Almacenamos la distancia en el array
  lecturas[lecturaActual] = distancia;
 
  // Añadimos la lectura al total
  total = total + lecturas[lecturaActual];
 
  // Avanzamos a la siguiente posición del array
  lecturaActual = lecturaActual + 1;
 
  // Comprobamos si hemos llegado al final del array
  if (lecturaActual >= numLecturas)
  {
    primeraMedia = true;
    lecturaActual = 0;
  }
 
  // Calculamos la media
  media = total / numLecturas;
 
  // Solo mostramos si hemos calculado por lo menos una media
  if (primeraMedia){
    
    float distanciaLleno = distanciaVacio - media;
    float cantidadLiquido = distanciaLleno * 100 / distancia100;
 
    
    return cantidadLiquido;// ml
  }
 
  delay(500);
}

// #############################################################################

// SENSOR DE HUMEDAD EN TIERRA 

 int getHumedad() {  
  //obtenemos valor analogo del sensor de humedad
   int humedad = analogRead(SensorPinHumedad);
   return humedad;
 }

//#############################################################################

// SENSOR DE AGUA SUCIA FOTODIODO 1

 float getEstadoAguaVivienda(){
  float lightSensorReading1 = 0;
  lightSensorReading1 = analogRead(lightSensorPin);

  return lightSensorReading1;
 }

 //#############################################################################

// SENSOR DE SUCIEDAD EN AGUA LIMPIA FOTODIODO 2

 float getEstadoAguaFiltrada(){
  float lightSensorReading2 = 0;
  lightSensorReading2 = analogRead(lightSensorPin2);

  return lightSensorReading2;
 }
