export default class NeumannNeighborhood {
  constructor(range = 1, fieldSize) {
    this._range = range;
    this._fieldSize = fieldSize;
  }

  isNeighbours(cell1, cell2) {
    let d1 = Math.abs(Math.abs(cell1.x - cell2.x) - this._fieldSize / 2);
    let d2 = Math.abs(Math.abs(cell1.y - cell2.y) - this._fieldSize / 2);
    return this._fieldSize - d1 - d2
  }
}