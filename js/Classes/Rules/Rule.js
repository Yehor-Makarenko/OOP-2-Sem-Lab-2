import StatesFactory from "../Cells/StatesFactory.js";

export default class Rule {  
  constructor(newStateName, ruleStateName, operator, cellsNumber) {
    this._newState = StatesFactory.getState(newStateName);
    this._ruleState = StatesFactory.getState(ruleStateName);
    this._operator = operator;
    this._cellsNumber = cellsNumber
  }

  _check(neighbours) {
    let stateCounter = 0;
    for (let cell of neighbours) {
      if (cell.state === this._ruleState) {
        stateCounter++;
      }
    }

    if (this._operator === "=") {
      return stateCounter === this._cellsNumber;
    } else if (this._operator === ">") {
      return stateCounter > this._cellsNumber;
    } else if (this._operator === ">=") {
      return stateCounter >= this._cellsNumber;
    } else if (this._operator === "<") {
      return stateCounter < this._cellsNumber;
    } else if (this._operator === "<=") {
      return stateCounter <= this._cellsNumber;
    }    

    return false;
  }

  getNewState(neighbours) {
    if (this._check(neighbours)) {
      return this._newState;
    }

    return null;
  }
}