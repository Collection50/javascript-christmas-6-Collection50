import { SYMBOLS } from '../../constants/index.js';

class Parser {
  static parseNumber(input) {
    return Number(input);
  }

  static splitMenu(input) {
    return input.split(SYMBOLS.menuDivider);
  }

  static parseMenu(input) {
    return this.splitMenu(input).map((menus) => {
      const [menu, count] = menus.split(SYMBOLS.hyphen);
      return { menu, count: Number(count) };
    });
  }
}

export default Parser;
