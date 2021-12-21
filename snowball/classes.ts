class Player {
  username: string = "";
  position: Vector = new Vector(50, 50);
  velocity: Vector = new Vector(0, 0); // the direction the player is currently moving in
  destination: Vector = new Vector(0, 0);
  direction: Vector = new Vector(0, 0); // the last direction this player was known to be running in
  snowballs: Snowball[] = [];
  angle: number = 0; // rotation angle of the player(for drawing)
  color: string = "";

  constructor(username: string, position: Vector, color: string) {
    this.username = username;
    this.position = position;
    this.color = color;
  }

  draw() {
    ctx?.save();
    ctx?.translate(this.position.x, this.position.y);
    ctx?.beginPath();
    ctx?.arc(0, 0, 30, 0, Math.PI * 2);
    ctx!.fillStyle = this.color;
    ctx?.fill();
    ctx?.stroke();
    ctx?.closePath;
    ctx?.restore();
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
  static players: Player[] = [];

  static cycle() {
    // player movement
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

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

class Snowball {
  color: string = "";
  size: number = 0;
  position: Vector;
  velocity: Vector;
  distance: number = 0;

  constructor(position: Vector, velocity: Vector) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    ctx?.save();
    ctx?.translate(this.position.x, this.position.y);
    ctx?.beginPath();
    ctx?.arc(0, 0, 8, 0, Math.PI * 2);
    ctx?.stroke();
    ctx!.fillStyle = "lightblue";
    ctx?.fill();
    ctx?.closePath;
    ctx?.restore();
  }
  move() {
    this.position = this.position.add(this.velocity);
  }
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
