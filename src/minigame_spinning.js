import { IncrementalGame, BuildingTypes, UpgradeTypes } from "./game.ts";
import $ from 'jquery';
window.$ = $;

let Game = new IncrementalGame(100);

function updateCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;

  let rotation = x/window.innerWidth;
  //Make rotation in X and Y direction depend on mouse position/rotation
  // Goal is to balance out ring

}
document.addEventListener('mousemove', updateCoordinates);


//Swinging function
