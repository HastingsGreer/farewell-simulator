console.log("I exist");
var cars = spriteList(["img/tank-roll.png", "img/tank-roll.png"]);
var width = 1800;
var lanes = [50, 150, 250, 350, 450];

function car(lane, start_position, speed, type){
  this.x = start_position;
  this.y = lanes[lane];
  this.speed = speed;

  this.sprite_width = 128;
  this.sprite_height = 128;

  this.hitbox_width = 96;
  this.hitbox_height = 56;

  this.hittbox_x_offset = 16;
  this.hitbox_y_offset = 64;

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
      cars[type].update(ctx);
      cars[type].render(ctx, this.x, this.y);
    //   ctx.drawImage(cars[type], this.x, this.y, this.sprite_width, this.sprite_height);
      debug_rect(ctx,
          this.x + this.hittbox_x_offset,
          this.y + this.hitbox_y_offset,
          this.hitbox_width,
          this.hitbox_height);
  }
  this.check_collision = (gx, gy, gwidth, gheight) => {
    var hitbox_left_x = this.x + this.hittbox_x_offset;
    var hitbox_top_y = this.y + this.hitbox_y_offset;

    if (hitbox_top_y + this.hitbox_height > gy && hitbox_top_y < gy + gheight){
      if (hitbox_left_x + this.hitbox_width > gx && hitbox_left_x < gx + gheight){
        // HIT - return angle between hitboxes
        var trans_x = (gx + (gwidth/2)) - (hitbox_left_x + (this.hitbox_width/2));
        var trans_y = (gy + (gheight/2)) - (hitbox_top_y + (this.hitbox_height/2));
        return Math.atan2(trans_y, trans_x);
      }
    }
    return "lived";
  }
};
