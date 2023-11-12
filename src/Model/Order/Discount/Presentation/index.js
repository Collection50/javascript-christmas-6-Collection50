import { DISCOUNT_MESSAGE, PRESENTATION } from '../../../../constants/index.js';
import Discount from '../index.js';

class Presentation extends Discount {
  #discount;

  constructor() {
    super();
    this.#discount = this.calculateDiscountAmount();
  }

  calculateDiscountAmount() {
    return PRESENTATION.샴페인;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.presentation, this.#discount);
  }
}

export default Presentation;
