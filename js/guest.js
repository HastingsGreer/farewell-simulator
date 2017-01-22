var initial_y = 630;
var car_height = 80;
var speed = 200;

function guest(x, type){
    console.log("guest getting initialized")
    this.x = x;
    this.y = initial_y;
    this.crossing = false;
    this.done = false;
    this.going = 1;


    this.front_sprite = new sprite({
        meta: guest_sprite_meta[type],
        scale: 4,
        width: 256,
        height: 32,
        imagesrc: guestFronts[type],
        numberOfFrames: 8,
        ticksPerFrame: 8,
        loop: true
    });

    this.back_sprite = new sprite({
        meta: guest_sprite_meta[type],
        scale: 4,
        width: 256,
        height: 32,
        imagesrc: guestBacks[type],
        numberOfFrames: 8,
        ticksPerFrame: 8,
        loop: true
    });

    this.wave_dance_sprite = new sprite({
        meta: guest_sprite_meta[type],
        scale: 4,
        width: 256,
        height: 32,
        imagesrc: guestWaves[type],
        numberOfFrames: 8,
        ticksPerFrame: 8,
        loop: true
    });

    this.sprite_width = 128;
    this.sprite_height = 128;

    this.hitbox_width = 48;
    this.hitbox_height = 32;

    this.hittbox_x_offset = 40;
    this.hitbox_y_offset = 96;

    this.stop = () => {
       this.going = 0;
    }
    this.start = () => {
       this.going = 1;
    }

    this.die = (direction, death_callback) => {
      // direction in radians.
      // violently kills guest in the specified direction.
      this.done = true;
      this.going = 0;

      this.death_animation = new death_spin({
        sprite: this.front_sprite,
        dir: direction,
        startx: this.x,
        starty: this.y
      });

      var source = Math.random() > .3 ? sounds[0] : sounds[1];
      source.play();

      // Trigger death animation
      death_callback(
        this.x + Math.floor(this.sprite_width/2),
        this.y + Math.floor(this.sprite_height/2),
        direction
      );
    }
    this.update = (delta, cross_callback) => {
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

        if (this.done)
          cross_callback();

        if (this.going){
          if (this.crossing)
            this.back_sprite.update();
          else
            this.front_sprite.update();
        } else {
          this.wave_dance_sprite.update();
        }
      }
    }

    this.draw = (ctx) => {
      if (!this.done){
        if (this.crossing && this.going)
          this.back_sprite.render(ctx, this.x, this.y);
        else if (!this.crossing && this.going)
          this.front_sprite.render(ctx, this.x, this.y);
        else
          this.wave_dance_sprite.render(ctx, this.x, this.y);
      }
      else if (this.death_animation && !this.death_animation.done) {
        this.death_animation.render(ctx);
      }
      debug_rect(ctx,
          this.back_sprite.get_hitbox(this.x, this.y));
    }

    this.check_collision = (cars) => {
      // only check collisions if this.crossing and not this.done
      // RETURN the direction of the collision in radians
      if (this.crossing && !this.done){
        for (var i=0, len = cars.length; i <  len; i++){
          var collision_dir = cars[i].check_collision(this.back_sprite.get_hitbox(this.x, this.y));
          if (collision_dir != "lived")
            return collision_dir;
        }

      }
      return "lived";
    }
}
