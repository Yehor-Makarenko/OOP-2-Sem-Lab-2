import State from "./State.js";
export default class StatesFactory {
  static _states = [];

  static get states() {
    return this._states;
  }

  static getState(stateName) {
    const state = this._states.find(state => state.name === stateName);    
    return state;
  }
  static addState(stateName, neighborhood, color) {
    const state = new State(stateName, neighborhood, color);
    this._states.push(state);
  }
}