export default class MooreNeighborhood {
  constructor(range = 1, fieldSize) {
    this._range = range;
    this._fieldSize = fieldSize;    
  }

  getNeighbours(cell, allCells) {
    const neighbours = [];
    let xTor, yTor;

    for (let i = -this._range; i <= this._range; i++) {
      for (let j = -this._range; j <= this._range; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        xTor = (cell.x + j + this._fieldSize) % this._fieldSize;
        yTor = (cell.y + i + this._fieldSize) % this._fieldSize;  
        neighbours.push(allCells[yTor * this._fieldSize + xTor]);
      }
    }

    return neighbours;
  }
}