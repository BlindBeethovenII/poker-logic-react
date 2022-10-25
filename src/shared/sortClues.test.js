import {
  sortClues,
  createClueHandOfType,
  createClueSuitAndNumber,
  createClueSuit,
  createClueNotSuit,
  createClueNumber,
  createClueNotNumber,
  createClueCardsSameNumber,
  createClueCardsNotSameNumber,
  createClueCardsSameSuit,
  createClueCardsNotSameSuit,
  createClueRedSuit,
  createClueBlackSuit,
  createClueRedSuits,
  createClueBlackSuits,
  createClueCardEven,
  createClueCardOdd,
  createClueAllCardsEven,
  createClueAllCardsOdd,
  createClueAllCardsNotNumber,
} from './clue-functions';

import {
  HAND_TYPE_FLUSH,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_PAIR,
  SUIT_HEARTS,
  SUIT_CLUBS,
  NUMBER_10,
  NUMBER_3,
  NUMBER_8,
  NUMBER_6,
} from './constants';

describe('sortClues', () => {
  // export const CLUE_HAND_OF_TYPE = 'HAND OF TYPE';
  const clueHandType1 = createClueHandOfType(HAND_TYPE_FULL_HOUSE, 0);
  const clueHandType2 = createClueHandOfType(HAND_TYPE_FLUSH, 1);
  const clueHandType3 = createClueHandOfType(HAND_TYPE_PAIR, 2);

  // export const CLUE_SUIT_AND_NUMBER = 'SUIT AND NUMBER';
  const clueSuitAndNumber = createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, 1, 1);

  // export const CLUE_SUIT = 'SUIT';
  const clueSuit = createClueSuit(SUIT_HEARTS, 0, 4);

  // export const CLUE_NOT_SUIT = 'NOT SUIT';
  const clueNotSuit = createClueNotSuit(SUIT_HEARTS, 2, 1);

  // export const CLUE_NUMBER = 'NUMBER';
  const clueNumber = createClueNumber(NUMBER_3, 0, 2);

  // export const CLUE_NOT_NUMBER = 'NOT NUMBER';
  const clueNotNumber = createClueNotNumber(NUMBER_8, 3, 1);

  // export const CLUE_CARDS_SAME_NUMBER = 'CARDS SAME NUMBER';
  const clueCardsSameNumber = createClueCardsSameNumber(0, 4, 1, 0);

  // export const CLUE_CARDS_NOT_SAME_NUMBER = 'CARDS NOT SAME NUMBER';
  const clueCardsNotSameNumber = createClueCardsNotSameNumber(1, 4, 0, 1);

  // export const CLUE_CARDS_SAME_SUIT = 'CARDS SAME SUIT';
  const clueCardsSameSuit = createClueCardsSameSuit(3, 2, 2, 4);

  // export const CLUE_CARDS_NOT_SAME_SUIT = 'CARDS NOT SAME SUIT';
  const clueCardsNotSameSuit = createClueCardsNotSameSuit(3, 3, 1, 0);

  // export const CLUE_RED_SUIT = 'RED SUIT';
  const clueRedSuit = createClueRedSuit(2, 3);

  // export const CLUE_BLACK_SUIT = 'BLACK SUIT';
  const clueBlackSuit = createClueBlackSuit(3, 4);

  // export const CLUE_RED_SUITS = 'RED SUITS';
  const clueRedSuits = createClueRedSuits(0);

  // export const CLUE_BLACK_SUITS = 'BLACK SUITS';
  const clueBlackSuits = createClueBlackSuits(1);

  // export const CLUE_CARD_EVEN = 'CARD EVEN';
  const clueCardEven = createClueCardEven(1, 1);

  // export const CLUE_CARD_ODD = 'CARD ODD';
  const clueCardOdd = createClueCardOdd(1, 2);

  // export const CLUE_ALL_CARDS_EVEN = 'ALL CARDS EVEN';
  const clueAllCardsEven = createClueAllCardsEven(2);

  // export const CLUE_ALL_CARDS_ODD = 'ALL CARDS ODD';
  const clueAllCardsOdd = createClueAllCardsOdd(3);

  // export const CLUE_ALL_CARDS_NOT_NUMBER = 'ALL CARDS NOT NUMBER';
  const clueAllCardsNotNumber = createClueAllCardsNotNumber(NUMBER_6, 0);

  it('will return 4 for the fourth boolean set', () => {
    const unsorted = [
      clueBlackSuits,
      clueCardsNotSameNumber,
      clueAllCardsEven,
      clueAllCardsNotNumber,
      clueHandType2,
      clueCardsNotSameSuit,
      clueNotSuit,
      clueNotNumber,
      clueRedSuit,
      clueCardsSameSuit,
      clueSuit,
      clueBlackSuit,
      clueSuitAndNumber,
      clueCardsSameNumber,
      clueNumber,
      clueCardEven,
      clueAllCardsOdd,
      clueRedSuits,
      clueHandType1,
      clueHandType3,
      clueCardOdd,
    ];

    const sorted = [
      clueHandType1,
      clueHandType2,
      clueHandType3,
      clueSuitAndNumber,
      clueSuit,
      clueNotSuit,
      clueRedSuit,
      clueRedSuits,
      clueBlackSuit,
      clueBlackSuits,
      clueNumber,
      clueNotNumber,
      clueAllCardsNotNumber,
      clueCardEven,
      clueAllCardsEven,
      clueCardOdd,
      clueAllCardsOdd,
      clueCardsSameSuit,
      clueCardsNotSameSuit,
      clueCardsSameNumber,
      clueCardsNotSameNumber,
    ];

    expect(sortClues(unsorted)).toEqual(sorted);
  });
});
