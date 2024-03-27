const upgrade_menu = document.querySelector("#upgrade-menu")
const building_menu = document.querySelector("#building-menu")
const grid_container = document.querySelector("ship-container")

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    CloseMenus();
})

function ToggleUpgradesMenu(element) {
    if (element.classList.contains("tile-building")) {
        upgrade_menu.classList.add("visible")
        element.appendChild(upgrade_menu)
    } else {
        upgrade_menu.classList.remove("visible")
    }
}
function ToggleBuildingsMenu(element) {
    if (element.classList.contains("tile-empty")) {
        building_menu.classList.add("visible")
        element.appendChild(building_menu)
    } else {
        building_menu.classList.remove("visible")
    }
}

function CloseMenus() {
    upgrade_menu.classList.remove("visible")
    building_menu.classList.remove("visible")
}

for (let i = 0; i < 12; i++) {
    $( ".ship-container" ).append(`<div class='ship-grid' id='tile-${i}'> <div onclick='ToggleBuildingsMenu(this)' class='tile-empty'></div> </div>`)
}