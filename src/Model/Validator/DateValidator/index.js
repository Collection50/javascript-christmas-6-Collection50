import { ERROR } from '../../../constants/message.js';
import { DATE } from '../../../constants/number.js';
import ValidationError from '../ValidationError/index.js';
import Validator from '../index.js';

class DateValidator extends Validator {
  static validateRange(day) {
    if (day < DATE.first || day > DATE.last) {
      throw new ValidationError(ERROR.invalidDate);
    }
  }

  static validateNumber(day) {
    if (super.isNotNaturalNumber(day)) {
      throw new ValidationError(ERROR.invalidDate);
    }
  }

  static validateVisitDay(answer) {
    const day = Number(answer);
    this.validateRange(day);
    this.validateNumber(day);
  }
}

export default DateValidator;
