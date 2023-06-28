import NeumannNeighborhood from "./NeumannNeighborhood.js";

export default class NeumannNeighborhoodFactory {
  createNeighborhood(range, fieldSizeX, fieldSizeY) {
    return new NeumannNeighborhood(range, fieldSizeX, fieldSizeY);
  }
}