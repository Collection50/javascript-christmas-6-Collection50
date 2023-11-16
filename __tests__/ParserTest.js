import Parser from '../src/Model/Parser/index.js';

describe('Parser 클래스를 테스트한다.', () => {
  it('주문 메뉴를 입력받아 이름, 개수 형태의 객체 배열로 반환한다.', () => {
    const input = '티본스테이크-3,양송이수프-2,초코케이크-1,제로콜라-1';
    const result = Parser.parseMenu(input);

    expect(result).toEqual([
      { menu: '티본스테이크', count: 3 },
      { menu: '양송이수프', count: 2 },
      { menu: '초코케이크', count: 1 },
      { menu: '제로콜라', count: 1 },
    ]);
  });

  it('메뉴의 이름을 활용하여 메뉴의 타입을 반환한다.', () => {
    const menuNames = [
      '양송이수프',
      '초코케이크',
      '아이스크림',
      '티본스테이크',
      '바비큐립',
      '제로콜라',
      '레드와인',
    ];
    const menuTypes = [
      'appetizer',
      'dessert',
      'dessert',
      'main',
      'main',
      'beverage',
      'beverage',
    ];

    menuNames.forEach((menuName, index) => {
      expect(Parser.parseMenuType(menuName)).toEqual(menuTypes[index]);
    });
  });
});
