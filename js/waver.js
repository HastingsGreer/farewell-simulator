
function waver (onStartWave, onEndWave, ctx){
  console.log("waver getting initialized");
  this.mouseX = 0;
  this.mouseY = 0;
  this.newX = 0;
  this.newY = 0;
  this.waving = false;
  this.timer = 0;
  this.update = () => {
      //get mousex, y
      if(this.mouseX != this.newX || this.mouseY != this.newY ){
          this.mouseX = this.newX;
          this.mouseY = this.newY;
         if(!this.waving){
             if(this.timer > 6){
                 this.waving = true;
                 onStartWave();
                 this.timer = 0;
             } else {
                 this.timer += 1;
             }

         } else {
             this.timer = 0;
         }
     } else {
         if(this.waving){
             if(this.timer > 6){
                 this.waving = false;
                 onEndWave();
                 this.timer = 0;
             } else {
                 this.timer += 1;
             }
         } else {
             this.timer = 0;
         }
     }

  }
  var hand = new Image();
  hand.src = 'img/general%20hand.png';

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
     ctx.scale(12, 12);
     ctx.translate(-16, -16);
     ctx.drawImage(hand, 0, 0);
     ctx.restore();
  }
  console.log("finished")
}
