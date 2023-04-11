import { countNumberAvailable, getCardsAvailable } from './solution-functions';

import { testSolutionHands1 } from './test-hands';

import { NUMBER_6, NUMBER_Q } from './constants';

describe('countNumberAvailable', () => {
  it('will return 4 for Queens for hand1 cards', () => {
    expect(countNumberAvailable(NUMBER_Q, getCardsAvailable(testSolutionHands1))).toEqual(4);
  });

  it('will return 1 for Sixes for hand1 cards', () => {
    expect(countNumberAvailable(NUMBER_6, getCardsAvailable(testSolutionHands1))).toEqual(1);
  });
});
