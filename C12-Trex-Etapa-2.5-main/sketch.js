var trex, trex_running, trex_collided;
var invisibleGround;
var ground,groundImage;
var cloud, cloudImage, cloudsGroup;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.velocityX = -6;
  ground.x = ground.width/2

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  obstacleGroup = createGroup();
  cloudsGroup = createGroup();
}

function draw() {
  //definir cor do plano de fundo
  background(180);
  
  if(gameState === PLAY){
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    if(keyDown("space") && trex.y >=100) {
      trex.velocityY = -10
    }
    trex.velocityY = trex.velocityY + 1.2;
    spawnClouds();
    spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
      gameState = END
    }
  }
  drawSprites();
  trex.collide(invisibleGround)
}
 function spawnClouds(){
  if(frameCount % 60 === 0){
  cloud = createSprite(600, 100, 40, 10);
  cloud.addImage(cloudImage)
  cloud.y = Math.round(random(10, 80));
  cloud.scale = 0.5
  cloud.velocityX  = -3;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = 200;
  }
 }
function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    var rand = Math.round(random(1,6))

    switch(rand){
      case 1: obstacle.addImage(obstacle1)
        break;
      case 2: obstacle.addImage(obstacle2)
        break;
      case 3: obstacle.addImage(obstacle3)
        break;
      case 4: obstacle.addImage(obstacle4)
        break;
      case 5: obstacle.addImage(obstacle5)
        break;
       case 6: obstacle.addImage(obstacle6)
        break;
      default:
        break;
    }
    obstacleGroup.add(obstacle)
  }
}




