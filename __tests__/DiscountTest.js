import Main from '../src/Model/Menu/Main/index.js';
import Dessert from '../src/Model/Menu/Dessert/index.js';
import Weekend from '../src/Model/Order/Discount/Weekend/index.js';
import Weekday from '../src/Model/Order/Discount/Weekday/index.js';
import Special from '../src/Model/Order/Discount/Special/index.js';
import Presentation from '../src/Model/Order/Discount/Presentation/index.js';
import { DISCOUNT, LANG, PRESENTATION, SYMBOLS } from '../src/constants';
import Christmas from '../src/Model/Order/Discount/Christmas/index.js';

describe('주말 할인 테스트', () => {
  const MENU_COUNT = 4;
  const menus = [new Main('티본스테이크', 2), new Main('해산물파스타', 2)];
  const weekendDiscount = new Weekend(menus);

  it('메뉴의 개수에 따라 할인 금액을 계산한다', () => {
    expect(weekendDiscount.calculateDiscountAmount(menus)).toBe(
      MENU_COUNT * DISCOUNT.main,
    );
  });

  it('메뉴의 할인 금액을 문자열로 반환한다', () => {
    const strings = [
      (MENU_COUNT * DISCOUNT.main).toLocaleString(LANG.korea),
      '주말 할인',
      SYMBOLS.hyphen,
    ];

    strings.forEach((string) => {
      expect(weekendDiscount.toString(menus)).toContain(string);
    });
  });

  it('메뉴의 할인 금액을 숫자로 반환한다', () => {
    expect(weekendDiscount.amount()).toBe(MENU_COUNT * DISCOUNT.main);
  });
});

describe('평일 할인 테스트', () => {
  const MENU_COUNT = 4;
  const menus = [new Dessert('초코케이크', 2), new Dessert('아이스크림', 2)];
  const weekdayDiscount = new Weekday(menus);

  it('메뉴의 개수에 따라 할인 금액을 계산한다', () => {
    expect(weekdayDiscount.calculateDiscountAmount(menus)).toBe(
      MENU_COUNT * DISCOUNT.main,
    );
  });

  it('메뉴의 할인 금액을 문자열로 반환한다', () => {
    const strings = [
      (MENU_COUNT * DISCOUNT.main).toLocaleString(LANG.korea),
      '평일 할인',
    ];

    strings.forEach((string) => {
      expect(weekdayDiscount.toString(menus)).toContain(string);
    });
  });

  it('메뉴의 할인 금액을 숫자로 반환한다', () => {
    expect(weekdayDiscount.amount()).toBe(MENU_COUNT * DISCOUNT.main);
  });
});

describe('크리스마스 디데이 할인 테스트', () => {
  const DAY = 10;
  const DISCOUNT_AMOUNT = (10 - 1) * 100 + 1000;
  const christmas = new Christmas(DAY);

  it('크리스마스 디데이에 따라 할인 금액을 계산한다', () => {
    expect(christmas.calculateDiscountAmount(DAY)).toBe(DISCOUNT_AMOUNT);
  });

  it('메뉴의 할인 금액을 문자열로 반환한다', () => {
    const strings = [
      SYMBOLS.hyphen,
      DISCOUNT_AMOUNT.toLocaleString(LANG.korea),
      '크리스마스 디데이 할인',
    ];

    strings.forEach((string) => {
      expect(christmas.toString()).toContain(string);
    });
  });

  it('메뉴의 할인 금액을 숫자로 반환한다', () => {
    expect(christmas.amount()).toBe(DISCOUNT_AMOUNT);
  });
});

describe('특별 할인 테스트', () => {
  const DISCOUNT_AMOUNT = DISCOUNT.special;
  const special = new Special();

  it('특별한 날인 경우 할인 금액을 계산한다', () => {
    expect(special.calculateDiscountAmount()).toBe(DISCOUNT_AMOUNT);
  });

  it('메뉴의 할인 금액을 문자열로 반환한다', () => {
    const strings = [
      SYMBOLS.hyphen,
      DISCOUNT_AMOUNT.toLocaleString(LANG.korea),
      '특별 할인',
    ];

    strings.forEach((string) => {
      expect(special.toString()).toContain(string);
    });
  });

  it('메뉴의 할인 금액을 숫자로 반환한다', () => {
    expect(special.amount()).toBe(DISCOUNT_AMOUNT);
  });
});

describe('증정 이벤트 테스트', () => {
  const DISCOUNT_AMOUNT = PRESENTATION.샴페인;
  const resentation = new Presentation();

  it('증정 이벤트의 할인 금액을 계산한다', () => {
    expect(resentation.calculateDiscountAmount()).toBe(DISCOUNT_AMOUNT);
  });

  it('증정 이벤트의 할인 금액을 문자열로 반환한다', () => {
    const strings = [
      SYMBOLS.hyphen,
      DISCOUNT_AMOUNT.toLocaleString(LANG.korea),
      '증정 이벤트',
    ];

    strings.forEach((string) => {
      expect(resentation.toString()).toContain(string);
    });
  });

  it('증정 이벤트의 할인 금액을 숫자로 반환한다', () => {
    expect(resentation.amount()).toBe(DISCOUNT_AMOUNT);
  });
});
