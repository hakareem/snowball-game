"use strict";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Player {
  username: string = "";
  position: Vector = { x: 50, y: 50 };
  velocity: Vector = { x: 0, y: 0 };
  destination: Vector = { x: 0, y: 0 };
  snowball: Snowball[] = [];

  constructor(username: string, position: Vector) {
    this.username = username;
    this.position = position;
  }

  draw() {
    ctx?.translate(this.position.x, this.position.y);
    ctx?.beginPath();
    ctx?.arc(0, 0, 20, 0, Math.PI * 2);
    ctx!.fillStyle = "red";
    ctx?.fill();
    ctx?.closePath;
  }
}

class Game {
  players: Player[] = [];

  static cycle() {
    requestAnimationFrame(Game.cycle);
    console.log("zack is okay");
  }
  // function gameloop() {
  // requestAnimationFrame(gameloop);
  // logic(gameState);
  // render(gameState);
  // }
  // gameloop();
}

class Snowball {
  color: string = "";
  size: number = 0;
  position: Vector = { x: 0, y: 0 };
  velocity: Vector = { x: 0, y: 0 };
}

class Vector {
  x: number = 0;
  y: number = 0;
}

const player1 = new Player("harith", { x: 50, y: 50 });

player1.draw();

requestAnimationFrame(Game.cycle);
