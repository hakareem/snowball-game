"use strict";
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
class Player {
    constructor(username, position) {
        this.username = "";
        this.position = new Vector(50, 50);
        this.velocity = new Vector(3, 3);
        this.destination = new Vector(0, 0);
        this.snowball = [];
        this.username = username;
        this.position = position;
    }
    draw() {
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath;
        ctx === null || ctx === void 0 ? void 0 : ctx.restore();
    }
    move() {
        this.position = this.position.add(this.velocity);
        // this.position.x += this.velocity.x;
        // this.position.y += this.velocity.y;
    }
}
class Game {
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
Game.players = [];
class Snowball {
    constructor() {
        this.color = "";
        this.size = 0;
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
    }
}
class Vector {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
}
const player1 = new Player("harith", new Vector(100, 100));
Game.players.push(player1);
requestAnimationFrame(Game.cycle);
//# sourceMappingURL=script.js.map