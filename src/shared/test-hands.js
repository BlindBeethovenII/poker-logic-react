// interesting hands used in tests

import { createCard } from './card-functions';

import { createClueHandOfType } from './clue-functions';

import {
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
  NUMBER_6,
  NUMBER_7,
  NUMBER_8,
  NUMBER_9,
  NUMBER_10,
  NUMBER_Q,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
  HAND_TYPE_STRAIGHT_FLUSH,
} from './constants';

export const solutionHands1 = [
  [
    createCard(SUIT_DIAMONDS, NUMBER_10),
    createCard(SUIT_DIAMONDS, NUMBER_9),
    createCard(SUIT_DIAMONDS, NUMBER_8),
    createCard(SUIT_DIAMONDS, NUMBER_7),
    createCard(SUIT_DIAMONDS, NUMBER_6),
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
    createCard(SUIT_CLUBS, NUMBER_6),
    createCard(SUIT_HEARTS, NUMBER_5),
    createCard(SUIT_DIAMONDS, NUMBER_5),
    createCard(SUIT_CLUBS, NUMBER_5),
    createCard(SUIT_SPADES, NUMBER_3),
  ],
];

export const solution1 = {
  solutionHands: solutionHands1,
  missingNumber: NUMBER_2,
};

export const clues1 = [
  createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
];
