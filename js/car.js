console.log("I exist");
var cars = spriteList(["img/car1.png", "img/tank.png"]);
var width = 1800;
var lanes = [50, 150, 250, 350, 450];

function car(lane, start_position, speed, type){
  this.x = start_position;
  this.y = lanes[lane];
  this.speed = speed;

  this.sprite_width = 128;
  this.sprite_height = 128;

  this.hitbox_width = 96;
  this.hitbox_height = 96;

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
      ctx.drawImage(cars[type], this.x, this.y, this.sprite_width, this.sprite_height);
  }
  this.check_collision = (x, y, width, height) => {
    var hitbox_left_x = this.x + Math.floor( (this.sprite_width - this.hitbox_width) / 2);
    var hitbox_top_y = this.y + Math.floor((this.sprite_height - this.hitbox_height) / 2);
    return "none";
  } 
};
