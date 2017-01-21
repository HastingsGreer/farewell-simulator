function init(){
  /*
    Called by index.html on page load.
    This is the entry point for this code.
  */
  var canvas = document.getElementById("game");
  window.game = new Game(canvas);
}


var Game = function(canvas){

  /*
    here's the game initialization code
  */
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.waver = new waver(function(){}, function(){}, this.ctx);
  this.lastFrameTimeMs = 0;
  this.interval = 33; //ms

  this.mainLoop = (timestamp) => {
    var delta = timestamp - this.lastFrameTimeMs; // get the delta time since last frame
    this.lastFrameTimeMs = timestamp;
    this.update(delta);
    this.draw();
    window.requestAnimationFrame(this.mainLoop);
  }

  this.update = (delta) => {
    /*
      Handle the game update logic here.
      Don't update the canvas, just the internal state.
    */
    this.waver.update();
    console.log(delta);

  }

  this.draw = () => {
    /*
      After the updates have been written to the game state,
      read the state and decide what changes to make to the canvas.
    */
    this.waver.draw();
  }

  // When init is done, begin the game.
  window.requestAnimationFrame(this.mainLoop);
}
