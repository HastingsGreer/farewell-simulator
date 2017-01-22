function death_spin (options) {
  this.sprite = options.sprite;
  this.dir = options.dir;
  this.x0 = this.x = options.startx;
  this.y0 = this.y = options.starty;
  this.vel = 100;
  this.t = 0;
  this.done = false;

  this._rot = 0;
  this._rotDelta = Math.PI / 24;

  var w = (this.sprite.width / this.sprite.numberOfFrames) * this.sprite.scale;
  var h = this.sprite.height * this.sprite.scale;

  this.render = (ctx) => {
    ctx.save();

    ctx.translate(this.x+w/2, this.y+h/2);

    // rotation
    ctx.rotate(this._rot);
    this._rot += this._rotDelta;
    if (this._rot >= 2*Math.PI) this._rot = 0;

    // projectile
    this.x = this.x0 + this.vel*Math.cos(this.dir)*this.t;
    this.y = this.y0 + this.vel*Math.sin(this.dir)*this.t + 0.5*9.8*this.t*this.t;
    this.t += 0.1;

    ctx.drawImage(
      this.sprite.image,
      0,
      0,
      this.sprite.width / this.sprite.numberOfFrames,
      this.sprite.height,
      -w/2,-h/2,
      this.sprite.scale * this.sprite.width / this.sprite.numberOfFrames,
      this.sprite.scale * this.sprite.height
    );


    ctx.restore();
  };
}
