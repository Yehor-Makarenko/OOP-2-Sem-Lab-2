self.onmessage = event => {
  const cell = event.data.cell;
  const states = event.data.states;
  cell._newState = states[Math.floor(Math.random() * 3)];
  postMessage(cell);
}