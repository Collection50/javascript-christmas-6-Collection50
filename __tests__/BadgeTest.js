import Badge from '../src/Model/Order/Receipt/Badge/index.js';

describe('뱃지를 부여하는 Badge 클래스 테스트', () => {
  test('총할인 금액이 2만원 이상인 경우 산타를 부여한다', () => {
    const totalDiscounts = [20_000, 30_000, 45_000];

    totalDiscounts.forEach((totalDiscount) => {
      const badge = new Badge(totalDiscount);

      expect(badge.tag()).toBe('산타');
    });
  });

  test('총할인 금액이 1만원 이상인 경우 트리를 부여한다', () => {
    const totalDiscounts = [10_000, 15_000, 17_500];

    totalDiscounts.forEach((totalDiscount) => {
      const badge = new Badge(totalDiscount);

      expect(badge.tag()).toBe('트리');
    });
  });

  test('총할인 금액이 5천원 이상인 경우 별을 부여한다', () => {
    const totalDiscounts = [5_000, 7_000, 9_500];

    totalDiscounts.forEach((totalDiscount) => {
      const badge = new Badge(totalDiscount);

      expect(badge.tag()).toBe('별');
    });
  });

  test('총할인 금액이 5천원 이하인 경우 부여하지 않는다', () => {
    const totalDiscounts = [4_999, 3_500, 2_000];

    totalDiscounts.forEach((totalDiscount) => {
      const badge = new Badge(totalDiscount);

      expect(badge.tag()).toBe('없음');
    });
  });
});
