import {
  DISCOUNT_MESSAGE,
  SYMBOLS,
  PRESENTATION_TYPE,
  PRICE,
} from '../../../constants/index.js';
import Presentation from '../Discount/Presentation/index.js';
import DiscountBuilder from '../DiscountBuilder/index.js';
import Badge from './Badge/index.js';

class Receipt {
  #discounts;

  #total;

  #badge;

  constructor(day, menus) {
    this.#total = this.totalPrice(menus);
    this.#discounts = this.addDiscountBuilder(day, menus, this.#total);
    this.#badge = new Badge(this.#total);
  }

  addDiscountBuilder(day, menus, total) {
    if (total < PRICE.minimumOrder) {
      return [];
    }
    return new DiscountBuilder(day)
      .christmas(day)
      .special()
      .weekend(menus)
      .weekday(menus)
      .presentation(total)
      .build();
  }

  totalPrice(menus) {
    return menus.reduce((total, menu) => total + menu.price(), 0);
  }

  totalDiscount() {
    return this.#discounts.reduce(
      (acc, discount) => acc + discount.amount(),
      0,
    );
  }

  presentation() {
    return this.#discounts.some((discount) => discount instanceof Presentation)
      ? `${PRESENTATION_TYPE.champagne.name} ${PRESENTATION_TYPE.champagne.count}개`
      : DISCOUNT_MESSAGE.none;
  }

  discountHistory() {
    if (!this.#discounts.length) {
      return DISCOUNT_MESSAGE.none;
    }
    return this.#discounts
      .map((discount) => discount.toString())
      .join(SYMBOLS.lineBreak);
  }

  payment(menus) {
    const totalDiscountWithoutPresentation = this.#discounts
      .filter((discount) => !(discount instanceof Presentation))
      .reduce((acc, discount) => acc + discount.amount(), 0);
    return this.totalPrice(menus) - totalDiscountWithoutPresentation;
  }

  badge() {
    return this.#badge.tag();
  }
}

export default Receipt;
