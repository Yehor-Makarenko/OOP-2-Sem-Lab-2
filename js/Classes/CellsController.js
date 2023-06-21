import Cell from "./Cell";

export default class CellsController {  
  _cells = [];
  static _instance;

  static getInstance() {
    if(this._instance) {
      return this._instance;
    }
    this._instance = new Cells();    
  }

  addCell(x, y, typeName) {
    const cell = new Cell(x, y, typeName);
    this._cells.push(cell);
  }

  setNeighbours() {
    for (let cell of this._cells) {
      cell.setNeighbours(this._cells);
    }
  }

  update() {
    for (let cell of this._cells) {
      cell.update();
    }
  }
}