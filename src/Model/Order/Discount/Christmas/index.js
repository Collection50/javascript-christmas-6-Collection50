import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';
import Discount from '../index.js';

class Christmas extends Discount {
  #discount;

  #day;

  constructor(day) {
    super();
    this.#day = day;
    this.#discount = this.calculateDiscountAmount();
  }

  calculateDiscountAmount() {
    const discountAmount = (this.#day - 1) * DISCOUNT.christmasDday;
    return discountAmount + DISCOUNT.christmasDefault;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.christmas, this.#discount);
  }
}

export default Christmas;
