var crossing_x = 300;

var car_height = 80;
var guestFronts = spriteList(["img/pirate-front.png", "img/general-front.png"]);
var guestBacks = spriteList(["img/pirate-back.png", "img/general-back.png"]);
var speed = 200;

function guest(x, y, type){
    this.x = x;
    this.y = y;
    this.crossing = false;
    this.done = false;
    this.going = 1;

    this.sprite_width = 128;
    this.sprite_height = 128;

    this.hitbox_width = 64;
    this.hitbox_height = 32;

    this.hittbox_x_offset = 32;
    this.hitbox_y_offset = 96;
    
    this.stop = () => {
       this.going = 0;
    }
    this.start = () => {
       this.going = 1;
    }
    this.update = (delta) => {
      if (!this.done){
        if(this.crossing){
            // let's name the magic numbers
            this.y -= speed * delta / 1000 * this.going;
        } else {
            if(this.x > crossing_x){
                this.crossing = true;
            } else {
                // let's name the magic numbers
                this.x += speed / 5000 * delta * this.going;
            }
        }
        this.done = this.y < (0 - this.sprite_height);
      }
    }
    this.draw = (ctx) => {
      if(this.crossing && this.going){
        ctx.drawImage(guestBacks[type], this.x, this.y, this.sprite_width, this.sprite_height);
      } else {
        ctx.drawImage(guestFronts[type], this.x, this.y, this.sprite_width, this.sprite_height);
      }
      debug_rect(ctx, 
          this.x + this.hittbox_x_offset,
          this.y + this.hitbox_y_offset,
          this.hitbox_width,
          this.hitbox_height);
    }

    this.check_collision = (cars) => {
      // only check collisions if this.crossing and not this.done
      // RETURN the type of colission that happened.
      if (this.crossing && !this.done){
        
        var hitbox_left_x = this.x + this.hittbox_x_offset;
        var hitbox_top_y = this.y  + this.hitbox_y_offset;

        for (var i=0, len = cars.length; i <  len; i++){
          var collision_type = cars[i].check_collision(hitbox_left_x, hitbox_top_y, this.hitbox_width, this.hitbox_height);
          if (collision_type != "none")
            return collision_type;
        }
      
      }
      return "none";
    }
}