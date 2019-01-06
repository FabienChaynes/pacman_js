const E = 0; // Empty
const C = 1; // Coin
const P = 2; // Pill
const W = 3; // Wall

function Grid(block) {

  this.grid = [
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
    [W,C,C,C,C,C,C,C,C,C,C,C,C,W,W,C,C,C,C,C,C,C,C,C,C,C,C,W],
    [W,C,W,W,W,W,C,W,W,W,W,W,C,W,W,C,W,W,W,W,W,C,W,W,W,W,C,W],
    [W,P,W,W,W,W,C,W,W,W,W,W,C,W,W,C,W,W,W,W,W,C,W,W,W,W,P,W],
    [W,C,W,W,W,W,C,W,W,W,W,W,C,W,W,C,W,W,W,W,W,C,W,W,W,W,C,W],
    [W,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,W],
    [W,C,W,W,W,W,C,W,W,C,W,W,W,W,W,W,W,W,C,W,W,C,W,W,W,W,C,W],
    [W,C,W,W,W,W,C,W,W,C,W,W,W,W,W,W,W,W,C,W,W,C,W,W,W,W,C,W],
    [W,C,C,C,C,C,C,W,W,C,C,C,C,W,W,C,C,C,C,W,W,C,C,C,C,C,C,W],
    [W,W,W,W,W,W,C,W,W,W,W,W,E,W,W,E,W,W,W,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,W,W,W,E,W,W,E,W,W,W,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,E,E,E,E,E,E,E,E,E,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,W,W,W,W,W,W,W,W,E,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,W,W,E,E,E,E,W,W,E,W,W,C,W,W,W,W,W,W],
    [E,E,E,E,E,E,C,E,E,E,W,W,E,E,E,E,W,W,E,E,E,C,E,E,E,E,E,E],
    [W,W,W,W,W,W,C,W,W,E,W,W,E,E,E,E,W,W,E,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,W,W,W,W,W,W,W,W,E,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,E,E,E,E,E,E,E,E,E,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,W,W,W,W,W,W,W,W,E,W,W,C,W,W,W,W,W,W],
    [W,W,W,W,W,W,C,W,W,E,W,W,W,W,W,W,W,W,E,W,W,C,W,W,W,W,W,W],
    [W,C,C,C,C,C,C,C,C,C,C,C,C,W,W,C,C,C,C,C,C,C,C,C,C,C,C,W],
    [W,C,W,W,W,W,C,W,W,W,W,W,C,W,W,C,W,W,W,W,W,C,W,W,W,W,C,W],
    [W,C,W,W,W,W,C,W,W,W,W,W,C,W,W,C,W,W,W,W,W,C,W,W,W,W,C,W],
    [W,P,C,C,W,W,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,W,W,C,C,P,W],
    [W,W,W,C,W,W,C,W,W,C,W,W,W,W,W,W,W,W,C,W,W,C,W,W,C,W,W,W],
    [W,W,W,C,W,W,C,W,W,C,W,W,W,W,W,W,W,W,C,W,W,C,W,W,C,W,W,W],
    [W,C,C,C,C,C,C,W,W,C,C,C,C,W,W,C,C,C,C,W,W,C,C,C,C,C,C,W],
    [W,C,W,W,W,W,W,W,W,W,W,W,C,W,W,C,W,W,W,W,W,W,W,W,W,W,C,W],
    [W,C,W,W,W,W,W,W,W,W,W,W,C,W,W,C,W,W,W,W,W,W,W,W,W,W,C,W],
    [W,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,W],
    [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  ];
  this.block = block;

  this.show = function() {
    stroke(255);
    noStroke();
    var y = 0;
    var block = this.block;
    this.grid.forEach(function(line) {
      var x = 0;
      line.forEach(function(cell) {
        if (cell == E) {
          fill(0);
          rect(x * block, y * block, block, block)
        } else if (cell == C) {
          fill(255);
          var coinSize = block / 5
          rect(x * block + block / 2 - coinSize / 2, y * block + block / 2 - coinSize / 2, coinSize, coinSize)
        } else if (cell == P) {
          fill(255);
          var coinSize = block / 5
          ellipse(x * block + block / 2, y * block + block / 2, block / 2)
        } else if (cell == W) {
          fill(color(25,25,166));
          rect(x * block, y * block, block, block)
        }
        x += 1;
      });
      y += 1;
    });
  }

  this.collisions = function(pacman, ghosts) {
    var gridX = Math.floor(pacman.pos.x / block);
    var gridY = Math.floor(pacman.pos.y / block);
    if (pacman.pos.x % block == block / 2 && pacman.pos.y % block == block / 2) {
      if (this.grid[gridY][gridX] == C) {
        this.grid[gridY][gridX] = 0;
      } else if (this.grid[gridY][gridX] == P) {
        this.grid[gridY][gridX] = 0;
      }
    }
    ghosts.forEach(function(ghost) {
      var ghostGridX = Math.floor(ghost.pos.x / block);
      var ghostGridY = Math.floor(ghost.pos.y / block);

      if (gridX == ghostGridX && gridY == ghostGridY) {
        pacman.pos = createVector(14 * block + block / 2,
          23 * block + block / 2);
        pacman.dir = createVector(0, 0);
        pacman.nextMove = 0;
      }
    });
  }
}
