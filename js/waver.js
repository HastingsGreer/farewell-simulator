
function waver(onStartWave, onEndWave, ctx){
      var mouseX = 0;
      var mouseY = 0;
      var waving = false;

      this.update = function(){
          //get mousex, y
          if(mouseX != newX || mouseY != newY ){
             if(!waving){
                 waving = true;
                 onStartWave();
             }
         } else {
             if(waving){
                 waving = false;
                 onEndWave();
             }
         }

      }
      var hand = new Image();
      hand.src = '/img/hand.png';

      var shoulderX = 500;
      var shoulderY = 500;

      //stolen from http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      var canvas = document.getElementById('game');

      var rect = canvas.getBoundingClientRect();
      var x = rect.left;
      var y = rect.top;

      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
      }, false);


      this.draw = function(){
         ctx.save();
         ctx.translate(shoulderX,shoulderY);
         ctx.rotate(Math.atan2(mouseY - shoulderY, mouseX -shoulderX));
         ctx.translate(15, 8);
         ctx.drawImage(hand);
         ctx.restore();
      }

}
