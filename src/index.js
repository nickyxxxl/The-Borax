const menu = document.querySelector("#upgrade-menu")

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    CloseMenus();
})

function ToggleUpgrades(element) {
    if (element.classList.contains("ship-grid")) {
        menu.classList.add("visible")
        element.appendChild(menu)
    } else {
        menu.classList.remove("visible")
    }
}

function CloseMenus() {
    menu.classList.remove("visible")
}
