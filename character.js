function Character(color, block, startVector) {
  this.pos = createVector(startVector.x * block + block / 2,
    startVector.y * block + block / 2);
  this.r = (block / 2) - 2;
  this.dir = createVector(0, 0);
  this.nextMove = 0; // NIL, UP, RIGHT, DOWN, LEFT

  this.move = function(grid) {
    var gridX = Math.floor(this.pos.x / block);
    var gridY = Math.floor(this.pos.y / block);
    var nextX = this.pos.x + this.dir.x;
    var nextY = this.pos.y + this.dir.y;
    var nextGridX = Math.floor(this.pos.x / block) + this.dir.x;
    var nextGridY = Math.floor(this.pos.y / block) + this.dir.y;

    // If at the horizontal center of a block and wants to move up/down
    if (this.pos.x % block == block / 2 && (this.nextMove == 1 || this.nextMove == 3)) {
      var plannedYMove = this.nextMove == 1 ? -1 : 1;
      if (grid.grid[gridY + plannedYMove][gridX] != W) {
        this.dir.y = plannedYMove;
        this.dir.x = 0;
      }
    } // If at the vertical center of a block and wants to move right/left
    else if (this.pos.y % block == block / 2 && (this.nextMove == 2 || this.nextMove == 4)) {
      var plannedXMove = this.nextMove == 2 ? 1 : -1;
      if (grid.grid[gridY][gridX + plannedXMove] != W) {
        this.dir.x = plannedXMove;
        this.dir.y = 0;
      }
    }

    // If the next horizontal cell is a wall
    if (grid.grid[gridY][nextGridX] == W &&
        // If we're going to move past the middle of the current cell
        (
          (this.dir.x == 1 && (nextX) % block > block / 2) ||
          (this.dir.x == -1 && (nextX) % block < block / 2)
        )
      ) {
      this.dir.x = 0;
    }
    // If the next vertical cell is a wall
    if (grid.grid[nextGridY][gridX] == W &&
        // If we're going to move past the middle of the current cell
        (
          (this.dir.y == 1 && (nextY) % block > block / 2) ||
          (this.dir.y == -1 && (nextY) % block < block / 2)
        )
      ) {
      this.dir.y = 0;
    }

    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;

    if (this.pos.x > 28 * block) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = 28 * block;
    }
  }

  this.show = function() {
    fill(color);
    ellipse(this.pos.x, this.pos.y, this.r * 2)
  }
}
