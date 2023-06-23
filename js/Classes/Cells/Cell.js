import StatesFactory from "./StatesFactory.js";

export default class Cell {
  _neighbours = [];
  constructor(x, y, stateName) {
    this._x = x;
    this._y = y;
    this._currState = StatesFactory.getState(stateName);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get state() {
    return this._currState;
  }

  setNewState() {
    this._newState = this._currState.getNewState(this, this._neighbours);    
  }    

  updateState() {
    this._currState = this._newState;
  }

  addNeighbour(cell) {
    this._neighbours.push(cell);
  }
}