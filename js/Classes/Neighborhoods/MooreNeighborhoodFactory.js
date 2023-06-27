import MooreNeighborhood from "./MooreNeighborhood";

export default class MooreNeighborhoodFactory {
  constructor(range, fieldSize) {
    this._range = range;
    this._fieldSize = fieldSize;
  }
  
  createNeighborhood() {
    return new MooreNeighborhood(this._range, this._fieldSize);
  }
}