import Validator from '../index.js';
import Parser from '../../Parser/index.js';
import ValidationError from '../ValidationError/index.js';
import { ERROR, BEVERAGE, MENUS, MENU } from '../../../constants/index.js';

class MenuValidator extends Validator {
  static validateDuplication(menus) {
    const menuNames = menus.map(({ menu }) => menu);
    if (menuNames.length !== new Set(menuNames).size) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  }

  static validateMaxCount(menus) {
    const menuCount = menus.reduce((acc, { count }) => acc + count, 0);
    if (menuCount > MENU.maxCount) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  }

  static validatePurchaseCount(menus) {
    menus.forEach(({ count }) => {
      if (super.isNotNaturalNumber(count)) {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  }

  static validateIncludesMenu(menus) {
    const sellingMenus = Object.keys(MENUS);

    menus.forEach(({ menu }) => {
      if (!sellingMenus.includes(menu)) {
        throw new ValidationError(ERROR.invalidMenu);
      }
    });
  }

  static validateMenuTypes(menus) {
    const menuNames = menus.map(({ menu }) => menu);
    const allConsistOfDesserts = menuNames.every((menu) => BEVERAGE[menu]);

    if (allConsistOfDesserts) {
      throw new ValidationError(ERROR.invalidMenu);
    }
  }

  static validateMenus(answer) {
    const menus = Parser.splitMenu(answer);

    this.validateDuplication(menus);
    this.validateMaxCount(menus);
    this.validatePurchaseCount(menus);
    this.validateIncludesMenu(menus);
    this.validateMenuTypes(menus);
  }
}

export default MenuValidator;
