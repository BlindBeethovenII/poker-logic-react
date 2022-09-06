// interesting hands used in tests

import { createCard, calcHandType } from './card-functions';

import {
  createClueHandOfType,
  createClueSuit,
  createClueNotSuit,
  createClueNumber,
  createClueNotNumber,
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
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
} from './constants';

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
  createClueSuit(SUIT_DIAMONDS, 2, 1),
  createClueNotSuit(SUIT_HEARTS, 3, 0),
  createClueNumber(NUMBER_5, 1, 1),
  createClueNotNumber(NUMBER_10, 1, 1),
  createClueNotNumber(NUMBER_5, 1, 3),
  createClueNotNumber(NUMBER_5, 1, 4),
  createClueNotNumber(NUMBER_8, 1, 3),
  createClueNotNumber(NUMBER_8, 1, 4),
  createClueNotNumber(NUMBER_9, 1, 3),
  createClueNotNumber(NUMBER_9, 1, 4),
  createClueNotNumber(NUMBER_10, 1, 3),
];

export const solutionHands2 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_3),
    createCard(SUIT_DIAMONDS, NUMBER_2),
    createCard(SUIT_DIAMONDS, NUMBER_A),
  ],
  [
    createCard(SUIT_SPADES, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_DIAMONDS, NUMBER_Q),
    createCard(SUIT_CLUBS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_8),
  ],
  [
    createCard(SUIT_CLUBS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_4),
    createCard(SUIT_CLUBS, NUMBER_3),
  ],
  [
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_CLUBS, NUMBER_6),
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
];
