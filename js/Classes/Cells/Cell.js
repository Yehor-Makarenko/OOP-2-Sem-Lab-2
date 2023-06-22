import CellsFactory from "./CellsFactory";

export default class Cell {
  _neighbours = [];
  constructor(x, y, typeName) {
    this.x = x;
    this.y = y;
    this._type = CellsFactory.getCellType(typeName);
  }

  get type() {
    return this._type;
  }

  update() {
    this._type = this._type.update(this._neighbours);
  }    

  addNeighbour(cell) {
    this._neighbours.push(cell);
  }
}