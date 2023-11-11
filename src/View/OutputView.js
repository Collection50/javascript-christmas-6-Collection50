import { Console } from '@woowacourse/mission-utils';
import { PLANNER_MESSAGE } from '../constants/index.js';

const OutputView = {
  log(string) {
    Console.print(string);
  },

  welcome() {
    Console.print(PLANNER_MESSAGE.welcome);
  },
};

export default OutputView;
