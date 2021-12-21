"use strict";
class Player {
    constructor(username, position, color) {
        this.username = "";
        this.position = new Vector(50, 50);
        this.velocity = new Vector(0, 0); // the direction the player is currently moving in
        this.destination = new Vector(0, 0);
        this.direction = new Vector(0, 0); // the last direction this player was known to be running in
        this.snowballs = [];
        this.angle = 0; // rotation angle of the player(for drawing)
        this.color = "";
        this.username = username;
        this.position = position;
        this.color = color;
    }
    draw() {
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath;
        ctx === null || ctx === void 0 ? void 0 : ctx.restore();
    }
    move() {
        this.position = this.position.add(this.velocity);
    }
    drawAndMoveSnowballs() {
        for (let j = 0; j < this.snowballs.length; j++) {
            this.snowballs[j].draw();
            this.snowballs[j].move();
        }
    }
}
class Game {
    static cycle() {
        // player movement
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < Game.players.length; i++) {
            const p = Game.players[i];
            p.draw();
            p.move();
            p.drawAndMoveSnowballs();
            if (distanceBetween(p.position, p.destination) < 10) {
                p.velocity.x = 0;
                p.velocity.y = 0;
            }
        }
        //snowball movement
        // check destination
        requestAnimationFrame(Game.cycle);
    }
}
Game.players = [];
class Snowball {
    constructor(position, velocity) {
        this.color = "";
        this.size = 0;
        this.distance = 0;
        this.position = position;
        this.velocity = velocity;
    }
    draw() {
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
        ctx.fillStyle = "lightblue";
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath;
        ctx === null || ctx === void 0 ? void 0 : ctx.restore();
    }
    move() {
        this.position = this.position.add(this.velocity);
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
//# sourceMappingURL=classes.js.map