import MooreNeighborhood from "./MooreNeighborhood.js";

export default class MooreNeighborhoodFactory {
  createNeighborhood(range, fieldSizeX, fieldSizeY) {
    return new MooreNeighborhood(range, fieldSizeX, fieldSizeY);
  }
}