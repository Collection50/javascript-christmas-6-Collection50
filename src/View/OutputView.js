import { Console } from '@woowacourse/mission-utils';
import { PLANNER_MESSAGE } from '../constants/index.js';

const OutputView = {
  log(string) {
    Console.print(string);
  },

  welcome() {
    Console.print(PLANNER_MESSAGE.welcome);
  },

  preview(day) {
    Console.print(`12월 ${day}일에 ${PLANNER_MESSAGE.preview}`);
  },
};

export default OutputView;
