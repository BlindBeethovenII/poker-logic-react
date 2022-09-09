// useful to string functions

import { cardNumberToString } from './card-functions';

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
    // hand of type clue could be deduced from 1 or 2 clues
    let deducedText = '';
    if (deduced) {
      if (deduced.length === 2) {
        deducedText = `, deduced from clues ${clueToString(deduced[0])} and ${clueToString(deduced[1])}`;
      } else if (deduced.length === 1) {
        deducedText = `, deduced from clue ${clueToString(deduced[0])}`;
      }
    }
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
