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
        this.angle = 0; // rotation angle of the player(for drawing)
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
function hypo(adjacent, opposite) {
    return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}
function distanceBetween(a, b) {
    return hypo(b.x - a.x, b.y - a.y);
}
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
canvas.addEventListener("click", getMousePosition);
function getMousePosition(event) {
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
//# sourceMappingURL=script.js.map