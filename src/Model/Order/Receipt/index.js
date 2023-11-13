import {
  BADGE,
  DISCOUNT_MESSAGE,
  MENU,
  SYMBOLS,
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
    const totalPrice = this.totalPrice(menus);
    const totalDiscount = this.totalDiscount();
    const paymentAmount = totalPrice - totalDiscount;
    const menuIncludesChampagne = menus.some(
      (menu) => menu.name() === PRESENTATION_TYPE.champagne.name,
    );

    if (totalPrice < MENU.champagnePresentation) {
      return paymentAmount;
    }
    return menuIncludesChampagne ? paymentAmount : paymentAmount + 25_000;
  }

  badge() {
    const totalDiscount = this.totalDiscount();

    if (totalDiscount >= BADGE.santa.price) {
      return BADGE.santa.name;
    }
    if (totalDiscount >= BADGE.tree.price) {
      return BADGE.tree.name;
    }
    return totalDiscount >= BADGE.star.price
      ? BADGE.star.name
      : DISCOUNT_MESSAGE.none;
  }
}

export default Receipt;
