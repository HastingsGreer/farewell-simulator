// Random config
var initial_difficulty = 1;

// Car config
var lanes = [50, 150, 250, 350, 450];
var cars_per_lane_scalar = 2;
var default_car_speed = 400;
var lane_width = 1800;

// Guest Config
var crossing_x = 300;
var initial_guest_gap = 150; //px
var random_guests_count = 30;
var difficulty_increase_scalar = 30; //px

// Sprites - car
var car_sprites = ["img/tank-roll.png", "img/car1-roll.png"];
// sprites - guests
var guestFronts = ["img/pirate-front-walk.png", "img/general-front-walk.png"];
var guestBacks = ["img/pirate-back-walk.png", "img/general-back-walk.png"];
var guestWaves = ["img/pirate-dance-wave.png", "img/general-jump-wave.png"];

// helper functions
function rand_sign() {
  return Math.random() > .5 ? -1 : 1;
}