import { countSuitTrueInSolutionOptions, createSolutionOptions, toggleSuitOptionInSolutionOptions } from './solution-functions';

import { NUMBER_2 } from './constants';

describe('countSuitTrueInSolutionOptions', () => {
  it('will return 20 for a new solution options as all diamonds are currently available', () => {
    expect(countSuitTrueInSolutionOptions(createSolutionOptions(NUMBER_2), 2)).toEqual(20);
  });

  it('will return 18 for a new solution options that has 2 diamonds removed', () => {
    const suitOptionsIndex = 2;
    const solutionOptions = createSolutionOptions(NUMBER_2);
    const solutionOptions1 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, 1, 2, solutionOptions);
    const solutionOptions2 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, 2, 3, solutionOptions1);
    expect(countSuitTrueInSolutionOptions(solutionOptions2, suitOptionsIndex)).toEqual(18);
  });
});
