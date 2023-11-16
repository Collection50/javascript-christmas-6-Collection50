import {
  DISCOUNT_MESSAGE,
  PRESENTATION_TYPE,
} from '../../../../constants/index.js';
import Discount from '../index.js';

class Presentation extends Discount {
  constructor() {
    super();
    this._discount = this.calculateDiscountAmount();
  }

  calculateDiscountAmount() {
    return PRESENTATION_TYPE.champagne.price;
  }

  toString() {
    return super.toString(DISCOUNT_MESSAGE.presentation, this._discount);
  }
}

export default Presentation;
