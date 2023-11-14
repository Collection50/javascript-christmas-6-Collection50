import Christmas from '../Discount/Christmas/index.js';
import Special from '../Discount/Special/index.js';
import Weekend from '../Discount/Weekend/index.js';
import Weekday from '../Discount/Weekday/index.js';
import Presentation from '../Discount/Presentation/index.js';
import Day from '../../Day/index.js';
import { DAY_TYPE, MENU } from '../../../constants/index.js';
import Dessert from '../../Menu/Dessert/index.js';
import Main from '../../Menu/Main/index.js';

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

  special() {
    if (this.#day.isSpecial()) {
      this.#discounts.push(new Special());
    }
    return this;
  }

  weekend(menus) {
    const daytype = this.#day.parseDayType();
    const hasMain = menus.some((menu) => menu instanceof Main);
    if (daytype === DAY_TYPE.weekend && hasMain) {
      this.#discounts.push(new Weekend(menus));
    }
    return this;
  }

  weekday(menus) {
    const daytype = this.#day.parseDayType();
    const hasDessert = menus.some((menu) => menu instanceof Dessert);
    if (daytype === DAY_TYPE.weekday && hasDessert) {
      this.#discounts.push(new Weekday(menus));
    }
    return this;
  }

  presentation(total) {
    if (total >= MENU.champagnePresentation) {
      this.#discounts.push(new Presentation());
    }
    return this;
  }

  build() {
    return this.#discounts;
  }
}

export default DiscountBuilder;
