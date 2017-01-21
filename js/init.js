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
        case 0:
            cars = [new car(0, 100, 400, 0),
                    new car(2, -800, -400, 0)];

            guests = [new guest(200, 0)];
            break;
        case 1:
            cars = [new car(0, 100, 400, 0),
                    new car(1, 100, -400, 1),
                    new car(2, -400, -400, 0),
                    new car(3, -700, 300, 0)];

            guests = [new guest(100, 0),
                     new guest(200, 1)];
            break;

        case 2:
            cars = [new car(0, 100, 400, 0),
                    new car(1, 100, -400, 1),
                    new car(3, 300, 300, 0),
                    new car(3, -700, 300, 0)];

            guests = [new guest(-100, 0),
                     new guest(00, 1),
                     new guest(100, 1),
                     new guest(150, 1)];
            break;
        case 3:
            cars = [new car(3, 100, 400, 0),
                    new car(3, 300, 400, 0),
                    new car(3, 500, 400, 1),
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
