import { Cell } from './Cell.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const spacing = 5;
const cells = [];//new Line(0, 0, spacing, 0, spacing, ctx);
const stack = [];
let current;
let ms;
let done = false;
let anim;

init();

function init() {
  presetCanvas(800, 800);
  fillCells();
  current = cells[0][0];
  anim = window.requestAnimationFrame(draw);
}



function presetCanvas(width, height) {
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "1px solid black";
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fillCells() {
  for (let i = 0; i < canvas.width / spacing; i++) {
    cells.push([]);
    for (let j = 0; j < canvas.height / spacing; j++) {
      cells[i][j] = new Cell(i, j, spacing, ctx);
    }
  }
}

function draw(m) {

  if (done) cancelAnimationFrame(anim);

  if (!ms) {
    ms = m;
  }

  // if (m - ms > 1000) {
  ms = m;
  clearCanvas();
  current.highlight();
  current.visited = true;
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      cells[i][j].draw();
    }
  }
  const next = current.checkNeighbors(cells);

  if (next) {
    current.removeWalls(current, next);
    stack.push(current);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  // }
  window.requestAnimationFrame(draw);
}