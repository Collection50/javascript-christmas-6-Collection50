import { BADGE, DISCOUNT_MESSAGE } from '../../../../constants/index.js';

class Badge {
  #discountAmount;

  constructor(discountAmount) {
    this.#discountAmount = discountAmount;
  }

  tag() {
    if (this.#discountAmount >= BADGE.santa.price) {
      return BADGE.santa.name;
    }
    if (this.#discountAmount >= BADGE.tree.price) {
      return BADGE.tree.name;
    }
    return this.#discountAmount >= BADGE.star.price
      ? BADGE.star.name
      : DISCOUNT_MESSAGE.none;
  }
}

export default Badge;
