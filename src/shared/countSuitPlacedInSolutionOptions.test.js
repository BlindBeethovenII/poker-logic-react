import { countSuitPlacedInSolutionOptions, createSolutionOptions, setSuitOptionOnlyInSolutionOptions } from './solution-functions';

import { NUMBER_10, SUIT_SPADES } from './constants';

describe('countSuitPlacedInSolutionOptions', () => {
  it('will return 0 for spades in initial solutionOptions', () => {
    expect(countSuitPlacedInSolutionOptions(SUIT_SPADES, createSolutionOptions(NUMBER_10))).toEqual(0);
  });

  it('will return 1 for spades when 1 spade has been placed', () => {
    const solutionOptions = setSuitOptionOnlyInSolutionOptions(0, 1, 2, createSolutionOptions(NUMBER_10));
    expect(countSuitPlacedInSolutionOptions(SUIT_SPADES, solutionOptions)).toEqual(1);
  });
});
