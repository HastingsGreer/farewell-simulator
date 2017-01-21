console.log("I exist");
var cars = spriteList(["img/pirate-front.png", "img/general-back.png"]);
var width = 1800;

function car(lane, position, speed, type){
  this.lane = lane;
  this.x = position.x;
  this.y = position.y;
  this.speed = speed;

  this.update = (delta) => {
    this.x = this.x + speed * delta / 1000;
    if(this.x > width / 2){
        this.x -= width;
    }
    if(this.x < -width/2){
        this.x += width;
    }
  }
  this.draw = (ctx) => {
      ctx.drawImage(cars[type], this.x, this.y, 128, 128);
  }
};
