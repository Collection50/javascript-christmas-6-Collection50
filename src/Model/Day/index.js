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
}

export default Day;
