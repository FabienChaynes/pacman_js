function Ghost(color, block, startVector) {
  this.pos = createVector(startVector.x * block + block / 2,
    startVector.y * block + block / 2);
  this.r = (block / 2) - 2;
  this.dir = createVector(0, 0);
  this.nextDir = createVector(0, 0);
  this.color = color;
}

Ghost.prototype.move = function(grid, pacman, name, blinky) {
  var targetPos = createVector(pacman.pos.x, pacman.pos.y);

  if (name == 'p') {
    if (pacman.dir.x != 0) {
      targetPos.x += pacman.dir.x * 2 * grid.block;
    }
    if (pacman.dir.y != 0) {
      targetPos.y += pacman.dir.y * 2 * grid.block;
    }
  }

  if (name == 'c') {
    var gridX = Math.floor(this.pos.x / grid.block);
    var gridY = Math.floor(this.pos.y / grid.block);
    var targetGridX = Math.floor(pacman.pos.x / grid.block);
    var targetGridY = Math.floor(pacman.pos.y / grid.block);
    var xDist = Math.abs(gridX - targetGridX);
    var yDist = Math.abs(gridY - 1 - targetGridY);
    if (xDist + yDist < 8) {
      targetPos.x = 0;
      targetPos.y = 32 * grid.block;
    }
  }

  if (name == 'i') {
    if (pacman.dir.x != 0) {
      targetPos.x += pacman.dir.x * 2 * grid.block;
    }
    if (pacman.dir.y != 0) {
      targetPos.y += pacman.dir.y * 2 * grid.block;
    }

    targetPos.x += (targetPos.x - blinky.pos.x)
    targetPos.y += (targetPos.y - blinky.pos.y)
  }

  Ghost.prototype.moveTo.call(this, grid, targetPos);
}

Ghost.prototype.moveTo = function(grid, targetPos) {
  // If at the center of a block, calc move
  if (this.pos.x % grid.block == grid.block / 2 && this.pos.y % grid.block == grid.block / 2) {
    this.nextDir.x = 0;
    this.nextDir.y = 0;
    this.chooseMove(grid, targetPos);
    this.dir.x = this.nextDir.x;
    this.dir.y = this.nextDir.y;
  }
  this.pos.x += this.dir.x;
  this.pos.y += this.dir.y;

  Ghost.prototype.teleports.call(this, grid);
}

Ghost.prototype.teleports = function(grid) {
  if (this.pos.x > 28 * grid.block) {
    this.pos.x = 0;
  } else if (this.pos.x < 0) {
    this.pos.x = 28 * grid.block;
  }
}

Ghost.prototype.chooseMove = function(grid, targetPos) {
  var gridX = Math.floor(this.pos.x / grid.block);
  var gridY = Math.floor(this.pos.y / grid.block);
  var targetGridX = Math.floor(targetPos.x / grid.block);
  var targetGridY = Math.floor(targetPos.y / grid.block);
  var dist = -1;

  // UP
  if (Ghost.prototype.canMoveDir.call(this, grid, 0, -1)) {
    var xDist = Math.abs(gridX - targetGridX);
    var yDist = Math.abs(gridY - 1 - targetGridY);
    var newDist = xDist + yDist;
    if (newDist < dist || dist == -1) {
      dist = newDist;
      Ghost.prototype.moveUp.call(this, grid)
    }
  }
  // LEFT
  if (Ghost.prototype.canMoveDir.call(this, grid, -1, 0)) {
    var xDist = Math.abs(gridX - 1 - targetGridX);
    var yDist = Math.abs(gridY - targetGridY);
    var newDist = xDist + yDist;
    if (newDist < dist || dist == -1) {
      dist = newDist;
      Ghost.prototype.moveLeft.call(this, grid)
    }
  }
  // DOWN
  if (Ghost.prototype.canMoveDir.call(this, grid, 0, 1)) {
    var xDist = Math.abs(gridX - targetGridX);
    var yDist = Math.abs(gridY + 1 - targetGridY);
    var newDist = xDist + yDist;
    if (newDist < dist || dist == -1) {
      dist = newDist;
      Ghost.prototype.moveDown.call(this, grid)
    }
  }
  // RIGHT
  if (Ghost.prototype.canMoveDir.call(this, grid, 1, 0)) {
    var xDist = Math.abs(gridX + 1 - targetGridX);
    var yDist = Math.abs(gridY - targetGridY);
    var newDist = xDist + yDist;
    if (newDist < dist || dist == -1) {
      dist = newDist;
      Ghost.prototype.moveRight.call(this, grid)
    }
  }
}

Ghost.prototype.moveUp = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, 0, -1);
}

Ghost.prototype.moveDown = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, 0, 1);
}

Ghost.prototype.moveLeft = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, -1, 0);
}

Ghost.prototype.moveRight = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, 1, 0);
}

Ghost.prototype.moveDir = function(grid, xMove, yMove) {
  var gridX = Math.floor(this.pos.x / grid.block);
  var gridY = Math.floor(this.pos.y / grid.block);

  if (Ghost.prototype.canMoveDir.call(this, grid, xMove, yMove)) {
    this.nextDir.y = yMove;
    this.nextDir.x = xMove;
    return true;
  } else {
    return false;
  }
}

Ghost.prototype.canMoveDir = function(grid, xMove, yMove) {
  var gridX = Math.floor(this.pos.x / grid.block);
  var gridY = Math.floor(this.pos.y / grid.block);

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

Ghost.prototype.show = function() {
  fill(this.color);
  ellipse(this.pos.x, this.pos.y, this.r * 2);
}
