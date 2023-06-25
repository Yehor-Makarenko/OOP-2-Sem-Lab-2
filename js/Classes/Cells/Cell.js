import StatesFactory from "./StatesFactory.js";

export default class Cell {
  constructor(x, y, stateName) {       
    this._x = x;
    this._y = y;
    this._currState = StatesFactory.getState(stateName);
    this._neighbours = [];
    this._neighboursCounter = new Map();
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
    for (let state of StatesFactory.states) {
      this._neighboursCounter.set(state, 0);
    }
    for (let neighbour of this._neighbours) {
      this._neighboursCounter.set(neighbour.state, this._neighboursCounter.get(neighbour.state) + 1);
    }
    this._newState = this._currState.getNewState(this, this._neighboursCounter);    
  }    

  updateState() {
    this._currState = this._newState;
  }

  setNeighbours(cells) {
    this._neighbours = this._currState.neighborhood.getNeighbours(this, cells);
  }
}