import CellsController from "../Cells/CellsController";

export default class GameController {
  constructor(canvas, options) {    
    this._context = canvas.getContext("2d");
    this._cellsController = CellsController.getInstance();
    this._options = options;
    this._lastUpdate = Date.now() - 1000 / options.maxFPS;
    this._isCellsUpdated = false;

    canvas.width = options.screenWidth;
    canvas.height = options.screenHeight;
  }

  start() {
    this._requestId = requestAnimationFrame(function updateFrame() {
      const 
    })
  }

  _draw() {
    
  }

  _updateFrame() {
    if (Date.now() - this._lastUpdate < 1000 / this._options.maxFPS) {
      if (!this._isCellsUpdated) {
        this._cellsController.update();
        this._isCellsUpdated = true;
      }
      this._requestId = requestAnimationFrame(this._updateFrame);
      return;
    }

    if (!this._isCellsUpdated) {
      this._cellsController.update();
    }
    this._draw();
    this._lastUpdate = Date.now();
    this._isCellsUpdated = false;
    this._requestId = requestAnimationFrame(this._updateFrame);
  }  
}