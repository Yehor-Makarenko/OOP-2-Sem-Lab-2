export default class MooreNeighborhood {
  constructor(range = 1, fieldSizeX, fieldSizeY) {
    this._range = range;
    this._fieldSizeX = fieldSizeX;    
    this._fieldSizeY = fieldSizeY;    
  }

  setFieldSize(xSize, ySize) {
    this._fieldSizeX = xSize;    
    this._fieldSizeY = ySize;    
  }

  getNeighbours(cell, allCells) {
    const neighbours = [];
    let xTor, yTor;

    for (let i = -this._range; i <= this._range; i++) {
      for (let j = -this._range; j <= this._range; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        xTor = (cell.x + j + this._fieldSizeX) % this._fieldSizeX;
        yTor = (cell.y + i + this._fieldSizeY) % this._fieldSizeY;  
        neighbours.push(allCells[yTor * this._fieldSizeX + xTor]);
      }
    }

    return neighbours;
  }
} 