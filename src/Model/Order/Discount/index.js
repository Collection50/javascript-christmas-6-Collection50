import { LANG } from '../../../constants/index.js';

class Discount {
  toString(title, discount) {
    const discountAmount = discount.toLocaleString(LANG.korea);
    return `${title}${discountAmount}원`;
  }
}

export default Discount;
