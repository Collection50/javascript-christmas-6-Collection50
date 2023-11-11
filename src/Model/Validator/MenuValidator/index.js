import Validator from '../index.js';
import Parser from '../../Parser/index.js';
import ValidationError from '../ValidationError/index.js';
import { ERROR, MENU } from '../../../constants/index.js';

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

  static validateMenus(answer) {
    const menus = Parser.splitMenu(answer);

    this.validateDuplication(menus);
    this.validateMaxCount(menus);
  }
}

export default MenuValidator;
