import { getSuitsOfNumberInAvailable, getCardsAvailable } from './solution-functions';

import {
  NUMBER_10, NUMBER_K, NUMBER_Q, SUIT_CLUBS, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES,
} from './constants';

import { testSolutionHands1 } from './test-hands';

describe('getSuitsOfNumberInAvailable', () => {
  it('will return an array of suits for a number with 3 entries', () => {
    expect(getSuitsOfNumberInAvailable(NUMBER_10, getCardsAvailable(testSolutionHands1))).toEqual([SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS]);
  });

  it('will return an array of suits for a number with 4 entries', () => {
    expect(getSuitsOfNumberInAvailable(NUMBER_Q, getCardsAvailable(testSolutionHands1))).toEqual([SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS]);
  });

  it('will return an empty array for a number with no entries', () => {
    expect(getSuitsOfNumberInAvailable(NUMBER_K, getCardsAvailable(testSolutionHands1))).toEqual([]);
  });
});
