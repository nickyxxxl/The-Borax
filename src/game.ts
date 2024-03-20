export {IncrementalGame};

// Enums
enum BuildingType {
    none = 0,
    tree,
}

enum UpgradeType {
    none = 0,
    speed_1,
    speed_2,
    speed_3,
    efficiency_1,
    efficiency_2,
    efficiency_3,
}

class IncrementalGame {
    // Variables
    money: number;
    buildings: Array<Building>;

    constructor(initialMoney) {
        this.money = initialMoney;
    }

    // Information
    getMoney() {
        return this.money;
    }

    // Construction
    build(type: BuildingType, location: number) {
        this.buildings.push(new Building(type));
    }
}

class Building {
    type: BuildingType;
    upgrades: Array<UpgradeType>;

    constructor(building_type) {
        this.type = building_type;
    }

    upgrade(upgrade) {
        this.upgrades.push(upgrade);
    }
}