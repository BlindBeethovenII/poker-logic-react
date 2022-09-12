import { getMinNumberInCardOptions, createSolutionOptions } from './solution-functions';

import { NUMBER_10, NUMBER_2, NUMBER_4 } from './constants';

describe('getMinNumberInCardOptions', () => {
  it('will return 2 for a new solutionOptions card options', () => {
    expect(getMinNumberInCardOptions(createSolutionOptions(NUMBER_10)[0][0])).toEqual(NUMBER_2);
  });

  it('will return 4 for a card options where 4 is the first true number counting up from 2, 3, ...', () => {
    const cardOptions = {
      suitOptions: [true, true, true, true],
      numberOptions: [false, false, false, true, true, true, true, true, true, true, true, false, false],
    };

    expect(getMinNumberInCardOptions(cardOptions)).toEqual(NUMBER_4);
  });
});
