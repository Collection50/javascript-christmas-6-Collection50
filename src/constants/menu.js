export const MAIN = {
  티본스테이크: 55_000,
  바비큐립: 54_000,
  해산물파스타: 35_000,
  크리스마스파스타: 25_000,
};

export const APPETIZER = {
  양송이수프: 6_000,
  타파스: 5_500,
  시저샐러드: 8_000,
};

export const DESSERT = {
  초코케이크: 15_000,
  아이스크림: 5_000,
};

export const BEVERAGE = {
  제로콜라: 3_000,
  레드와인: 60_000,
  샴페인: 25_000,
};

export const PRESENTATION = {
  샴페인: 25_000,
};

export const MENUS = {
  ...MAIN,
  ...APPETIZER,
  ...DESSERT,
  ...BEVERAGE,
  ...PRESENTATION,
};
