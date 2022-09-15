import { getStraights, createCard } from './card-functions';

import { getCardsAvailable } from './solution-functions';

import { solutionHands3 } from './test-hands';

import {
  NUMBER_5,
  NUMBER_4,
  NUMBER_3,
  NUMBER_2,
  NUMBER_A,
  SUIT_DIAMONDS,
  INDEX_SUIT_DIAMONDS,
  NUMBER_K,
  NUMBER_Q,
  NUMBER_J,
  NUMBER_10,
  NUMBER_9,
} from './constants';

describe('getStraights', () => {
  it('will return one array of 5,4,3,2,A for the diamonds of solution hand 3', () => {
    const cards = getCardsAvailable(solutionHands3)[INDEX_SUIT_DIAMONDS];
    const expectedResult = [
      [
        createCard(SUIT_DIAMONDS, NUMBER_5),
        createCard(SUIT_DIAMONDS, NUMBER_4),
        createCard(SUIT_DIAMONDS, NUMBER_3),
        createCard(SUIT_DIAMONDS, NUMBER_2),
        createCard(SUIT_DIAMONDS, NUMBER_A),
      ],
    ];
    expect(getStraights(cards)).toEqual(expectedResult);
  });

  it('will return three straight hands for this example', () => {
    const cards = [
      createCard(SUIT_DIAMONDS, NUMBER_A),
      createCard(SUIT_DIAMONDS, NUMBER_K),
      createCard(SUIT_DIAMONDS, NUMBER_Q),
      createCard(SUIT_DIAMONDS, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_10),
      createCard(SUIT_DIAMONDS, NUMBER_9),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_4),
      createCard(SUIT_DIAMONDS, NUMBER_3),
      createCard(SUIT_DIAMONDS, NUMBER_2),
      createCard(SUIT_DIAMONDS, NUMBER_A),
    ];
    const expectedResult = [
      [
        createCard(SUIT_DIAMONDS, NUMBER_A),
        createCard(SUIT_DIAMONDS, NUMBER_K),
        createCard(SUIT_DIAMONDS, NUMBER_Q),
        createCard(SUIT_DIAMONDS, NUMBER_J),
        createCard(SUIT_DIAMONDS, NUMBER_10),
      ],
      [
        createCard(SUIT_DIAMONDS, NUMBER_K),
        createCard(SUIT_DIAMONDS, NUMBER_Q),
        createCard(SUIT_DIAMONDS, NUMBER_J),
        createCard(SUIT_DIAMONDS, NUMBER_10),
        createCard(SUIT_DIAMONDS, NUMBER_9),
      ],
      [
        createCard(SUIT_DIAMONDS, NUMBER_5),
        createCard(SUIT_DIAMONDS, NUMBER_4),
        createCard(SUIT_DIAMONDS, NUMBER_3),
        createCard(SUIT_DIAMONDS, NUMBER_2),
        createCard(SUIT_DIAMONDS, NUMBER_A),
      ],
    ];
    expect(getStraights(cards)).toEqual(expectedResult);
  });

  it('will return nothing if 4 cards given', () => {
    const cards = [
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_4),
      createCard(SUIT_DIAMONDS, NUMBER_3),
      createCard(SUIT_DIAMONDS, NUMBER_2),
    ];
    const expectedResult = [];
    expect(getStraights(cards)).toEqual(expectedResult);
  });

  it('will return nothing if 0 cards given', () => {
    const cards = [];
    const expectedResult = [];
    expect(getStraights(cards)).toEqual(expectedResult);
  });
});
