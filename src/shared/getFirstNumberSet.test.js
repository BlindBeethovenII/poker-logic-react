import { getFirstNumberSet } from './solution-functions';

import { NUMBER_4, NUMBER_6 } from './constants';

describe('getFirstNumberSet', () => {
  it('will return 4 for the fourth boolean set', () => {
    expect(getFirstNumberSet([false, false, false, true, false, true])).toEqual(NUMBER_4);
  });

  it('will return 6 for the sixth boolean set', () => {
    expect(getFirstNumberSet([false, false, false, false, false, true])).toEqual(NUMBER_6);
  });
});
