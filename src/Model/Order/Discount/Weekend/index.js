import Discount from '../index.js';
import Main from '../../../Menu/Main/index.js';
import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';

class Weekend extends Discount {
  constructor(menus) {
    super();
    this._discount = this.calculateDiscountAmount(menus);
  }

  calculateDiscountAmount(menus) {
    const menuCount = menus
      .filter((menu) => menu instanceof Main)
      .reduce((count, menu) => count + menu.count(), 0);
    return menuCount * DISCOUNT.main;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.weekend, this._discount);
  }
}

export default Weekend;
