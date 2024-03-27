import { IncrementalGame, BuildingType, UpgradeType } from "./game.ts";

const Game = new IncrementalGame(100);

document.querySelector("#menu-building-tree").addEventListener('click', (element) => {
    tile_id = element.target.closest(".ship-grid").id.split('-')[1];
    if (!Game.build(BuildingType.tree, tile_id)) {
        return;
    }
    $( `#tile-${tile_id} .tile-empty`).replaceWith("<div onclick='ToggleUpgradesMenu(this)' class='tile-building tile-tree'></div>");
})

setInterval(() => {
    Game.updateBuildings();
    console.log(Game.getMoney());
    document.querySelector("#money-display").innerHTML = Game.getMoney()
}, 500)