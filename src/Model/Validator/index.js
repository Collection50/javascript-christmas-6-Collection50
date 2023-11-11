class Validator {
  static isNotNaturalNumber(value) {
    if (Number.isNaN(value) || !Number.isSafeInteger(value) || value <= 0) {
      return true;
    }
    return false;
  }
}

export default Validator;
