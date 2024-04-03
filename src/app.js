import { IncrementalGame, BuildingTypes, UpgradeTypes } from "./game.ts";

const Game = new IncrementalGame(100);

document.querySelector("#building-menu").addEventListener('click', (element) => {
    let tile_id = element.target.closest(".ship-grid").id.split('-')[1];
    if (!Game.build(BuildingTypes.tree, tile_id)) {
        return;
    }
    $( `#tile-${tile_id} .tile-empty`).replaceWith("<div onclick='ToggleUpgradesMenu(this)' class='tile-building tile-tree'></div>");
})

document.querySelector("#upgrade-menu").addEventListener('click', (element) => {
    console.log(element);
    let tile_id = element.target.closest(".ship-grid").id.split('-')[1];
    if (!Game.upgrade(UpgradeTypes.speed_3,tile_id)) {
        return;
    }
    //$( `#tile-${tile_id} .tile-empty`).replaceWith("<div onclick='ToggleUpgradesMenu(this)' class='tile-building tile-tree'></div>");
})

setInterval(() => {
    Game.updateBuildings();
    document.querySelector("#money-display").innerHTML = Game.getMoney()
}, 40)
