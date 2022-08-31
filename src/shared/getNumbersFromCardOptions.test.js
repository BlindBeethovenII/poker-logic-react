import { getNumbersFromCardOptions } from './solution-functions';

import { NUMBER_6, NUMBERS, NUMBER_K } from './constants';

describe('getNumbersFromCardOptions', () => {
  const suitOptions = [true, true, true, true];

  it('will return an array with one entry for a single true', () => {
    const numberOptions = [false, false, false, false, false, true, false, false, false, false, false, false, false];
    expect(getNumbersFromCardOptions({ suitOptions, numberOptions })).toEqual([NUMBER_6]);
  });

  it('will return an array with two entries for two trues', () => {
    const numberOptions = [false, false, false, false, false, true, false, false, false, false, false, false, true];
    expect(getNumbersFromCardOptions({ suitOptions, numberOptions })).toEqual([NUMBER_6, NUMBER_K]);
  });

  it('will return all numbers for all trues', () => {
    const numberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
    expect(getNumbersFromCardOptions({ suitOptions, numberOptions })).toEqual(NUMBERS);
  });
});
