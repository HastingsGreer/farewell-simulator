function scoreboard(level, score){
    this.level = level;
    this.score = score;
    this.x = sb_position.x;
    this.y = sb_position.y;
    this.font_size = "20";

    this.update = () => {
      // nothing really do to here.
    }

    this.draw = (ctx) => {
      ctx.font= "30px Roboto";
      ctx.fillStyle = "white";
      if (this.level == -1){
        ctx.fillText("Score: " + this.score, this.x, this.y);
        ctx.fillText("Level: -1", this.x, this.y +30);
      } else {
        ctx.fillText("Level:  " + this.level, this.x, this.y+30);
      }
    }

    this.getScore = () => {
      return this.score
    }
}