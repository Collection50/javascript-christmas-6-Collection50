import Day from '../src/Model/Day/index.js';
import Appetizer from '../src/Model/Menu/Appetizer/index.js';
import Dessert from '../src/Model/Menu/Dessert/index.js';
import Main from '../src/Model/Menu/Main/index.js';
import Christmas from '../src/Model/Order/Discount/Christmas/index.js';
import Presentation from '../src/Model/Order/Discount/Presentation/index.js';
import Special from '../src/Model/Order/Discount/Special/index.js';
import Weekday from '../src/Model/Order/Discount/Weekday/index.js';
import Weekend from '../src/Model/Order/Discount/Weekend/index.js';
import DiscountBuilder from '../src/Model/Order/DiscountBuilder';

jest.mock('../src/Model/Day/index.js');

describe('날짜, 금액을 조합하여 할인 객체를 생성한다', () => {
  let mockDayInstance;

  beforeEach(() => {
    mockDayInstance = {
      isAfterChristmas: jest.fn(),
      isSpecial: jest.fn(),
      parseDayType: jest.fn(),
    };
    Day.mockImplementation(() => mockDayInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('25일 이전인 경우 크리스마스 이벤트를 포함한다', () => {
    const DAY = 24;
    mockDayInstance.isAfterChristmas.mockReturnValue(false);

    const discounts = new DiscountBuilder(DAY).christmas(DAY).build();

    expect(discounts).toHaveLength(1);
    expect(discounts[0]).toBeInstanceOf(Christmas);
  });

  it('25일 이후인 경우 크리스마스 이벤트를 포함하지 않는다', () => {
    const DAY = 26;

    mockDayInstance.isAfterChristmas.mockReturnValue(true);

    const discounts = new DiscountBuilder(DAY).christmas(DAY).build();

    expect(discounts).toHaveLength(0);
  });

  it('⭐️이 존재하는 날짜인 경우 특별 이벤트를 포함한다', () => {
    const specialDays = [10, 17, 25];
    mockDayInstance.isSpecial.mockReturnValue(true);

    specialDays.forEach((day) => {
      const discounts = new DiscountBuilder(day).special().build();

      expect(discounts).toHaveLength(1);
      expect(discounts[0]).toBeInstanceOf(Special);
    });
  });

  it('⭐️이 존재하지 않는 날짜인 경우 특별 이벤트를 포함하지 않는다', () => {
    const nonSpecailDays = [5, 6, 7, 15, 16];

    mockDayInstance.isSpecial.mockReturnValue(false);

    nonSpecailDays.forEach((day) => {
      const discounts = new DiscountBuilder(day).special().build();

      expect(discounts).toHaveLength(0);
    });
  });

  it('금/토요일이면서 메인 메뉴가 포함된 경우 주말 이벤트를 포함한다', () => {
    const weekends = [8, 9, 15, 16];
    const menus = [new Main('티본스테이크', 1)];

    mockDayInstance.parseDayType.mockReturnValue('weekend');

    weekends.forEach((weekend) => {
      const discounts = new DiscountBuilder(weekend).weekend(menus).build();

      expect(discounts).toHaveLength(1);
      expect(discounts[0]).toBeInstanceOf(Weekend);
    });
  });

  it('금/토요일이면서 메인 메뉴가 포함되지 않은 경우 경우 주말 이벤트를 포함하지 않는다', () => {
    const weekends = [8, 9, 15, 16];
    const menus = [new Appetizer('시저샐러드', 1)];

    mockDayInstance.parseDayType.mockReturnValue('weekend');

    weekends.forEach((weekend) => {
      const discounts = new DiscountBuilder(weekend).weekend(menus).build();

      expect(discounts).toHaveLength(0);
      expect(discounts).toBeInstanceOf(Array);
    });
  });

  it('일~목요일이면서 디저트 메뉴가 포함된 경우 평일 이벤트를 포함한다', () => {
    const weekdays = [4, 5, 6, 7];
    const menus = [new Dessert('초코케이크', 1)];

    mockDayInstance.parseDayType.mockReturnValue('weekday');

    weekdays.forEach((weekday) => {
      const discounts = new DiscountBuilder(weekday).weekday(menus).build();

      expect(discounts).toHaveLength(1);
      expect(discounts[0]).toBeInstanceOf(Weekday);
    });
  });

  it('일~목요일이면서 디저트 메뉴가 포함되지 않은 경우 평일 이벤트를 포함하지 않는다', () => {
    const weekdays = [4, 5, 6, 7];
    const menus = [new Main('티본스테이크', 1)];

    mockDayInstance.parseDayType.mockReturnValue('weekday');

    weekdays.forEach((weekday) => {
      const discounts = new DiscountBuilder(weekday).weekday(menus).build();

      expect(discounts).toHaveLength(0);
      expect(discounts).toBeInstanceOf(Array);
    });
  });

  it('총주문 금액이 충족되는 경우 증정 이벤트를 포함한다', () => {
    const DAY = 10;
    const MINIMUM_ORDER_PRICE = [120_000, 130_000, 250_123];

    MINIMUM_ORDER_PRICE.forEach((price) => {
      const discounts = new DiscountBuilder(DAY).presentation(price).build();

      expect(discounts).toHaveLength(1);
      expect(discounts[0]).toBeInstanceOf(Presentation);
    });
  });

  it('총주문 금액이 충족되지 않는 경우 증정 이벤트를 포함하지 않는다', () => {
    const DAY = 10;
    const MINIMUM_ORDER_PRICE = [119_999, 100_000, 5_500];

    MINIMUM_ORDER_PRICE.forEach((price) => {
      const discounts = new DiscountBuilder(DAY).presentation(price).build();

      expect(discounts).toHaveLength(0);
    });
  });
});
