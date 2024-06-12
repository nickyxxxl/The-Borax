import { IncrementalGame, BuildingTypes, UpgradeTypes } from "./game.ts";
import $ from 'jquery';
window.$ = $;

let Game = new IncrementalGame(100);

function updateCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;
  console.log(x,y);
  return x,y;
}
document.addEventListener('mousemove', updateCoordinates);


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPosition() {
  const planet = document.getElementById('planet1');
  const topPosition = getRandomInt(20, 80);
  const leftPosition = getRandomInt(20, 80);
  planet.style.top = `${topPosition}%`;
  planet.style.left = `${leftPosition}%`;
}

function changePosition(){
  const changeX = 20 + ((window.innerwidth - x)/window.innerwidth -0.5) * 60;
  const changeY = 20 * ((window.innerHeight - x)/window.innerHeight - 0.5)* 60;
  const posX = posX + changeX;
  const posY = posY + changeY;
}

setInterval(() => {
 setPosition();

}, 1000)
