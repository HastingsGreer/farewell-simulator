function HandWave(canvas) {
  var self = this;
  self.canvas = canvas;
  self.context = self.canvas.getContext("2d");
  self.detector = null;
  self.hand_pos = null;
  self.old_hand_pos = null;

  // code courtesy of js-objectdetect examples
  self.recordCamera = () => {
    var self = this;
    compatibility.requestAnimationFrame(self.recordCamera);
    if (self.video.paused) self.video.play();

    self.canvas.width = ~~(100 * self.video.videoWidth / self.video.videoHeight);
    self.canvas.height = 100;
    self.context.drawImage(self.video, 0, 0, self.canvas.clientWidth, self.canvas.clientHeight);

    if (self.video.readyState === self.video.HAVE_ENOUGH_DATA && self.video.videoWidth > 0) {
      self.detect();
    }
  };

  // code courtesy of js-objectdetect examples
  self.detect = () => {
    if (self.detector == null) {
      var width = ~~(60 * self.video.videoWidth / self.video.videoHeight);
      var height = 60;
      self.detector = new objectdetect.detector(width, height, 1.2, objectdetect.handopen);
    }
    var coords = self.detector.detect(self.video, 1);
    if (coords[0]) {
      var coord = coords[0];
      // rescale coords from detector to video coord space
      coord[0] *= self.video.videoWidth / self.detector.canvas.width;
      coord[1] *= self.video.videoHeight / self.detector.canvas.height;
      coord[2] *= self.video.videoWidth / self.detector.canvas.width;
      coord[3] *= self.video.videoHeight / self.detector.canvas.height;

      // XXX is this avg?
      self.hand_pos = [coord[0] + coord[2]/2, coord[1] + coord[3]/2];
      if (self.old_hand_pos != null) {
        var dx = (self.hand_pos[0] - self.old_hand_pos[0]) / self.video.videoWidth,
          dy = (self.hand_pos[1] - self.old_hand_pos[1]) / self.video.videoHeight;
        if (dx*dx + dy*dy < 0.2) {
          window.game.waver.goWave = true;
        }
        self.old_hand_pos = self.hand_pos;
      }
      else if (coord[4] > 2) {
        self.old_hand_pos = self.hand_pos;
      }

      // draw box
      self.context.beginPath();
      self.context.lineWidth = '2';
      self.context.fillStyle = self.old_hand_pos ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)';
      self.context.fillRect(
        coord[0] / self.video.videoWidth * self.canvas.clientWidth,
        coord[1] / self.video.videoHeight * self.canvas.clientHeight,
        coord[2] / self.video.videoWidth * self.canvas.clientWidth,
        coord[3] / self.video.videoHeight * self.canvas.clientHeight
      );
      self.context.stroke();
    }
    else {
      self.old_hand_pos = null;
    }
  };

  // init video
  self.video = document.createElement('video');
  try {
    compatibility.getUserMedia({video: true}, (stream) => {
      try {
        self.video.src = compatibility.URL.createObjectURL(stream);
      }
      catch (err) {
        self.video.src = stream;
      }
      compatibility.requestAnimationFrame(self.recordCamera);
    }, (err) => {
      console.error("No WebRTC!", err);
    });
  }
  catch (err) {
    console.error("Failed to use compatibility layer.", err);
  }
}

