import { getMaxNumberInCardOptions, createSolutionOptions } from './solution-functions';

import { NUMBER_10, NUMBER_A, NUMBER_J } from './constants';

describe('getMaxNumberInCardOptions', () => {
  it('will return A for a new solutionOptions card options', () => {
    expect(getMaxNumberInCardOptions(createSolutionOptions(NUMBER_10)[0][0])).toEqual(NUMBER_A);
  });

  it('will return J for a card options where J is the first true number counting down from A, K, ...', () => {
    const cardOptions = {
      suitOptions: [true, true, true, true],
      numberOptions: [false, false, false, true, true, true, true, true, true, true, true, false, false],
    };

    expect(getMaxNumberInCardOptions(cardOptions)).toEqual(NUMBER_J);
  });
});
