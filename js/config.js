// Random config
var initial_difficulty = 1;

// Car config
var lanes = [58, 154, 250, 346, 442]; // 96 wide
var cars_per_lane_scalar = 2;
var default_car_speed = 400;
var lane_width = 1800;

// Guest Config
var crossing_x = 325;
var initial_guest_gap = 150; //px
var random_guests_count = 30;
var difficulty_increase_scalar = 30; //px

//Scoreboard config
var sb_position = {
  "x": 640,
  "y": 680
}

// camera mode
var camera_mode = false;

// Sprites - car
var car_sprites = ["img/tank-roll.png", "img/car1-roll.png",
                    "img/canoe-bear.png", "img/car2-roll.png",
                    "img/superhero.png"];

var car_sprite_meta = [
  {
    "width": 128,
    "height": 128,
    "hbwidth": 96,
    "hbheight":56,
    "x_offset": 16,
    "y_offset": 64
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 96,
    "hbheight":56,
    "x_offset": 16,
    "y_offset": 64
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 96,
    "hbheight":56,
    "x_offset": 16,
    "y_offset": 64
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 96,
    "hbheight":56,
    "x_offset": 16,
    "y_offset": 64
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 96,
    "hbheight":45,
    "x_offset": 16,
    "y_offset": 44
  }
];

// sprites - guests
var guestFronts = ["img/pirate-front-walk.png", "img/general-front-walk.png",
                   "img/lady-front-walk.png", "img/alien-front-walk.png",
                   "img/bball-front-walk.png"];
var guestBacks = ["img/pirate-back-walk.png", "img/general-back-walk.png",
                  "img/lady-back-walk.png", "img/alien-back-walk.png",
                  "img/bball-back-walk.png"];
var guestWaves = ["img/pirate-dance-wave.png", "img/general-jump-wave.png",
                  "img/lady-wave.png", "img/alien-wave.png",
                  "img/bball-wave.png"];
var guest_sprite_meta = [
  {
    "width": 128,
    "height": 128,
    "hbwidth": 48,
    "hbheight":32,
    "x_offset": 40,
    "y_offset": 96
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 48,
    "hbheight":32,
    "x_offset": 40,
    "y_offset": 96
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 48,
    "hbheight":32,
    "x_offset": 40,
    "y_offset": 96
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 48,
    "hbheight":32,
    "x_offset": 40,
    "y_offset": 80
  },
  {
    "width": 128,
    "height": 128,
    "hbwidth": 48,
    "hbheight":32,
    "x_offset": 40,
    "y_offset": 96
  }
];

//Sounds
var sounds = ['sound/splat.mp3', 'sound/splat-leg.mp3', 'sound/bang.mp3', 'sound/bam.mp3'].map((s) => new Audio(s));

var audio_muted = false;

// helper functions
function rand_sign() {
  return Math.random() > .5 ? -1 : 1;
}

function debug_rect(ctx, hitbox){
  if (window.game_debug){
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.rect(
        hitbox.left_x,
        hitbox.top_y,
        hitbox.hbwidth,
        hitbox.hbheight);
      ctx.stroke();
  }
}

/*
  BUTTON FUNCTIONS
*/
function button_click(text){
  if (text=="levels"){
    window.game.stop(() => {
      clear_splat();
      init(0);
    });
  } else if (text=="random"){
    window.game.stop(() => {
      clear_splat();
      init(-1);
    });
  }
}
function toggle_hand() {
  if (!camera_mode) {
    camera_mode = true;
    window.hand = new HandWave(document.getElementById("camera"));
  }
}
function toggle_audio(override) {
  console.log(audio_muted);
  audio_muted = !audio_muted;
  if (override !== undefined) {
    audio_muted = override;
  }
  document.getElementById("game-audio").muted = audio_muted;
  for (var i = 0; i < sounds.length; i++)
    sounds[i].muted = audio_muted;

  var btn = document.getElementById("toggle-audio");
  while (btn.hasChildNodes()) btn.removeChild(btn.firstChild);
  if (audio_muted) {
    btn.appendChild(document.createTextNode("TURN ON AUDIO"));
  }
  else {
    btn.appendChild(document.createTextNode("TURN OFF AUDIO"));
  }
}
