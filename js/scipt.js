import CellsController from "./Classes/Cells/CellsController.js";
import MooreNeighborhood from "./Classes/Neighborhoods/MooreNeighborhood.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const cellWidth = 30;
const cellHeight = 30;

const cc = CellsController.getInstance();
cc.addState(0, new MooreNeighborhood(1, 5));
cc.addState(1, new MooreNeighborhood(1, 5));
cc.addRule(0, 1, 1, "=", 3);
cc.addRule(1, 0, 1, "=", 1);
cc.addRule(1, 0, 1, ">", 3);
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (i === 2 && j > 0 && j < 4) {
      cc.addCell(j, i, 1);
    } else {
      cc.addCell(j, i, 0);
    }  
  }
}
cc.setNeighbours();

for (let cell of cc.cells) {
  if (cell.state.name === 0) {
    context.fillStyle = "#ffffff";    
  } else {
    context.fillStyle = "#000000";    
  }  
  context.fillRect(cell.x * 30, cell.y * 30, 30, 30);
  context.strokeRect(cell.x * 30, cell.y * 30, 30, 30);
}

setInterval(() => {
  cc.update();

  for (let cell of cc.cells) {
    if (cell.state.name === 0) {
      context.fillStyle = "#ffffff";    
    } else {
      context.fillStyle = "#000000";    
    }  
    context.fillRect(cell.x * 30, cell.y * 30, 30, 30);
    context.strokeRect(cell.x * 30, cell.y * 30, 30, 30);
  }  
}, 1000);

// seed = seed ^ (seed << 13)
// seed = seed ^ (seed >> 17)
// seed = seed ^ (seed << 5)