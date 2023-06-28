import CellsController from "./Classes/Cells/CellsController.js";
import StatesFactory from "./Classes/Cells/StatesFactory.js";
import GameController from "./Classes/Game/GameController.js";
import Options from "./Classes/Game/Options.js";
import MooreNeighborhood from "./Classes/Neighborhoods/MooreNeighborhood.js";
import MooreNeighborhoodFactory from "./Classes/Neighborhoods/MooreNeighborhoodFactory.js";
import NeumannNeighborhood from "./Classes/Neighborhoods/NeumannNeighborhood.js";
import NeumannNeighborhoodFactory from "./Classes/Neighborhoods/NeumannNeighborhoodFactory.js";

const canvas = document.getElementById("screen");
const statesForm = document.getElementById("states");
const rulesForm = document.getElementById("rules");
const optionsForm = document.getElementById("options");
const cellsController = CellsController.getInstance();
const options = new Options();
let gameController;

document.body.onload = () => {
  document.getElementById("options").seed.value = Math.floor(Math.random() * 1000000)
};

statesForm.querySelector("button").onclick = event => {
  event.preventDefault();
  let neighborhoodConstructor;
  if (statesForm.neighborhood.value === "moore") {
    neighborhoodConstructor = new MooreNeighborhoodFactory();
  } else {
    neighborhoodConstructor = new NeumannNeighborhoodFactory();
  }

  const stateName = statesForm.stateName.value;
  const neighborhood = neighborhoodConstructor.createNeighborhood(statesForm.range.value, options.fieldSizeX, options.fieldSizeY);
  const color = [statesForm.red.value / 255, statesForm.green.value / 255, statesForm.blue.value / 255, 1];
  cellsController.addState(stateName, neighborhood, color);

  addStateToSelect(stateName, rulesForm.fromState);
  addStateToSelect(stateName, rulesForm.toState);
  addStateToSelect(stateName, rulesForm.ruleState);
  optionsForm.querySelector(".stateRatios").insertAdjacentHTML("beforeend", `<label>${stateName}:</label> <input name=${stateName} type="number" min=1 max=100 value=1><br>`);

  statesForm.reset();
}

rulesForm.querySelector("button").onclick = event => {
  event.preventDefault();

  const fromState = rulesForm.fromState.value;
  const toState = rulesForm.toState.value;
  const ruleState = rulesForm.ruleState.value;
  const operator = rulesForm.operators.value;
  const cellsNumber = +rulesForm.cellsNumber.value;

  cellsController.addRule(fromState, toState, ruleState, operator, cellsNumber);

  rulesForm.reset();
}

optionsForm.width.onchange = event => {
  options.screenWidth = +event.target.value;
}

optionsForm.xSize.onchange = event => {
  options.fieldSizeX = +event.target.value;
}

optionsForm.ySize.onchange = event => {
  options.fieldSizeY = +event.target.value;
}

optionsForm.maxFPS.onchange = event => {
  options.maxFPS = +event.target.value;
}

optionsForm.querySelector("button").onclick = event => {  
  event.preventDefault();
  if (gameController) {
   optionsForm.reset();
   return;
  }

  for (let state of StatesFactory.states) {
    state.neighborhood.setFieldSize(options.fieldSizeX, options.fieldSizeY);
  } 

  let seed = optionsForm.seed.value;
  const stateRatios = {};
  let stateRatiosSum = 0;

  for (let state of StatesFactory.states) {
    stateRatios[state.name] = +optionsForm.querySelector(`[name="${state.name}"]`).value;
    stateRatiosSum += stateRatios[state.name];
  }

  for (let i = 0; i <  options.fieldSizeY; i++) {
    for (let j = 0; j < options.fieldSizeX; j++) {
      let randState = Math.abs(seed % stateRatiosSum);      

      for (let state of StatesFactory.states) {
        if (randState < stateRatios[state.name]) {
          cellsController.addCell(j, i, state.name);
          break;
        }
        randState -= stateRatios[state.name];
      }

      seed = seed ^ (seed << 13)
      seed = seed ^ (seed >> 17)
      seed = seed ^ (seed << 5)
    }
  }

  cellsController.setNeighbours();
  gameController = new GameController(canvas, options);
  gameController.start();

  optionsForm.reset();
}

function addStateToSelect(stateName, select) {
  const option = new Option(stateName, stateName);
  select.append(option);
}


// const fieldSize = 100;
// const cc = CellsController.getInstance();

// // cc.addState(0, new MooreNeighborhood(1, fieldSize), "#8D230F");
// // cc.addState(1, new MooreNeighborhood(1, fieldSize), "#1E434C");
// // cc.addState(2, new MooreNeighborhood(1, fieldSize), "#9B4F0F");
// cc.addState(0, new MooreNeighborhood(1, fieldSize), [0.27,0.13,0.1,1]);
// cc.addState(1, new MooreNeighborhood(1, fieldSize), [0.41,0.24,0.24,1]);
// cc.addState(2, new MooreNeighborhood(1, fieldSize), [0.73,0.33,0.21,1]);
// cc.addRule(0, 1, 1, ">=", 3);
// cc.addRule(1, 2, 2, ">=", 3);
// cc.addRule(2, 0, 0, ">=", 3);
// // cc.addRule(0, 1, 1, "=", 3);
// // cc.addRule(1, 0, 1, "=", 1);
// // cc.addRule(1, 0, 1, ">", 3);
// // cc.addRule(0, 1, 1, "=", 1);
// for (let i = 0; i < fieldSize; i++) {
//   for (let j = 0; j < fieldSize; j++) {
//     cc.addCell(j, i, Math.floor(Math.random() * 3));
//   }
// }
// cc.setNeighbours();

// const options = new Options();
// options.maxFPS = 60;
// options.fieldSizeX = fieldSize;
// options.fieldSizeY = fieldSize;
// const dc = new GameController(canvas, options);
// dc.start();