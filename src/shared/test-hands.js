/* eslint-disable import/prefer-default-export */

// interesting hands used in tests

import { createCard } from './card-functions';

import {
  createClueCardsSameNumber,
} from './create-clue-functions';

import {
  NUMBER_A,
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
  HAND_3,
  HAND_4,
  CARD_2,
  CARD_3,
} from './constants';

// ----------- //
// test hand 1 //
// ----------- //

export const testSolutionHands1 = [
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

// ---------------------------------------------------- //
// test hand 2 - based on the original solution hand 13 //
// ---------------------------------------------------- //

export const testSolutionHands2 = [
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

export const testSolution2 = {
  solutionHands: testSolutionHands2,
  missingNumber: NUMBER_K,
};

export const testClues2 = [
  createClueCardsSameNumber(HAND_1, CARD_2, HAND_4, CARD_3),
  createClueCardsSameNumber(HAND_3, CARD_3, HAND_4, CARD_3),
];
