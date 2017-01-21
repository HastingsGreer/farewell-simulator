function init(){
  /*
    Called by index.html on page load.
    This is the entry point for this code.
  */
  var canvas = document.getElementById("game");
  window.game = Game(canvas);
}


function Game(canvas){

  /* 
    here's the game initialization code
  */
  this.canvas = canvas;
  this.waver = waver(canvas);
  this.lastFrameTimeMs = 0;
  this.interval = 33; //ms

  this.mainLoop = (timestamp) => {
    var delta = timestamp - this.lastFrameTimeMs; // get the delta time since last frame
    this.lastFrameTimeMs = timestamp;
    this.update(delta);
    window.requestAnimationFrame(this.mainLoop);
  }
  
  this.update = (delta) => {
    /* 
      Handle the game update logic here.
      Don't update the canvas, just the internal state.
    */
    console.log(delta);
  }

  this.draw = () => {
    /*
      After the updates have been written to the game state, 
      read the state and decide what changes to make to the canvas.
    */
  }

  // When init is done, begin the game.
  window.requestAnimationFrame(this.mainLoop);
}
