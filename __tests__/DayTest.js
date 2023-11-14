import Day from '../src/Model/Day/index.js';
import { DATE } from '../src/constants/index.js';

describe('Day 클래스 테스트', () => {
  test('달력에 ⭐️이 있는 경우 특별한 날로 적용된다.', () => {
    const christmasDay = new Day(DATE.christmas);
    const sunday = new Day(3);

    expect(christmasDay.isSpecial()).toBeTruthy();
    expect(sunday.isSpecial()).toBeTruthy();
  });

  test('달력에 ⭐️이 없는 경우 특별한 날로 적용되지 않는다.', () => {
    const ordinaryDay = new Day(2);
    expect(ordinaryDay.isSpecial()).toBeFalsy();
  });

  test('주말(금,토)인 경우 "weekend"를 반환한다.', () => {
    const WEEKEND = 'weekend';
    const FRIDAY = 8;
    const SATURDAY = 16;
    const days = [FRIDAY, SATURDAY].map((day) => new Day(day));

    days.forEach((day) => {
      expect(day.parseDayType()).toBe(WEEKEND);
    });
  });

  test('주중(일-목)인 경우 "weekday"를 반환한다.', () => {
    const WEEKDAY = 'weekday';
    const MONDAY = 11;
    const TUESDAY = 12;
    const THURSDAY = 14;
    const days = [MONDAY, TUESDAY, THURSDAY].map((day) => new Day(day));

    days.forEach((day) => {
      expect(day.parseDayType()).toBe(WEEKDAY);
    });
  });

  test('크리스마스가 지났다면 false를 반환한다.', () => {
    const dayAfterChristmas = new Day(DATE.christmas + 1);

    expect(dayAfterChristmas.isAfterChristmas()).toBeTruthy();
  });

  test('크리스마스가 지나지 않았다면 true를 반환한다. (25일 포함)', () => {
    const dayBeforeChristmas = new Day(DATE.christmas - 1);

    expect(dayBeforeChristmas.isAfterChristmas()).toBeFalsy();
  });
});
