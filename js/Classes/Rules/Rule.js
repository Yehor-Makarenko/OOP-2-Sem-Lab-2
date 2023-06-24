import StatesFactory from "../Cells/StatesFactory.js";

export default class Rule {  
  constructor(newStateName, ruleStateName, operator, cellsNumber) {
    this._newState = StatesFactory.getState(newStateName);
    this._ruleState = StatesFactory.getState(ruleStateName);
    this._operator = operator;
    this._cellsNumber = cellsNumber
  }

  _check(neighboursCounter) {
    if (this._operator === "=") {
      return neighboursCounter.get(this._ruleState) === this._cellsNumber;
    } else if (this._operator === ">") {
      return neighboursCounter.get(this._ruleState) > this._cellsNumber;
    } else if (this._operator === ">=") {
      return neighboursCounter.get(this._ruleState) >= this._cellsNumber;
    } else if (this._operator === "<") {
      return neighboursCounter.get(this._ruleState) < this._cellsNumber;
    } else if (this._operator === "<=") {
      return neighboursCounter.get(this._ruleState) <= this._cellsNumber;
    }    

    return false;
  }

  getNewState(neighboursCounter) {
    if (this._check(neighboursCounter)) {
      return this._newState;
    }

    return null;
  }
}