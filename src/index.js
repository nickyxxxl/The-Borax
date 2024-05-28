import { IncrementalGame, BuildingTypes, UpgradeTypes } from "./game.ts";
import $ from 'jquery';
window.$ = $;

let Game = new IncrementalGame(100);

document.querySelector("#building-menu").addEventListener('click', (element) => {
    let tile_id = element.target.closest(".ship-grid").id.split('-')[1];
    if (!Game.build(BuildingTypes.tree, tile_id)) {
        return;
    }
    $( `#tile-${tile_id} .tile-empty`).replaceWith("<div onclick='ToggleUpgradesMenu(this)' class='tile-building tile-tree'></div>");
})

document.querySelector("#upgrade-menu").addEventListener('click', (element) => {
    let tile_id = element.target.closest(".ship-grid").id.split('-')[1];
    if (element.target.alt == null) {
        return;
    }
    let upgrade_id = UpgradeTypes[element.target.alt];
    if (!Game.upgrade(upgrade_id,tile_id)) {
        return;
    }
    $(`#upgrade-menu .${UpgradeTypes[upgrade_id]}`)[0].classList.add("bought")
})

document.querySelector("#save").addEventListener('click', (element) => {
    Game.saveGame();
})

document.querySelector("#load").addEventListener('click', (element) => {
    Game.loadGame();
    refreshPlayfield();
})

function refreshPlayfield() {
    for (let i = 0; i < Game.buildings.length; i++) {
        const building = Game.buildings[i];
        if (building != undefined) {
            $( `#tile-${i} .tile-empty`).replaceWith(`<div onclick='ToggleUpgradesMenu(this)' class='tile-building tile-${BuildingTypes[building.type]}'></div>`);
        } else {
            $( `#tile-${i}`).replaceWith(`<div class='ship-grid' id='tile-${i}'> <div onclick='ToggleBuildingsMenu(this)' class='tile-empty'></div> </div>`);
        }
    }
}

const upgrade_menu = document.querySelector("#upgrade-menu")
function ToggleUpgradesMenu(element) {
    CloseMenus()
    if (element.classList.contains("tile-building")) {
        let tile_id = element.closest(".ship-grid").id.split('-')[1];
        $(`#upgrade-menu .upgrade-item`).each((index, element) => {
            element.classList.remove("bought")
        })
        Game.buildings[tile_id].upgrades.forEach(upgrade_id => {
            $(`#upgrade-menu .${UpgradeTypes[upgrade_id]}`)[0].classList.add("bought")
        });


        upgrade_menu.classList.add("visible")
        element.appendChild(upgrade_menu)
    } else {
        upgrade_menu.classList.remove("visible")
    }
}
window.ToggleUpgradesMenu = ToggleUpgradesMenu;

const building_menu = document.querySelector("#building-menu")
function ToggleBuildingsMenu(element) {
    CloseMenus()
    if (element.classList.contains("tile-empty")) {
        building_menu.classList.add("visible")
        element.appendChild(building_menu)
    } else {
        building_menu.classList.remove("visible")
    }
}
window.ToggleBuildingsMenu = ToggleBuildingsMenu;

function CloseMenus() {
    upgrade_menu.classList.remove("visible")
    building_menu.classList.remove("visible")
}
window.CloseMenus = CloseMenus;

document.addEventListener("contextmenu", (e) => {
    //e.preventDefault()
    CloseMenus();
})

for (let i = 0; i < 12; i++) {
    $( ".ship-container" ).append(`<div class='ship-grid' id='tile-${i}'> <div onclick='ToggleBuildingsMenu(this)' class='tile-empty'></div> </div>`)
}

setInterval(() => {
    Game.updateBuildings();
    document.querySelector("#money-display").innerHTML = Game.getMoney()
}, 40)

