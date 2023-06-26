import CellsController from "./Classes/Cells/CellsController.js";
import MooreNeighborhood from "./Classes/Neighborhoods/MooreNeighborhood.js";
import NeumannNeighborhood from "./Classes/Neighborhoods/NeumannNeighborhood.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const gridCanvas = document.createElement("canvas");
const gridContext = gridCanvas.getContext("2d");
const offScreenCanvas = document.createElement("canvas");
offScreenCanvas.width = canvas.width;
offScreenCanvas.height = canvas.height;
const offScreenContext = offScreenCanvas.getContext("2d");
const cellSize = 5;
const fieldSize = 100;
const cc = CellsController.getInstance();

cc.addState(0, new NeumannNeighborhood(2, fieldSize));
cc.addState(1, new NeumannNeighborhood(2, fieldSize));
cc.addState(2, new NeumannNeighborhood(2, fieldSize));
cc.addRule(0, 1, 1, ">=", 4);
cc.addRule(1, 2, 2, ">=", 4);
cc.addRule(2, 0, 0, ">=", 4);
// cc.addRule(0, 1, 1, "=", 3);
// cc.addRule(1, 0, 1, "=", 1);
// cc.addRule(1, 0, 1, ">", 3);
// cc.addRule(0, 1, 1, "=", 1);
// cc.addRule(0, 1, 1, ">=", 3);
// cc.addRule(1, 0, 1, "<", 5);
for (let i = 0; i < fieldSize; i++) {
  for (let j = 0; j < fieldSize; j++) {
    cc.addCell(j, i, Math.floor(Math.random() * 3)); 
  }
}

cc.setNeighbours();

cc.update();
let counter = 0;

for (let i = 0; i < 100; i++) {
  for (let cell of cc._cells) {
    cell._currState = cell._newState;
  }
  console.log("Yep!");
}

// canvas.before(gridCanvas);
// gridCanvas.style.position = "absolute";
// gridCanvas.width = canvas.width;
// gridCanvas.height = canvas.height;
// gridContext.lineWidth = 0.2;
// gridContext.strokeStyle = "rgba(0, 0, 0, 0.4)";
// for (let i = 0; i < fieldSize; i++) {
//   for (let j = 0; j < fieldSize; j++) {
//     gridContext.strokeRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
//   }
// }

// for (let cell of cc.cells) {
//   if (cell.state.name === 0) {
//     offScreenContext.fillStyle = "#8D230F";    
//   } else if (cell.state.name === 1) {
//     offScreenContext.fillStyle = "#1E434C";    
//   }  else {
//     offScreenContext.fillStyle = "#9B4F0F";    
//   }
//   offScreenContext.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize); 
// }  
// context.drawImage(offScreenCanvas, 0, 0);

// requestAnimationFrame(function foo() {
//   cc.update();

//   for (let cell of cc.cells) {
//     if (cell.state.name === 0) {
//       offScreenContext.fillStyle = "#9B4F0F";    
//     } else if (cell.state.name === 1) {
//       offScreenContext.fillStyle = "#1E434C";    
//     }  else {
//       offScreenContext.fillStyle = "#8D230F";    
//     }
//     offScreenContext.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize); 
//   }  
//   context.drawImage(offScreenCanvas, 0, 0);
//   requestAnimationFrame(foo);
// });

// seed = seed ^ (seed << 13)
// seed = seed ^ (seed >> 17)
// seed = seed ^ (seed << 5)