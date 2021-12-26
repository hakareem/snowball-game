"use strict";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let colors: string[] = [
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
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
  "Chocolate",
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
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
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

let numPlayers = 50;

for (let i = 0; i < numPlayers; i++) {
  Game.players.push(new Player("Harith", new Vector(Math.random() * 300, Math.random() * 300),colors[i]));
}
requestAnimationFrame(Game.cycle);

function hypo(adjacent: number, opposite: number) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

function distanceBetween(a: Vector, b: Vector) {
  return hypo(b.x - a.x, b.y - a.y);
}

canvas.addEventListener("mousedown", mouseDown)
canvas.addEventListener("mouseup", mouseUp)
canvas.addEventListener("mousemove", mouseMovement)

let mouseBtnDown = false
let isAiming = false
let collision = false
function mouseDown (_e:MouseEvent) {
  const p = Game.players[0];
  const p1 = Game.players[1]
  
  if (distanceBetween(p.position, p.target) < 40 ){
    isAiming = true
  }
  else {
    p.runToPoint(p.target)
  }
  mouseBtnDown = true
}

function mouseUp(_e:MouseEvent){
  const p = Game.players[0];
  mouseBtnDown = false
  if(isAiming ) {
    p.snowballs.push(new Snowball(p.position, p.target.subtract(p.position).normalise().multiply(5)));
  }
  isAiming = false
}


function mouseMovement (e:MouseEvent) {
  let p = Game.players[0];

  p.target = new Vector(e.clientX, e.clientY)
}
