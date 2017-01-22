
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
             if(this.timer > 3){
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

  var host = new Image();
  host.src = 'img/general-back-nohand.png';

  var shoulderX = 550;
  var shoulderY = 700;

  //stolen from http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
  this.getMousePos = (evt) => {

      this.newX = evt.clientX - this.canvX;
      this.newY = evt.clientY - this.canvY;

  }
  var canvas = document.getElementById('game');

  var rect = canvas.getBoundingClientRect();
  this.canvX = rect.left;
  this.canvY = rect.top;

  document.getElementById('bod').addEventListener('mousemove', this.getMousePos , false);


  this.draw = () => {
     ctx.save();
     ctx.translate(shoulderX,shoulderY);
     ctx.rotate(this.waving || this.timer > 3? Math.atan2(this.mouseX -shoulderX , -(this.mouseY - shoulderY)) + 1.5 : 3.14);
     ctx.scale(4, 4);
     ctx.translate(-16, -17);
     ctx.drawImage(hand, 0, 0);
     ctx.restore();
     ctx.drawImage(host, shoulderX - 84, shoulderY - 88, 128, 128)
  }
  console.log("finished")
}
