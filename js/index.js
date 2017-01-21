function init(){
  /*
    Called by index.html on page load.
    This is the entry point for this code.
  */
  var canvas = document.getElementById("game");
  window.game = new Game(canvas);
  window.game_debug = true;
}


var Game = function(canvas){

  /*
    here's the game initialization code
  */
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.ctx.mozImageSmoothingEnabled = false;
  this.ctx.webkitImageSmoothingEnabled = false;
  this.ctx.msImageSmoothingEnabled = false;
  this.ctx.imageSmoothingEnabled = false;

  this.lastFrameTimeMs = 0;

  this.level_number = 0;
  this.level = new level(this.level_number);
  this.waver = new waver(this.level.onStartWave, this.level.onEndWave, this.ctx);

  this.paused = false;

  this.stopped = false;
  this.stopfunc = 0;
  this.stop = (stopfunc) => {
      this.stopped = true;
      this.stopfunc = stopfunc;
  }

  this.mainLoop = (timestamp) => {
    if(!this.stopped) {
        var delta = timestamp - this.lastFrameTimeMs; // get the delta time since last frame
        this.lastFrameTimeMs = timestamp;
        if(delta > 100){
            delta = 100;
        }
        this.update(delta);
        this.draw();
        window.requestAnimationFrame(this.mainLoop);
    } else {
        if(this.stopfunc){
            this.stopfunc();
        }
    }
  }

  this.update = (delta) => {
    /*
      Handle the game update logic here.
      Don't update the canvas, just the internal state.
    */
    if (!this.paused){
      this.waver.update();
      this.level.update(delta);
    }
    if (delta > 22) {console.log(delta);}

  }

  this.draw = () => {
    /*
      After the updates have been written to the game state,
      read the state and decide what changes to make to the canvas.
    */
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.level.draw(this.ctx);
    this.waver.draw();
  }

  // When init is done, begin the game.
  window.requestAnimationFrame(this.mainLoop);
}

function debug_rect(ctx, x, y, width, height){
  if (window.game_debug){
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.rect(
        x,
        y,
        width,
        height);
      ctx.stroke();
  }
}
