import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';
import Dessert from '../../../Menu/Dessert/index.js';
import Discount from '../index.js';

class Weekday extends Discount {
  #discount;

  #menus;

  constructor(menus) {
    super();
    this.#menus = menus;
    this.#discount = this.calculateDiscountAmount();
  }

  calculateDiscountAmount() {
    const menuCount = this.#menus
      .filter((menu) => menu instanceof Dessert)
      .reduce((count, menu) => count + menu.count(), 0);
    return menuCount * DISCOUNT.dessert;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.weekday, this.#discount);
  }
}

export default Weekday;
