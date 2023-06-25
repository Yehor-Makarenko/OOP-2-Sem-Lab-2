import Cell from "./Cell.js";
import StatesFactory from "./StatesFactory.js";

export default class CellsController {    
  static _instance;

  static getInstance() {
    if (!this._instance) {
      this._instance = new CellsController();         
    }    
    return this._instance;
  }

  constructor() {
    this._cells = [];
  }

  get cells() {
    return this._cells;
  }

  addState(stateName, neighborhood) {
    StatesFactory.addState(stateName, neighborhood);
  }

  addRule(stateName, newStateName, ruleStateName, operator, cellsNumber) {
    StatesFactory.getState(stateName).addRule(newStateName, ruleStateName, operator, cellsNumber);
  }

  addCell(x, y, stateName) {
    const cell = new Cell(x, y, stateName);
    this._cells.push(cell);
  }

  setNeighbours() {
    for (let cell of this._cells) {
      cell.setNeighbours(this._cells);
    }
  }

  update() {
    if (!this._parallel) {      
      this._parallel = new Parallel(this._cells);
    }

    this._parallel      
    .require(function importCellClass() {
      importScripts("http://127.0.0.1:5500/js/Classes/Cells/Cell.js");
    })      
    .map(cell => {
      importCellClass();
      cell.setNewState();
      // cell.updateState();      
      return 1;
    })
    .then(console.log, console.log);
  }
}