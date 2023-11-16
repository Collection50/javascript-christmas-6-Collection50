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
    OutputView.preview(day);

    this.showOrder();
  }

  showOrder() {
    const menus = this.#order.formatMenus();
    const totalPrice = this.#order.sumTotalPrice();

    OutputView.showDetail(MENU_MESSAGE.menu, menus);
    OutputView.showDetail(MENU_MESSAGE.priceBeforeDiscount, totalPrice);

    this.showOrderHistory();
  }

  showOrderHistory() {
    const presentation = this.#order.getPresentation();
    const discountHistory = this.#order.history();
    const totalDiscount = this.#order.sumTotalDiscount();
    const paymentAmount = this.#order.calculatePaymentAmount();

    OutputView.showDetail(MENU_MESSAGE.presentation, presentation);
    OutputView.showDetail(MENU_MESSAGE.benefits, discountHistory);
    OutputView.showDetail(MENU_MESSAGE.discountPrice, totalDiscount);
    OutputView.showDetail(MENU_MESSAGE.priceAfterDiscount, paymentAmount);

    this.showBadge();
  }

  showBadge() {
    const badge = this.#order.showBadge();
    OutputView.showDetail(MENU_MESSAGE.badge, badge);
  }
}

export default EventPlanner;
