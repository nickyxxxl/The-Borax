import { IncrementalGame } from "./game.ts";

const Game = new IncrementalGame(100);

let money = Game.getMoney();
console.log(money);