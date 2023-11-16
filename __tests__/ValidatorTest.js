import DateValidator from '../src/Model/Validator/DateValidator/index.js';
import MenuValidator from '../src/Model/Validator/MenuValidator/index.js';

describe('방문 날짜를 검사하는 DateValidator 클래스 테스트', () => {
  test('입력값이 자연수가 아닌 경우 오류가 발생한다', () => {
    const inputs = ['abc', '0', '1234', '1.3', '10.5', '3a', '-1'];

    inputs.forEach((input) => {
      expect(() => DateValidator.validateVisitDay(input)).toThrow();
    });
  });

  test('입력값이 1 ~ 31 범위의 숫자가 아닌 경우 오류가 발생한다', async () => {
    const inputs = ['0', '-1', '32', '33', '31.5'];

    inputs.forEach((input) => {
      expect(() => DateValidator.validateVisitDay(input)).toThrow();
    });
  });

  test('입력값이 1 ~ 31 사이의 자연수인 경우 오류가 발생하지 않는다', () => {
    const inputs = ['1', '   2', ' 31  ', '9', '10'];

    inputs.forEach((input) => {
      expect(() => DateValidator.validateVisitDay(input)).not.toThrow();
    });
  });
});

describe('메뉴를 검사하는 MenuValidator 클래스 테스트', () => {
  test('중복된 메뉴를 입력하는 경우 오류가 발생한다', () => {
    const inputs = ['티본스테이크-1,티본스테이크-1,양송이수프-2,초코케이크-3'];

    inputs.forEach((input) => {
      expect(() => MenuValidator.validateMenus(input)).toThrow();
    });
  });

  test('메뉴의 총 구매 개수가 20개가 넘는 경우 오류가 발생한다', async () => {
    const inputs = [
      '티본스테이크-20,양송이수프-2,초코케이크-3',
      '시저샐러드-5,해산물파스타-7,바비큐립-5,크리스마스파스타-4',
      '시저샐러드-5,해산물파스타-7,바비큐립-5,제로콜라-10',
    ];

    inputs.forEach((input) => {
      expect(() => MenuValidator.validateMenus(input)).toThrow();
    });
  });

  test('메뉴의 구매 개수가 자연수가 아닌 경우 오류가 발생한다', async () => {
    const inputs = [
      '티본스테이크-a,양송이수프-2,초코케이크-3',
      '시저샐러드-5,해산물파스타-0,바비큐립-3.5,크리스마스파스타-',
      '시저샐러드-,해산물파스타-7,바비큐립-5,제로콜라-10',
    ];

    inputs.forEach((input) => {
      expect(() => MenuValidator.validateMenus(input)).toThrow();
    });
  });

  test('메뉴가 모두 음료인 경우 오류가 발생한다', async () => {
    const inputs = [
      '제로콜라-3,레드와인-1,샴페인-3',
      '제로콜라-3,레드와인-1',
      '샴페인-3',
    ];

    inputs.forEach((input) => {
      expect(() => MenuValidator.validateMenus(input)).toThrow();
    });
  });

  test('판매하지 않는 메뉴를 입력하는 경우 오류가 발생한다', async () => {
    const inputs = [
      '짜빠게티-3,펩시제로-1,뿌링클-3',
      'BBQ-3,스시-1',
      '달고나-3',
    ];

    inputs.forEach((input) => {
      expect(() => MenuValidator.validateMenus(input)).toThrow();
    });
  });
});
