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
  hp: number = 0;
  hpMax: number = 0;
  img: HTMLImageElement;
  radius: number;

  constructor(
    username: string,
    position: Vector,
    color: string,
    hp: number,
    hpMax: number,
    img: HTMLImageElement,
    radius: number
  ) {
    this.username = username;
    this.position = position;
    this.destination = this.position
    this.color = color;
    this.hp = hp;
    this.hpMax = hpMax;
    this.img = img;
    this.radius = radius
  }
  drawHealth() {
    ctx?.save();
    ctx?.translate(this.position.x, this.position.y);

    ctx!.fillStyle = "red";
    let width = (100 * this.hp) / this.hpMax;
    if (width < 0) {
      width = 0;
    }
    ctx?.fillRect(-28, 30, 60, 10);
    ctx!.strokeStyle = "black";
    ctx?.strokeRect(-28, 30, 60, 10);
    ctx?.restore();
  }

  drawUsername() {
    ctx!.textAlign = "center";
    ctx!.font = "18px Arial";
    ctx!.fillStyle = "black";
    ctx?.fillText(this.username, this.position.x, this.position.y);
  }



 
  draw() {
    ctx?.save();
  
    let r = this.radius  //*1.4
   
    //pctx is s second canvas/context we use to pre-rotate the player
    pctx?.save() 
    pctx?.clearRect(0,0,r*2,r*2)

    pctx?.translate(r,r)
    pctx?.rotate(this.angle)
    pctx?.translate(-r,-r)    
    pctx?.drawImage(this.img,r*.2, r*.2,r*1.8, r*1.8)
    pctx?.restore()
   
    ctx!.translate(this.position.x,this.position.y)
   
    //  ctx?.beginPath();
    //  ctx?.arc(0, 0, this.radius, 0, Math.PI * 2);
    //  ctx!.fillStyle = this.color;
    //  ctx?.fill();
    //  ctx?.stroke();
    // ctx?.closePath;
    ctx?.drawImage(pCanvas,-r, -r,r*2, r*2)
    
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
    ctx?.beginPath();
    ctx?.moveTo(this.target.x, this.target.y);
    ctx?.lineTo(this.position.x, this.position.y);
    ctx!.strokeStyle = "black";
    ctx!.lineWidth = 2;
    ctx?.stroke();
  }
  runToPoint(destination: Vector) {
    let p = Game.players[0];
    p.destination = destination
    // Do nothing if we are already at the point, otherwise we would get an division by 0 error
    if (distanceBetween(p.position, p.destination) < 0.01) {return}
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
    const mouseCoord: Vector = new Vector(target.x, target.y);

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
        if(dbt < 0.01) {
          otherPlayer.position.x += 2
        }
        let overlap = 60 - dbt;
        if (overlap > 0) {
          isOverlap = true;
          let vectorBetween = this.position.subtract(otherPlayer.position);
          let directionBetween = vectorBetween.normalise();
          otherPlayer.position = otherPlayer.position.subtract(
            directionBetween.multiply(overlap + 1)
          );
        }
      }
    }
    return isOverlap;
  }

  movePlayerAroundObstacles() {
    for (let i = 0; i < Game.obstacles.length; i++) {
      const obstacle = Game.obstacles[i]
      let dbt = distanceBetween(this.position, obstacle.position);
      let overlap = obstacle.radius * 2 - dbt ;
      // let isObstacle = false
      if (overlap > 0) {
        // isObstacle = true
        let vectorBetween = this.position.subtract(obstacle.position);
        let directionBetween = vectorBetween.normalise();
        this.position = this.position.add(directionBetween.multiply(overlap))
        // if (isObstacle) {
          this.runToPoint(this.destination)
        // }
      }
   
    }
  }
}

class Game {
  static players: Player[] = [];
  static obstacles: Obstacle[] = [];
  static cycle() {
    ctx?.resetTransform();
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    Camera.update(Game.players[0].position);
    for (let i = 0; i < Game.players.length; i++) {
      const p = Game.players[i];
   
      p.draw();
      p.move();
      p.drawAndMoveSnowballs();
      p.drawHealth();
      p.drawUsername();
      p.movePlayerAroundObstacles();
      while (p.pushOtherPlayersAway()) {}
      if (distanceBetween(p.position, p.destination) < 50 && mouseBtnDown == true) {
        p.drawAimLine();
        p.velocity.x = 0;
        p.velocity.y = 0;
      } 
      else if (distanceBetween(p.position, p.destination) < 20) {
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
    ctx!.fillStyle = "snow";
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
    return new Vector(this.x * m, this.y * m);
  }
  subtract(v: Vector): Vector {
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
  position: Vector;
  radius: number;
  color: string = "";
  img: HTMLImageElement;

  constructor(
    position: Vector,
    radius: number,
    color: string,
    img: HTMLImageElement
  ) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.img = img;
  }

  draw() {
    ctx?.save();
    ctx?.translate(this.position.x, this.position.y);

    // ctx?.beginPath();
    // ctx?.arc(0, 0, this.radius, 0, Math.PI * 2);
    // ctx!.fillStyle = this.color;
    // ctx?.fill();
    // ctx?.stroke();
    // ctx?.closePath;
    let r = this.radius * 1.4;
    ctx?.drawImage(this.img, -r, -r, r * 2, r * 2);
    ctx?.restore();
  }
}

class Camera {
  static focus: Vector = new Vector(0, 0);

  static update(v: Vector) {
    Camera.focus = v;
    ctx?.translate(-v.x + canvas.width / 2, -v.y + canvas.height / 2);
  }
}
