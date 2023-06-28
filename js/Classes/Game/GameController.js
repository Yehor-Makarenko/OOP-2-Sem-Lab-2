import CellsController from "../Cells/CellsController.js";

const MAX_BUFFER_SIZE = 16384;

export default class GameController {
  constructor(canvas, options) {        
    this._context = canvas.getContext("bitmaprenderer");
    this._cellsController = CellsController.getInstance();
    this._options = options;
    this._lastUpdate = Date.now() - 1000 / options.maxFPS;
    this._isCellsUpdated = true;
    this._offScreenCanvas = new OffscreenCanvas(options.screenWidth, options.screenHeight);
    this._offScreenContext = this._offScreenCanvas.getContext("webgl");    

    canvas.width = options.screenWidth;
    canvas.height = options.screenHeight;    
    this._cellsController.adaptWebglCells(options.fieldSizeX, options.fieldSizeY);
    this._initializeWebgl();
  }

  start() {    
    this._requestId = requestAnimationFrame(this._updateFrame.bind(this));
  }

  stop() {
    cancelAnimationFrame(this._requestId);
  }

  _draw() {
    const drawsNumber = Math.floor(this._cellsController.cells.length / MAX_BUFFER_SIZE);    

    for (let i = 0; i <= drawsNumber; i++) {
      if (i === drawsNumber) {
        this._drawCells(this._cellsController.webglCells.slice(i * MAX_BUFFER_SIZE));
        break;
      }

      this._drawCells(this._cellsController.webglCells.slice(i * MAX_BUFFER_SIZE, (i + 1) * MAX_BUFFER_SIZE));
    }
    
    const bitmap = this._offScreenCanvas.transferToImageBitmap();
    this._context.transferFromImageBitmap(bitmap);
  }

  _updateFrame() {
    if (Date.now() - this._lastUpdate < 1000 / this._options.maxFPS) {
      if (!this._isCellsUpdated) {
        this._cellsController.update();
        this._isCellsUpdated = true;
      }
      this._requestId = requestAnimationFrame(this._updateFrame.bind(this));
      return;
    }

    if (!this._isCellsUpdated) {
      this._cellsController.update();
    }
    this._draw();
    this._lastUpdate = Date.now();
    this._isCellsUpdated = false;
    this._requestId = requestAnimationFrame(this._updateFrame.bind(this));
  }  

  _initializeWebgl() {      
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec4 a_color; // Color attribute
    
      varying vec4 v_color; // Varying variable for passing color to the fragment shader
    
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_color = a_color; // Pass the color to the fragment shader
      }
    `;
    const vertexShader = this._offScreenContext.createShader(this._offScreenContext.VERTEX_SHADER);
    this._offScreenContext.shaderSource(vertexShader, vertexShaderSource);
    this._offScreenContext.compileShader(vertexShader);
    
    const fragmentShaderSource = `
      precision mediump float;
    
      varying vec4 v_color; // Varying variable for receiving color from the vertex shader
    
      void main() {
        gl_FragColor = v_color; // Set the fragment color to the received color
      }
    `;
    const fragmentShader = this._offScreenContext.createShader(this._offScreenContext.FRAGMENT_SHADER);
    this._offScreenContext.shaderSource(fragmentShader, fragmentShaderSource);
    this._offScreenContext.compileShader(fragmentShader);
    
    this._webglProgram = this._offScreenContext.createProgram(vertexShaderSource, fragmentShaderSource);
    this._offScreenContext.attachShader(this._webglProgram, vertexShader);
    this._offScreenContext.attachShader(this._webglProgram, fragmentShader);
    this._offScreenContext.linkProgram(this._webglProgram);
    this._offScreenContext.useProgram(this._webglProgram);
  }

  _drawCells(cells) {
    const squareSize = 1 / this._options.fieldSizeX;
    const positions = [];
    const indices = [];
    const colors = [];
  
    cells.forEach((cell, index) => {
      const x = cell.x;
      const y = cell.y;
      const color = cell.state.color;
  
      const vertexOffset = index * 4;
  
      // Add vertices
      positions.push(
        x - squareSize, y + squareSize,
        x - squareSize, y - squareSize,
        x + squareSize, y + squareSize,
        x + squareSize, y - squareSize
      );
  
      // Add indices
      indices.push(
        vertexOffset, vertexOffset + 1, vertexOffset + 2,
        vertexOffset + 2, vertexOffset + 1, vertexOffset + 3
      );
  
      // Add colors
      colors.push(
        color[0], color[1], color[2], color[3],
        color[0], color[1], color[2], color[3],
        color[0], color[1], color[2], color[3],
        color[0], color[1], color[2], color[3]
      );
    });
  
    // Create position buffer
    const positionBuffer = this._offScreenContext.createBuffer();
    this._offScreenContext.bindBuffer(this._offScreenContext.ARRAY_BUFFER, positionBuffer);
    this._offScreenContext.bufferData(this._offScreenContext.ARRAY_BUFFER, new Float32Array(positions), this._offScreenContext.STATIC_DRAW);
  
    // Specify position attribute
    const positionAttributeLocation = this._offScreenContext.getAttribLocation(this._webglProgram, "a_position");
    this._offScreenContext.enableVertexAttribArray(positionAttributeLocation);
    this._offScreenContext.vertexAttribPointer(positionAttributeLocation, 2, this._offScreenContext.FLOAT, false, 0, 0);
  
    // Create index buffer
    const indexBuffer = this._offScreenContext.createBuffer();
    this._offScreenContext.bindBuffer(this._offScreenContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this._offScreenContext.bufferData(this._offScreenContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this._offScreenContext.STATIC_DRAW);
  
    // Create color buffer
    const colorBuffer = this._offScreenContext.createBuffer();
    this._offScreenContext.bindBuffer(this._offScreenContext.ARRAY_BUFFER, colorBuffer);
    this._offScreenContext.bufferData(this._offScreenContext.ARRAY_BUFFER, new Float32Array(colors), this._offScreenContext.STATIC_DRAW);
  
    // Specify color attribute
    const colorAttributeLocation = this._offScreenContext.getAttribLocation(this._webglProgram, "a_color");
    this._offScreenContext.enableVertexAttribArray(colorAttributeLocation);
    this._offScreenContext.vertexAttribPointer(colorAttributeLocation, 4, this._offScreenContext.FLOAT, false, 0, 0);
  
    // Enable depth test
    this._offScreenContext.enable(this._offScreenContext.DEPTH_TEST);
  
    // Render cells
    this._offScreenContext.drawElements(this._offScreenContext.TRIANGLES, indices.length, this._offScreenContext.UNSIGNED_SHORT, 0);
  }
}