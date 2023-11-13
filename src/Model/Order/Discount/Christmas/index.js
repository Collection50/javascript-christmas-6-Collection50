import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';
import Discount from '../index.js';

class Christmas extends Discount {
  #discount;

  constructor(day) {
    super();
    this.#discount = this.calculateDiscountAmount(day);
  }

  calculateDiscountAmount(day) {
    const discountAmount = (day - 1) * DISCOUNT.christmasDday;
    return discountAmount + DISCOUNT.christmasDefault;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.christmas, this.#discount);
  }
}

export default Christmas;
