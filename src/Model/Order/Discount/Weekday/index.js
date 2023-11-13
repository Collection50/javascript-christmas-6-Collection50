import Discount from '../index.js';
import Dessert from '../../../Menu/Dessert/index.js';
import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';

class Weekday extends Discount {
  #discount;

  constructor(menus) {
    super();
    this.#discount = this.calculateDiscountAmount(menus);
  }

  calculateDiscountAmount(menus) {
    const menuCount = menus
      .filter((menu) => menu instanceof Dessert)
      .reduce((count, menu) => count + menu.count(), 0);
    return menuCount * DISCOUNT.dessert;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.weekday, this.#discount);
  }
}

export default Weekday;
