
function level(level_number){

  /* 
    Initialize the level.
    This involves deciding positions of things
    This involves drawing the background.
  */
  console.log("level getting initilized"); 
  
  this.cars = [];
  this.guests = [];

  this.bg = new Image();
  this.bg.src = '/img/bg.png';

  this.update = (delta) => {
    /* 
      Run whatever update code is needed for the level
    */
  }

  this.draw = (ctx) => {
    /*
      Let the level draw itself.
    */
    ctx.drawImage(this.bg, 0, 0);
  }
}