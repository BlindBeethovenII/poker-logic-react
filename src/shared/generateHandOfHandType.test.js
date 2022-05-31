import { generateHandOfHandType, createNewDeck, calcHandType } from './card-functions';
import { HAND_TYPE_STRAIGHT_FLUSH } from './constants';

describe('generateHandOfHandType', () => {
  it('will return a straight flush for HAND_TYPE_STRAIGHT_FLUSH for a new deck of cards', () => {
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT_FLUSH, createNewDeck()))).toEqual(HAND_TYPE_STRAIGHT_FLUSH);
  });
});
