export const SYMBOLS = {
  hyphen: '-',
  menuDivider: ',',
  openChevron: '<',
  closeChevron: '>',
  lineBreak: '\n',
};

export const LANG = {
  korea: 'ko-KR',
};

export const DISCOUNT_MESSAGE = {
  christmas: '크리스마스 디데이 할인: -',
  weekday: '평일 할인: -',
  weekend: '주말 할인: -',
  special: '특별 할인: -',
  presentation: '증정 이벤트: -',
};

export const ERROR = {
  prefix: '[ERROR]',
  invalidDate: `유효하지 않은 날짜입니다. 다시 입력해 주세요.${SYMBOLS.lineBreak}`,
  invalidMenu: `유효하지 않은 주문입니다. 다시 입력해 주세요.${SYMBOLS.lineBreak}`,
  notOnlyContainsBeverage: `음료만 주문할 수 없습니다. 다시 입력해주세요.${SYMBOLS.lineBreak}`,
};

export const PLANNER_MESSAGE = {
  welcome: `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.${SYMBOLS.lineBreak}`,
  askVisitDay: `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)${SYMBOLS.lineBreak}`,
  askMenus: `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)${SYMBOLS.lineBreak}`,
  preview: `우테코 식당에서 받을 이벤트 혜택 미리 보기!${SYMBOLS.lineBreak}`,
};

export const MENU_MESSAGE = {
  menu: '주문 메뉴',
  priceBeforeDiscount: '할인 전 총 주문 금액',
  presentation: '증정 메뉴',
  benefits: '혜택 내역',
  discountPrice: '총 혜택 금액',
  priceAfterDiscount: '할인 후 예상 결제 금액',
  badge: '12월 이벤트 배지',
};
