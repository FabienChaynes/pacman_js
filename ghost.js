function Ghost(color, block, startVector) {
  this.pos = createVector(startVector.x * block + block / 2,
    startVector.y * block + block / 2);
  this.r = (block / 2) - 2;
  this.dir = createVector(0, 0);
  this.nextDir = createVector(0, 0);
  this.color = color;

  this.move = function(grid, pacman, name, blinky) {
    var targetPos = createVector(pacman.pos.x, pacman.pos.y);

    if (name == 'p') {
      if (pacman.dir.x != 0) {
        targetPos.x += pacman.dir.x * 2 * block;
      }
      if (pacman.dir.y != 0) {
        targetPos.y += pacman.dir.y * 2 * block;
      }
    }

    if (name == 'c') {
      var gridX = Math.floor(this.pos.x / block);
      var gridY = Math.floor(this.pos.y / block);
      var targetGridX = Math.floor(pacman.pos.x / block);
      var targetGridY = Math.floor(pacman.pos.y / block);
      var xDist = Math.abs(gridX - targetGridX);
      var yDist = Math.abs(gridY - 1 - targetGridY);
      if (xDist + yDist < 8) {
        targetPos.x = 0;
        targetPos.y = 32 * block;
      }
    }

    if (name == 'i') {
      if (pacman.dir.x != 0) {
        targetPos.x += pacman.dir.x * 2 * block;
      }
      if (pacman.dir.y != 0) {
        targetPos.y += pacman.dir.y * 2 * block;
      }

      targetPos.x += (targetPos.x - blinky.pos.x)
      targetPos.y += (targetPos.y - blinky.pos.y)
    }

    this.moveTo(grid, targetPos);
  }

  this.moveTo = function(grid, targetPos) {
    // If at the center of a block, calc move
    if (this.pos.x % block == block / 2 && this.pos.y % block == block / 2) {
      this.nextDir.x = 0;
      this.nextDir.y = 0;
      this.chooseMove(grid, targetPos);
      this.dir.x = this.nextDir.x;
      this.dir.y = this.nextDir.y;
    }
    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;

    // Teleportation case
    if (this.pos.x > 28 * block) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = 28 * block;
    }
  }

  this.chooseMove = function(grid, targetPos) {
    var gridX = Math.floor(this.pos.x / block);
    var gridY = Math.floor(this.pos.y / block);
    var targetGridX = Math.floor(targetPos.x / block);
    var targetGridY = Math.floor(targetPos.y / block);
    var dist = 10000000000;

    // UP
    if (this.canMoveDir(grid, 0, -1)) {
      var xDist = Math.abs(gridX - targetGridX);
      var yDist = Math.abs(gridY - 1 - targetGridY);
      var newDist = xDist + yDist;
      if (newDist < dist) {
        dist = newDist;
        this.moveUp(grid)
      }
    }
    // LEFT
    if (this.canMoveDir(grid, -1, 0)) {
      var xDist = Math.abs(gridX - 1 - targetGridX);
      var yDist = Math.abs(gridY - targetGridY);
      var newDist = xDist + yDist;
      if (newDist < dist) {
        dist = newDist;
        this.moveLeft(grid)
      }
    }
    // DOWN
    if (this.canMoveDir(grid, 0, 1)) {
      var xDist = Math.abs(gridX - targetGridX);
      var yDist = Math.abs(gridY + 1 - targetGridY);
      var newDist = xDist + yDist;
      if (newDist < dist) {
        dist = newDist;
        this.moveDown(grid)
      }
    }
    // RIGHT
    if (this.canMoveDir(grid, 1, 0)) {
      var xDist = Math.abs(gridX + 1 - targetGridX);
      var yDist = Math.abs(gridY - targetGridY);
      var newDist = xDist + yDist;
      if (newDist < dist) {
        dist = newDist;
        this.moveRight(grid)
      }
    }
  }

  this.moveUp = function(grid) {
    return this.moveDir(grid, 0, -1);
  }

  this.moveDown = function(grid) {
    return this.moveDir(grid, 0, 1);
  }

  this.moveLeft = function(grid) {
    return this.moveDir(grid, -1, 0);
  }

  this.moveRight = function(grid) {
    return this.moveDir(grid, 1, 0);
  }

  this.moveDir = function(grid, xMove, yMove) {
    var gridX = Math.floor(this.pos.x / block);
    var gridY = Math.floor(this.pos.y / block);

    if (this.canMoveDir(grid, xMove, yMove)) {
      this.nextDir.y = yMove;
      this.nextDir.x = xMove;
      return true;
    } else {
      return false;
    }
  }

  this.canMoveDir = function(grid, xMove, yMove) {
    var gridX = Math.floor(this.pos.x / block);
    var gridY = Math.floor(this.pos.y / block);

    // Can't go back
    if (xMove != 0 && xMove == this.dir.x * -1) {
      return false;
    }
    if (yMove != 0 && yMove == this.dir.y * -1) {
      return false;
    }

    if (grid.grid[gridY + yMove][gridX + xMove] != W) {
      return true
    } else {
      return false
    }
  }

  this.show = function() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
