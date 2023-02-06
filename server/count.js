
var self = this;
var vx = 120;
module.exports.x = vx;
class Car {
    static xi = 100;
    constructor(name, price){
        this.name = name;
        this.price = price;
        console.log("const, ", vx);
        vx = 150;
        console.log("con2: ", vx);
    }
}

module.exports.Car = Car;