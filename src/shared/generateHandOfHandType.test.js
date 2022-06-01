import {
  generateHandOfHandType,
  createNewDeck,
  createCard,
  calcHandType,
  createSolutionHands,
} from './card-functions';

import {
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
  NUMBER_K,
  NUMBER_Q,
  NUMBER_J,
  NUMBER_10,
  NUMBER_5,
  NUMBER_4,
  NUMBER_3,
  NUMBER_2,
  NUMBER_A,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
} from './constants';

// how many times to iterate in tests
const iterateN = 10000;

describe('generateHandOfHandType', () => {
  it(`will return a straight flush for HAND_TYPE_STRAIGHT_FLUSH for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT_FLUSH, createNewDeck()))).toEqual(HAND_TYPE_STRAIGHT_FLUSH);
    }
  });

  it('will return a straight flush for HAND_TYPE_STRAIGHT_FLUSH for a deck with AKQJ10 of a suit in it', () => {
    const deck = [
      createCard(SUIT_CLUBS, NUMBER_Q),
      createCard(SUIT_CLUBS, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_10),
      createCard(SUIT_HEARTS, NUMBER_Q),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_A),
    ];
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT_FLUSH, deck))).toEqual(HAND_TYPE_STRAIGHT_FLUSH);
  });

  it('will return a straight flush for HAND_TYPE_STRAIGHT_FLUSH for a deck with 5432A of a suit in it', () => {
    const deck = [
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_3),
      createCard(SUIT_DIAMONDS, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_4),
      createCard(SUIT_HEARTS, NUMBER_Q),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_A),
    ];
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT_FLUSH, deck))).toEqual(HAND_TYPE_STRAIGHT_FLUSH);
  });

  it(`will return four of a kind for HAND_TYPE_FOUR_OF_A_KIND for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_FOUR_OF_A_KIND, createNewDeck()))).toEqual(HAND_TYPE_FOUR_OF_A_KIND);
    }
  });

  it(`will return a full house for HAND_TYPE_FULL_HOUSE for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
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

  it(`will return a flush for HAND_TYPE_FLUSH for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_FLUSH, createNewDeck()))).toEqual(HAND_TYPE_FLUSH);
    }
  });

  it('will return a flush for HAND_TYPE_FLUSH for a deck with just one flush in it', () => {
    const deck = [
      createCard(SUIT_CLUBS, NUMBER_Q),
      createCard(SUIT_CLUBS, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_HEARTS, NUMBER_Q),
      createCard(SUIT_CLUBS, NUMBER_2),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_K),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_5),
    ];
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_FULL_HOUSE, deck))).toEqual(HAND_TYPE_FULL_HOUSE);
  });

  it(`will return a straight for HAND_TYPE_STRAIGHT for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT, createNewDeck()))).toEqual(HAND_TYPE_STRAIGHT);
    }
  });

  it('will return a straight for HAND_TYPE_STRAIGHT for a deck with AKQJ10 in it', () => {
    const deck = [
      createCard(SUIT_CLUBS, NUMBER_Q),
      createCard(SUIT_CLUBS, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_10),
      createCard(SUIT_HEARTS, NUMBER_Q),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_K),
      createCard(SUIT_SPADES, NUMBER_A),
    ];
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT, deck))).toEqual(HAND_TYPE_STRAIGHT);
  });

  it('will return a straight for HAND_TYPE_STRAIGHT for a deck with 5432A of a suit in it', () => {
    const deck = [
      createCard(SUIT_CLUBS, NUMBER_Q),
      createCard(SUIT_CLUBS, NUMBER_3),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_4),
      createCard(SUIT_HEARTS, NUMBER_Q),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_CLUBS, NUMBER_2),
      createCard(SUIT_SPADES, NUMBER_A),
    ];
    expect(calcHandType(generateHandOfHandType(HAND_TYPE_STRAIGHT, deck))).toEqual(HAND_TYPE_STRAIGHT);
  });

  it(`will return a three of a kind for HAND_TYPE_THREE_OF_A_KIND for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_THREE_OF_A_KIND, createNewDeck()))).toEqual(HAND_TYPE_THREE_OF_A_KIND);
    }
  });

  it(`will return two pairs for HAND_TYPE_TWO_PAIR for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_TWO_PAIR, createNewDeck()))).toEqual(HAND_TYPE_TWO_PAIR);
    }
  });

  it(`will return a pair for HAND_TYPE_PAIR for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_PAIR, createNewDeck()))).toEqual(HAND_TYPE_PAIR);
    }
  });

  it(`will return a high card hand for HAND_TYPE_HIGH_CARD for a new deck of cards ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      expect(calcHandType(generateHandOfHandType(HAND_TYPE_HIGH_CARD, createNewDeck()))).toEqual(HAND_TYPE_HIGH_CARD);
    }
  });
});

describe('createSolutionHands', () => {
  it(`will return 4 hands for a consistent solution ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      // get the hands of a solution
      const solutionHands = createSolutionHands();

      // there should be 4 of them
      expect(solutionHands.length).toEqual(4);
    }
  });
});
