import {
  DISCOUNT_MESSAGE,
  PRESENTATION_TYPE,
} from '../../../constants/index.js';
import Presentation from '../Discount/Presentation/index.js';
import DiscountBuilder from '../DiscountBuilder/index.js';

class Receipt {
  #discounts;

  #total;

  constructor(day, menus) {
    this.#total = this.totalPrice(menus);
    this.#discounts = new DiscountBuilder(day)
      .christmas(day)
      .special()
      .weekend(menus)
      .weekday(menus)
      .presentation(this.#total)
      .build(this.#total);
  }

  totalPrice(menus) {
    return menus.reduce((total, menu) => total + menu.price(), 0);
  }

  totalDiscount() {
    return this.#discounts.reduce(
      (acc, discount) => acc + discount.calculateDiscountAmount(),
      0,
    );
  }

  presentation() {
    return this.#discounts.some((discount) => discount instanceof Presentation)
      ? `${PRESENTATION_TYPE.champagne.name} ${PRESENTATION_TYPE.champagne.count}개`
      : DISCOUNT_MESSAGE.none;
  }
}

export default Receipt;
