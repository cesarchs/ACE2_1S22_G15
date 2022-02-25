class Drop2 {
  float x, y;   // variables ubicación gotas
  float speed;  // velocidad gotas
  color c;
  float r;      // radio de las gotas

 boolean finished = false;
 
  Drop2() {
    r = random(7, 12);       // Las gotitas son de tamaño random
    x = random(width);       // Start with a random x location
    y = -r*4;                // Start a little above the window
    speed = random(2, 10);    // Velocidad random entre 2-5
    c = color(255);   
  }

  // Que las gotas caigan
  void move() {
    y += speed;   // Aumenta velocidad
  }

  boolean reachedBottom() {
    if (y > height + r*4) { 
      return true;
    } else {
      return false;
    }
  }

  void display() {
    fill(c);
    noStroke();
    for (int i = 2; i < r; i++ ) {
      ellipse(x, y + i*4, i*2, i*2);
    }
  }

  void color2(int humedad) {
    if(humedad >800){
      c=color(255);
    }else if (humedad >700){
      c=color(185,200,235);
    }else if(humedad > 600){
      c=color(140,170,230);
    }else if(humedad >500){
      c=color(78,93,127);
    }else{
      c=color(0,25,255);
    }
    
  }
}
