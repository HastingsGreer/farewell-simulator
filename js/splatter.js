var shadow = document.createElement('canvas'),
    sctx = shadow.getContext('2d');

var options = {
    scatter: .08,
    gravity: 0,
    consistency: 0.04,
    pollock: false,
    burst: true,
    shade: true

}

function splat(x, y, arr) {

    for (var i = 0; i < 30; i++) {
        var s = Math.random() * Math.PI;
        var dirx = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * options.scatter;
        var diry = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * options.scatter;

        arr.push({
            x: x,
            y: y,
            dx: dirx + mouse.dx,
            dy: diry + mouse.dy,
            size: s
        })
    }
}

function drawsplat(ctx, arr) {

    var i = arr.length
    while (i--) {
        var t = arr[i];
        var x = t.x,
            y = t.y,
            s = t.size;
        splat_circle(x, y, s, ctx)

        t.dy -= options.gravity
        t.x -= t.dx
        t.y -= t.dy
        t.size -= 0.05;

        if (arr[i].size < 0.3 || Math.random() < options.consistency) {
            splat_circle(x, y, s, sctx)
            arr.splice(i, 1)

        }

    }

    ctx.drawImage(shadow, 0, 0)    
    //sctx.drawImage(shadow, 0, 0.5)

}

function splat_circle(x, y, s, c) {

    c.beginPath()
    c.arc(x, y, s * 5, 0, 2 * Math.PI, false);
    c.fill()
    c.closePath()
}