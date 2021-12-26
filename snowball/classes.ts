class Player {
  username: string = "";
  position: Vector = new Vector(50, 50);
  velocity: Vector = new Vector(0, 0); // the direction the player is currently moving in
  destination: Vector = new Vector(0, 0);
  direction: Vector = new Vector(0, 0); // the last direction this player was known to be running in
  snowballs: Snowball[] = [];
  angle: number = 0; // rotation angle of the player(for drawing)
  color: string = "";
  target: Vector = new Vector(0, 0); // populate that during mouse movement

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
    for (let i = 0; i < this.snowballs.length; i++) {
      this.snowballs[i].move();
      this.snowballs[i].draw();
    }
  }
  drawAimLine() {
    ctx?.beginPath()
    ctx?.moveTo(this.target.x, this.target.y)
    ctx?.lineTo(this.position.x, this.position.y)
    ctx!.strokeStyle = "red"
    ctx!.lineWidth = 2
    ctx?.stroke()

  }
  runToPoint(target: Vector) {
    let p = Game.players[0];
    let p1 = Game.players[1]
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
  shootSnowball(target: Vector) {
    const p = Game.players[0];
    // get the position of the player and when we click within 10px of the player then shoot a snowball and don't go to the position
    const mouseCoord: Vector = new Vector(target.x, target.y);

    if (distanceBetween(mouseCoord, p.position) <= 20) {
      p.snowballs.push(new Snowball(p.position, p.direction));
      // p.direction only becomes a reference to p.velocity this is why p.velocity sets p.dircetion's value to 0 after running
      // We creating a shiny new vector for p.direction so it creates a new vector with  the values of p.velocity
    }
  }
  pushOtherPlayersAway():boolean {
    let isOverlap = false
    // const p = Game.players[0];
    for(let i = 0; i < Game.players.length; i++) {
      const otherPlayer = Game.players[i]
      if (otherPlayer != this) {
        let op = otherPlayer.position
        let dbt = distanceBetween(this.position, otherPlayer.position)
        let overlap:number = 60 - dbt
        if (overlap > 0) {
          isOverlap = true
          let vectorBetween = this.position.subtract(otherPlayer.position)
          console.log(overlap)
          let directionBetween = vectorBetween.normalise()
          otherPlayer.position = otherPlayer.position.subtract(directionBetween.multiply(overlap + 1))
        }
      }
    }
  return isOverlap
}
}

class Game {
  static players: Player[] = [];
  static players1: Player[] = [];

  static cycle() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < Game.players.length; i++) {
      const p = Game.players[i];
      p.draw();
      p.move();
      p.drawAndMoveSnowballs();
      while (p.pushOtherPlayersAway()){}
      if (distanceBetween(p.position, p.destination) < 50 && mouseBtnDown == true) {
        p.drawAimLine()
        p.velocity.x = 0;
        p.velocity.y = 0;
      }
      else if (distanceBetween(p.position, p.destination) < 20) {
        p.velocity.x = 0
        p.velocity.y = 0
      }
    }
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
    ctx!.fillStyle = "hotpink";
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

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  multiply(m: number): Vector {
    return new Vector(this.x * m, this.y * m)
  }
  subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y)
  }
  normalise() {
    return new Vector(this.x / this.length, this.y / this.length)
  }
  get length() {
    return hypo(this.x, this.y)
  }
}