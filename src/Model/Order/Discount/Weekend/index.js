import Discount from '../index.js';
import Main from '../../../Menu/Main/index.js';
import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';

class Weekend extends Discount {
  #discount;

  constructor(menus) {
    super();
    this.#discount = this.calculateDiscountAmount(menus);
  }

  calculateDiscountAmount(menus) {
    const menuCount = menus
      .filter((menu) => menu instanceof Main)
      .reduce((count, menu) => count + menu.count(), 0);
    return menuCount * DISCOUNT.dessert;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.weekend, this.#discount);
  }
}

export default Weekend;
