function ElectricalAppliance(name, power) {
    this.name = name;
    this.power = power;
    this.isPlugged = false;
}

ElectricalAppliance.prototype.plugIn = function() {
    this.isPlugged = true;
    console.log(`${this.name} is plugged in.`);
}

ElectricalAppliance.prototype.unplug = function() {
    this.isPlugged = false;
    console.log(`${this.name} is unplugged.`);
}

ElectricalAppliance.prototype.status = function() {
    console.log(`${this.name} is ${this.isPlugged ? 'plugged in' : 'unplugged'}, power: ${this.power}W`);
}

function Kettle(name, power, color, volume) {
    ElectricalAppliance.call(this, name, power);
    this.color = color;
    this.volume = volume;
    this.currentVolume = 0;
}

Kettle.prototype = Object.create(ElectricalAppliance.prototype);
Kettle.prototype.constructor = Kettle;

Kettle.prototype.fillWater = function(volume) {
    this.currentVolume = volume;
    console.log(`${this.name} filled with ${this.currentVolume}ml of water.`);
}

Kettle.prototype.boilWater = function() {
    if (this.isPlugged) {
        if (this.currentVolume > 0) {
            console.log(`${this.name} is boiling water.`);
        } else {
            console.log(`Fill the ${this.name} with water to boil.`);
        }
    } else {
        console.log(`Plug in the ${this.name} to boil!`);
    }
}

Kettle.prototype.checkWaterLevel = function() {
    console.log(`${this.name} has ${this.currentVolume}ml of water.`);
}

function Lamp(name, power, color, brightness) {
    ElectricalAppliance.call(this, name, power);
    this.color = color;
    this.brightness = brightness;
    this.isOn = false;
}

Lamp.prototype = Object.create(ElectricalAppliance.prototype);
Lamp.prototype.constructor = Lamp;

Lamp.prototype.changeColor = function(newColor) {
    this.color = newColor;
    console.log(`${this.name} color changed to ${this.color}.`);
}

Lamp.prototype.adjustBrightness = function(level) {
    this.brightness = level;
    console.log(`${this.name} brightness adjusted to ${this.brightness}`);
}

Lamp.prototype.toggle = function() {
    this.isOn = !this.isOn;
    const state = this.isOn ? 'on' : 'off';
    console.log(`${this.name} is ${state}`);
}

function Fan(name, power) {
    ElectricalAppliance.call(this, name, power);
    this.timerOn = false;
    this.timer = null;
}

Fan.prototype = Object.create(ElectricalAppliance.prototype);
Fan.prototype.constructor = Fan;

Fan.prototype.setTimer  = function(minutes) {
    if (this.timerOn){
        clearTimeout(this.timer);
    }

    const milliseconds = minutes * 60 * 1000;
    this.timerOn = true;
    console.log(`${this.name} will turn off in ${minutes} minutes`);
    this.timer = setTimeout(()=>{
        this.unplug();
        this.timerOn = false;
        console.log(`${this.name} has turned off after ${minutes} milliseconds`);
    }, milliseconds);
}

const kettle = new Kettle('Ninja Teapot',  1500, 'black',1000);
const lamp = new Lamp('Office lamp',  50, 'white','medium');
const fan = new Fan('My Cool Fan', 75);

console.log(kettle);
kettle.plugIn();
lamp.status();
kettle.checkWaterLevel();
kettle.fillWater(500);
kettle.boilWater();

console.log(lamp);
lamp.plugIn();
lamp.status();
lamp.toggle();
lamp.adjustBrightness('high');
lamp.changeColor('yellow');
lamp.toggle();

console.log(fan);
fan.status();

const calculateTotalPower = (appliances) => {
    return appliances.reduce((total, appliance) => {
        if (appliance.isPlugged) {
            return total + appliance.power;
        }
        return total;
    }, 0);
}

const appliances = [lamp, kettle, fan];
const totalPower = calculateTotalPower(appliances);
console.log("Total power consumption is", totalPower, "W");

lamp.unplug();
kettle.unplug();