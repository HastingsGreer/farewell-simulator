function sprite (options) {
    var that = {},
        frameIndex = 0
        tickCount = 0
        ticksPerFrame = options.ticksPerFrame || 0;
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function() {
        // that.context = ctx;
        //context.clearRext(0, 0, that.width, that.height);
        that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            0,
            0,
            that.width / numberOfFrames,
            that.height);
    }

    that.loop = options.loop;

    that.update = function () {
        //that.context = ctx;
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
