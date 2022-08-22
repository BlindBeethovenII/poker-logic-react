import { countTrueBooleansInArray } from './solution-functions';

describe('countTrueBooleansInArray', () => {
  it('will return 2 for bool array with 2 true values', () => {
    expect(countTrueBooleansInArray([true, false, true, false])).toEqual(2);
  });

  it('will return 3 for bool array of length 3 with all true values', () => {
    expect(countTrueBooleansInArray([true, true, true])).toEqual(3);
  });

  it('will return 0 for bool array with no true values', () => {
    expect(countTrueBooleansInArray([false, false])).toEqual(0);
  });

  it('will return 0 for bool array of length 0', () => {
    expect(countTrueBooleansInArray([])).toEqual(0);
  });
});
