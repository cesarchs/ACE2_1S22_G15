import meter.*;

Meter m, n;

void setup(){
  size(1280, 790);
  background(255);
  
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
}

void draw() {
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
  m.updateMeter(int(random(101)));
  n.updateMeter(int(random(101)));
  delay(1000);
}

void printCard(int x, int y, int area) {
  noFill();
  square(x, y, area);
}

void printCard2(int x, int y, int w, int h) {
  noFill();
  rect(x, y, w, h);
}
