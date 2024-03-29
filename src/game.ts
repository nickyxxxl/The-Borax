export {IncrementalGame, BuildingType, UpgradeType};

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
    buildings: Array<Building> = [];

    constructor(initialMoney) {
        this.money = initialMoney;
    }

    // Information
    getMoney() {
        return this.money;
    }

    // Construction
    build(type: BuildingType, location: number): boolean {
        if (this.money < 100) {
            return false;
        }
        this.buildings.push(new Building(type));
        console.log(this.buildings);
        this.money -= 100;
        return true;
    }

    // Processing
    updateBuildings() {
        this.buildings.forEach(building => {
            this.money += building.getMoney();
        });
    }
}

class Building {
    type: BuildingType;
    upgrades: Array<UpgradeType>;

    constructor(building_type) {
        this.type = building_type;
    }

    // Install Upgrade
    upgrade(upgrade) {
        this.upgrades.push(upgrade);
    }

    // Get amount of resources produced
    getMoney(): number {
        return 5;
    }
}