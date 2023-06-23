import StatesFactory from "./StatesFactory";

export default class Cell {
  _neighbours = [];
  constructor(x, y, stateName) {
    this._x = x;
    this._y = y;
    this._state = StatesFactory.getState(stateName);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get state() {
    return this._state;
  }

  update() {
    this._state = this._state.getNewState(this, this._neighbours);    
  }    

  addNeighbour(cell) {
    this._neighbours.push(cell);
  }
}