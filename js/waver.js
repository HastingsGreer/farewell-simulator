
function waver (onStartWave, onEndWave, ctx){
  console.log("waver getting initialized");
  this.mouseX = 0;
  this.mouseY = 0;
  this.newX = 0;
  this.newY = 0;
  this.waving = false;

  this.update = () => {
      //get mousex, y
      if(this.mouseX != this.newX || this.mouseY != this.newY ){
          console.log(this.mouseX);
          this.mouseX = this.newX;
          this.mouseY = this.newY;
         if(!this.waving){
             this.waving = true;
             onStartWave();
         }
     } else {
         if(this.waving){
             this.waving = false;
             onEndWave();
         }
     }

  }
  var hand = new Image();
  hand.src = '../img/hand.png';

  var shoulderX = 500;
  var shoulderY = 500;

  //stolen from http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
  this.getMousePos = (evt) => {

      this.newX = evt.clientX - this.canvX;
      this.newY = evt.clientY - this.canvY;

  }
  var canvas = document.getElementById('game');

  var rect = canvas.getBoundingClientRect();
  this.canvX = rect.left;
  this.canvY = rect.top;

  canvas.addEventListener('mousemove', this.getMousePos , false);


  this.draw = () => {
     ctx.save();
     ctx.translate(shoulderX,shoulderY);
     ctx.rotate(Math.atan2(this.mouseX -shoulderX, -(this.mouseY - shoulderY)));
     ctx.translate(-15, -30);
     ctx.drawImage(hand, 0, 0);
     ctx.restore();
  }
  console.log("finished")
}
