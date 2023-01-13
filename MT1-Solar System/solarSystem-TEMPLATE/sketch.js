var speed;
var angle = 0;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
        translate(width/2, height/2);
            push();
                rotate(radians(speed/3));
                celestialObj(color(255,150,0), 200); // SUN
            pop();
            push();
                rotate(radians(speed));
                translate(200, 200);
                    push();
                        celestialObj(color(0,0,255), 80); // Earth
                        rotate(radians(speed));
                    pop();
                    push();
                        rotate(radians(-speed*2));
                        translate(70, 70);
                            push();
                                celestialObj(color(255), 30); // Moon
                                rotate(radians(-speed*2));
                            pop();
                            push();
                                translate(-33,-33);
                                rotate(radians(speed*6));
                                celestialObj(color(255,0,0), 20); // Moon2
                            pop();
                            push(); 
                                rotate(radians(speed*5));
                                translate(20,20);
                                    push();
                                        celestialObj(color(122,221,123),20);
                                        // rotate(radians(speed*5));
                                    pop();
                            pop();
                    pop();
            pop();


    
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

// function celestialObj2(c, size){
//     strokeWeight(5);
//     fill(c);
//     stroke(0);
//     ellipse(0, 0, size, size);
//     line(0, 0, size/2, 0);
// }

// function celestialObj3(c, size){
//     strokeWeight(5);
//     fill(c);
//     stroke(0);
//     ellipse(0, 0, size, size);
//     line(0, 0, size/2, 0);
// }