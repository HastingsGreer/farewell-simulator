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
            cars = random_cars(levelID);
            guests = random_guests(levelID);
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
            cars = [new car(0, 100, 400, 0),
                    new car(1, 100, -400, 1),
                    new car(3, 300, 300, 1),
                    new car(3, -700, 300, 0)];

            guests = [new guest(-100, 0),
                     new guest(00, 1),
                     new guest(100, 1),
                     new guest(150, 1)];
            break;
        case 3:
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
var random_cars = (level_number) => {
    // cars per lane = Math.round (1 * level_number);
    var car_arr = [];
    for (var i=0, len = lanes.length; i < len; i++){

      var cars_in_lane = Math.round( level_number * cars_per_lane_scalar + Math.random() );
      
      var lane_direction = Math.random() < 5.0 ? 0 : 1;
      var lane_speed = (
          default_car_speed + ( Math.random() * (level_number * 100) * rand_sign() )
        ) * (
          rand_sign()
        );
      
      for (var j=0; j < cars_in_lane; j++){
        car_arr.push(
          new car(i, 
            Math.floor(lane_width * Math.random()),
            lane_speed,
            Math.round(Math.random() * car_sprites.length)
          )
        );
      }
    }
    return car_arr;
}

var random_guests = (level_number) => {
    var guest_arr = [];
}