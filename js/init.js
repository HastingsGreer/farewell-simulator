function level_init(levelID) {
    var cars = [new car(0, 100, 400, 0),
                 new car(1, 100, -400, 1)];
    var guests = [new guest(0, 0),
                 new guest(100, 1)];

    return {
        cars: cars,
        guests: guests
    };

}
