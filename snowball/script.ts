"use strict";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Audio //
var backgroundMusic = new Audio("music/music_zapsplat_winter_dance.mp3");
function startBackgroundMusic() {
  backgroundMusic.play();
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;
}
const hitSound = new Audio(
  "music/julien_matthey_impact_snowball_on_cement_002.mp3"
);
function startHitSound() {
  hitSound.play();
}
const throwSound = new Audio(
  "music/zapsplat_sport_rugby_ball_throw_pass_let_go_001_67491.mp3"
);
function startThrowSound() {
  throwSound.play();
}
const hurtSound = new Audio("music/zapsplat_human_male_gasp_001_19848.mp3");
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

for (let i = 0; i < numPlayers; i++) {
  Game.players.push(
    new Player(
      username,
      new Vector(
        Math.floor(Math.random() * 400),
        Math.floor(Math.random() * 400)
      ),
      colors[i],
      50,
      100
    )
  );
}

let numObstacles = 2;
for (let i = 0; i < numObstacles; i++) {
  let p = new Vector(
    Math.floor(Math.random() * 2500),
    Math.floor(Math.random() * 1000)
  );
  let o = new Obstacle(p, 50 + Math.random() * 10, "lightblue");
  Game.obstacles.push(o);
}

requestAnimationFrame(Game.cycle);

function hypo(adjacent: number, opposite: number) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

function distanceBetween(a: Vector, b: Vector) {
  return hypo(b.x - a.x, b.y - a.y);
}

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMovement);

let mouseBtnDown = false;
let isAiming = false;

function mouseDown(_e: MouseEvent) {
  const p = Game.players[0];

  if (distanceBetween(p.position, p.target) < 40) {
    isAiming = true;
  } else {
    p.runToPoint(p.target);
  }
  mouseBtnDown = true;
}

function mouseUp(_e: MouseEvent) {
  const p = Game.players[0];
  mouseBtnDown = false;
  if (isAiming) {
    p.snowballs.push(
      new Snowball(
        p.position,
        p.target.subtract(p.position).normalise().multiply(5)
      )
    );
  }
  isAiming = false;
}

function mouseMovement(e: MouseEvent) {
  let p = Game.players[0];

  p.target = new Vector(e.clientX, e.clientY);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
