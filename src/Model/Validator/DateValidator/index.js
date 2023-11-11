import { ERROR } from '../../../constants/message.js';
import { DATE } from '../../../constants/number.js';
import ValidationError from '../ValidationError/index.js';
import Validator from '../index.js';
import Parser from '../../Parser/index.js';

class DateValidator extends Validator {
  static validateRange(day) {
    if (day < DATE.first || day > DATE.last) {
      throw ValidationError(ERROR.invalidDate);
    }
  }

  static validateNumber(day) {
    if (super.isNotNaturalNumber(day)) {
      throw ValidationError(ERROR.invalidDate);
    }
  }

  static validateVisitDay(answer) {
    const day = Parser.parseNumber(answer);
    this.validateRange(day);
    this.validateNumber(day);
  }
}

export default DateValidator;
