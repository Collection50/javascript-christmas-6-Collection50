import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';
import Discount from '../index.js';

class Christmas extends Discount {
  constructor(day) {
    super();
    this._discount = this.calculateDiscountAmount(Number(day));
  }

  calculateDiscountAmount(day) {
    const discountAmount = (day - 1) * DISCOUNT.christmasDday;
    return discountAmount + DISCOUNT.christmasDefault;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.christmas, this._discount);
  }
}

export default Christmas;
