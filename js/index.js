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
  
  this.update = function(){
    /*
      Called 30 times per second.  
      Handle the game update logic here.
      Don't update the canvas, just the internal state.
    */
  }

  this.draw = function (){
    /*
      After the updates have been written to the game state, 
      read the state and decide what changes to make to the canvas.
    */
  }
}
