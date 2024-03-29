// useful to string functions

import { cardNumberToString } from './card-functions';

import {
  CLUE_HAND_OF_TYPE,
  CLUE_SUIT_AND_NUMBER,
  CLUE_SUIT,
  CLUE_NOT_SUIT,
  CLUE_NUMBER,
  CLUE_NOT_NUMBER,
  CLUE_CARDS_SAME_NUMBER,
  CLUE_CARDS_NOT_SAME_NUMBER,
  CLUE_CARDS_NUMBER_HIGHER_THAN,
  CLUE_CARDS_NUMBER_LOWER_THAN,
  CLUE_CARDS_NUMBER_N_HIGHER_THAN,
  CLUE_CARDS_NUMBER_N_LOWER_THAN,
  CLUE_CARDS_SAME_SUIT,
  CLUE_CARDS_NOT_SAME_SUIT,
  CLUE_RED_SUIT,
  CLUE_BLACK_SUIT,
  CLUE_RED_SUITS,
  CLUE_BLACK_SUITS,
  CLUE_CARD_EVEN,
  CLUE_CARD_ODD,
  CLUE_HAND_EVEN,
  CLUE_HAND_ODD,
  CLUE_HAND_HAS_NUMBER,
  CLUE_HAND_NOT_NUMBER,
  CLUE_HAND_HAS_SUIT,
  CLUE_HAND_NOT_SUIT,
  CLUE_HAND_HAS_SUIT_AND_NUMBER,
  CLUE_HAND_NOT_SUIT_AND_NUMBER,
  CLUE_HAND_LOWEST_NUMBER,
  CLUE_HAND_HIGHEST_NUMBER,
  CLUE_HAND_TYPE_DEDUCED_FROM_SOLUTION_OPTIONS,
  CLUE_HAND_TYPE_DEDUCED_FROM_CARDS_STILL_AVAILABLE,
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
  NUMBER_A,
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
      return 'Two Pair';
    case HAND_TYPE_PAIR:
      return 'a Pair';
    case HAND_TYPE_HIGH_CARD:
      return 'a High Card';
    default:
      return `handTypeToText cannot cope with ${handType}`;
  }
};

export const suitToTextSingular = (suit) => {
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
export const clueToString = (clue, doNotShowDeduced) => {
  const { clueType } = clue;

  if (clueType === CLUE_HAND_OF_TYPE) {
    const { handType, solutionHandsIndex, deduced } = clue;
    // hand of type clue could be deduced from 1 or 2 clues
    let deducedText = '';
    if (deduced && !doNotShowDeduced) {
      if (deduced.length === 2) {
        deducedText = `, deduced from clues ${clueToString(deduced[0])} and ${clueToString(deduced[1])}`;
      } else if (deduced.length === 1) {
        deducedText = `, deduced from clue ${clueToString(deduced[0])}`;
      }
    }
    return `Hand ${solutionHandsIndex + 1} is ${handTypeToText(handType)}${deducedText}`;
  }

  if (clueType === CLUE_SUIT_AND_NUMBER) {
    const {
      suit,
      number,
      solutionHandsIndex,
      handOptionsIndex,
    } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is the ${cardNumberToString(number)} ${suitToTextSingular(suit)}`;
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

  if (clueType === CLUE_CARDS_SAME_NUMBER) {
    const {
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} has the same number as Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1}`;
  }

  if (clueType === CLUE_CARDS_NOT_SAME_NUMBER) {
    const {
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} is not the same number as Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1}`;
  }

  if (clueType === CLUE_CARDS_NUMBER_HIGHER_THAN) {
    const {
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} is higher than Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1} (A is higher than K)`;
  }

  if (clueType === CLUE_CARDS_NUMBER_N_HIGHER_THAN) {
    const {
      number,
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} is ${number} higher than Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1} (A is higher than K)`;
  }

  if (clueType === CLUE_CARDS_NUMBER_N_LOWER_THAN) {
    const {
      number,
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} is ${number} lower than Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1} (A is higher than K)`;
  }

  if (clueType === CLUE_CARDS_NUMBER_LOWER_THAN) {
    const {
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} is lower than Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1} (A is higher than K)`;
  }

  if (clueType === CLUE_CARDS_SAME_SUIT) {
    const {
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} has the same suit as Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1}`;
  }

  if (clueType === CLUE_CARDS_NOT_SAME_SUIT) {
    const {
      solutionHandsIndex1,
      handOptionsIndex1,
      solutionHandsIndex2,
      handOptionsIndex2,
    } = clue;
    return `Hand ${solutionHandsIndex1 + 1} Card ${handOptionsIndex1 + 1} is not the same suit as Hand ${solutionHandsIndex2 + 1} Card ${handOptionsIndex2 + 1}`;
  }

  if (clueType === CLUE_RED_SUIT) {
    const { solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is a red suit`;
  }

  if (clueType === CLUE_BLACK_SUIT) {
    const { solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is a black suit`;
  }

  if (clueType === CLUE_RED_SUITS) {
    const { solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has all red suits`;
  }

  if (clueType === CLUE_BLACK_SUITS) {
    const { solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has all black suits`;
  }

  if (clueType === CLUE_CARD_EVEN) {
    const { solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is an even number (A is even)`;
  }

  if (clueType === CLUE_CARD_ODD) {
    const { solutionHandsIndex, handOptionsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} Card ${handOptionsIndex + 1} is an odd number (A is even)`;
  }

  if (clueType === CLUE_HAND_EVEN) {
    const { solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has all even numbers (A is even)`;
  }

  if (clueType === CLUE_HAND_ODD) {
    const { solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has all odd numbers (A is even)`;
  }

  if (clueType === CLUE_HAND_HAS_NUMBER) {
    const { number, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has a ${cardNumberToString(number)}`;
  }

  if (clueType === CLUE_HAND_NOT_NUMBER) {
    const { number, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} does not have a ${cardNumberToString(number)}`;
  }

  if (clueType === CLUE_HAND_NOT_SUIT) {
    const { suit, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} does not have a ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_HAND_HAS_SUIT) {
    const { suit, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has a ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_HAND_HAS_SUIT_AND_NUMBER) {
    const { suit, number, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} has the ${cardNumberToString(number)} ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_HAND_NOT_SUIT_AND_NUMBER) {
    const { suit, number, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} does not have the ${cardNumberToString(number)} ${suitToTextSingular(suit)}`;
  }

  if (clueType === CLUE_HAND_LOWEST_NUMBER) {
    const { number, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} lowest number is ${cardNumberToString(number)} (A is higher than K)`;
  }

  if (clueType === CLUE_HAND_HIGHEST_NUMBER) {
    const { number, solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} highest number is ${cardNumberToString(number)} (A is higher than K)`;
  }

  if (clueType === CLUE_HAND_TYPE_DEDUCED_FROM_SOLUTION_OPTIONS) {
    const { solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} type deduced from solution options`;
  }

  if (clueType === CLUE_HAND_TYPE_DEDUCED_FROM_CARDS_STILL_AVAILABLE) {
    const { solutionHandsIndex } = clue;
    return `Hand ${solutionHandsIndex + 1} type deduced from cards still available`;
  }

  return `clueToString cannot cope with clueType ${clueType}`;
};

export const clueToText = (clue, clueIndex) => `Clue ${clueIndex + 1}: ${clueToString(clue)}`;

// the sort compare function for sorting card numbers as we see them on the screen A, K, Q, ... 2
const screenNumberCompare = (n1, n2) => {
  // we don't get repeats, but include a simple test just in case
  if (n1 === n2) {
    return 0;
  }

  if (n1 === NUMBER_A) {
    // we want A at the beginning
    return -1;
  }

  if (n2 === NUMBER_A) {
    // we want A at the beginning
    return 1;
  }

  // else do the number compare
  return n2 - n1;
};

// return the English for the given numbers array as list of alternatives
// for eample [4] returns "4", [4,6] results "6 or 4"; [1,4,6,8] returns "A, 8, 6 or 4"
export const numbersToAlternativeString = (numbersParam) => {
  // check we have something
  if (!numbersParam || !numbersParam.length) {
    return '';
  }

  // copy the numbers param as the array.sort() sorts in place
  const numbers = [...numbersParam];

  // we want the English to be in the same order that we see card numbers on the screen
  numbers.sort(screenNumberCompare);

  let result = `${cardNumberToString(numbers[0])}`;

  // easy if only one in the array
  if (numbers.length === 1) {
    return result;
  }

  // now add on all but the last as ", number"
  for (let i = 1; i < numbers.length - 1; i += 1) {
    result = `${result}, ${cardNumberToString(numbers[i])}`;
  }

  // and put the last one on
  result = `${result} or ${cardNumberToString(numbers[numbers.length - 1])}`;

  return result;
};

// return the English for the given suits array as list of alternatives
// for eample ["S"] returns "S", ["S","H"] results "S or H"; ["S","H","D"] returns "S, H or D"
export const suitsToAlternativeString = (suits) => {
  // check we have something
  if (!suits || !suits.length) {
    return '';
  }

  let result = `${suitToTextSingular(suits[0])}`;

  // easy if only one in the array
  if (suits.length === 1) {
    return result;
  }

  // now add on all but the last as ", number"
  for (let i = 1; i < suits.length - 1; i += 1) {
    result = `${result}, ${suitToTextSingular(suits[i])}`;
  }

  // and put the last one on
  result = `${result} or ${suitToTextSingular(suits[suits.length - 1])}`;

  return result;
};
