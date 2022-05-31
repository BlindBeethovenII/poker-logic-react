import { generateHandOfHandType, createNewDeck, calcHandType } from './card-functions';
import { HAND_TYPE_STRAIGHT_FLUSH, HAND_TYPE_FOUR_OF_A_KIND } from './constants';

describe('generateHandOfHandType', () => {
  it('will return a straight flush for HAND_TYPE_STRAIGHT_FLUSH for a new deck of cards 1000 times', () => {
    for (let i = 0; i < 1000; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT_FLUSH, createNewDeck()))).toEqual(HAND_TYPE_STRAIGHT_FLUSH);
    }
  });

  it('will return a straight flush for HAND_TYPE_FOUR_OF_A_KIND for a new deck of cards 1000 times', () => {
    for (let i = 0; i < 1000; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_FOUR_OF_A_KIND, createNewDeck()))).toEqual(HAND_TYPE_FOUR_OF_A_KIND);
    }
  });
});
