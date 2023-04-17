// interesting hands that are hard-coded into the UI
// all of the createClue functions should be used in these

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
  createClueCardsNumberHigherThan,
  createClueCardsNumberLowerThan,
  createClueCardsNumberNHigherThan,
  createClueCardsNumberNLowerThan,
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

export const solution1 = {
  solutionHands: solutionHands1,
  missingNumber: NUMBER_K,
};

export const clues1 = [
  createClueHandOfType(calcHandType(solutionHands1[HAND_2]), HAND_2),

  createClueHandLowestNumber(NUMBER_5, HAND_2),

  createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, HAND_2, CARD_3),

  createClueCardsSameNumber(HAND_4, CARD_2, HAND_4, CARD_1),
  createClueCardsSameNumber(HAND_4, CARD_2, HAND_4, CARD_3),
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

export const solution2 = {
  solutionHands: solutionHands2,
  missingNumber: NUMBER_2,
};

export const clues2 = [
  createClueHandOfType(calcHandType(solutionHands2[HAND_2]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands2[HAND_3]), HAND_3),
  createClueHandOfType(calcHandType(solutionHands2[HAND_4]), HAND_4),

  createClueSuit(SUIT_HEARTS, HAND_1, CARD_5),
  createClueSuit(SUIT_CLUBS, HAND_3, CARD_4),

  createClueNumber(NUMBER_5, HAND_2, CARD_2),

  createClueNotNumber(NUMBER_9, HAND_2, CARD_5),

  createClueCardsSameNumber(HAND_1, CARD_5, HAND_4, CARD_1),
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
  createClueHandOfType(calcHandType(solutionHands3[HAND_1]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands3[HAND_2]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands3[HAND_3]), HAND_3),
  createClueHandOfType(calcHandType(solutionHands3[HAND_4]), HAND_4),

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

export const solution4 = {
  solutionHands: solutionHands4,
  missingNumber: NUMBER_K,
};

export const clues4 = [
  createClueSuitAndNumber(SUIT_SPADES, NUMBER_8, HAND_3, CARD_1),

  createClueHandHasSuitAndNumber(SUIT_SPADES, NUMBER_4, HAND_3),

  createClueSuit(SUIT_CLUBS, HAND_3, CARD_2),

  createClueBlackSuits(HAND_3),

  createClueHandHasNumber(NUMBER_A, HAND_2),

  createClueHandLowestNumber(NUMBER_9, HAND_2),

  createClueHandHighestNumber(NUMBER_7, HAND_1),

  createClueCardsSameSuit(HAND_1, CARD_2, HAND_2, CARD_2),
];

// -------------------------- //
// hard-coded solution hand 5 //
// -------------------------- //

export const solutionHands5 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_K),
    createCard(SUIT_DIAMONDS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_J),
    createCard(SUIT_DIAMONDS, NUMBER_10),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_SPADES, NUMBER_3),
    createCard(SUIT_CLUBS, NUMBER_3),
    createCard(SUIT_CLUBS, NUMBER_7),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_K),
    createCard(SUIT_HEARTS, NUMBER_K),
    createCard(SUIT_HEARTS, NUMBER_A),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_8),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_J),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_6),
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_3),
  ],
];

export const solution5 = {
  solutionHands: solutionHands5,
  missingNumber: NUMBER_4,
};

export const clues5 = [
  createClueHandOfType(calcHandType(solutionHands5[HAND_1]), HAND_1),

  createClueSuitAndNumber(SUIT_SPADES, NUMBER_K, HAND_3, CARD_1),

  createClueHandHasSuitAndNumber(SUIT_DIAMONDS, NUMBER_8, HAND_3),

  createClueHandNotSuitAndNumber(SUIT_CLUBS, NUMBER_7, HAND_4),

  createClueSuit(SUIT_CLUBS, HAND_4, CARD_2),

  createClueCardEven(HAND_3, CARD_4),

  createClueCardsSameSuit(HAND_2, CARD_2, HAND_4, CARD_5),
  createClueCardsSameSuit(HAND_2, CARD_2, HAND_4, CARD_4),
  createClueCardsSameSuit(HAND_1, CARD_1, HAND_4, CARD_5),
  createClueCardsSameSuit(HAND_1, CARD_1, HAND_3, CARD_5),
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
  createClueHandOfType(calcHandType(solutionHands6[HAND_2]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands6[HAND_3]), HAND_3),

  createClueNumber(NUMBER_5, HAND_2, CARD_5),

  createClueCardsSameNumber(HAND_1, CARD_3, HAND_2, CARD_3),
];

// -------------------------- //
// hard-coded solution hand 7 //
// -------------------------- //

export const solutionHands7 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_J),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_8),
    createCard(SUIT_DIAMONDS, NUMBER_7),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_K),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_7),
    createCard(SUIT_CLUBS, NUMBER_5),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_3),
    createCard(SUIT_DIAMONDS, NUMBER_3),
    createCard(SUIT_CLUBS, NUMBER_3),
    createCard(SUIT_HEARTS, NUMBER_7),
    createCard(SUIT_CLUBS, NUMBER_4),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_J),
    createCard(SUIT_CLUBS, NUMBER_J),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_DIAMONDS, NUMBER_6),
    createCard(SUIT_HEARTS, NUMBER_4),
  ],
];

export const solution7 = {
  solutionHands: solutionHands7,
  missingNumber: NUMBER_2,
};

export const clues7 = [
  createClueSuitAndNumber(SUIT_HEARTS, NUMBER_J, HAND_4, CARD_1),
  createClueSuitAndNumber(SUIT_CLUBS, NUMBER_K, HAND_2, CARD_1),

  createClueHandHasSuitAndNumber(SUIT_SPADES, NUMBER_7, HAND_4),

  createClueHandLowestNumber(NUMBER_4, HAND_4),
  createClueHandLowestNumber(NUMBER_5, HAND_2),

  createClueCardsSameSuit(HAND_2, CARD_2, HAND_3, CARD_5),

  createClueCardsSameNumber(HAND_1, CARD_2, HAND_2, CARD_2),
  createClueCardsSameNumber(HAND_1, CARD_5, HAND_3, CARD_4),

  // createClueCardsNotSameNumber(HAND_2, CARD_2, HAND_4, CARD_1),
  createClueCardsNotSameNumber(HAND_3, CARD_4, HAND_4, CARD_2),
  createClueCardsNotSameNumber(HAND_3, CARD_4, HAND_4, CARD_4),
  createClueCardsNotSameNumber(HAND_3, CARD_4, HAND_4, CARD_5),
];

// -------------------------- //
// hard-coded solution hand 8 //
// -------------------------- //

export const solutionHands8 = [
  [
    createCard(SUIT_SPADES, NUMBER_3),
    createCard(SUIT_HEARTS, NUMBER_3),
    createCard(SUIT_DIAMONDS, NUMBER_3),
    createCard(SUIT_CLUBS, NUMBER_3),
    createCard(SUIT_HEARTS, NUMBER_J),
  ],
  [
    createCard(SUIT_DIAMONDS, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_8),
    createCard(SUIT_DIAMONDS, NUMBER_6),
    createCard(SUIT_DIAMONDS, NUMBER_4),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_K),
    createCard(SUIT_CLUBS, NUMBER_K),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_2),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_K),
    createCard(SUIT_DIAMONDS, NUMBER_Q),
    createCard(SUIT_CLUBS, NUMBER_J),
    createCard(SUIT_SPADES, NUMBER_9),
    createCard(SUIT_SPADES, NUMBER_8),
  ],
];

export const solution8 = {
  solutionHands: solutionHands8,
  missingNumber: NUMBER_7,
};

export const clues8 = [
  createClueSuitAndNumber(SUIT_SPADES, NUMBER_K, HAND_4, CARD_1),

  createClueHandHasSuitAndNumber(SUIT_SPADES, NUMBER_9, HAND_4),

  createClueSuit(SUIT_DIAMONDS, HAND_4, CARD_2),

  createClueHandNotSuit(SUIT_HEARTS, HAND_4),

  createClueRedSuits(HAND_2),

  createClueNumber(NUMBER_4, HAND_2, CARD_5),

  createClueHandEven(HAND_2),

  createClueHandLowestNumber(NUMBER_8, HAND_4),

  createClueCardsSameNumber(HAND_1, CARD_5, HAND_4, CARD_3),
  createClueCardsSameNumber(HAND_2, CARD_2, HAND_3, CARD_3),
];
// -------------------------- //
// hard-coded solution hand 9 //
// -------------------------- //

export const solutionHands9 = [
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

export const solution9 = {
  solutionHands: solutionHands9,
  missingNumber: NUMBER_J,
};

export const clues9 = [
  createClueHandOfType(calcHandType(solutionHands9[HAND_1]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands9[HAND_2]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands9[HAND_3]), HAND_3),
  createClueHandOfType(calcHandType(solutionHands9[HAND_4]), HAND_4),

  createClueSuit(SUIT_SPADES, HAND_3, CARD_1),
  createClueSuit(SUIT_DIAMONDS, HAND_3, CARD_4),
  createClueSuit(SUIT_SPADES, HAND_4, CARD_5),

  createClueNotSuit(SUIT_HEARTS, HAND_3, CARD_2),

  createClueNotNumber(NUMBER_Q, HAND_4, CARD_3),

  createClueCardsSameNumber(HAND_3, CARD_3, HAND_4, CARD_3),
];

// --------------------------- //
// hard-coded solution hand 10 //
// --------------------------- //

export const solutionHands10 = [
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

export const solution10 = {
  solutionHands: solutionHands10,
  missingNumber: NUMBER_Q,
};

export const clues10 = [
  createClueHandOfType(calcHandType(solutionHands10[HAND_1]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands10[HAND_2]), HAND_2),
  createClueHandOfType(calcHandType(solutionHands10[HAND_4]), HAND_4),

  createClueHandOdd(HAND_4),

  createClueHandNotNumber(NUMBER_6, HAND_1),
];

// --------------------------- //
// hard-coded solution hand 11 //
// --------------------------- //

export const solutionHands11 = [
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

export const solution11 = {
  solutionHands: solutionHands11,
  missingNumber: NUMBER_K,
};

export const clues11 = [
  createClueHandOfType(calcHandType(solutionHands11[HAND_1]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands11[HAND_2]), HAND_2),

  createClueHandHighestNumber(NUMBER_Q, HAND_3),

  createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, HAND_2, CARD_3),

  createClueCardsSameNumber(HAND_2, CARD_5, HAND_3, CARD_4),
];

// --------------------------- //
// hard-coded solution hand 12 //
// --------------------------- //

export const solutionHands12 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_K),
    createCard(SUIT_DIAMONDS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_J),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_9),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_A),
    createCard(SUIT_HEARTS, NUMBER_7),
    createCard(SUIT_HEARTS, NUMBER_6),
    createCard(SUIT_HEARTS, NUMBER_4),
    createCard(SUIT_HEARTS, NUMBER_2),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_A),
    createCard(SUIT_DIAMONDS, NUMBER_A),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_CLUBS, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_3),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_K),
    createCard(SUIT_SPADES, NUMBER_J),
    createCard(SUIT_CLUBS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_DIAMONDS, NUMBER_4),
  ],
];

export const solution12 = {
  solutionHands: solutionHands12,
  missingNumber: NUMBER_8,
};

export const clues12 = [
  createClueHandOfType(calcHandType(solutionHands12[HAND_1]), HAND_1),

  createClueSuitAndNumber(SUIT_HEARTS, NUMBER_A, HAND_2, CARD_1),
  createClueSuitAndNumber(SUIT_SPADES, NUMBER_A, HAND_3, CARD_1),

  createClueHandHasSuit(SUIT_HEARTS, HAND_3),
  createClueHandHasSuit(SUIT_DIAMONDS, HAND_4),

  createClueHandLowestNumber(NUMBER_4, HAND_4),

  createClueCardsSameNumber(HAND_2, CARD_2, HAND_4, CARD_3),
  createClueCardsSameNumber(HAND_1, CARD_1, HAND_4, CARD_1),
];

// --------------------------- //
// hard-coded solution hand 13 //
// --------------------------- //

export const solutionHands13 = [
  [
    createCard(SUIT_SPADES, NUMBER_J),
    createCard(SUIT_SPADES, NUMBER_9),
    createCard(SUIT_SPADES, NUMBER_8),
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_3),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_A),
    createCard(SUIT_CLUBS, NUMBER_A),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_DIAMONDS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_5),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_4),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_J),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_3),
  ],
];

export const solution13 = {
  solutionHands: solutionHands13,
  missingNumber: NUMBER_K,
};

export const clues13 = [
  createClueHandHasSuitAndNumber(SUIT_SPADES, NUMBER_10, HAND_3),
  createClueHandHasSuitAndNumber(SUIT_DIAMONDS, NUMBER_4, HAND_4),

  createClueNumber(NUMBER_5, HAND_2, CARD_5),

  createClueSuit(SUIT_CLUBS, HAND_2, CARD_2),

  createClueRedSuit(HAND_3, CARD_3),

  createClueHandNotNumber(NUMBER_7, HAND_1),

  createClueCardOdd(HAND_3, CARD_4),

  createClueHandLowestNumber(NUMBER_5, HAND_2),

  createClueHandHighestNumber(NUMBER_10, HAND_3),

  createClueCardsNotSameSuit(HAND_1, CARD_1, HAND_3, CARD_4),

  createClueCardsSameNumber(HAND_1, CARD_2, HAND_4, CARD_3),
  createClueCardsSameNumber(HAND_3, CARD_3, HAND_4, CARD_3),
];

// --------------------------- //
// hard-coded solution hand 14 //
// --------------------------- //

export const solutionHands14 = [
  [
    createCard(SUIT_SPADES, NUMBER_10),
    createCard(SUIT_SPADES, NUMBER_9),
    createCard(SUIT_SPADES, NUMBER_8),
    createCard(SUIT_SPADES, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_4),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_7),
    createCard(SUIT_CLUBS, NUMBER_4),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_Q),
    createCard(SUIT_CLUBS, NUMBER_J),
    createCard(SUIT_CLUBS, NUMBER_9),
    createCard(SUIT_CLUBS, NUMBER_8),
    createCard(SUIT_HEARTS, NUMBER_5),
  ],
];

export const solution14 = {
  solutionHands: solutionHands14,
  missingNumber: NUMBER_A,
};

export const clues14 = [
  createClueHandOfType(calcHandType(solutionHands14[HAND_1]), HAND_1),
  createClueHandOfType(calcHandType(solutionHands14[HAND_2]), HAND_2),

  createClueRedSuit(HAND_3, CARD_2),

  createClueCardsSameSuit(HAND_1, CARD_5, HAND_2, CARD_5),
  createClueCardsSameSuit(HAND_2, CARD_4, HAND_3, CARD_3),

  createClueCardsNumberHigherThan(HAND_3, CARD_1, HAND_1, CARD_1),
  createClueCardsNumberHigherThan(HAND_4, CARD_1, HAND_2, CARD_1),

  createClueCardsNumberLowerThan(HAND_3, CARD_5, HAND_4, CARD_5),

  createClueCardsNumberNHigherThan(2, HAND_3, CARD_3, HAND_2, CARD_4),

  createClueCardsNumberNLowerThan(1, HAND_4, CARD_2, HAND_3, CARD_2),
  createClueCardsNumberNLowerThan(2, HAND_3, CARD_4, HAND_4, CARD_3),
];
