import { DATE } from '../../constants/index.js';

class Day {
  #day;

  #date;

  constructor(day) {
    this.#day = Number(day);
    this.#date = new Date(`2023-12-${day}`);
  }

  isSpecialDay() {
    return this.#day === DATE.christmas || this.#date.getDay() === DATE.sunday;
  }

  parseDayType() {
    const day = this.#date.getDay();
    if (day === DATE.friday || day === DATE.saturday) {
      return DATE.weekend;
    }
    return DATE.weekday;
  }

  isAfterChristmas() {
    return this.#day > DATE.christmas;
  }
}

export default Day;
