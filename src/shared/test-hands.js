// interesting hands used in tests

import { createCard, calcHandType } from './card-functions';

import {
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
  createClueHandEven,
  createClueHandOdd,
  createClueHandHasNumber,
  createClueHandNotNumber,
  createClueHandHasSuit,
  createClueHandNotSuit,
  createClueHandHasSuitAndNumber,
  createClueHandNotSuitAndNumber,
  createClueHandLowestNumber,
  createClueHandHighestNumber,
} from './create-clue-functions';

import {
  NUMBER_A,
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
  NUMBER_6,
  NUMBER_7,
  NUMBER_8,
  NUMBER_9,
  NUMBER_10,
  NUMBER_J,
  NUMBER_Q,
  NUMBER_K,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
  HAND_1,
  HAND_2,
  HAND_3,
  HAND_4,
  CARD_1,
  CARD_2,
  CARD_3,
  CARD_4,
  CARD_5,
} from './constants';

// -------------------------- //
// hard-coded solution hand 1 //
// -------------------------- //

export const solutionHands1 = [
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_Q),
    createCard(SUIT_CLUBS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_10),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_CLUBS, NUMBER_4),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_8),
    createCard(SUIT_DIAMONDS, NUMBER_8),
    createCard(SUIT_CLUBS, NUMBER_8),
    createCard(SUIT_CLUBS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_7),
  ],
];

export const solution1 = {
  solutionHands: solutionHands1,
  missingNumber: NUMBER_2,
};

export const clues1 = [
  createClueHandOfType(calcHandType(solutionHands1[1]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands1[2]), HAND_3),
  createClueHandOfType(calcHandType(solutionHands1[3]), HAND_4),

  createClueSuit(SUIT_HEARTS, HAND_1, CARD_5),
  createClueSuit(SUIT_CLUBS, HAND_3, CARD_4),

  createClueNumber(NUMBER_5, HAND_2, CARD_2),

  createClueNotNumber(NUMBER_9, HAND_2, CARD_5),

  createClueCardsSameNumber(HAND_1, CARD_5, HAND_4, CARD_1),
];

// -------------------------- //
// hard-coded solution hand 2 //
// -------------------------- //

export const solutionHands2 = [
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_Q),
    createCard(SUIT_CLUBS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_8),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_K),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_8),
    createCard(SUIT_CLUBS, NUMBER_7),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_CLUBS, NUMBER_3),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_K),
    createCard(SUIT_HEARTS, NUMBER_K),
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_HEARTS, NUMBER_4),
    createCard(SUIT_SPADES, NUMBER_3),
  ],
];

export const solution2 = {
  solutionHands: solutionHands2,
  missingNumber: NUMBER_J,
};

export const clues2 = [
  createClueHandOfType(calcHandType(solutionHands2[0]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands2[1]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands2[2]), HAND_3),
  createClueHandOfType(calcHandType(solutionHands2[3]), HAND_4),

  createClueSuit(SUIT_SPADES, HAND_3, CARD_1),
  createClueSuit(SUIT_DIAMONDS, HAND_3, CARD_4),
  createClueSuit(SUIT_SPADES, HAND_4, CARD_5),

  createClueNotSuit(SUIT_HEARTS, HAND_3, CARD_2),

  createClueNotNumber(NUMBER_Q, HAND_4, CARD_3),

  createClueCardsSameNumber(HAND_3, CARD_3, HAND_4, CARD_3),
];

// -------------------------- //
// hard-coded solution hand 3 //
// -------------------------- //

export const solutionHands3 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_3),
    createCard(SUIT_DIAMONDS, NUMBER_2),
    createCard(SUIT_DIAMONDS, NUMBER_A),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_8),
    createCard(SUIT_CLUBS, NUMBER_7),
  ],
  [
    createCard(SUIT_DIAMONDS, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_4),
    createCard(SUIT_HEARTS, NUMBER_3),
    createCard(SUIT_HEARTS, NUMBER_2),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_HEARTS, NUMBER_4),
    createCard(SUIT_SPADES, NUMBER_3),
  ],
];

export const solution3 = {
  solutionHands: solutionHands3,
  missingNumber: NUMBER_Q,
};

export const clues3 = [
  createClueHandOfType(calcHandType(solutionHands3[0]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands3[1]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands3[2]), HAND_3),
  createClueHandOfType(calcHandType(solutionHands3[3]), HAND_4),

  createClueSuit(SUIT_DIAMONDS, HAND_3, CARD_1),

  createClueCardsSameNumber(HAND_1, CARD_5, HAND_2, CARD_1),

  createClueCardsSameSuit(HAND_4, CARD_3, HAND_3, CARD_5),

  createClueCardsNotSameSuit(HAND_4, CARD_4, HAND_2, CARD_1),

  createClueBlackSuit(HAND_4, CARD_5),
];

// -------------------------- //
// hard-coded solution hand 4 //
// -------------------------- //

export const solutionHands4 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_3),
    createCard(SUIT_DIAMONDS, NUMBER_2),
    createCard(SUIT_DIAMONDS, NUMBER_A),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_8),
    createCard(SUIT_CLUBS, NUMBER_7),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_DIAMONDS, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_8),
    createCard(SUIT_SPADES, NUMBER_4),
    createCard(SUIT_HEARTS, NUMBER_2),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_K),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_CLUBS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_3),
  ],
];

export const solution4 = {
  solutionHands: solutionHands4,
  missingNumber: NUMBER_Q,
};

export const clues4 = [
  createClueHandOfType(calcHandType(solutionHands4[0]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands4[1]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands4[3]), HAND_4),

  createClueHandOdd(HAND_4),

  createClueHandNotNumber(NUMBER_6, HAND_1),
];

// -------------------------- //
// hard-coded solution hand 5 //
// -------------------------- //

export const solutionHands5 = [
  [
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_J),
    createCard(SUIT_HEARTS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_HEARTS, NUMBER_8),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_5),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_SPADES, NUMBER_J),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_4),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_8),
    createCard(SUIT_HEARTS, NUMBER_4),
  ],
];

export const solution5 = {
  solutionHands: solutionHands5,
  missingNumber: NUMBER_K,
};

export const clues5 = [
  createClueHandOfType(calcHandType(solutionHands5[1]), HAND_2),

  createClueHandLowestNumber(NUMBER_5, HAND_2),

  createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, HAND_2, CARD_3),

  createClueCardsSameNumber(HAND_4, CARD_2, HAND_4, CARD_1),
  createClueCardsSameNumber(HAND_4, CARD_2, HAND_4, CARD_3),
];

// -------------------------- //
// hard-coded solution hand 6 //
// -------------------------- //

export const solutionHands6 = [
  [
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_J),
    createCard(SUIT_HEARTS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_HEARTS, NUMBER_8),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_5),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_SPADES, NUMBER_J),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_4),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_7),
    createCard(SUIT_HEARTS, NUMBER_4),
  ],
];

export const solution6 = {
  solutionHands: solutionHands6,
  missingNumber: NUMBER_K,
};

export const clues6 = [
  createClueHandOfType(calcHandType(solutionHands5[1]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands5[2]), HAND_3),

  createClueNumber(NUMBER_5, HAND_2, CARD_5),

  createClueCardsSameNumber(HAND_1, CARD_3, HAND_2, CARD_3),
];

// -------------------------- //
// hard-coded solution hand 7 //
// -------------------------- //

export const solutionHands7 = [
  [
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_J),
    createCard(SUIT_HEARTS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_HEARTS, NUMBER_8),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_5),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_SPADES, NUMBER_J),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_SPADES, NUMBER_4),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_4),
  ],
];

export const solution7 = {
  solutionHands: solutionHands7,
  missingNumber: NUMBER_K,
};

export const clues7 = [
  createClueHandOfType(calcHandType(solutionHands7[0]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands7[1]), HAND_2),

  createClueHandHighestNumber(NUMBER_Q, HAND_3),

  createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, HAND_2, CARD_3),

  createClueCardsSameNumber(HAND_2, 4, HAND_3, CARD_4),
];

// -------------------------- //
// hard-coded solution hand 8 //
// -------------------------- //

export const solutionHands8 = [
  [
    createCard(SUIT_HEARTS, NUMBER_7),
    createCard(SUIT_HEARTS, NUMBER_6),
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_HEARTS, NUMBER_4),
    createCard(SUIT_HEARTS, NUMBER_3),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_9),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_A),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_8),
    createCard(SUIT_CLUBS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_CLUBS, NUMBER_5),
    createCard(SUIT_SPADES, NUMBER_4),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_J),
    createCard(SUIT_HEARTS, NUMBER_8),
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_3),
  ],
];

export const solution8 = {
  solutionHands: solutionHands8,
  missingNumber: NUMBER_K,
};

export const clues8 = [
  createClueSuitAndNumber(SUIT_SPADES, NUMBER_8, HAND_3, CARD_1),
  createClueSuitAndNumber(SUIT_SPADES, NUMBER_9, HAND_2, CARD_1),

  createClueHandHasSuitAndNumber(SUIT_SPADES, NUMBER_4, CARD_3),
  createClueHandHasSuitAndNumber(SUIT_DIAMONDS, NUMBER_3, CARD_3),
];

export const stillTODOClues = [
  createClueCardsNotSameNumber(1, 4, 0, 1),
  createClueRedSuit(1, 1),
  createClueRedSuits(0),
  createClueBlackSuits(2),
  createClueHandHasSuit(SUIT_HEARTS, 3),
  createClueHandNotSuit(SUIT_SPADES, 3),
  createClueHandEven(3),
  createClueCardEven(1, 1),
  createClueCardOdd(1, 3),
  createClueHandHasNumber(NUMBER_A, 3),
  createClueHandNotSuitAndNumber(SUIT_CLUBS, NUMBER_5, 1),
];
