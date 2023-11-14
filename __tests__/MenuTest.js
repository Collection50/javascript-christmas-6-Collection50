import Menu from '../src/Model/Menu/index.js';
import Dessert from '../src/Model/Menu/Dessert/index.js';
import Appetizer from '../src/Model/Menu/Appetizer/index.js';
import Main from '../src/Model/Menu/Main/index.js';
import Beverage from '../src/Model/Menu/Beverage/index.js';

describe('Menu 클래스 테스트', () => {
  test('모든 메뉴는 Menu 클래스를 상속받는다', () => {
    const menus = [Dessert, Appetizer, Main, Beverage];

    menus.forEach((menu) => menu instanceof Menu);
  });

  test('메뉴의 이름과 개수를 쉼표로 구분하여 반환한다', () => {
    const menus = [
      new Main('티본스테이크', 2),
      new Beverage('제로콜라', 2),
      new Dessert('초코케이크', 1),
    ];
    const strings = ['티본스테이크 2개', '제로콜라 2개', '초코케이크 1개'];

    menus.forEach((menu, index) => {
      expect(menu.toString()).toBe(strings[index]);
    });
  });

  test('해당 메뉴의 가격을 반환한다', () => {
    const menus = [
      new Appetizer('시저샐러드', 2),
      new Main('크리스마스파스타', 2),
      new Dessert('초코케이크', 1),
      new Beverage('레드와인', 1),
    ];
    const prices = [16_000, 50_000, 15_000, 60_000];

    menus.forEach((menu, index) => {
      expect(menu.price()).toBe(prices[index]);
    });
  });
});
