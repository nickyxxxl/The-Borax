export {IncrementalGame};

// Enums
const Buildings = {
    none: 0,
    tree: 1,
}

const Upgrades = {
    none: 0,
    speed_1: 1,
    speed_2: 2,
    speed_3: 3,
    efficiency_1: 4,
    efficiency_2: 5,
    efficiency_3: 6,

}

class IncrementalGame {
    // Variables
    money = 0;
    buildings = [];

    constructor(initialMoney) {
        this.money = initialMoney;
    }

    // Information
    getMoney() {
        return this.money;
    }

    // Construction
    build(buildingType) {
        this.buildings.push(new Building(buildingType));

    }
}

class Building {
    building_type = 0;
    building_upgrades = [0];

    constructor(building_type) {
        this.building_type = building_type;
    }

    upgrade(upgrade) {
        this.building_upgrades.push(upgrade);
    }
}