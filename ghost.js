function Ghost(color, block, startVector) {
  this.pos = createVector(startVector.x * block + block / 2,
    startVector.y * block + block / 2);
  this.r = (block / 2) - 2;
  this.dir = createVector(0, 0);
  this.nextDir = createVector(0, 0);
  this.color = color;
}

Ghost.prototype.move = function(grid, pacman, blinky) {
  var targetPos = createVector(pacman.pos.x, pacman.pos.y);
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
  var dist = -1;
  var newDist;
  var that = this;
  var targetGridPos = createVector(Math.floor(targetPos.x / grid.block), Math.floor(targetPos.y / grid.block));

  [Ghost.prototype.tryUp, Ghost.prototype.tryLeft, Ghost.prototype.tryDown, Ghost.prototype.tryRight].forEach(function(computeFunction) {
    newDist = computeFunction.call(that, grid, targetGridPos, dist);
    if (newDist != -1 && (newDist < dist || dist == -1)) {
      dist = newDist;
    }
  });
}

Ghost.prototype.tryMove = function(grid, move, targetGridPos, dist, moveMethod) {
  var gridX = Math.floor(this.pos.x / grid.block);
  var gridY = Math.floor(this.pos.y / grid.block);

  if (Ghost.prototype.canMoveDir.call(this, grid, move)) {
    var xDist = Math.abs(gridX + move.x - targetGridPos.x);
    var yDist = Math.abs(gridY + move.y - targetGridPos.y);
    var newDist = xDist + yDist;
    if (newDist < dist || dist == -1) {
      moveMethod.call(this, grid)
      return newDist;
    }
  }
  return -1;
}

Ghost.prototype.tryUp = function(grid, targetGridPos, dist) {
  var move = createVector(0, -1);

  return Ghost.prototype.tryMove.call(this, grid, move, targetGridPos, dist, Ghost.prototype.moveUp);
}

Ghost.prototype.tryLeft = function(grid, targetGridPos, dist) {
  var move = createVector(-1, 0);

  return Ghost.prototype.tryMove.call(this, grid, move, targetGridPos, dist, Ghost.prototype.moveLeft);
}

Ghost.prototype.tryDown = function(grid, targetGridPos, dist) {
  var move = createVector(0, 1);

  return Ghost.prototype.tryMove.call(this, grid, move, targetGridPos, dist, Ghost.prototype.moveDown);
}

Ghost.prototype.tryRight = function(grid, targetGridPos, dist) {
  var move = createVector(1, 0);

  return Ghost.prototype.tryMove.call(this, grid, move, targetGridPos, dist, Ghost.prototype.moveRight);
}

Ghost.prototype.moveUp = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, createVector(0, -1));
}

Ghost.prototype.moveDown = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, createVector(0, 1));
}

Ghost.prototype.moveLeft = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, createVector(-1, 0));
}

Ghost.prototype.moveRight = function(grid) {
  return Ghost.prototype.moveDir.call(this, grid, createVector(1, 0));
}

Ghost.prototype.moveDir = function(grid, move) {
  var gridX = Math.floor(this.pos.x / grid.block);
  var gridY = Math.floor(this.pos.y / grid.block);

  if (Ghost.prototype.canMoveDir.call(this, grid, move)) {
    this.nextDir.y = move.y;
    this.nextDir.x = move.x;
    return true;
  } else {
    return false;
  }
}

Ghost.prototype.canMoveDir = function(grid, move) {
  var gridX = Math.floor(this.pos.x / grid.block);
  var gridY = Math.floor(this.pos.y / grid.block);

  // Can't go back
  if (move.x != 0 && move.x == this.dir.x * -1) {
    return false;
  }
  if (move.y != 0 && move.y == this.dir.y * -1) {
    return false;
  }

  if (grid.grid[gridY + move.y][gridX + move.x] != W) {
    return true
  } else {
    return false
  }
}

Ghost.prototype.show = function() {
  fill(this.color);
  ellipse(this.pos.x, this.pos.y, this.r * 2);
}
