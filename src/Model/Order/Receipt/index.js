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
}

export default Receipt;
