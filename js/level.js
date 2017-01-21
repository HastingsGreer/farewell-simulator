
function level(level_number){

  /*
    Initialize the level.
    This involves deciding positions of things
    This involves drawing the background.
  */
  console.log("level getting initilized");

  this.cars = [new car(0, {x:100, y:100}, 400, 0),
               new car(0, {x:100, y:200}, -400, 1)];
  this.guests = [new guest(0, 600, 0), new guest(100, 600, 1)];

  this.bg = new Image();
  this.bg.src = 'img/bg.png';

  this.update = (delta) => {
    /*
      Run whatever update code is needed for the level
    */
    for (var i = 0, len = this.guests.length; i < len; i++) {
        this.guests[i].update(delta);
    }
    for (var i = 0, len = this.cars.length; i < len; i++) {
        this.cars[i].update(delta);
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
  this.draw = (ctx) => {
    /*
      Let the level draw itself.
    */
    ctx.drawImage(this.bg, 0, 0);

    var actors = (this.guests.concat(this.cars)).sort((a, b) => {return a.y - b.y});

    for (var i = 0, len = actors.length; i < len; i++) {
        actors[i].draw(ctx);
    }
  }
}
