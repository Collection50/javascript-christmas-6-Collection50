import { LANG } from '../../../constants/index.js';

class Discount {
  _discount;

  consturctor() {
    this._discount = 0;
  }

  toString(title, discount) {
    const discountAmount = discount.toLocaleString(LANG.korea);
    return `${title}${discountAmount}원`;
  }

  amount() {
    return this._discount;
  }
}

export default Discount;
