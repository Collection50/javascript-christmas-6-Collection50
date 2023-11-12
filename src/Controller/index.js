import Order from '../Model/Order/index.js';
import { PLANNER_MESSAGE } from '../constants/index.js';
import { InputView, OutputView } from '../View/index.js';
import MenuValidator from '../Model/Validator/MenuValidator/index.js';
import DateValidator from '../Model/Validator/DateValidator/index.js';

class EventPlanner {
  #order;

  constructor() {
    this.#order = null;
  }

  async plan() {
    OutputView.welcome();
    await this.askVisitDay();
  }

  async askVisitDay() {
    const day = await InputView.readLine(
      PLANNER_MESSAGE.askVisitDay,
      (answer) => DateValidator.validateVisitDay(answer),
    );
    await this.askMenus(day);
  }

  async askMenus(day) {
    const menus = await InputView.readLine(PLANNER_MESSAGE.askMenus, (answer) =>
      MenuValidator.validateMenus(answer),
    );
    this.#order = new Order(menus, day);
    this.showMenus();
  }
}

export default EventPlanner;
