import NeumannNeighborhood from "./NeumannNeighborhood";

export default class NeumannNeighborhoodFactory {
  createNeighborhood(range, fieldSize) {
    return new NeumannNeighborhood(range, fieldSize);
  }
}