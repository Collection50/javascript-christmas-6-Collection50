import {
  SYMBOLS,
  MAIN,
  APPETIZER,
  DESSERT,
  MENU_TYPE,
} from '../../constants/index.js';

class Parser {
  static parseMenu(input) {
    return input.split(SYMBOLS.menuDivider).map((menus) => {
      const [menu, count] = menus.split(SYMBOLS.hyphen);
      return { menu, count: Number(count) };
    });
  }

  static parseMenuType(name) {
    if (Object.keys(MAIN).includes(name)) {
      return MENU_TYPE.main;
    }
    if (Object.keys(APPETIZER).includes(name)) {
      return MENU_TYPE.appetizer;
    }
    return Object.keys(DESSERT).includes(name)
      ? MENU_TYPE.dessert
      : MENU_TYPE.beverage;
  }
}

export default Parser;
