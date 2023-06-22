import Cell from "./Cell";
import CellsFactory from "./CellsFactory";

export default class CellsController {  
  _cells = [];
  static _instance;

  static getInstance() {
    if(this._instance) {
      return this._instance;
    }
    this._instance = new CellsController();    
  }

  addCellType(typeName, neighborhood, rules) {
    CellsFactory.addCellType(typeName, neighborhood, rules);
  }

  addCell(x, y, typeName) {
    const cell = new Cell(x, y, typeName);
    this._cells.push(cell);
  }

  setNeighbours() {
    for (let cell1 of this._cells) {
      const neighborhood = cell1.type.neighborhood;

      for (let cell2 of this._cells) {
        if (!neighborhood.isNeighbours(cell1, cell2) || cell1 === cell2) {
          continue;
        }
        cell1.addNeighbour(cell2);
      }    
    }
  }

  update() {
    for (let cell of this._cells) {
      cell.update();
    }
  }
}