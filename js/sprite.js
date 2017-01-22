function sprite (options) {

    var ticksPerFrame = options.ticksPerFrame || 0;
    var numberOfFrames = options.numberOfFrames || 1;

    var frameIndex = 0;
    var tickCount = 0;

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
                frameIndex * this.width / numberOfFrames,
                0,
                this.width / numberOfFrames,
                this.height,
                x,
                y,
                this.scale * this.width / numberOfFrames,
                this.scale * this.height);
        } else {
            this.context.scale(-1, 1);
            this.context.drawImage(
                this.image,
                frameIndex * this.width / numberOfFrames,
                0,
                this.width / numberOfFrames,
                this.height,
                -x - this.width / numberOfFrames * this.scale,
                y,
                this.scale * this.width / numberOfFrames,
                this.scale * this.height);
            this.context.scale(-1, 1);
        }
    }

    this.loop = options.loop;

    this.update = () => {
        tickCount++;

        if(tickCount > ticksPerFrame) {
            tickCount = 0;
            if(frameIndex < numberOfFrames - 1) {
                frameIndex++;
            } else if(this.loop) {
                frameIndex = 0;
            }
        }
    };
}
