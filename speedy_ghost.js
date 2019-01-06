// Targets the tile two tiles in fromt of pacman
function SpeedyGhost(color, block, startVector) {
  Ghost.call(this, color, block, startVector);
}
SpeedyGhost.prototype = Object.create(Ghost.prototype);

SpeedyGhost.prototype.move = function(grid, pacman) {
  var targetPos = createVector(pacman.pos.x, pacman.pos.y);

  if (pacman.dir.x != 0) {
    targetPos.x += pacman.dir.x * 2 * grid.block;
  }
  if (pacman.dir.y != 0) {
    targetPos.y += pacman.dir.y * 2 * grid.block;
  }

  Ghost.prototype.moveTo.call(this, grid, targetPos);
}
