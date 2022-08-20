// useful clue functions

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
export const createClueHandOfType = (handType, solutionHandIndex) => ({
  clueType: CLUE_HAND_OF_TYPE,
  handType,
  solutionHandIndex,
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
    return `${prefix} Position ${solutionHandIndex} has ${handTypeToText(handType)}`;
  }

  return `clueToText cannot cope with clueType ${clueType}`;
};
