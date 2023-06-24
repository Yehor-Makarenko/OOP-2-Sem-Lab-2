import Rule from "./Rule.js";

export default class CompositeRule {
  constructor() {
    this._rules = [];
  }

  addRule(newStateName, ruleStateName, operator, cellsNumber) {
    this._rules.push(new Rule(newStateName, ruleStateName, operator, cellsNumber));
  }

  getNewState(neighboursCounter) {
    let newState;
    for (let rule of this._rules) {
      newState = rule.getNewState(neighboursCounter);

      if (newState !== null) {
        return newState;
      }
    }

    return null;
  }
}