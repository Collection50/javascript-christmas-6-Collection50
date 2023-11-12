import Christmas from '../Discount/Christmas/index.js';
import Day from '../../Day/index.js';

class DiscountBuilder {
  #discounts;

  #day;

  constructor(day) {
    this.#day = new Day(day);
    this.#discounts = [];
  }

  christmas(day) {
    if (!this.#day.isAfterChristmas()) {
      this.#discounts.push(new Christmas(day));
    }
    return this;
  }
}

export default DiscountBuilder;
