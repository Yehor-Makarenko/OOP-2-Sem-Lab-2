import CompositeRule from "../Rules/CompositeRule.js";

export default class State {
  constructor(name, neighborhood) {
    this._name = name;
    this._neighborhood = neighborhood;
    this._compositeRule = new CompositeRule();
  }

  get name() {
    return this._name;
  }

  get neighborhood() {
    return this._neighborhood;
  }

  addRule(newStateName, ruleStateName, operator, cellsNumber) {
    this._compositeRule.addRule(newStateName, ruleStateName, operator, cellsNumber);
  }

  getNewState(cell, neighbours) {
    let newState = this._compositeRule.getNewState(neighbours);
    if (newState === null) {
      return cell.state;
    }
    return newState;
  }
}