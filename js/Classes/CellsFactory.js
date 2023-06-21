import CellType from "./CellType";
export default class CellsFactory {
  static cellTypes = [];
  static getCellType(name) {
    let cellType = this.cellTypes.find(typeName => typeName === name);
    if (cellType === undefined) {
      cellType = new CellType(name);
      this.cellTypes.push(cellType);
    }
    return cellType;
  }
}