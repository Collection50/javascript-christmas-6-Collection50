import Order from '../Model/Order/index.js';
import { PLANNER_MESSAGE, MENU_MESSAGE } from '../constants/index.js';
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

  showMenus() {
    const menus = this.#order.showMenus();
    OutputView.showDetail(MENU_MESSAGE.menu, menus);

    this.showTotalPrice();
  }

  showTotalPrice() {
    const totalPrice = this.#order.showTotalPrice();
    OutputView.showDetail(MENU_MESSAGE.priceBeforeDiscount, totalPrice);

    this.showPresentation();
  }

  showPresentation() {
    const presentation = this.#order.showPresentation();
    OutputView.showDetail(MENU_MESSAGE.presentation, presentation);

    this.showDiscountHistory();
  }

  showDiscountHistory() {
    const discountHistory = this.#order.showDiscountHistory();
    OutputView.showDetail(MENU_MESSAGE.benefits, discountHistory);

    this.showTotalDiscount();
  }
}

export default EventPlanner;
