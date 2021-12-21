"use strict";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Player {
  username: string = "";
  position: Vector = new Vector(50, 50);
  velocity: Vector = new Vector(3, 3);
  destination: Vector = new Vector(0, 0);
  snowball: Snowball[] = [];
  angle: number = 0; // rotation angle of the player(for drawing)

  constructor(username: string, position: Vector) {
    this.username = username;
    this.position = position;
  }

  draw() {
    ctx?.save();
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.translate(this.position.x, this.position.y);
    ctx?.beginPath();
    ctx?.arc(0, 0, 30, 0, Math.PI * 2);
    ctx!.fillStyle = "red";
    ctx?.fill();
    ctx?.closePath;
    ctx?.restore();
  }
  move() {
    this.position = this.position.add(this.velocity);
  }
}

class Game {
  static players: Player[] = [];

  static cycle() {
    // player movement
    // players.forEach(function (player) {
    for (let i = 0; i < Game.players.length; i++) {
      Game.players[i].draw();
      Game.players[i].move();
    }
    //snowball movement

    // check destination

    requestAnimationFrame(Game.cycle);
  }
}

function hypo(adjacent: number, opposite: number) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

function distanceBetween(a: Vector, b: Vector) {
  return hypo(b.x - a.x, b.y - a.y);
}

class Snowball {
  color: string = "";
  size: number = 0;
  position: Vector = new Vector(0, 0);
  velocity: Vector = new Vector(0, 0);
}

class Vector {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
}

const player1 = new Player("harith", new Vector(100, 100));

Game.players.push(player1);

requestAnimationFrame(Game.cycle);

canvas.addEventListener("click", getMousePosition);

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
}
