import { DATE, DAY_TYPE } from '../../constants/index.js';

class Day {
  #day;

  #date;

  constructor(day) {
    this.#day = Number(day);
    this.#date = new Date(`2023-12-${day}`);
  }

  isSpecial() {
    return this.#day === DATE.christmas || this.#date.getDay() === DATE.sunday;
  }

  parseDayType() {
    const day = this.#date.getDay();
    if (day === DATE.friday || day === DATE.saturday) {
      return DAY_TYPE.weekend;
    }
    return DAY_TYPE.weekday;
  }

  isAfterChristmas() {
    return this.#day > DATE.christmas;
  }
}

export default Day;
