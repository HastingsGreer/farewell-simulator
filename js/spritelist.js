function spriteList(urls){
    var sprites = [];
    for (var i = 0, len = urls.length; i < len; i++) {
        sprite = new Image();
        sprite.src = urls[i];
        sprites[i] = sprite;
    }
    return sprites;
}
