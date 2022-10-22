// interesting hands used in tests

import { createCard, calcHandType } from './card-functions';

import {
  createClueHandOfType,
  // createClueSuitAndNumber,
  createClueSuit,
  createClueNotSuit,
  createClueNumber,
  createClueNotNumber,
  // createCluesForSolutionHands,
  createClueCardsSameNumber,
  // createClueCardsNotSameNumber,
  createClueCardsSameSuit,
  createClueCardsNotSameSuit,
  // createClueRedSuit,
  createClueBlackSuit,
  createClueRedSuits,
} from './clue-functions';

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
  createClueHandOfType(calcHandType(solutionHands1[0]), 0),
  createClueHandOfType(calcHandType(solutionHands1[1]), 1),
  createClueHandOfType(calcHandType(solutionHands1[2]), 2),
  createClueHandOfType(calcHandType(solutionHands1[3]), 3),
  // createClueSuitAndNumber(SUIT_HEARTS, NUMBER_9, 3, 2),
  // createClueSuit(SUIT_DIAMONDS, 2, 1),
  createClueSuit(SUIT_HEARTS, 0, 4),
  createClueSuit(SUIT_CLUBS, 2, 3),
  createClueNumber(NUMBER_5, 1, 1),
  // createClueNumber(NUMBER_7, 3, 4),
  createClueNotSuit(SUIT_HEARTS, 3, 0),
  // createClueNotNumber(NUMBER_10, 1, 1),
  // createClueNotNumber(NUMBER_5, 1, 3),
  // createClueNotNumber(NUMBER_5, 1, 4),
  // createClueNotNumber(NUMBER_8, 1, 3),
  // createClueNotNumber(NUMBER_8, 1, 4),
  // createClueNotNumber(NUMBER_9, 1, 3),
  createClueNotNumber(NUMBER_9, 1, 4),
  // createClueNotNumber(NUMBER_10, 1, 3),
  createClueCardsSameNumber(0, 4, 3, 0),
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
  createClueHandOfType(calcHandType(solutionHands2[0]), 0),
  createClueHandOfType(calcHandType(solutionHands2[1]), 1),
  createClueHandOfType(calcHandType(solutionHands2[2]), 2),
  createClueHandOfType(calcHandType(solutionHands2[3]), 3),
  // createClueSuit(SUIT_HEARTS, 0, 4),
  // createClueNumber(NUMBER_K, 1, 0),
  // createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, 1, 1),
  // createClueNumber(NUMBER_8, 1, 3),
  // createClueSuitAndNumber(SUIT_CLUBS, NUMBER_7, 1, 4),
  createClueSuit(SUIT_SPADES, 2, 0),
  createClueSuit(SUIT_DIAMONDS, 2, 3),
  // createClueNumber(NUMBER_3, 2, 4),
  // createClueSuitAndNumber(SUIT_SPADES, NUMBER_K, 3, 0),
  // createClueSuit(SUIT_HEARTS, 3, 1),
  // createClueNumber(NUMBER_5, 3, 2),  HERE
  // createClueSuitAndNumber(SUIT_HEARTS, NUMBER_4, 3, 3),
  createClueSuit(SUIT_SPADES, 3, 4),
  createClueNotSuit(SUIT_HEARTS, 2, 1),
  createClueNotNumber(NUMBER_Q, 3, 2),
  createClueCardsSameNumber(2, 2, 3, 2),
];

// export const clues2 = createCluesForSolutionHands(solution2);

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
  createClueHandOfType(calcHandType(solutionHands3[0]), 0),
  createClueHandOfType(calcHandType(solutionHands3[1]), 1),
  createClueHandOfType(calcHandType(solutionHands3[2]), 2),
  createClueHandOfType(calcHandType(solutionHands3[3]), 3),

  // createClueSuit(SUIT_HEARTS, 0, 4),
  // createClueSuit(SUIT_SPADES, 2, 0),
  // createClueSuit(SUIT_DIAMONDS, 2, 3),
  // createClueSuit(SUIT_HEARTS, 3, 1),
  // createClueSuit(SUIT_SPADES, 3, 4),
  createClueSuit(SUIT_DIAMONDS, 2, 0),

  // createClueNumber(NUMBER_3, 0, 2),
  // createClueNumber(NUMBER_9, 1, 2),
  // createClueNumber(NUMBER_8, 1, 3),
  // createClueNumber(NUMBER_3, 2, 4),
  // createClueNumber(NUMBER_5, 3, 2),

  // createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, 1, 1),
  // createClueSuitAndNumber(SUIT_CLUBS, NUMBER_7, 1, 4),
  // createClueSuitAndNumber(SUIT_SPADES, NUMBER_K, 3, 0),
  // createClueSuitAndNumber(SUIT_HEARTS, NUMBER_4, 3, 3),

  // createClueNotSuit(SUIT_HEARTS, 2, 1),

  // createClueNotNumber(NUMBER_8, 3, 1),
  // createClueNotNumber(NUMBER_A, 2, 0),
  // createClueNotNumber(NUMBER_J, 0, 0),

  createClueCardsSameNumber(0, 4, 1, 0),

  // createClueCardsNotSameNumber(1, 4, 0, 1),

  createClueCardsSameSuit(3, 2, 2, 4),
  // createClueCardsSameSuit(2, 3, 3, 3),

  createClueCardsNotSameSuit(3, 3, 1, 0),

  // createClueRedSuit(2, 3),

  createClueBlackSuit(3, 4),
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
    createCard(SUIT_CLUBS, NUMBER_4),
    createCard(SUIT_HEARTS, NUMBER_3),
    createCard(SUIT_HEARTS, NUMBER_2),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_K),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_HEARTS, NUMBER_6),
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_HEARTS, NUMBER_4),
  ],
];

export const solution4 = {
  solutionHands: solutionHands4,
  missingNumber: NUMBER_Q,
};

export const clues4 = [
  createClueHandOfType(calcHandType(solutionHands4[0]), 0),
  createClueHandOfType(calcHandType(solutionHands4[1]), 1),
  createClueHandOfType(calcHandType(solutionHands4[2]), 2),
  createClueHandOfType(calcHandType(solutionHands4[3]), 3),

  // createClueSuit(SUIT_HEARTS, 0, 4),
  // createClueSuit(SUIT_SPADES, 2, 0),
  // createClueSuit(SUIT_DIAMONDS, 2, 3),
  // createClueSuit(SUIT_HEARTS, 3, 1),
  // createClueSuit(SUIT_SPADES, 3, 4),
  // createClueSuit(SUIT_DIAMONDS, 2, 0),

  // createClueNumber(NUMBER_3, 0, 2),
  // createClueNumber(NUMBER_9, 1, 2),
  // createClueNumber(NUMBER_8, 1, 3),
  // createClueNumber(NUMBER_3, 2, 4),
  // createClueNumber(NUMBER_5, 3, 2),

  // createClueSuitAndNumber(SUIT_CLUBS, NUMBER_10, 1, 1),
  // createClueSuitAndNumber(SUIT_CLUBS, NUMBER_7, 1, 4),
  // createClueSuitAndNumber(SUIT_SPADES, NUMBER_K, 3, 0),
  // createClueSuitAndNumber(SUIT_HEARTS, NUMBER_4, 3, 3),

  // createClueNotSuit(SUIT_HEARTS, 2, 1),

  // createClueNotNumber(NUMBER_8, 3, 1),
  // createClueNotNumber(NUMBER_A, 2, 0),
  // createClueNotNumber(NUMBER_J, 0, 0),

  // createClueCardsSameNumber(0, 4, 1, 0),

  // createClueCardsNotSameNumber(1, 4, 0, 1),

  // createClueCardsSameSuit(3, 2, 2, 4),
  // createClueCardsSameSuit(2, 3, 3, 3),

  // createClueCardsNotSameSuit(3, 3, 1, 0),

  // createClueRedSuit(2, 3),

  // createClueBlackSuit(3, 4),

  createClueRedSuits(0),
  createClueRedSuits(3),
];
