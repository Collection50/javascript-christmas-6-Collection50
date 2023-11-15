import Menu from '../src/Model/Menu/index.js';
import Order from '../src/Model/Order/index.js';

describe('Order 클래스 테스트', () => {
  const DAY = 10;

  test('입력받은 메뉴를 토대로 메뉴 객체 배열을 생성한다', () => {
    const inputs = [
      '타파스-1,제로콜라-1',
      '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1',
    ];

    expect(inputs).toBeInstanceOf(Array);

    inputs.forEach((input) => {
      const menus = new Order(input, DAY).addMenus(input);
      menus.forEach((menu) => expect(menu instanceof Menu).toBeTruthy());
    });
  });

  test('입력받은 메뉴를 출력 형식으로 포맷하여 반환한다.', () => {
    const input = '티본스테이크-2,제로콜라-2,초코케이크-1';
    const outputs = ['티본스테이크 2개', '제로콜라 2개', '초코케이크 1개'];

    const formattedMenus = new Order(input, DAY).formatMenus();

    outputs.forEach((output) => {
      expect(formattedMenus).toContain(output);
    });
  });

  test('메뉴의 총주문 금액을 출력 형식으로 포맷하여 반환한다.', () => {
    const menus = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    const price = '142,000원';
    const order = new Order(menus, DAY);

    expect(order.sumTotalPrice()).toBe(price);
  });

  test('증정 이벤트의 결과를 출력 형식으로 포맷하여 반환한다.', () => {
    const menus = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    const presentation = '샴페인 1개';
    const order = new Order(menus, DAY);

    expect(order.getPresentation()).toBe(presentation);
  });

  test('주문 내역을 출력 형식으로 포맷하여 반환한다.', () => {
    const menus = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    const outputs = [
      '크리스마스 디데이 할인:',
      '평일 할인:',
      '특별 할인:',
      '증정 이벤트:',
    ];
    const orderHistory = new Order(menus, DAY).history();

    outputs.forEach((output) => {
      expect(orderHistory).toContain(output);
    });
  });

  test('총혜택 금액을 출력 형식으로 포맷하여 반환한다.', () => {
    const menus = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    const output = '-31,946원';
    const discountAmount = new Order(menus, DAY).sumTotalDiscount();

    expect(discountAmount).toBe(output);
  });

  test('할인 후 예상 결제 금액을 출력 형식으로 포맷하여 반환한다.', () => {
    const menus = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    const output = '135,054원';
    const paymentAmount = new Order(menus, DAY).calculatePaymentAmount();

    expect(paymentAmount).toBe(output);
  });
});
