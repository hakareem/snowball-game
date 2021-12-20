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
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;
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
