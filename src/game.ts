export {IncrementalGame, BuildingTypes, UpgradeTypes};

// Enums
enum BuildingTypes {
    none = 0,
    tree = 100,
    seed = 50,
}

enum UpgradeTypes {
    none = 0,
    speed_1 = 20,
    speed_2 = 40,
    speed_3 = 60,
    efficiency_1 = 50,
    efficiency_2 = 100,
    efficiency_3 = 150,
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
    build(type: BuildingTypes, location: number): boolean {
        if (this.money < type) {
            return false;
        }
        if (this.buildings[location] != null) {
            return false
        }
        this.buildings[location] = new Building(type);
        this.money -= type;
        return true;
    }

    upgrade(type: UpgradeTypes, location: number): boolean {
        if (this.money < type) {
            return false;
        }
        console.log(this.buildings[location]);
        
        if (this.buildings[location].upgrades.includes(type)) {
            return false;
        }
        this.buildings[location].upgrade(type);
        this.money -= type;
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
    type: BuildingTypes;
    upgrades: Array<UpgradeTypes>;

    earnings: number;
    multiplier: number;

    cooldown: number;
    temperature: number;
    prevTime: number;

    constructor(building_type) {
        this.type = building_type;
        this.cooldown = 1000;
        this.temperature = 1000;
        this.prevTime = Date.now();
        this.upgrades = new Array;

        switch (this.type) {
            case BuildingTypes.tree:
                this.earnings = 10;
                this.multiplier = 1;
                this.cooldown = 1000;
                break;
        }
    }

    // Install Upgrade
    upgrade(upgrade: UpgradeTypes) {
        this.upgrades.push(upgrade);
        switch (upgrade) {
            case UpgradeTypes.speed_1:
                this.cooldown = 800;
                break;
            case UpgradeTypes.speed_2:
                this.cooldown = 400;
                break;
            case UpgradeTypes.speed_3:
                this.cooldown = 200;
                break;
            case UpgradeTypes.efficiency_1:
                this.multiplier = 2;
                break;
            case UpgradeTypes.efficiency_2:
                this.multiplier = 3;
                break;
            case UpgradeTypes.efficiency_3:
                this.multiplier = 5;
                break;
        }
    }

    // Get amount of resources produced
    getMoney(): number {
        this.temperature -= Date.now() - this.prevTime;
        this.prevTime = Date.now()
        
        if (this.temperature < 0) {
            this.temperature = this.cooldown;
            return this.earnings * this.multiplier;
        }
        return 0
    }
}