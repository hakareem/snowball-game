"use strict";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let colors: string[] = [
  "chocolate",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
];

let numPlayers = 1;

for (let i = 0; i < numPlayers; i++) {
  Game.players.push(
    new Player(
      "Harith",
      new Vector(
        Math.floor(Math.random() * 400),
        Math.floor(Math.random() * 400)
      ),
      colors[i]
    )
  );
}

// when we click on a player it shoots a snowball - just for a test not for the full game

// snowball.addEventListener("click");

requestAnimationFrame(Game.cycle);

canvas.addEventListener("click", shootSnowball);

function shootSnowball(e: MouseEvent) {
  const p = Game.players[0];
  // get the position of the player and when we click within 10px of the player then shoot a snowball and don't go to the position
  const mouseCoord: Vector = new Vector(e.clientX, e.clientY);

  if (distanceBetween(mouseCoord, p.position) <= 20) {
    p.snowballs.push(new Snowball(p.position, p.direction));
    // p.direction only becomes a reference to p.velocity this is why p.velocity sets p.dircetion's value to 0 after running
    // We creating a shiny new vector for p.direction so it creates a new vector with  the values of p.velocity
  }
}

canvas.addEventListener("click", getMousePosition);

function hypo(adjacent: number, opposite: number) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

function distanceBetween(a: Vector, b: Vector) {
  return hypo(b.x - a.x, b.y - a.y);
}

function getMousePosition(event: MouseEvent) {
  let p = Game.players[0];
  p.destination.x = event.clientX;
  p.destination.y = event.clientY;

  let adjacent = p.destination.x - p.position.x;
  let opposite = p.destination.y - p.position.y;

  p.angle = -Math.atan2(-opposite, adjacent) - Math.PI / 2;
  let hypotenuse = hypo(adjacent, opposite);
  p.velocity.x = (adjacent / hypotenuse) * 5;
  p.velocity.y = (opposite / hypotenuse) * 5;

  p.direction = new Vector(p.velocity.x, p.velocity.y);
}

// mousedown eventListener to choose target - draw a line from player to the mouse point
// mousemove
// mouseup eventListener
