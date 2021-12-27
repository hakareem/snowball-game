"use strict";
class Player {
    constructor(username, position, color, hp, hpMax) {
        this.username = "";
        this.position = new Vector(50, 50);
        this.velocity = new Vector(0, 0); // the direction the player is currently moving in
        this.destination = new Vector(0, 0);
        this.direction = new Vector(0, 0); // the last direction this player was known to be running in
        this.snowballs = [];
        this.angle = 0; // rotation angle of the player(for drawing)
        this.color = "";
        this.target = new Vector(0, 0); // populate that during mouse movement
        this.hp = 0;
        this.hpMax = 0;
        this.username = username;
        this.position = position;
        this.color = color;
        this.hp = hp;
        this.hpMax = hpMax;
    }
    drawHealth() {
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        ctx.fillStyle = "red";
        let width = (100 * this.hp) / this.hpMax;
        if (width < 0) {
            width = 0;
        }
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(-28, 30, 60, 10);
        ctx.strokeStyle = "black";
        ctx === null || ctx === void 0 ? void 0 : ctx.strokeRect(-28, 30, 60, 10);
        ctx === null || ctx === void 0 ? void 0 : ctx.restore();
    }
    drawUsername() {
        ctx.textAlign = "center";
        ctx.font = "18px Arial";
        ctx.fillStyle = "black";
        ctx === null || ctx === void 0 ? void 0 : ctx.fillText(this.username, this.position.x, this.position.y);
    }
    draw() {
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        // const img = <HTMLImageElement>document.getElementById("player");
        // ctx?.drawImage(img, 10, 10);
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
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
    runToPoint(target) {
        let p = Game.players[0];
        let p1 = Game.players[1];
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
        const mouseCoord = new Vector(target.x, target.y);
        if (distanceBetween(mouseCoord, p.position) <= 20) {
            p.snowballs.push(new Snowball(p.position, p.direction));
        }
    }
    pushOtherPlayersAway() {
        let isOverlap = false;
        for (let i = 0; i < Game.players.length; i++) {
            const otherPlayer = Game.players[i];
            if (otherPlayer != this) {
                let dbt = distanceBetween(this.position, otherPlayer.position);
                let overlap = 60 - dbt;
                if (overlap > 0) {
                    isOverlap = true;
                    let vectorBetween = this.position.subtract(otherPlayer.position);
                    let directionBetween = vectorBetween.normalise();
                    otherPlayer.position = otherPlayer.position.subtract(directionBetween.multiply(overlap + 1));
                }
            }
        }
        return isOverlap;
    }
    movePlayersAroundObstacles() {
        for (let i = 0; i < Game.obstacles.length; i++) {
            const obstacles = Game.obstacles[i];
            let dbt = distanceBetween(this.position, obstacles.position);
            // let overlap = 110
            console.log(dbt);
            console.log(obstacles.position);
            console.log(this.position);
            // if (dbt > 45 && dbt > 70) {
            //   console.log(dbt)
            //   let vectorBetween = this.position.subtract(obstacles.position);
            //   let directionBetween = vectorBetween.normalise();
            //   this.position = this.position.subtract(
            //   directionBetween.multiply(overlap + 1)
            //   );
            // }
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
            p.drawHealth();
            p.drawUsername();
            p.movePlayersAroundObstacles();
            while (p.pushOtherPlayersAway()) { }
            if (distanceBetween(p.position, p.destination) < 50 &&
                mouseBtnDown == true) {
                p.drawAimLine();
                p.velocity.x = 0;
                p.velocity.y = 0;
            }
            else if (distanceBetween(p.position, p.destination) < 20) {
                // p.drawAndMoveSnowballs();
                p.velocity.x = 0;
                p.velocity.y = 0;
            }
        }
        Game.drawObstacles();
        requestAnimationFrame(Game.cycle);
    }
    static drawObstacles() {
        for (let i = 0; i < Game.obstacles.length; i++) {
            Game.obstacles[i].draw();
        }
    }
}
Game.players = [];
Game.obstacles = [];
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
        ctx.fillStyle = "snow";
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
class Obstacle {
    constructor(position, radius, color) {
        this.color = "";
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(this.position.x, this.position.y);
        const img = document.getElementById("trees");
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, -110, -110);
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx === null || ctx === void 0 ? void 0 : ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath;
        ctx === null || ctx === void 0 ? void 0 : ctx.restore();
    }
}
//# sourceMappingURL=classes.js.map