// interesting hands used in tests

import { createCard } from './card-functions';

import {
  SUIT_DIAMONDS,
  NUMBER_10,
  NUMBER_9,
  NUMBER_8,
  NUMBER_7,
  NUMBER_6,
  SUIT_SPADES,
  NUMBER_Q,
  SUIT_HEARTS,
  SUIT_CLUBS,
  NUMBER_5,
  NUMBER_4,
  NUMBER_3,
  NUMBER_2,
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
