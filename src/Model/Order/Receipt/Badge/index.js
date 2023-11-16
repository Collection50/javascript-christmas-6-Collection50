import { BADGE } from '../../../../constants/index.js';

class Badge {
  #discountAmount;

  constructor(discountAmount) {
    this.#discountAmount = discountAmount;
  }

  tag() {
    const badge = Object.values(BADGE).find(
      ({ price }) => price <= this.#discountAmount,
    )?.name;
    return badge ?? BADGE.none;
  }
}

export default Badge;
