import Rule from "./Rule";

export default class CompositeRule {
  constructor() {
    this._rules = [];
  }

  addRule(newStateName, ruleStateName, operator, cellsNumber) {
    this._rules.push(new Rule(newStateName, ruleStateName, operator, cellsNumber));
  }

  getNewState(neighbours) {
    let newState;
    for (let rule of this._rules) {
      newState = rule.getNewState(neighbours);

      if (newState !== null) {
        return newState;
      }
    }

    return null;
  }
}