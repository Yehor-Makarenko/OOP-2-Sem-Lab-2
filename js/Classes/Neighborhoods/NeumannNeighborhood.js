export default class NeumannNeighborhood {
  constructor(range = 1, fieldSize) {
    this._range = range;
    this._fieldSize = fieldSize;
  }

  getNeighbours(cell, allCells) {
    const neighbours = [];
    const multipliers = [-1, 1];
    let xTor, yTor;    

    for (let i = 0; i <= this._range; i++) {
      for (let j = 0; j <= i; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        for (let m1 of multipliers) {
          for (let m2 of multipliers) {
            xTor = (cell.x + j * m1 + this._fieldSize) % this._fieldSize;
            yTor = (cell.y + i * m2 + this._fieldSize) % this._fieldSize;            
            neighbours.push(allCells[yTor * this._fieldSize + xTor]);
          }
        }
      }
    }

    return neighbours;
  }
}