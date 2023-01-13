class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    // Main Body
    fill(77,125,213);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
      this.location.x + this.size/2, this.location.y + this.size/2,
      this.location.x, this.location.y - this.size/2);
    // Fire at exhaust
    push();
      fill(247, 55, 24); 
      ellipse(this.location.x - this.size/2 + 5, this.location.y + this.size/2 + 5,5,10);
      ellipse(this.location.x - this.size/2 + 5, this.location.y + this.size/2 + 25,5,10);
      ellipse(this.location.x + this.size/2 - 5, this.location.y + this.size/2 + 5,5,10);
      ellipse(this.location.x + this.size/2 - 5, this.location.y + this.size/2 + 25,5,10);
    pop();
    // Exhaust
    rect(this.location.x - this.size/2, this.location.y + this.size/2,10,5);
    rect(this.location.x + this.size/2, this.location.y + this.size/2,-10,5);
    // Tip
    push();
      fill(183,183,183);
      ellipse(this.location.x, this.location.y - this.size/2,10,10);
    pop();
    rect(this.location.x - 5, this.location.y - this.size/2,10,15);

  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        fill(255,160,122);
        ellipse(this.location.x + 20, this.location.y, 30, 8);
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1, 0));
        fill(255,160,122);
        ellipse(this.location.x - 20, this.location.y, -30, 8);
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.1));
        fill(255,160,122);
        ellipse(this.location.x, this.location.y + 10, 8, 30);
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.1));
      fill(255,160,122);
        ellipse(this.location.x, this.location.y - 10, 8, -30);
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    this.applyForce(createVector(0, 0.05));
    this.friction = this.velocity.copy();
    this.friction.mult(-1);
    this.friction.normalize();
    this.friction.mult(1/30);
    this.applyForce(this.friction);
  }
}
