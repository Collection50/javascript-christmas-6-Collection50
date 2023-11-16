import { DISCOUNT_MESSAGE, DISCOUNT } from '../../../../constants/index.js';
import Discount from '../index.js';

class Special extends Discount {
  constructor() {
    super();
    this._discount = this.calculateDiscountAmount();
  }

  calculateDiscountAmount() {
    return DISCOUNT.special;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.special, this._discount);
  }
}

export default Special;
