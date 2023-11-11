import { Console } from '@woowacourse/mission-utils';
import OutputView from './OutputView.js';

const InputView = {
  async readAsync(query, validate, callback) {
    try {
      const answer = await Console.readLineAsync(query);
      validate(answer);
      return answer;
    } catch ({ message }) {
      OutputView.log(message);
      const answer = await callback();
      return answer;
    }
  },

  async readLine(message, validate) {
    const answer = await this.readAsync(message, validate, () =>
      this.readLine(message, validate),
    );
    return answer;
  },
};

export default InputView;
