function car(lane, start_position, speed, type){
  console.log("car getting initialized");
  this.x = start_position;
  this.y = lanes[lane];
  this.speed = speed;

  this.sprite = new sprite({
      meta: car_sprite_meta[type],
      scale: 4,
      width: 256,
      height: 32,
      imagesrc: car_sprites[type],
      numberOfFrames: 8,
      ticksPerFrame: 8,
      loop: true,
      flipped: this.speed < 0
  });

  this.update = (delta) => {
    this.x = this.x + speed * delta / 1000;
    if(this.x > lane_width / 2){
        this.x -= lane_width;
    }
    if(this.x < -lane_width/2){
        this.x += lane_width;
    }
  }
  this.draw = (ctx) => {
      this.sprite.update(ctx);
      this.sprite.render(ctx, this.x, this.y);
      //   ctx.drawImage(cars[type], this.x, this.y, this.sprite_width, this.sprite_height);
      debug_rect(ctx,
          this.sprite.get_hitbox(this.x, this.y));
  }
  this.check_collision = (guest_hitbox) => {
    var my_hitbox = this.sprite.get_hitbox(this.x, this.y);

    if (my_hitbox.top_y + my_hitbox.hbheight > guest_hitbox.top_y && 
        my_hitbox.top_y < guest_hitbox.top_y + guest_hitbox.hbheight){
      
      if (my_hitbox.left_x + my_hitbox.hbwidth > guest_hitbox.left_x && 
          my_hitbox.left_x < guest_hitbox.left_x + guest_hitbox.hbwidth){
        
        // HIT - return angle between hitboxes
        var trans_x = (guest_hitbox.left_x + (guest_hitbox.hbwidth/2)) - (my_hitbox.left_x + (my_hitbox.hbwidth/2));
        var trans_y = (guest_hitbox.top_y + (guest_hitbox.hbheight/2)) - (my_hitbox.top_y + (my_hitbox.hbheight/2));
        return Math.atan2(trans_y, trans_x);
      }
    }
    return "lived";
  }
};
