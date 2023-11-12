import Parser from '../Parser/index.js';
import Main from '../Menu/Main/index.js';
import Appetizer from '../Menu/Appetizer/index.js';
import Dessert from '../Menu/Dessert/index.js';
import Beverage from '../Menu/Beverage/index.js';
import { SYMBOLS } from '../../constants/index.js';

const MENU_INSTANCES = {
  main: (name, count) => new Main(name, count),
  appetizer: (name, count) => new Appetizer(name, count),
  dessert: (name, count) => new Dessert(name, count),
  beverage: (name, count) => new Beverage(name, count),
};

class Order {
  #menus;

  #receipt;

  constructor(menus) {
    this.#menus = this.addMenus(menus);
  }

  addMenus(menus) {
    return menus.split(SYMBOLS.menuDivider).map((menu) => {
      const [name, count] = menu.split(SYMBOLS.hyphen);
      const type = Parser.parseMenuType(name);
      const menuInstance = MENU_INSTANCES[type];
      return menuInstance(name, count);
    });
  }

  showMenus() {
    return this.#menus.map((menu) => menu.toString()).join(SYMBOLS.lineBreak);
  }
}

export default Order;