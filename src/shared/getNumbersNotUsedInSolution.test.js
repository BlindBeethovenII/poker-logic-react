import { getNumbersNotUsedInSolution } from './solution-functions';

import {
  NUMBER_K,
  NUMBER_J,
  NUMBER_2,
  NUMBER_A,
  NUMBER_3,
} from './constants';

import { solutionHands1 } from './test-hands';

describe('getNumbersNotUsedInSolution', () => {
  it('will return an array of the numbers not used in the given hard-coded solution', () => {
    expect(getNumbersNotUsedInSolution(solutionHands1, NUMBER_2)).toEqual([NUMBER_A, NUMBER_3, NUMBER_J, NUMBER_K]);
  });
});
