export class Cell {
  constructor(x, y, spacing, ctx) {
    this.x = x;
    this.y = y;
    this.spacing = spacing;
    this.ctx = ctx;
    this.top = true;
    this.right = true;
    this.bottom = true;
    this.left = true;
    this.visited = false;
  }
  draw() {
    const x = this.x * this.spacing;
    const y = this.y * this.spacing;

    this.ctx.beginPath();
    if (this.top) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + this.spacing, y);
    }
    if (this.right) {
      this.ctx.moveTo(x + this.spacing, y);
      this.ctx.lineTo(x + this.spacing, y + this.spacing);
    }
    if (this.bottom) {
      this.ctx.moveTo(x + this.spacing, y + this.spacing);
      this.ctx.lineTo(x, y + this.spacing);
    }
    if (this.left) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + this.spacing);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }
  highlight() {
    const x = this.x * this.spacing;
    const y = this.y * this.spacing;
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random() * 1;
    this.ctx.fillStyle = `rgba(${r}, ${0}, ${0}, ${a})`;
    this.ctx.fillRect(x, y, this.spacing - 1, this.spacing - 1);
  }
  checkNeighbors(cells) {
    const neighbors = [];
    const tNeighbor = cells[this.x][this.y - 1];
    const rNeighbor = cells[this.x + 1]?.[this.y];
    const bNeighbor = cells[this.x][this.y + 1];
    const lNeighbor = cells[this.x - 1]?.[this.y];

    tNeighbor?.visited === false && neighbors.push(tNeighbor);
    rNeighbor?.visited === false && neighbors.push(rNeighbor);
    bNeighbor?.visited === false && neighbors.push(bNeighbor);
    lNeighbor?.visited === false && neighbors.push(lNeighbor);

    return neighbors.length > 0 ? neighbors[Math.floor(Math.random() * neighbors.length)] : null;
  }

  removeWalls(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    if (x === 1) {
      b.right = false;
      a.left = false;
    } else if (x === -1) {
      a.right = false;
      b.left = false;
    }

    if (y === 1) {
      b.bottom = false;
      a.top = false;

    } else if (y === -1) {
      a.bottom = false;
      b.top = false;
    }
  }

}