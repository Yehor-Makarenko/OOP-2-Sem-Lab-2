import Cell from "./Cell";
import StatesFactory from "./StatesFactory";

export default class CellsController {  
  _cells = [];
  static _instance;

  static getInstance() {
    if(this._instance) {
      return this._instance;
    }
    this._instance = new CellsController();    
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
    for (let cell1 of this._cells) {
      const neighborhood = cell1.state.neighborhood;

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