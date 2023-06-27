import CompositeRule from "../Rules/CompositeRule.js";

export default class State {
  constructor(name, neighborhood, color) {
    this._name = name;
    this._neighborhood = neighborhood;
    this._compositeRule = new CompositeRule();
    this._color = color;
  }

  get name() {
    return this._name;
  }

  get neighborhood() {
    return this._neighborhood;
  }

  get color() {
    return this._color;
  }

  addRule(newStateName, ruleStateName, operator, cellsNumber) {
    this._compositeRule.addRule(newStateName, ruleStateName, operator, cellsNumber);
  }

  getNewState(cell, neighboursCounter) {
    let newState = this._compositeRule.getNewState(neighboursCounter);
    if (newState === null) {
      return cell.state;
    }
    return newState;
  }
}