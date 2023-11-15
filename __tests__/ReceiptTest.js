import Dessert from '../src/Model/Menu/Dessert/index.js';
import Main from '../src/Model/Menu/Main/index.js';
import Appetizer from '../src/Model/Menu/Appetizer/index.js';
import Beverage from '../src/Model/Menu/Beverage/index.js';
import Receipt from '../src/Model/Order/Receipt/index.js';
import Weekend from '../src/Model/Order/Discount/Weekend/index.js';
import Weekday from '../src/Model/Order/Discount/Weekday/index.js';
import Special from '../src/Model/Order/Discount/Special/index.js';
import Presentation from '../src/Model/Order/Discount/Presentation/index.js';
import Christmas from '../src/Model/Order/Discount/Christmas/index.js';

describe('날짜, 총주문 금액, 메뉴에 따라 할인 객체 배열 생성하는 영수증 클래스의 메서드를 테스트한다.', () => {
  it('크리스마스 디데이 할인, 특별 할인, 증정 이벤트, 평일 할인 객체 배열을 생성한다', () => {
    const DAY = 24;
    const menus = [
      new Main('티본스테이크', 2),
      new Dessert('초코케이크', 2),
      new Appetizer('양송이수프', 1),
    ];
    const baseDiscount = [Christmas, Special, Weekday, Presentation];
    const totalPrice = 146_000;
    const discounts = new Receipt(DAY, menus).addDiscountBuilder(
      DAY,
      menus,
      totalPrice,
    );

    discounts.forEach((discount, index) => {
      expect(discount).toBeInstanceOf(baseDiscount[index]);
    });
  });

  it('평일 할인, 특별 할인 객체 배열을 생성한다', () => {
    const DAY = 31;
    const menus = [
      new Main('크리스마스파스타', 2),
      new Beverage('제로콜라', 2),
      new Appetizer('양송이수프', 1),
      new Dessert('아이스크림', 1),
    ];
    const totalPrice = 67_000;
    const discounts = new Receipt(DAY, menus).addDiscountBuilder(
      DAY,
      menus,
      totalPrice,
    );
    const baseDiscount = [Special, Weekday];

    expect(discounts.length).toBe(2);
    discounts.forEach((discount, index) => {
      expect(discount).toBeInstanceOf(baseDiscount[index]);
    });
  });

  it('크리스마스 디데이 할인, 주말 할인 객체 배열을 생성한다', () => {
    const DAY = 15;
    const menus = [
      new Main('바비큐립', 2),
      new Beverage('제로콜라', 2),
      new Appetizer('양송이수프', 1),
      new Dessert('아이스크림', 1),
    ];
    const totalPrice = 106_000;
    const discounts = new Receipt(DAY, menus).addDiscountBuilder(
      DAY,
      menus,
      totalPrice,
    );
    const baseDiscount = [Christmas, Weekend];

    expect(discounts.length).toBe(2);
    discounts.forEach((discount, index) => {
      expect(discount).toBeInstanceOf(baseDiscount[index]);
    });
  });

  it('평일 할인, 증정 이벤트 객체 배열을 생성한다', () => {
    const DAY = 28;
    const menus = [
      new Main('바비큐립', 3),
      new Beverage('제로콜라', 2),
      new Appetizer('양송이수프', 1),
      new Dessert('아이스크림', 1),
    ];
    const totalPrice = 160_000;
    const discounts = new Receipt(DAY, menus).addDiscountBuilder(
      DAY,
      menus,
      totalPrice,
    );
    const baseDiscount = [Weekday, Presentation];

    expect(discounts.length).toBe(2);
    discounts.forEach((discount, index) => {
      expect(discount).toBeInstanceOf(baseDiscount[index]);
    });
  });

  it('총주문 금액이 기준치 이하인 경우 할인 객체 배열을 생성하지 않는다', () => {
    const DAY = 28;
    const menus = [new Appetizer('양송이수프', 1), new Beverage('제로콜라', 1)];
    const totalPrice = 9000;
    const discounts = new Receipt(DAY, menus).addDiscountBuilder(
      DAY,
      menus,
      totalPrice,
    );

    expect(discounts.length).toBe(0);
    expect(discounts).toBeInstanceOf(Array);
  });
});

describe('영수증 클래스를 테스트한다.', () => {
  it('총주문 금액을 테스트한다', () => {
    const DAY = 24;
    const menus = [
      new Main('티본스테이크', 2),
      new Dessert('초코케이크', 2),
      new Appetizer('양송이수프', 1),
    ];
    const totalPrice = 146_000;
    const price = new Receipt(DAY, menus).totalPrice(menus);

    expect(price).toBe(totalPrice);
  });

  it('할인 객체에 증정 이벤트가 추가되는 경우 증정 메뉴와 개수를 문자열로 반환한다.', () => {
    const DAY = 31;
    const menus = [
      new Main('티본스테이크', 2),
      new Dessert('초코케이크', 2),
      new Appetizer('양송이수프', 1),
    ];
    const presentation = new Receipt(DAY, menus).presentation();
    const presentatoinString = '샴페인 1개';

    expect(presentation).toBe(presentatoinString);
  });

  it('크리스마스 디데이 할인, 특별 할인, 증정 이벤트, 평일 할인이 존재하는 경우의 총할인 내역을 생성한다', () => {
    const DAY = 24;
    const menus = [
      new Main('티본스테이크', 2),
      new Dessert('초코케이크', 2),
      new Appetizer('양송이수프', 1),
    ];
    const discountHistory = new Receipt(DAY, menus).discountHistory();

    const outputs = [
      '크리스마스 디데이 할인',
      '특별 할인',
      '증정 이벤트',
      '평일 할인',
    ];

    outputs.forEach((output) => {
      expect(discountHistory).toContain(output);
    });
  });

  it('평일 할인, 특별 할인이 존재하는 경우의 총할인 내역을 생성한다', () => {
    const DAY = 31;
    const menus = [
      new Main('크리스마스파스타', 2),
      new Beverage('제로콜라', 2),
      new Appetizer('양송이수프', 1),
      new Dessert('아이스크림', 1),
    ];
    const discountHistory = new Receipt(DAY, menus).discountHistory();
    const outputs = ['특별 할인', '평일 할인'];

    outputs.forEach((output) => {
      expect(discountHistory).toContain(output);
    });
  });

  it('크리스마스 디데이 할인, 주말 할인이 존재하는 경우의 총할인 내역을 생성한다', () => {
    const DAY = 15;
    const menus = [
      new Main('바비큐립', 2),
      new Beverage('제로콜라', 2),
      new Appetizer('양송이수프', 1),
    ];
    const discountHistory = new Receipt(DAY, menus).discountHistory();
    const outputs = ['크리스마스 디데이 할인', '주말 할인'];

    outputs.forEach((output) => {
      expect(discountHistory).toContain(output);
    });
  });

  it('평일 할인, 증정 이벤트가 존재하는 경우의 총할인 내역을 생성한다', () => {
    const DAY = 28;
    const menus = [
      new Main('바비큐립', 3),
      new Beverage('제로콜라', 2),
      new Appetizer('양송이수프', 1),
      new Dessert('아이스크림', 1),
    ];
    const discountHistory = new Receipt(DAY, menus).discountHistory();
    const outputs = ['평일 할인', '증정 이벤트'];

    outputs.forEach((output) => {
      expect(discountHistory).toContain(output);
    });
  });

  it('평일 할인이 적용되는 경우의 할인 후 예상 결제 금액을 계산한다.', () => {
    const DAY = 28;
    const menus = [
      new Main('티본스테이크', 2), // 110_000
      new Beverage('제로콜라', 2), // 6_000
      new Appetizer('양송이수프', 1), // 6_000
      new Dessert('아이스크림', 1), // 5_000
    ];
    const totalPrice = 127_000;
    const discount = 2023;
    const discounts = new Receipt(DAY, menus);

    expect(discounts.payment(menus)).toBe(totalPrice - discount);
  });
  it('평일 할인이 적용되는 경우의 할인 후 예상 결제 금액을 계산한다.', () => {
    const DAY = 28;
    const menus = [
      new Main('티본스테이크', 2), // 110_000
      new Beverage('제로콜라', 2), // 6_000
      new Appetizer('양송이수프', 1), // 6_000
      new Dessert('아이스크림', 1), // 5_000
    ];
    const totalPrice = 127_000;
    const discount = 2023;
    const discounts = new Receipt(DAY, menus);

    expect(discounts.payment(menus)).toBe(totalPrice - discount);
  });

  it('크리스마스 할인, 평일 할인이 적용되는 경우의 할인 후 예상 결제 금액을 계산한다.', () => {
    const DAY = 24;
    const menus = [
      new Main('티본스테이크', 2), // 110_000
      new Beverage('제로콜라', 2), // 6_000
      new Appetizer('양송이수프', 1), // 6_000
      new Dessert('아이스크림', 1), // 5_000
    ];
    const totalPrice = 127_000;
    const discount = 2023 + 1000 + 1000 + 100 * (DAY - 1);
    const discounts = new Receipt(DAY, menus);

    expect(discounts.payment(menus)).toBe(totalPrice - discount);
  });

  it('평일 할인, 특별 할인이 적용되는 경우의 할인 후 예상 결제 금액을 계산한다.', () => {
    const DAY = 31;
    const menus = [
      new Main('크리스마스파스타', 2), // 50_000
      new Beverage('제로콜라', 2), // 6_000
      new Appetizer('양송이수프', 1), // 6_000
      new Dessert('아이스크림', 1), // 5_000
    ];
    const totalPrice = 67_000;
    const discount = 2023 + 1000;
    const discounts = new Receipt(DAY, menus);

    expect(discounts.payment(menus)).toBe(totalPrice - discount);
  });

  it('크리스마스 디데이 할인, 주말 할인이 적용되는 경우의 할인 후 예상 결제 금액을 계산한다.', () => {
    const DAY = 15;
    const menus = [
      new Main('크리스마스파스타', 2), // 50_000
      new Beverage('제로콜라', 2), // 6_000
      new Appetizer('양송이수프', 1), // 6_000
      new Dessert('아이스크림', 1), // 5_000
    ];
    const totalPrice = 67_000;
    const discount = 2023 * 2 + 1000 + 100 * (DAY - 1);
    const discounts = new Receipt(DAY, menus);

    expect(discounts.payment(menus)).toBe(totalPrice - discount);
  });

  it('평일 할인, 증정 이벤트가 적용되는 경우의 할인 후 예상 결제 금액을 계산한다.', () => {
    const DAY = 28;
    const menus = [
      new Main('크리스마스파스타', 5), // 125_000
      new Beverage('제로콜라', 2), // 6_000
      new Appetizer('양송이수프', 1), // 6_000
      new Dessert('아이스크림', 1), // 5_000
    ];
    const totalPrice = 142_000;
    const discount = 2023;
    const discounts = new Receipt(DAY, menus);

    expect(discounts.payment(menus)).toBe(totalPrice - discount);
  });

  it('총할인 금액에 따라 배지를 부여한다.', () => {
    const DAYS = [3, 26, 2];
    const menus = [
      [
        new Main('티본스테이크', 1),
        new Main('바비큐립', 1),
        new Dessert('초코케이크', 2),
        new Beverage('제로콜라', 1),
      ],
      [new Appetizer('타파스', 1), new Beverage('제로콜라', 1)],
      [new Dessert('아이스크림', 5)],
      [new Dessert('아이스크림', 3), new Beverage('제로콜라', 1)],
    ];
    const badges = ['산타', '없음', '트리', '별'];

    DAYS.forEach((day, index) => {
      const discounts = new Receipt(day, menus[index]);

      expect(discounts.badge()).toBe(badges[index]);
    });
  });
});
