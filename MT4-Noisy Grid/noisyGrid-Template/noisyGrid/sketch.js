var stepSize = 20;


function setup() {
  createCanvas(500, 500);

}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();

  angleMode(DEGREES);
  
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  for(var i = 0; i < 25; i++) {
    for(var j = 0; j < 25; j++) {
      var speed = map(mouseX, 0, width, 30, 10);
      var gridNoise = noise(i/100, j/100, speed);

      var c1 = color(0, 255, 255);
      var c2 = color(255, 20, 147);
      var c = lerpColor(c1, c2, gridNoise);

      fill(c);
      noStroke();
      rect(stepSize*i, stepSize*j, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  for(var i = 0; i < 25; i++) {
    for(var j = 0; j < 25; j++) {
      push();
      var speed = map(mouseX, 0, width, 30, 10);
      var compassNoise = noise(i/100, j/100, speed);
      var lLength = map(compassNoise, 0, 0.3, 0, stepSize);
      var a = map(compassNoise, 0, 1, 0, 720);
      var l = map(compassNoise, 0, 1, 0, 255);
      
      stroke(l);
      translate(stepSize*i + 10, stepSize*j + 10);
      rotate(a);

      line(0, 0, 0, lLength);
      pop();
    }
  }
}
