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
    // for (let cell of this._cells) {
    //   cell.setNewState();
    // }

    // for (let cell of this._cells) {
    //   cell.updateState();
    // }

    if (!this._parallel) {
      this._parallel = new Parallel(this._cells, { env: { Cell: Cell } });
    }

    this._parallel.map(cell => {
      cell.constructor = Cell;      
      cell.setNewState();
      cell.updateState();
      return 1;
    }).then(results => console.log([results]));
  }
}