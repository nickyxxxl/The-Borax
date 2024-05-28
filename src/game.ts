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
    speed_2 = 50,
    speed_3 = 220,
    efficiency_1 = 100,
    efficiency_2 = 200,
    efficiency_3 = 400,
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
        // Not enough money
        if (this.money < type) {
            return false;
        }        
        // Upgrade already installed
        if (this.buildings[location].upgrades.includes(type)) {
            return false;
        }
        // Success
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

    saveGame() {
        sessionStorage.setItem('save1', JSON.stringify(this));
    }

    loadGame(): boolean {
        let loading = sessionStorage.getItem('save1');
        console.log(this);
        
        if (loading == null) {
            return false;
        } else {
            let loaded: IncrementalGame = JSON.parse(loading);
            this.money = loaded.money;
            let i = 0;
            for(let building of loaded.buildings) {
                if (building == null) {
                    delete this.buildings[i]
                    i++;
                    continue
                }
                this.buildings[i] = new Building(building.type);
                for(let upgrade of building.upgrades) {
                    this.buildings[i].upgrade(upgrade);
                }
                i++;
            }

            return true;
        }
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

    constructor(building_type,) {
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
                if (this.cooldown > 800) {
                    this.cooldown = 800;
                }
                break;
            case UpgradeTypes.speed_2:
                if (this.cooldown > 400) {
                    this.cooldown = 400;
                }
                break;
            case UpgradeTypes.speed_3:
                this.cooldown = 200;
                break;
            case UpgradeTypes.efficiency_1:
                if (this.multiplier < 2) {
                    this.multiplier = 2;
                }
                break;
            case UpgradeTypes.efficiency_2:
                if (this.multiplier < 3) {
                    this.multiplier = 3;
                }
                break;
            case UpgradeTypes.efficiency_3:
                this.multiplier = 5;
                break;
            default:

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