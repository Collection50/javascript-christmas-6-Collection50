import Receipt from './Receipt/index.js';
import Parser from '../Parser/index.js';
import Main from '../Menu/Main/index.js';
import Appetizer from '../Menu/Appetizer/index.js';
import Dessert from '../Menu/Dessert/index.js';
import Beverage from '../Menu/Beverage/index.js';
import { LANG, PRICE, SYMBOLS } from '../../constants/index.js';

const MENU_INSTANCES = {
  main: (name, count) => new Main(name, count),
  appetizer: (name, count) => new Appetizer(name, count),
  dessert: (name, count) => new Dessert(name, count),
  beverage: (name, count) => new Beverage(name, count),
};

class Order {
  #menus;

  #receipt;

  constructor(menus, day) {
    this.#menus = this.addMenus(menus);
    this.#receipt = new Receipt(day, this.#menus);
  }

  addMenus(menus) {
    return menus.split(SYMBOLS.menuDivider).map((menu) => {
      const [name, count] = menu.split(SYMBOLS.hyphen);
      const type = Parser.parseMenuType(name);
      const menuInstance = MENU_INSTANCES[type];
      return menuInstance(name, count);
    });
  }

  formatMenus() {
    return this.#menus.map((menu) => menu.toString()).join(SYMBOLS.lineBreak);
  }

  sumTotalPrice() {
    return `${this.#receipt
      .totalPrice(this.#menus)
      .toLocaleString(LANG.korea)}원`;
  }

  getPresentation() {
    return this.#receipt.presentation();
  }

  history() {
    return this.#receipt.discountHistory();
  }

  sumTotalDiscount() {
    const totalDiscount = Number(this.#receipt.totalDiscount() * -1);

    if (totalDiscount === PRICE.zero) {
      return `${PRICE.zero}원`;
    }
    return `${totalDiscount.toLocaleString(LANG.korea)}원`;
  }

  calculatePaymentAmount() {
    return `${this.#receipt.payment(this.#menus).toLocaleString(LANG.korea)}원`;
  }

  showBadge() {
    return this.#receipt.badge();
  }
}

export default Order;
