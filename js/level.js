
function level(level_number){
  /*
    Initialize the level.
    This involves deciding positions of things
    This involves drawing the background.
  */

  console.log("level getting initilized");

  var temp = level_init(level_number);
  this.cars = temp.cars;
  this.guests = temp.guests;
  this.sb = new scoreboard(level_number, 0);

  var done = false;
  var doorTop =  new sprite({
      scale: 5,
      width: 32,
      height: 32,
      imagesrc: "img/door-top.png",
      numberOfFrames: 1,
      ticksPerFrame: 8,
      loop: false
  });

  var wall = new Image();
  var wind = new Image();
  var door = new Image();
  wall.src = "img/house-wall.png";
  wind.src = "img/house-window.png";
  door.src = "img/house-door.png";

  this.drawHouse = (ctx) => {
      var array = [wall, wind, wall, door, wind, wall, wall];
      var x = 312 - 3 * 32 * 5;
      var y = 618;
      for(var i = 0; i < 7; i++, x += 5 * 32 ){
          ctx.drawImage(array[i], x, y, 32 * 5, 32 * 5);
      }
  }
  doorTop.x = 312;
  doorTop.y = 618;
  this.tiles = [doorTop];
  this.splatter_items = [];
  this.bg = new Image();
  this.bg.src = 'img/bg.png';

  this.update = (delta) => {
    /*
      Run whatever update code is needed for the level
    */
    var any_colission = false;

    // Collision detection for all guests
    for (var i = 0, len = this.guests.length; i < len; i++){
      var collision_dir = this.guests[i].check_collision(this.cars);
      if (collision_dir != "lived" ){
        any_colission = true;
        this.guests[i].die(collision_dir, this.death_callback);
        ++window.splats;
      }

    }

    // If the guests lived, update their walk positions
    var all_guests_lived = true;
    for (var i = 0, len = this.guests.length; i < len; i++) {
      this.guests[i].update(delta, this.cross_callback);
      if(this.guests[i].y > -128){ // MAGIC - height of a guest sprite
          all_guests_lived = false;
      }
    }

    // WIN - proceed to next level
    if(all_guests_lived & ! done){
        var tile = new sprite({
            scale: 4,
            width: 192 * 15,
            height: 32,
            imagesrc: "img/you-win.png",
            numberOfFrames: 15,
            ticksPerFrame: 8,
            loop: true
        });
        tile.x = 0;
        tile.y = 0;
        this.tiles.push(tile);
        done = true;
        setTimeout(() => {
            console.log("WIN");
            window.game.stop(() => {
              clear_splat();
              init(level_number + 1);
            });
          },
          2000
        );
    }

    for (var i = 0, len = this.cars.length; i < len; i++) {
      this.cars[i].update(delta);
    }

    // LOSS - restart the level
    if(any_colission && ! done){

        var tile = new sprite({
            scale: 4,
            width: 192 * 20,
            height: 32,
            imagesrc: "img/you-lose.png",
            numberOfFrames: 20,
            ticksPerFrame: 4,
            loop: true
        });
        tile.x = 0;
        tile.y = 0;
        this.tiles.push(tile);
        done = true;
        setTimeout(() => {
            console.log("LOSS");
            window.game.stop(() => {
              init(level_number);
            });
          },
          2000
        );
    }

    // Gameplay goes on? update scoreboard
    this.sb.update();
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

  this.cross_callback = () => {
    this.sb.score++;
  }

  this.draw = (ctx) => {
    /*
      Let the level draw itself.
    */
    ctx.drawImage(this.bg, 0, 0);

    // Draw splatter
    drawsplat(ctx, this.splatter_items);

    this.drawHouse(ctx);

    var actors = (this.guests.concat(this.cars)).sort((a, b) => {return a.y - b.y});

    for (var i = 0, len = actors.length; i < len; i++) {
        actors[i].draw(ctx);
    }
    for (var i = 0, len = this.tiles.length; i < len; i++) {
        var tile = this.tiles[i];
        tile.render(ctx, tile.x, tile.y);
        tile.update();
    }

    // update the scoreboard
    this.sb.draw(ctx);
  }
}
