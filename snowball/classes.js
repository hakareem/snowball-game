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
        this.target = new Vector(0, 0); // populate that during mouse movement
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
        for (let i = 0; i < this.snowballs.length; i++) {
            this.snowballs[i].move();
            this.snowballs[i].draw();
        }
    }
    drawAimLine() {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(this.target.x, this.target.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(this.position.x, this.position.y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
    runToPoint(target) {
        let p = Game.players[0];
        p.destination.x = target.x;
        p.destination.y = target.y;
        let adjacent = p.destination.x - p.position.x;
        let opposite = p.destination.y - p.position.y;
        p.angle = -Math.atan2(-opposite, adjacent) - Math.PI / 2;
        let hypotenuse = hypo(adjacent, opposite);
        p.velocity.x = (adjacent / hypotenuse) * 5;
        p.velocity.y = (opposite / hypotenuse) * 5;
        p.direction = new Vector(p.velocity.x, p.velocity.y);
    }
    shootSnowball(target) {
        const p = Game.players[0];
        // get the position of the player and when we click within 10px of the player then shoot a snowball and don't go to the position
        const mouseCoord = new Vector(target.x, target.y);
        if (distanceBetween(mouseCoord, p.position) <= 20) {
            p.snowballs.push(new Snowball(p.position, p.direction));
            // p.direction only becomes a reference to p.velocity this is why p.velocity sets p.dircetion's value to 0 after running
            // We creating a shiny new vector for p.direction so it creates a new vector with  the values of p.velocity
        }
    }
}
class Game {
    static cycle() {
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < Game.players.length; i++) {
            const p = Game.players[i];
            p.draw();
            p.move();
            p.drawAndMoveSnowballs();
            if (distanceBetween(p.position, p.destination) < 50 && mouseBtnDown == true) {
                p.drawAimLine();
                p.velocity.x = 0;
                p.velocity.y = 0;
                // if (inAimingMode == true && isDrawing == true) {
                //   p.drawAndMoveSnowballs()
                //   p.shootSnowball(p.target)
                // }
            }
            else if (distanceBetween(p.position, p.destination) < 20) {
                // p.drawAndMoveSnowballs();
                p.velocity.x = 0;
                p.velocity.y = 0;
            }
        }
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
        ctx.fillStyle = "hotpink";
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
    multiply(m) {
        return new Vector(this.x * m, this.y * m);
    }
    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    normalise() {
        return new Vector(this.x / this.length, this.y / this.length);
    }
    get length() {
        return hypo(this.x, this.y);
    }
}
//# sourceMappingURL=classes.js.map