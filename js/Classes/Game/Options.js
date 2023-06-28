
export default class Options {
  constructor() {
    this._screenWidth = 900;
    this._screenHeight = 900;
    this._fieldSizeX = 100;
    this._fieldSizeY = 100;
    this._cellSize = 9;
    this._maxFPS = 60;
  }

  get screenWidth() {
    return this._screenWidth;
  }

  get screenHeight() {
    return this._screenHeight;
  }

  get fieldSizeX() {
    return this._fieldSizeX;
  }

  get fieldSizeY() {
    return this._fieldSizeY;
  }

  get cellSize() {
    return this._cellSize;
  }

  get maxFPS() {
    return this._maxFPS;
  }

  set screenWidth(widht) {
    this._screenWidth = widht;
    this._cellSize = Math.floor(widht / this._fieldSizeX);
    this._screenHeight = this._cellSize * this._fieldSizeY; 
  }

  set fieldSizeX(size) {
    this._fieldSizeX = size;
    this._cellSize = Math.floor(this._screenWidth / this._fieldSizeX);
    this._screenHeight = this._cellSize * this._fieldSizeY; 
  }

  set fieldSizeY(size) {
    this._fieldSizeY = size;
    this._screenHeight = this._cellSize * this._fieldSizeY; 
  }

  set maxFPS(fps) {
    this._maxFPS = fps;
  }
}
