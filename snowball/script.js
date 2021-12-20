"use strict";
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
class Player {
    constructor(username, position) {
        this.username = "";
        this.position = { x: 50, y: 50 };
        this.velocity = { x: 0, y: 0 };
        this.destination = { x: 0, y: 0 };
        this.snowball = [];
        this.username = username;
        this.position = position;
    }
    draw() {
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath;
    }
}
class Game {
    constructor() {
        this.players = [];
        // function gameloop() {
        // requestAnimationFrame(gameloop);
        // logic(gameState);
        // render(gameState);
        // }
        // gameloop();
    }
    static cycle() {
        requestAnimationFrame(Game.cycle);
        console.log("zack is okay");
    }
}
class Snowball {
    constructor() {
        this.color = "";
        this.size = 0;
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
    }
}
class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const player1 = new Player("harith", { x: 50, y: 50 });
player1.draw();
requestAnimationFrame(Game.cycle);
//# sourceMappingURL=script.js.map