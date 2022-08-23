// useful clue functions

import { calcHandType } from './card-functions';

import {
  CLUE_HAND_OF_TYPE,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
} from './constants';

// create CLUE_HAND_OF_TYPE
export const createClueHandOfType = (handType, solutionHandIndex, deduced) => ({
  clueType: CLUE_HAND_OF_TYPE,
  handType,
  solutionHandIndex,
  deduced,
});

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
      return '1 Pair';
    case HAND_TYPE_HIGH_CARD:
      return 'a High Card';
    default:
      return `handTypeToText cannot cope with ${handType}`;
  }
};

export const clueToText = (clue, clueIndex) => {
  const { clueType } = clue;
  const prefix = `Clue ${clueIndex + 1}:`;
  if (clueType === CLUE_HAND_OF_TYPE) {
    const { handType, solutionHandIndex } = clue;
    return `${prefix} Position ${solutionHandIndex + 1} has ${handTypeToText(handType)}`;
  }

  return `clueToText cannot cope with clueType ${clueType}`;
};

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
    if (clue1.clueType === CLUE_HAND_OF_TYPE && clue1.handType === clue2.handType && clue1.solutionHandIndex === clue2.solutionHandIndex) {
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
    const { clueType, handType, solutionHandIndex } = clue;

    // if 2nd hand is 4 of a kind then 1st hand is straight flush
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FOUR_OF_A_KIND && solutionHandIndex === 1) {
      const newClue = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        result.push(newClue);
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
