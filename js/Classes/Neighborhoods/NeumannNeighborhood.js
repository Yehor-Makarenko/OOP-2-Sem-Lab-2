export default class NeumannNeighborhood {
  constructor(range = 1) {
    this._range = range;
  }

  isNeighbours(cell1, cell2) {
    return Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y) <= this._range;
  }
}