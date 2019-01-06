// Targets the tile at the opposite of blinky using pacman + 2 tiles as the center of the translation
function BashfulGhost(color, block, startVector) {
  Ghost.call(this, color, block, startVector);
}
BashfulGhost.prototype = Object.create(Ghost.prototype);

BashfulGhost.prototype.move = function(grid, pacman, blinky) {
  var targetPos = createVector(pacman.pos.x, pacman.pos.y);

  // Targets the tile 2 tiles in fromt of pacman
  targetPos.x += pacman.dir.x * 2 * grid.block;
  targetPos.y += pacman.dir.y * 2 * grid.block;

  // Doubles the vector
  targetPos.x += (targetPos.x - blinky.pos.x)
  targetPos.y += (targetPos.y - blinky.pos.y)

  Ghost.prototype.moveTo.call(this, grid, targetPos);
}
