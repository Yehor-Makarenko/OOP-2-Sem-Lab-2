export default class CellType {
  constructor(name, neighborhood, rules) {
    this._name = name;
    this._neighborhood = neighborhood;
    this._rules = rules;
  }

  get neighborhood() {
    return this._neighborhood;
  }

  update(neighbours) {
    for (let rule of this._rules) {
      if (rule.check(neighbours)) {
        return rule.type;
      }
    }
  }
}