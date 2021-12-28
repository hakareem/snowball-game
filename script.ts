"use strict";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Audio //
let backgroundMusic = new Audio("audio/music/backgroundMusic.mp3");
function startBackgroundMusic() {
  backgroundMusic.play();
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;
}
let throwSound = new Audio("audio/sounds/throwSound2.mp3");
function startThrowSound() {
  throwSound.play();
}
let hitSound = new Audio("audio/sounds/hitSound.mp3");
function startHitSound() {
  hitSound.play();
}
let hurtSound = new Audio("audio/sounds/playerHurtSound.mp3");
function startHurtSound() {
  hurtSound.play();
}

let colors: string[] = [
  "Chartreuse",
  "Crimson",
  "Cyan",
  "DarkGoldenRod",
  "DeepPink",
  "DodgerBlue",
  "Fuchsia",
  "Gold",
  "Indigo",
  "Aqua",
  "Aquamarine",
  "BlueViolet",
  "Ivory",
];

let username: string = prompt("Enter your username")!;

let numPlayers = 4;
let playerRadius = 30;

const pCanvas=document.createElement("canvas")
pCanvas.width=playerRadius*2
pCanvas.height=playerRadius*2
const pctx = pCanvas.getContext("2d");


for (let i = 0; i < numPlayers; i++) {

  let img = document.createElement("img")
  img.src = "player images/clipart3304.png"

  Game.players.push(new Player(username, new Vector(Math.floor(Math.random() * 400), Math.floor(Math.random() * 400)), colors[i], 50, 100, img, playerRadius));
}

let images = [];
images.push("images/obstacles/tree_12.png");
images.push("images/obstacles/tree_17.png");
images.push("images/obstacles/tree_23.png");
images.push("images/obstacles/tree_28.png");
images.push("images/obstacles/tree_43.png");
images.push("images/obstacles/tree_52.png");

let numObstacles = 100;
for (let i = 0; i < numObstacles; i++) {
  let p = new Vector(Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000));
  let img = document.createElement("img")
  let indexImage = Math.floor(Math.random() * images.length)
  img.src = images[indexImage]

  let o = new Obstacle(p, 50 + Math.random() * 50, "lightblue", img);
  Game.obstacles.push(o);
}

requestAnimationFrame(Game.cycle);

function hypo(adjacent: number, opposite: number) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

function distanceBetween(a: Vector, b: Vector) {
  return hypo(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
}

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMovement);

let mouseBtnDown = false;
let isAiming = false;

function mouseDown(_e: MouseEvent) {
  const p = Game.players[0];
  startBackgroundMusic();
  if (distanceBetween(p.position, p.target) < 40) {
    isAiming = true;
  }else {
    p.runToPoint(p.target);
  }
  mouseBtnDown = true;
}

function mouseUp(_e: MouseEvent) {
  const p = Game.players[0];
  mouseBtnDown = false;
  if (isAiming) {
    p.snowballs.push(new Snowball(p.position,p.target.subtract(p.position).normalise().multiply(5)));
  }
  isAiming = false;
  startThrowSound()
}

function mouseMovement(e: MouseEvent) {
  let p = Game.players[0];

  p.target = new Vector(e.clientX + Camera.focus.x - canvas.width / 2,e.clientY + Camera.focus.y - canvas.height / 2);
}

function collisionDetection() {
  
  const p = Game.players[0];

  let lastSnowball = p.snowballs[p.snowballs.length - 1];
  
  let j = 1
  let hit = false
  while (j < numPlayers && hit == false) {
    const p1 = Game.players[j];
    // < 38 because this is the radius of the player (30) + radius of the snowball (8)
    if (distanceBetween(p1.position, lastSnowball.position) < 38) {
      // alert (`Player ${j} : ${p1.username} has been hit`)
      p.snowballs.pop()
      hit = true
    }
    j++
  }
}