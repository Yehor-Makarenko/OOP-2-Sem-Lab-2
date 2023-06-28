import MooreNeighborhood from "./MooreNeighborhood";

export default class MooreNeighborhoodFactory {
  createNeighborhood(range, fieldSize) {
    return new MooreNeighborhood(range, fieldSize);
  }
}