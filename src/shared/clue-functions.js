// useful clue functions

import { calcHandType, cardNumberToString } from './card-functions';

import {
  CLUE_HAND_OF_TYPE,
  CLUE_SUIT_AND_NUMBER,
  CLUE_SUIT,
  CLUE_NOT_SUIT,
  CLUE_NUMBER,
  CLUE_NOT_NUMBER,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
  SUIT_SPADES,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
} from './constants';

// ----------------- //
// CLUE_HAND_OF_TYPE //
// ----------------- //

export const createClueHandOfType = (handType, solutionHandsIndex, deduced) => ({
  clueType: CLUE_HAND_OF_TYPE,
  handType,
  solutionHandsIndex,
  deduced,
});

// -------------------- //
// CLUE_SUIT_AND_NUMBER //
// -------------------- //

export const createClueSuitAndNumber = (suit, number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_SUIT_AND_NUMBER,
  suit,
  number,
  solutionHandsIndex,
  handOptionsIndex,
});

// --------- //
// CLUE_SUIT //
// --------- //

export const createClueSuit = (suit, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_SUIT,
  suit,
  solutionHandsIndex,
  handOptionsIndex,
});

// ------------- //
// CLUE_NOT_SUIT //
// ------------- //

export const createClueNotSuit = (suit, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NOT_SUIT,
  suit,
  solutionHandsIndex,
  handOptionsIndex,
});

// --------------- //
// CLUE_NOT_NUMBER //
// --------------- //

export const createClueNotNumber = (number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NOT_NUMBER,
  number,
  solutionHandsIndex,
  handOptionsIndex,
});

// ----------- //
// CLUE_NUMBER //
// ----------- //

export const createClueNumber = (number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NUMBER,
  number,
  solutionHandsIndex,
  handOptionsIndex,
});

// ----------------- //
// support functions //
// ----------------- //

const handTypeToText = (handType) => {
  switch (handType) {
    case HAND_TYPE_STRAIGHT_FLUSH:
      return 'a Straight Flush';
    case HAND_TYPE_FOUR_OF_A_KIND:
      return '4 of a Kind';
    case HAND_TYPE_FULL_HOUSE:
      return 'a Full House';
    case HAND_TYPE_FLUSH:
      return 'a Flush';
    case HAND_TYPE_STRAIGHT:
      return 'a Straight';
    case HAND_TYPE_THREE_OF_A_KIND:
      return '3 of a Kind';
    case HAND_TYPE_TWO_PAIR:
      return '2 Pairs';
    case HAND_TYPE_PAIR:
      return 'a Pair';
    case HAND_TYPE_HIGH_CARD:
      return 'a High Card';
    default:
      return `handTypeToText cannot cope with ${handType}`;
  }
};

const suitToTextSingular = (suit) => {
  switch (suit) {
    case SUIT_SPADES:
      return 'Spade';
    case SUIT_HEARTS:
      return 'Heart';
    case SUIT_DIAMONDS:
      return 'Diamond';
    case SUIT_CLUBS:
      return 'Club';
    default:
      return `suitToTextSingular cannot cope with ${suit}`;
  }
};

// clue to clue string
export const clueToString = (clue) => {
  const { clueType } = clue;

  if (clueType === CLUE_HAND_OF_TYPE) {
    const { handType, solutionHandsIndex, deduced } = clue;
    const deducedText = deduced ? `, deduced from clue ${clueToString(deduced)}` : '';
    return `Hand ${solutionHandsIndex + 1} has ${handTypeToText(handType)}${deducedText}`;
  }

  if (clueType === CLUE_SUIT_AND_NUMBER) {
    const {
      suit,
      number,
      solutionHandsIndex,
      handOptionsIndex,
    } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is ${cardNumberToString(number)} ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_SUIT) {
    const { suit, solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is a ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_NOT_SUIT) {
    const { suit, solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is not a ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_NUMBER) {
    const { number, solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is a ${cardNumberToString(number)}`;
  }

  if (clueType === CLUE_NOT_NUMBER) {
    const { number, solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is not a ${cardNumberToString(number)}`;
  }

  return `clueToString cannot cope with clueType ${clueType}`;
};

export const clueToText = (clue, clueIndex) => `Clue ${clueIndex + 1}: ${clueToString(clue)}`;

export const createCluesForSolutionHands = (solutionHands) => {
  const clues = [];

  // add a HAND OF TYPE clue for each solution hand
  clues.push(createClueHandOfType(calcHandType(solutionHands[0]), 0));
  clues.push(createClueHandOfType(calcHandType(solutionHands[1]), 1));
  clues.push(createClueHandOfType(calcHandType(solutionHands[2]), 2));
  clues.push(createClueHandOfType(calcHandType(solutionHands[3]), 3));

  return clues;
};

// return true if the two given clues are fundamentally equal
const cluesEqual = (clue1, clue2) => {
  if (clue1.clueType === clue2.clueType) {
    if (clue1.clueType === CLUE_HAND_OF_TYPE && clue1.handType === clue2.handType && clue1.solutionHandsIndex === clue2.solutionHandsIndex) {
      return true;
    }
  }

  return false;
};

// return true if the given clue already exists in the given clues array
const clueExists = (clue, clues) => {
  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const nextClue = clues[i];
    if (cluesEqual(clue, nextClue)) {
      // found it
      return true;
    }
  }

  return false;
};

// return array of deduced clues from the given clues, returning the empty array if none
const getDeducedClues = (clues) => {
  const result = [];

  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;

    // if 2nd hand is 4 of a kind then 1st hand is straight flush
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FOUR_OF_A_KIND && solutionHandsIndex === 1) {
      const newClue = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        result.push(newClue);
      }
    }

    // if 3rd hand is full house then 1st hand is straight flush and 2nd is four of a hind
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FULL_HOUSE && solutionHandsIndex === 2) {
      const newClue1 = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, clue);
      // check we don't have the deduced clues already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
    }

    // if 4th hand is a flush then 1st hand is straight flush and 2nd is four of a hind and 3rd hand is full house
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FLUSH && solutionHandsIndex === 3) {
      const newClue1 = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, clue);
      const newClue3 = createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2, clue);
      // check we don't have the deduced clues already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
      if (!clueExists(newClue3, clues)) {
        result.push(newClue3);
      }
    }

    // if 3rd hand is pair then 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_PAIR && solutionHandsIndex === 2) {
      const newClue = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        result.push(newClue);
      }
    }

    // if 2nd hand is two pair, then 3rd hand is pair and 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_TWO_PAIR && solutionHandsIndex === 1) {
      const newClue1 = createClueHandOfType(HAND_TYPE_PAIR, 2, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
    }

    // if 1st hand is three of a kind, then 2nd hand is two pair, 3rd hand is pair and 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_THREE_OF_A_KIND && solutionHandsIndex === 0) {
      const newClue1 = createClueHandOfType(HAND_TYPE_TWO_PAIR, 1, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_PAIR, 2, clue);
      const newClue3 = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
      if (!clueExists(newClue3, clues)) {
        result.push(newClue3);
      }
    }
  }

  return result;
};

// add any deduced clues to the given clues array
export const addInDeducedClues = (clues) => {
  const deducedClues = getDeducedClues(clues);
  if (deducedClues.length) {
    return [...clues, ...deducedClues];
  }

  // just return the original clues
  return clues;
};
