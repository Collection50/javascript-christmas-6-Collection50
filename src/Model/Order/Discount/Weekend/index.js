import Discount from '../index.js';
import Main from '../../../Menu/Main/index.js';
import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';

class Weekend extends Discount {
  #discount;

  #menus;

  constructor(menus) {
    super();
    this.#menus = menus;
    this.#discount = this.calculateDiscountAmount();
  }

  calculateDiscountAmount() {
    const dissertCount = this.#menus.filter(
      (menu) => menu instanceof Main,
    ).length;
    return dissertCount * DISCOUNT.dessert;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.weekend, this.#discount);
  }
}

export default Weekend;
