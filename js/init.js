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
                    new car(2, -800, -400, 3)];

            guests = [new guest(250, 0)];
            break;
        case 1:
            cars = [new car(0, 100, 400, 3),
                    new car(2, -800, -400, 1),
                    new car(4, 100, -400, 5)];
            guests = [new guest(250, 2),
                      new guest(100, 4)];
            break;
        case 2:
            cars = [new car(0, 100, 400, 1),
                    new car(1, 100, -400, 2),
                    new car(2, -400, -400, 0),
                    new car(3, -700, 300, 3)];

            guests = [new guest(100, 0),
                     new guest(200, 2)];
            break;
        case 3:
            cars = [new car(0, 100, 400, 1),
                    new car(1, 100, 400, 1),
                    new car(3, 100, 400, 1),
                    new car(4, 100, 400, 1)];

            guests = [new guest(200, 1)];
            break;
        case 4:
            cars = [new car(0, 100, 400, 0),
                    new car(1, 100, -400, 1),
                    new car(3, 300, 300, 3),
                    new car(3, -700, 300, 2)];

            guests = [new guest(-100, 0),
                     new guest(00, 1),
                     new guest(100, 2),
                     new guest(150, 1)];
            break;

        case 5:
            cars = [new car(0, 325, 400, 0),
                    new car(1, 325, -400, 1),
                    new car(2, 325, 400, 3),
                    new car(3, 325, -400, 2),
                    new car(4, 325, 400, 2)];


            guests = [new guest(-180, 0),
                     new guest(-70, 1),
                     new guest(40, 2),
                     new guest(150, 1)];
            break;
        case 6:
            cars = [
                    new car(1, 0, -400, 2),
                    new car(2, -110, -400, 2),
                    new car(3, -220, -400, 2),
                    new car(4, -330, -400, 2),
                    new car(0, -100, -400, 0),
                    new car(0, -300, -400, 0),
                    new car(0, -500, -400, 0),
                    new car(0, -700, -400, 0),
                    new car(0, -900, -400, 0),
                    new car(0, 100, -400, 0)];


            guests = [new guest(220, 3)];
            break;
        case 7:
            cars = [new car(3, 100, 400, 0),
                    new car(3, 300, 400, 0),
                    new car(3, 500, 400, 0),
                    new car(3, 700, 400, 0)];

            guests = [new guest(90, 1),
                new guest(110, 1),
                     new guest(130, 2),
                     new guest(150, 1),
                     new guest(170, 0)];
            break;
        case 8:
            cars = [new car(0, 100, 400, 4),
                    new car(2, 100, 400, 4),
                    new car(3, 100, 400, 4),
                    new car(4, 100, 400, 4),
                    new car(0, -800, 400, 0),
                    new car(2, -800, 400, 0),
                    new car(3, -800, 400, 0),
                    ];

            guests = [new guest(200, 1),
                      new guest(150, 1)];
            break;
        default:
            alert("YOU HAVE WON EVERY LEVEL, how Did you do that? anyways you are very skill.")
            cars = [];
            guests = [];
            var i = 0;
            for (var x = 200; x > -3000; x-= 100){
                guests.push(new guest(x, i % 5));
                i += 1;
            }

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
