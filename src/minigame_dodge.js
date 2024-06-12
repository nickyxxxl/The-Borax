import { IncrementalGame, BuildingTypes, UpgradeTypes } from "./game.ts";
import $ from 'jquery';
window.$ = $;

let Game = new IncrementalGame(100);
let posX = 0;
let posY = 0;

function updateCoordinates(event) {
  const x = event.clientX;
  const y = event.clientY;

  const planet = document.getElementById('planet1');
  const changeX = ((window.innerWidth - x)/window.innerWidth -0.5) * 3;
  const changeY = ((window.innerHeight - x)/window.innerHeight - 0.5) * 3;
  if(posX > 80) posX = 80;
  else if(posX< 0) posX = 0;
  else posX = posX + changeX;

  if(posY > 80) posY = 80;
  else if(posY< 0) posY = 0;
  else posY = posY + changeY;
  planet.style.top = `${posY}%`;
  planet.style.left = `${posX}%`;
}
document.addEventListener('mousemove', updateCoordinates);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPosition() {
  const planet = document.getElementById('planet1');
  const topPosition = getRandomInt(30, 70);
  const leftPosition = getRandomInt(30, 70);
  planet.style.top = `${topPosition}%`;
  planet.style.left = `${leftPosition}%`;
}

function runAnimation() {
  const planet = document.getElementById('planet1');
  planet.classList.add('animation_class');

  setTimeout(() => {
      planet.classList.remove('animation_class');
      if(posX < 60 && posX > 30){
        console.log('fail');
      }
  }, 1000); 
}


setInterval(() => {
 setPosition();
 runAnimation();
}, 1010)
