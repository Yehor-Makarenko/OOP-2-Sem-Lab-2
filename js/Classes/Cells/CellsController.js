import Cell from "./Cell.js";
import StatesFactory from "./StatesFactory.js";
import WebglCellAdapter from "./WebglCellAdapter.js";

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
    this._webglCells = [];
  }

  get cells() {
    return this._cells;
  }

  get webglCells() {
    return this._webglCells;
  }

  addState(stateName, neighborhood, color) {
    StatesFactory.addState(stateName, neighborhood, color);
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

  adaptWebglCells(fieldSizeX, fieldSizeY) {
    for (let cell of this._cells) {
      this._webglCells.push(new WebglCellAdapter(cell, fieldSizeX, fieldSizeY));
    }
  }

  update() {
    for (let cell of this._cells) {
      cell.setNewState();
    }

    for (let cell of this._cells) {
      cell.updateState();
    }
  }
}