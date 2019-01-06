// Follows pacman, but goes to the bottom left corner when it's too close
function PokeyGhost(color, block, startVector) {
  Ghost.call(this, color, block, startVector);
}
PokeyGhost.prototype = Object.create(Ghost.prototype);

PokeyGhost.prototype.move = function(grid, pacman) {
  var targetPos = createVector(pacman.pos.x, pacman.pos.y);

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

 Ghost.prototype.moveTo.call(this, grid, targetPos);
}
