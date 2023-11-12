import { MENUS } from '../../constants/index.js';

class Menu {
  #name;

  #count;

  constructor(name, count) {
    this.#name = name;
    this.#count = Number(count);
  }

  toString() {
    return `${this.#name} ${this.#count}개`;
  }

  price() {
    return MENUS[this.#name] * this.#count;
  }

  count() {
    return this.#count;
  }

  name() {
    return this.#name;
  }
}

export default Menu;
