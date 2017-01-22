function sprite (options) {

    var ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;

    var frameIndex = 0;
    var tickCount = 0;

    this.meta = options.meta;
    this.context = null;
    this.scale = options.scale;
    this.width = options.width;
    this.height = options.height;
    this.image = new Image();
    this.image.src = options.imagesrc;
    this.flipped = options.flipped;

    this.render = (ctx, x, y) => {
        this.context = ctx;
        //context.clearRext(0, 0, that.width, that.height);
        if(!this.flipped){
            this.context.drawImage(
                this.image,
                frameIndex * this.width / this.numberOfFrames,
                0,
                this.width / this.numberOfFrames,
                this.height,
                x,
                y,
                this.scale * this.width / this.numberOfFrames,
                this.scale * this.height);
        } else {
            this.context.scale(-1, 1);
            this.context.drawImage(
                this.image,
                frameIndex * this.width / this.numberOfFrames,
                0,
                this.width / this.numberOfFrames,
                this.height,
                -x - this.width / this.numberOfFrames * this.scale,
                y,
                this.scale * this.width / this.numberOfFrames,
                this.scale * this.height);
            this.context.scale(-1, 1);
        }
    }

    this.loop = options.loop;

    this.update = () => {
        tickCount++;

        if(tickCount > ticksPerFrame) {
            tickCount = 0;
            if(frameIndex < this.numberOfFrames - 1) {
                frameIndex++;
            } else if(this.loop) {
                frameIndex = 0;
            }
        }
    };

    this.get_hitbox = (x, y) => {
        var hitbox_left_x = x + this.meta.x_offset;
        var hitbox_top_y = y + this.meta.y_offset;
        return {
            "left_x": hitbox_left_x,
            "top_y": hitbox_top_y,
            "hbwidth": this.meta.hbwidth,
            "hbheight": this.meta.hbheight
        };
    }
}
