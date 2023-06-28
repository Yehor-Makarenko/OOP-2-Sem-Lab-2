export default class WebglCellAdapter {
  constructor(cell, fieldSizeX, fieldSizeY) {
    const halfXSize = fieldSizeX / 2;
    const halfYSize = fieldSizeY / 2;
    this._x = (cell.x - halfXSize) / halfXSize;
    this._y = (cell.y - halfYSize) / halfYSize;
    this._state = cell.state;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get state() {
    return this._state;
  }
}