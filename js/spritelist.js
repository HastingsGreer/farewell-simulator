function spriteList(urls){
    var sprites = [];
    for (var i = 0, len = urls.length; i < len; i++) {
        spriteImage = new Image();
        spriteImage.src = urls[i];
        var newSprite = sprite({
            scale: 4,
            width: 256,
            height: 32,
            image: spriteImage,
            numberOfFrames: 8,
            ticksPerFrame: 8,
            loop: true
        });
        sprites[i] = newSprite;
    }
    return sprites;
}
