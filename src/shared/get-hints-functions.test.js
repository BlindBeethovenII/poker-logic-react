import { getHints } from './get-hints-functions';

import {
  getCardsAvailable,
} from './solution-functions';

import { testSolution2, testClues2 } from './test-hands';

describe('getHints', () => {
  it('will return HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE', () => {
    // need the solution options that will generate this hint
    const solutionOptions = [
      [
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, false, true, false, true, true, true, false, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
      ],
      [
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
      ],
      [
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, false, true, false, true, true, true, false, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
      ],
      [
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, false, true, false, true, true, true, false, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
        {
          suitOptions: [true, true, true, true],
          numberOptions: [true, false, true, true, true, true, true, true, true, true, true, true, false],
        },
      ],
    ];

    expect(getHints(solutionOptions, testSolution2, testClues2, getCardsAvailable(testSolution2.solutionHands), false)).toEqual([]);
  });
});
