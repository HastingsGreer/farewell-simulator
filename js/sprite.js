function sprite (options) {
    var that = {},
        frameIndex = 0
        tickCount = 0
        ticksPerFrame = options.ticksPerFrame || 0;
        numberOfFrames = options.numberOfFrames || 1;

    that.context = null;
    this.scale = options.scale;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function(ctx, x, y) {
        that.context = ctx;
        //context.clearRext(0, 0, that.width, that.height);
        that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            x,
            y,
            scale * that.width / numberOfFrames,
            scale * that.height);
    }

    that.loop = options.loop;

    that.update = function () {
        tickCount++;

        if(tickCount > ticksPerFrame) {
            tickCount = 0;
            frameIndex++;
            if(frameIndex < numberOfFrames - 1) {
                frameIndex++;
            } else if(that.loop) {
                frameIndex = 0;
            }
        }
    };

    return that;
}
