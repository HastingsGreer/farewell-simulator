// Random config
var initial_difficulty = 1;

// Car config
var lanes = [50, 150, 250, 350, 450];
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
  "x": 600,
  "y": 700
}

// Sprites - car
var car_sprites = ["img/tank-roll.png", "img/car1-roll.png", "img/canoe-bear.png"];
// sprites - guests
var guestFronts = ["img/pirate-front-walk.png", "img/general-front-walk.png", "img/lady-front-walk.png"];
var guestBacks = ["img/pirate-back-walk.png", "img/general-back-walk.png","img/lady-back-walk.png"];
var guestWaves = ["img/pirate-dance-wave.png", "img/general-jump-wave.png", "img/lady-front-walk.png"];

// helper functions
function rand_sign() {
  return Math.random() > .5 ? -1 : 1;
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
