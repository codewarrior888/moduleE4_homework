class ElectricalAppliance {
    constructor(name, power) {
        this.name = name;
        this.power = power;
        this.isPlugged = false;
    }

    plugIn() {
        this.isPlugged = true;
        console.log(`${this.name} is plugged in.`);
    }

    unplug() {
        this.isPlugged = false;
        console.log(`${this.name} is unplugged.`);
    }

    status() {
        console.log(`${this.name} is ${this.isPlugged ? 'plugged in' : 'unplugged'}, power: ${this.power}W`);
    }
}

class Kettle extends ElectricalAppliance {
    constructor(name, power, color, volume) {
        super(name, power);
        this.color = color;
        this.volume = volume;
        this.currentWaterAmount = 0;
    }

    fillWater(amount) {
        this.currentWaterAmount = amount;
        console.log(`${this.name} filled with ${this.currentWaterAmount}ml of water.`);
    }

    boilWater() {
        if (this.isPlugged) {
            if (this.currentWaterAmount > 0) {
                console.log(`${this.name} is boiling water.`);
            } else {
                console.log(`Fill the ${this.name} with water to boil.`);
            }
        } else {
            console.log(`Plug in the ${this.name} to boil!`);
        }
    }

    checkWaterLevel() {
        console.log(`${this.name} has ${this.currentWaterAmount}ml of water.`);
    }
}

class Lamp extends ElectricalAppliance {
    constructor(name, power, color, brightness) {
        super(name, power);
        this.color = color;
        this.brightness = brightness;
        this.isOn = false;
    }

    changeColor(newColor) {
        this.color = newColor;
        console.log(`${this.name} color changed to ${this.color}.`);
    }

    adjustBrightness(level) {
        this.brightness = level;
        console.log(`${this.name} brightness adjusted to ${this.brightness}`);
    }

    toggle() {
        this.isOn = !this.isOn;
        const state = this.isOn ? 'on' : 'off';
        console.log(`${this.name} is ${state}`);
    }
}

class Fan extends ElectricalAppliance {
    constructor(name, power) {
        super(name, power);
        this.timerOn = false;
        this.timer = null;
    }

    setTimer(minutes) {
        if (this.timerOn) {
            clearTimeout(this.timer);
        }

        const milliseconds = minutes * 60 * 1000;
        this.timerOn = true;
        console.log(`${this.name} will turn off in ${minutes} minutes`);
        this.timer = setTimeout(() => {
            this.unplug();
            this.timerOn = false;
            console.log(`${this.name} has turned off after ${minutes} minutes`);
        }, milliseconds);
    }
}

const kettle = new Kettle('Ninja Teapot',  1500, 'black',1000);
const lamp = new Lamp('Office lamp',  50, 'white','medium');
const fan = new Fan('My Cool Fan', 75);

console.log(kettle);
kettle.status();
kettle.plugIn();
kettle.checkWaterLevel();
kettle.fillWater(500);
kettle.boilWater();

console.log(lamp);
lamp.status();
lamp.plugIn();
lamp.toggle();
lamp.adjustBrightness('high');
lamp.changeColor('yellow');
lamp.toggle();

console.log(fan);
fan.status();
fan.plugIn();
fan.setTimer(1);

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