
function level(level_number){
  /*
    Initialize the level.
    This involves deciding positions of things
    This involves drawing the background.
  */
  console.log("level getting initilized");
  var done = false;
  var temp = level_init(level_number);
  this.cars = temp.cars;
  this.guests = temp.guests;

  this.splatter_items = [];

  this.bg = new Image();
  this.bg.src = 'img/bg.png';

  this.update = (delta) => {
    /*
      Run whatever update code is needed for the level
    */
    var any_colission = false;

    for (var i = 0, len = this.guests.length; i < len; i++){
      var collision_dir = this.guests[i].check_collision(this.cars);
      if (collision_dir != "lived" ){
        any_colission = true;
        this.guests[i].die(collision_dir, this.death_callback);
      }

    }
    var all_guests_lived = true;
    for (var i = 0, len = this.guests.length; i < len; i++) {
      this.guests[i].update(delta);
      if(this.guests[i].y > -128){
          all_guests_lived = false;
      }
    }

    if(all_guests_lived & ! done){
        //draw splash screen
        done = true;
        setTimeout(() => {console.log("win"); window.game.stop(() => {init(level_number + 1)})}, 5000);
    }

    for (var i = 0, len = this.cars.length; i < len; i++) {
      this.cars[i].update(delta);
    }

    if(any_colission && ! done){
        //draw splash screen
        done = true;
        setTimeout(() => {console.log("hi"); window.game.stop(() => {init(level_number)})}, 5000);
        console.log("asdf");
    }
  }

  this.onStartWave = () =>{
      for (var i = 0, len = this.guests.length; i < len; i++) {
          this.guests[i].stop();
      }
  }

  this.onEndWave = () => {
      for (var i = 0, len = this.guests.length; i < len; i++) {
          this.guests[i].start();
      }

  }

  this.death_callback = (x, y, direction) => {
    // called upon guest death,
    // with x, y, and direction of death
    splat(x, y, direction, this.splatter_items);
  }

  this.draw = (ctx) => {
    /*
      Let the level draw itself.
    */
    ctx.drawImage(this.bg, 0, 0);

    // Draw splatter
    drawsplat(ctx, this.splatter_items);

    var actors = (this.guests.concat(this.cars)).sort((a, b) => {return a.y - b.y});

    for (var i = 0, len = actors.length; i < len; i++) {
        actors[i].draw(ctx);
    }
  }
}
