import {
  generateHandOfHandType,
  createNewDeck,
  createCard,
  calcHandType,
} from './card-functions';

import {
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
  NUMBER_K,
  NUMBER_Q,
  NUMBER_J,
  NUMBER_2,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
} from './constants';

describe('generateHandOfHandType', () => {
  it('will return a straight flush for HAND_TYPE_STRAIGHT_FLUSH for a new deck of cards 1000 times', () => {
    for (let i = 0; i < 1000; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT_FLUSH, createNewDeck()))).toEqual(HAND_TYPE_STRAIGHT_FLUSH);
    }
  });

  it('will return four of a kind for HAND_TYPE_FOUR_OF_A_KIND for a new deck of cards 1000 times', () => {
    for (let i = 0; i < 1000; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_FOUR_OF_A_KIND, createNewDeck()))).toEqual(HAND_TYPE_FOUR_OF_A_KIND);
    }
  });

  it('will return a full house for HAND_TYPE_FULL_HOUSE for a new deck of cards 1000 times', () => {
    for (let i = 0; i < 1000; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_FULL_HOUSE, createNewDeck()))).toEqual(HAND_TYPE_FULL_HOUSE);
    }
  });

  it('will return a full house for HAND_TYPE_FULL_HOUSE for a deck with just one three of a kind in it', () => {
    const deck = [
      createCard(SUIT_CLUBS, NUMBER_Q),
      createCard(SUIT_CLUBS, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_HEARTS, NUMBER_Q),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_K),
    ];
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_FULL_HOUSE, deck))).toEqual(HAND_TYPE_FULL_HOUSE);
  });
});
