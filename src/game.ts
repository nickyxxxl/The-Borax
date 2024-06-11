export {IncrementalGame, BuildingTypes, UpgradeTypes};

// Enums
enum BuildingTypes {
    none = 0,
    tree,
    seed,
}
enum UpgradeTypes {
    none = 0,
    speed_1,
    speed_2,
    speed_3,
    efficiency_1,
    efficiency_2,
    efficiency_3,
}
enum MoneyTypes {
    wood = 0,
    gold,
}

const BuildingPrices = {
    none : 0,
    tree : 100,
    seed : 20,
}
const UpgradePrices = {
    none : 0,
    speed_1 : 20,
    speed_2 : 40,
    speed_3 : 100,
    efficiency_1 : 50,
    efficiency_2 : 100,
    efficiency_3 : 200,
}

class IncrementalGame {
    // Variables
    wood: number;
    gold: number;
    buildings: Array<Building> = [];

    constructor(initialMoney) {
        this.wood = initialMoney;
    }

    // Information
    getMoney() {
        return this.wood;
    }

    getGold() {
        return this.gold;
    }

    reward(type: MoneyTypes, amount) {
        switch (type) {
            case MoneyTypes.wood:
                this.wood += amount;
                break;
            case MoneyTypes.gold:
                this.wood += amount;
                break;
        }
    }

    // Construction
    build(type: BuildingTypes, location: number): boolean {        
        if (this.wood < BuildingPrices[BuildingTypes[type]]) {
            return false;
        }
        if (this.buildings[location] != null) {
            return false
        }
        this.buildings[location] = new Building(type);
        this.wood -= BuildingPrices[BuildingTypes[type]];
        return true;
    }

    upgrade(type: UpgradeTypes, location: number): boolean {
        // Not enough wood
        if (this.wood < UpgradePrices[UpgradeTypes[type]]) {
            return false;
        }        
        // Upgrade already installed
        if (this.buildings[location].upgrades.includes(type)) {
            return false;
        }
        // Success
        this.buildings[location].upgrade(type);
        this.wood -= UpgradePrices[UpgradeTypes[type]];
        return true;
    }

    // Processing
    updateBuildings() {
        this.buildings.forEach(building => {
            this.wood += building.getMoney();
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
            this.wood = loaded.wood;
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
                this.cooldown -= 200;
                break;
            case UpgradeTypes.speed_2:
                this.cooldown -= 200;
                break;
            case UpgradeTypes.speed_3:
                this.cooldown -= 200;
                break;
            case UpgradeTypes.efficiency_1:
                this.multiplier += 1;
                break;
            case UpgradeTypes.efficiency_2:
                this.multiplier += 2;
                break;
            case UpgradeTypes.efficiency_3:
                this.multiplier += 3;
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

function updateCoordinates(event) {
    const x = event.clientX;
    const y = event.clientY;
    console.log(x,y);
}
document.addEventListener('mousemove', updateCoordinates);