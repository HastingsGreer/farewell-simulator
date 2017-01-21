var crossing_x = 300;

var car_height = 80;
var guestFronts = spriteList(["img/pirate-front.png", "img/general-front.png"])
var guestBacks = spriteList(["img/pirate-back.png", "img/general-back.png"])
var speed = 200;
function guest(x, y, type){
     this.x = x;
     this.y = y;
     this.crossing = false;
     this.going = 1;
     this.stop = () => {
         this.going = 0;
     }
     this.start = () => {
         this.going = 1;
     }
     this.update = (delta) => {
        if(this.crossing){
            this.y -= speed * delta / 1000 * this.going;
        } else {
            if(this.x > crossing_x){
                this.crossing = true;
            } else {
                this.x += speed / 5000 * delta * this.going;
            }
        }
     }
     this.draw = (ctx) => {
         if(this.crossing && this.going){
             ctx.drawImage(guestBacks[type], this.x, this.y, 128, 128);
         } else {
             ctx.drawImage(guestFronts[type], this.x, this.y, 128, 128);
         }
     }
}
