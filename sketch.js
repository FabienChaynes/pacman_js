var pacman;
var blinky;
var pinky;
var inky;
var clyde;
var ghosts;
var grid;

function setup() {
  // frameRate(5) // DEBUG
  var block = 16;
  createCanvas(block * 28, block * 31);

  grid = new Grid(block);
  pacman = new Character(color(255,  238, 0), block, createVector(14, 23));
  blinky = new Ghost(color(253, 0, 0), block, createVector(13, 11));
  pinky = new SpeedyGhost(color(234, 130, 229), block, createVector(14, 11));
  inky = new BashfulGhost(color(70, 191, 238), block, createVector(15, 11));
  clyde = new PokeyGhost(color(219, 133, 28), block, createVector(16, 11));
  ghosts = [blinky, pinky, inky, clyde];
}

function draw() {
  background(0);
  pacman.move(grid);
  ghosts.forEach(function(ghost) {
    ghost.move(grid, pacman, blinky);
  });
  grid.collisions(pacman, ghosts);
  grid.show();
  ghosts.forEach(function(ghost) {
    ghost.show();
  });
  pacman.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    pacman.nextMove = 1;
  } else if (keyCode === DOWN_ARROW) {
    pacman.nextMove = 3;
  } else if (keyCode === RIGHT_ARROW) {
    pacman.nextMove = 2;
  } else if (keyCode === LEFT_ARROW) {
    pacman.nextMove = 4;
  }
}
