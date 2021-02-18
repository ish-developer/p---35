var balloon;
var B;
var database;
var backgroundImg; 
var height;


function preload(){
 // database = firebase.database();
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  B = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
  database = firebase.database();

}
function setup() {
  createCanvas(800,400);
  
  //database = firebase.database();
  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition);

 balloon =   createSprite(500, 300, 50, 50);
 balloon.addAnimation("moving",B);
 balloon.scale = 0.1;
}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10
  }
  else  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hot",B);
    balloon.scale=balloon.scale-0.01;
  }
  else  if(keyDown(DOWN_ARROW)){
    balloon.x = balloon.y+10
  }
  
 
  drawSprites();
}


function readPosition(data){
  height = data.val();
   
  balloon.x = position.x;
  balloon.y = position.y;

}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y': height.y + y
  })
}