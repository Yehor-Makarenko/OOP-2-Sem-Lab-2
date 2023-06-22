import CellType from "./CellType";
export default class CellsFactory {
  static _cellTypes = [];

  static getCellType(typeName) {
    const cellType = this._cellTypes.find(cellType => cellType.name === typeName);    
    return cellType;
  }
  static addCellType(typeName, neighborhood, rules) {
    const cellType = new CellType(typeName, neighborhood, rules);
    this._cellTypes.push(cellType);
  }
}