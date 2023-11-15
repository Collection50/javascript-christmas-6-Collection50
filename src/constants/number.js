export const MENU = {
  maxCount: 20,
  minimumOrder: 10_000,
};

export const PRICE = {
  zero: 0,
  minimumOrder: 10_000,
  presentation: 120_000,
};

export const DATE = {
  first: 1,
  last: 31,
  christmas: 25,
  sunday: 0,
  friday: 5,
  saturday: 6,
};

export const DISCOUNT = {
  main: 2_023,
  dessert: 2_023,
  special: 1_000,
  christmasDefault: 1000,
  christmasDday: 100,
};

export const PRESENTATION_TYPE = {
  champagne: { name: '샴페인', count: 1, price: 25_000 },
};

export const BADGE = {
  santa: { name: '산타', price: 20_000 },
  tree: { name: '트리', price: 10_000 },
  star: { name: '별', price: 5_000 },
  none: '없음',
};
