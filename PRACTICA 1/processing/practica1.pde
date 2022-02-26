import meter.*;

// CO2
float increment = 0.01;
// The noise function's 3rd argument, a global variable that increments once per cycle
float zoff = 0.0;  
// We will increment zoff differently than xoff and yoff
float zincrement = 0.02; 
//
Meter m, n;
JSONObject json;
Drop2[] drops2;
int totalDrops = 0; 
void setup(){
  size(1000, 800);
  background(255);
  frameRate(30);
  
  //Configuración de termometros para la tempertura.
  m = new Meter(this, 20, 30);
  n = new Meter(this, 500, 30);
  m.setTitle("Temperatura Interior (°C)");
  n.setTitle("Temperatura Exterior (°C)");
  
  
  //Escala
  String[] scaleLabels = {"0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"};
  m.setScaleLabels(scaleLabels);
  n.setScaleLabels(scaleLabels);
  
  //Mostra cantidad digital
  m.setDisplayDigitalMeterValue(true);
  n.setDisplayDigitalMeterValue(true);
  
  m.setMaxScaleValue(100);
  n.setMaxScaleValue(100);
  m.setMinInputSignal(0);
  n.setMinInputSignal(0);
  m.setMaxInputSignal(100);
  n.setMaxInputSignal(100);
  //noLoop();
  drops2 = new Drop2[1000]; 
}

void draw() {
  
  background(255);
  json = loadJSONObject("http://localhost:8080/last/data");
  int temp_ext = json.getInt("Temp_Ext");
  int temp_int = json.getInt("Temp_Int");
  int humedad = json.getInt("Humedad");
  //int humedad = 800;
  int co2 = json.getInt("Co2");
  int luz = json.getInt("Luz");
  //int luz = 1;
  luzA(luz);
  fill(1);
  textSize(25);
  text("CO2: "+ co2+" ppm", 160, 560); 
  text("Humedad: "+ humedad, 40, 600); 
  text("Luminocidad: "+ luz, 600, 560); 
  
  
  measureCO2(co2);
  if (totalDrops < drops2.length) {
        drops2[totalDrops] = new Drop2();
        totalDrops++;
   }
   if(humedad<900){
     for (int i = 0; i < totalDrops; i++ ){
     drops2[i].color2(humedad);
   }
   }
   
   for (int i = 0; i < totalDrops; i++ ) {
       
         drops2[i].move();
        drops2[i].display();
       
        
      }
  //------------------------------------------------
  int margen = 0;
  for(int i = 0; i < 3; i++) {
    margen += 20;
    printCard(margen, 30, 350);
    margen += 400;
  }
  margen = 20;
  for(int i=0; i<2; i++){
    printCard2(margen, 400, 500, 350);
    margen += 500 + 190;
  }

  m.updateMeter(temp_int);
  n.updateMeter(temp_ext);
  delay(100);
}

void printCard(int x, int y, int area) {
  noFill();
  square(x, y, area);
}

void printCard2(int x, int y, int w, int h) {
  noFill();
  rect(x, y, w, h);
}

void printCard3(int x, int y, int area) {
  noFill();
  square(x, y, area);
}

void measureCO2(float co2){

  loadPixels();

  float xoff = 0.0; // Start xoff at 0
  
  // For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
  for (int x = 20; x < 455; x++) {
    xoff += increment;   // Increment xoff 
    float yoff = 0.0;   // For every xoff, start yoff at 0
    for (int y = 300; y < 530; y++) {
      yoff += increment; // Increment yoff
      
      // Calculate noise and scale by 255
      float bright = noise(xoff,yoff,zoff)*co2/3;

      // Try using this line instead
      //float bright = random(0,255);
      
      // Set each pixel onscreen to a grayscale value
      pixels[x+y*width] = color(bright,bright,bright);
    }
  }
  updatePixels();
  
  zoff += zincrement; // Increment zoff
  }
  
  void luzA(int luz){
    // Scale the mouseX value from 0 to 640 to a range between 0 and 175
  float c = map(luz, 1023, 0, 255, 0);
  // Scale the mouseX value from 0 to 640 to a range between 40 and 300
  float d = map(luz, 1023, 0, 40, 200);
  fill(255, 255, c);
  ellipse(720, 415, d, d);  
  }
