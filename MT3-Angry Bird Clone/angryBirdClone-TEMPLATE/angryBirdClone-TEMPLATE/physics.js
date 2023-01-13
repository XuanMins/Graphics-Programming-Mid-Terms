////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(0,0,255);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  fill(0,255,127);
  noStroke();
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for(var i = 0; i < birds.length; i++) {
    fill(random(255),random(255),255)
    drawVertices(birds[i].vertices);
    if(isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  blocks = [];
  color = [];

  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 3; j++) {
      color.push(random(255));
      blocks.push(Bodies.rectangle((width / 2) + (j * 80), (600 - 20 - 40) - (i * 80), 80, 80));
    }
  }

  for(k = 0; k < blocks.length; k++) {
    World.add(engine.world, [blocks[k]]);
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for(var i = 0; i < blocks.length; i++) {
    fill(0, color[i], 0);
    noStroke();
    drawVertices(blocks[i].vertices);

    if(isOffScreen(blocks[i])) {
      removeFromWorld(blocks[i]);
      blocks.splice(i, 1);
      color.splice(i, 1);
      i--;
      score++;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
slingshotBird = Bodies.circle(250, 250, 20, {friction: 0, restitution: 0.95});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);
  
  slingshotConstraint = Constraint.create({
    stiffness: 0.01,
    damping: 0.0001,
    bodyB: slingshotBird,
    pointA: {x: 250, y: 200},
    pointB: {x: 0, y: 0}
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);

  mouse = Mouse.create(canvas.elt);
  mouseParams = {
    mouse: mouse
  }
  MouseConstraint.create(engine, mouseParams);
  World.add(engine.world, MouseConstraint);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255, 0, 0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
/////////////////////////////////////////////////////////////////
function timer() {
  time = millis();

  let timeLimit = 60;
  let countdown = timeLimit - Math.floor(time/1000);

  textSize(30);
  fill(0);
  text("Time left: " + countdown, 10, 30);

  if(countdown == 0) {
    gameOver();
  } else if(countdown > 0 && blocks.length == 0) {
    win();
  }
}
function scoreTracker(){
  fill(0);
  textSize(30);
  let s = "Points Scored: " + score;
  text(s, 10, 60);
}
function gameOver() {
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text("Game over... You lose!", width/2, height/2);
  noLoop();
}

function win() {
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text("Yay! You win!", width/2, height/2);
  noLoop();
}


