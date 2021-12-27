"use strict";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Audio //
// var backgroundMusic = new Audio("music/music_zapsplat_winter_dance.mp3");
// function startBackgroundMusic() {
//   backgroundMusic.play();
//   backgroundMusic.loop = true;
//   backgroundMusic.volume = 0.1;
// }
// const hitSound = new Audio(
//   "music/julien_matthey_impact_snowball_on_cement_002.mp3"
// );
// function startHitSound() {
//   hitSound.play();
// }
// const throwSound = new Audio(
//   "music/zapsplat_sport_rugby_ball_throw_pass_let_go_001_67491.mp3"
// );
// function startThrowSound() {
//   throwSound.play();
// }
// const hurtSound = new Audio("music/zapsplat_human_male_gasp_001_19848.mp3");
// function startHurtSound() {
//   hurtSound.play();
// }
let colors = [
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
let username = prompt("Enter your username");
let numPlayers = 4;
let playerRadius = 30;
for (let i = 0; i < numPlayers; i++) {
    let img = document.createElement("img");
    img.src = "player images/clipart3304.png";
    Game.players.push(new Player(username, new Vector(Math.floor(Math.random() * 400), Math.floor(Math.random() * 400)), colors[i], 50, 100, img, playerRadius));
}
let images = [];
images.push("obstacle images/tree_12.png");
images.push("obstacle images/tree_17.png");
images.push("obstacle images/tree_23.png");
images.push("obstacle images/tree_28.png");
images.push("obstacle images/tree_43.png");
images.push("obstacle images/tree_52.png");
<<<<<<< HEAD
let numObstacles = 100;
for (let i = 0; i < numObstacles; i++) {
    let p = new Vector(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));
=======
let numObstacles = 200;
for (let i = 0; i < numObstacles; i++) {
    let p = new Vector(Math.floor(Math.random() * 5000), Math.floor(Math.random() * 5000));
>>>>>>> efcf72f1b622643db65917bb241d69f3888033ff
    let img = document.createElement("img");
    let indexImage = Math.floor(Math.random() * images.length);
    img.src = images[indexImage];
    let o = new Obstacle(p, 50 + Math.random() * 50, "lightblue", img);
    Game.obstacles.push(o);
}
requestAnimationFrame(Game.cycle);
function hypo(adjacent, opposite) {
    return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}
function distanceBetween(a, b) {
    return hypo(b.x - a.x, b.y - a.y);
}
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMovement);
let mouseBtnDown = false;
let isAiming = false;
function mouseDown(_e) {
    const p = Game.players[0];
    // startBackgroundMusic();
    if (distanceBetween(p.position, p.target) < 40) {
        isAiming = true;
    }
    else {
        p.runToPoint(p.target);
    }
    mouseBtnDown = true;
}
function mouseUp(_e) {
    const p = Game.players[0];
    mouseBtnDown = false;
    if (isAiming) {
        p.snowballs.push(new Snowball(p.position, p.target.subtract(p.position).normalise().multiply(5)));
        // startThrowSound();
    }
    isAiming = false;
}
function mouseMovement(e) {
    let p = Game.players[0];
    p.target = new Vector(e.clientX + Camera.focus.x - canvas.width / 2, e.clientY + Camera.focus.y - canvas.height / 2);
}
//# sourceMappingURL=script.js.map