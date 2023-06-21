import CellsFactory from "./CellsFactory";

export default class Cell {
  _neighbours = [];
  constructor(x, y, typeName) {
    this.x = x;
    this.y = y;
    this._type = CellsFactory.getCellType(typeName);
  }

  update() {
    this._type = this._type.update(this._neighbours);
  }  

  setNeighbours(cells) {
    for (let cell of cells) {
      if (Math.abs(this.x - cell.x) > 1 || Math.abs(this.y - cell.y) > 1) {
        continue;
      }
      this._neighbours.push(cell);
      if (this._neighbours.length === 8) {
        return;
      }
    }    
  }
}