import {
  getNumberNotUsedHint,
  createHintNumberNotUsed,
} from './hint-functions';

import {
  createSolutionOptions,
  getNumbersNotUsedInSolution,
} from './solution-functions';

import { NUMBER_2 } from './constants';

import { solutionHands1 } from './test-hands';

describe('getNumberNotUsedHint', () => {
  it('will return an array of hints for the numbers not used in the given hard-coded solution for the given full solutionOptions', () => {
    // we can compute what we expect by using getNumbersNotUsedInSolution() and the fact we are giving a full solution options
    const numbersNotUsed = getNumbersNotUsedInSolution(solutionHands1, NUMBER_2);
    const result = [];
    numbersNotUsed.forEach((number) => {
      // there will be one for each solution options index
      [0, 1, 2, 3].forEach((solutionOptionsIndex) => {
        // and one for each hand options index
        [0, 1, 2, 3, 4].forEach((handOptionsIndex) => {
          result.push(createHintNumberNotUsed(number, solutionOptionsIndex, handOptionsIndex));
        });
      });
    });

    expect(getNumberNotUsedHint(createSolutionOptions(), solutionHands1, NUMBER_2)).toEqual(result);
  });
});
