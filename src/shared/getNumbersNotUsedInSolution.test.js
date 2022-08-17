import {
  getNumbersNotUsedInSolution,
} from './solution-functions';

import {
  NUMBER_K,
  NUMBER_J,
  NUMBER_2,
  NUMBER_A,
} from './constants';

// TODO - have central file for interesting solutionHands

const solutionHands = [
  [
    { id: 'card_D_10', suit: 'D', number: 10 },
    { id: 'card_D_9', suit: 'D', number: 9 },
    { id: 'card_D_8', suit: 'D', number: 8 },
    { id: 'card_D_7', suit: 'D', number: 7 },
    { id: 'card_D_6', suit: 'D', number: 6 },
  ],
  [
    { id: 'card_S_Q', suit: 'S', number: 12 },
    { id: 'card_H_Q', suit: 'H', number: 12 },
    { id: 'card_D_Q', suit: 'D', number: 12 },
    { id: 'card_C_Q', suit: 'C', number: 12 },
    { id: 'card_H_8', suit: 'H', number: 8 },
  ],
  [
    { id: 'card_C_7', suit: 'C', number: 7 },
    { id: 'card_S_6', suit: 'S', number: 6 },
    { id: 'card_S_5', suit: 'S', number: 5 },
    { id: 'card_C_4', suit: 'C', number: 4 },
    { id: 'card_C_3', suit: 'C', number: 3 },
  ],
  [
    { id: 'card_C_6', suit: 'C', number: 6 },
    { id: 'card_H_5', suit: 'H', number: 5 },
    { id: 'card_D_5', suit: 'D', number: 5 },
    { id: 'card_C_5', suit: 'C', number: 5 },
    { id: 'card_S_3', suit: 'S', number: 3 },
  ],
];

describe('getNumbersNotUsedInSolution', () => {
  it('will return an array of the numbers not used in the hard-coded solution', () => {
    expect(getNumbersNotUsedInSolution(solutionHands, NUMBER_2)).toEqual([NUMBER_A, NUMBER_J, NUMBER_K]);
  });
});
