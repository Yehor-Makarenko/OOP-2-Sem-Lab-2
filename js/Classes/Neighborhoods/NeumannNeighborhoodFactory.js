import NeumannNeighborhood from "./NeumannNeighborhood";

export default class NeumannNeighborhoodFactory {
  constructor(range, fieldSize) {
    this._range = range;
    this._fieldSize = fieldSize;
  }
  
  createNeighborhood() {
    return new NeumannNeighborhood(this._range, this._fieldSize);
  }
}