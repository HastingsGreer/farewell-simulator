function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function level_init(levelID) {
    if( getQueryVariable("level")){
        levelID = Number(getQueryVariable("level"));
    }
    var cars;
    var guests;
    switch (levelID) {
        case -1:
            cars = random_cars(initial_difficulty);
            guests = random_guests(initial_difficulty);
            break;
        case 0:
            cars = [new car(0, 100, 400, 1),
                    new car(2, -800, -400, 1)];

            guests = [new guest(200, 0)];
            break;
        case 1:
            cars = [new car(0, 100, 400, 1),
                    new car(1, 100, -400, 1),
                    new car(2, -400, -400, 0),
                    new car(3, -700, 300, 1)];

            guests = [new guest(100, 0),
                     new guest(200, 1)];
            break;
        case 2:
            cars = [new car(0, 100, 400, 1),
                    new car(1, 100, 400, 1),
                    new car(3, 100, 400, 1),
                    new car(4, 100, 400, 1)];

            guests = [new guest(200, 1)];
            break;
        case 3:
            cars = [new car(0, 100, 400, 0),
                    new car(1, 100, -400, 1),
                    new car(3, 300, 300, 1),
                    new car(3, -700, 300, 0)];

            guests = [new guest(-100, 0),
                     new guest(00, 1),
                     new guest(100, 1),
                     new guest(150, 1)];
            break;
        case 4:
            cars = [new car(3, 100, 400, 0),
                    new car(3, 300, 400, 0),
                    new car(3, 500, 400, 0),
                    new car(3, 700, 400, 0)];

            guests = [new guest(90, 1),
                new guest(110, 1),
                     new guest(130, 1),
                     new guest(150, 1),
                     new guest(170, 0)];
            break;
        default:
            console.log("PANIC, why did you pass", levelID, "as level ID?");

    }


    return {
        cars: cars,
        guests: guests
    };

}
var random_cars = (difficulty) => {
    // cars per lane = Math.round (1 * level_number);
    var car_arr = [];
    for (var i=0, len = lanes.length; i < len; i++){

      var cars_in_lane = Math.round( difficulty * cars_per_lane_scalar * Math.random() );

      var lane_direction = Math.random() < 5.0 ? 0 : 1;
      var lane_speed = (
          default_car_speed + ( Math.random() * (difficulty * 100) * rand_sign() )
        ) * (
          rand_sign()
        );

      for (var j=0; j < cars_in_lane; j++){
        car_arr.push(
          new car(
            i, //lane
            Math.floor(lane_width * Math.random()), // position
            lane_speed, // speed
            Math.round(Math.random() * (car_sprites.length - 1)) //type
          )
        );
      }
    }
    return car_arr;
}

var random_guests = (difficulty) => {
    var guest_arr = [];
    var last_guest_x = 300;
    for (var i = 0, len=random_guests_count; i<len; i++){

      var guest_x = ( last_guest_x - initial_guest_gap +
        Math.random() * difficulty * difficulty_increase_scalar);

      guest_arr.push(
        new guest(
          guest_x,
          Math.round(Math.random() * (guestFronts.length - 1))
        )
      );

      last_guest_x = guest_x;

      if (i % 4 == 0)
        difficulty++;
    }
    return guest_arr;
}
