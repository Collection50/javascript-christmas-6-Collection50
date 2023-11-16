import EventPlanner from './Controller/index.js';

class App {
  constructor() {
    this.planner = new EventPlanner();
  }

  async run() {
    await this.planner.plan();
  }
}

export default App;
