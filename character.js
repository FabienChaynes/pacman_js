function Character(color, block, startVector) {
  this.pos = createVector(startVector.x * block + block / 2,
    startVector.y * block + block / 2);
  this.r = (block / 2) - 2;
  this.dir = createVector(0, 0);
  this.nextMove = 0; // NIL, UP, RIGHT, DOWN, LEFT

  this.move = function(grid) {
    // If at the center of a block, calc move
    if (this.pos.x % block == block / 2 && this.pos.y % block == block / 2) {
      if (this.nextMove == 1 || this.nextMove == 3) {
        var plannedYMove = this.nextMove == 1 ? -1 : 1;
        if (this.canMoveDir(grid, 0, plannedYMove)) {
          this.dir.y = plannedYMove;
          this.dir.x = 0;
        }
      } else if (this.nextMove == 2 || this.nextMove == 4) {
        var plannedXMove = this.nextMove == 2 ? 1 : -1;
        if (this.canMoveDir(grid, plannedXMove, 0)) {
          this.dir.y = 0;
          this.dir.x = plannedXMove;
        }
      }
      if (!this.canMoveDir(grid, this.dir.x, this.dir.y)) {
        this.dir.y = 0;
        this.dir.x = 0;
      }
    }

    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;

    this.teleports();
  }

  this.canMoveDir = function(grid, xMove, yMove) {
    var gridX = Math.floor(this.pos.x / block);
    var gridY = Math.floor(this.pos.y / block);

    if (grid.grid[gridY + yMove][gridX + xMove] != W) {
      return true
    } else {
      return false
    }
  }

  this.teleports = function() {
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
