// useful hint functions

import {
  toggleNumberOptionInSolutionOptions,
  toggleSuitOptionInSolutionOptions,
  getNumbersNotUsedInSolution,
  convertSuitToSuitOptionsIndex,
  getCardsStillAvailable,
} from './solution-functions';

import { sortedSuitCardsContainStraight } from './card-functions';

import {
  HINT_NUMBER_NOT_USED,
  CLUE_HAND_OF_TYPE,
  HAND_TYPE_STRAIGHT_FLUSH,
  SUITS,
  HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
} from './constants';

import logIfDevEnv from './logIfDevEnv';

// create HINT_NUMBER_NOT_USED
export const createHintNumberNotUsed = (number, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_NUMBER_NOT_USED,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// look to see if a number is not used, and still in the solution options
export const getNumberNotUsedHints = (solutionOptions, solutionHands, missingNumber) => {
  const numbersNotUsed = getNumbersNotUsedInSolution(solutionHands, missingNumber);

  // for efficiency later, we will return an array of all such hints
  const result = [];

  // each card options that still has this number results in a hint to remove it
  numbersNotUsed.forEach((number) => {
    solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
      handOptions.forEach((cardOptions, handOptionsIndex) => {
        if (cardOptions.numberOptions[number - 1]) {
          result.push(createHintNumberNotUsed(number, solutionOptionsIndex, handOptionsIndex));
        }
      });
    });
  });

  return result;
};

// create HINT_NUMBER_NOT_USED
export const createHintNoStraightFlushInSuit = (suit, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
});

export const getSuitsWithoutStraightFlushHints = (cardsStillAvailable, solutionHandIndex, solutionOptions) => {
  const result = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same as cards still available index, to find the suits available cards
    const row = convertSuitToSuitOptionsIndex(suit);

    const suitCardsAvailable = cardsStillAvailable[row];

    if (!sortedSuitCardsContainStraight(suitCardsAvailable)) {
      // the available cards for this suit cannot make a straight, so generate hints to remove this suit from the card options for all these hand options
      // BUT only if that is still a card suit option
      // the solutionOptionsIndex is the same as the solutionHandIndex here
      if (solutionOptions[solutionHandIndex][0].suitOptions[row]) {
        result.push(createHintNoStraightFlushInSuit(suit, solutionHandIndex, 0));
      }
      if (solutionOptions[solutionHandIndex][1].suitOptions[row]) {
        result.push(createHintNoStraightFlushInSuit(suit, solutionHandIndex, 1));
      }
      if (solutionOptions[solutionHandIndex][2].suitOptions[row]) {
        result.push(createHintNoStraightFlushInSuit(suit, solutionHandIndex, 2));
      }
      if (solutionOptions[solutionHandIndex][3].suitOptions[row]) {
        result.push(createHintNoStraightFlushInSuit(suit, solutionHandIndex, 3));
      }
      if (solutionOptions[solutionHandIndex][4].suitOptions[row]) {
        result.push(createHintNoStraightFlushInSuit(suit, solutionHandIndex, 4));
      }
    }
  });

  return result;
};

// get the next possible hint
export const getHint = (solutionOptions, solution, clues, cardsAvailable) => {
  const { solutionHands, missingNumber } = solution;

  // first see if number not used - this returns an array
  const numberNotUsedHints = getNumberNotUsedHints(solutionOptions, solutionHands, missingNumber);
  if (numberNotUsedHints.length) {
    return numberNotUsedHints;
  }

  // which of the cards available are still available after the solutionOptions have been considered
  const cardsStillAvailable = getCardsStillAvailable(cardsAvailable, solutionOptions);

  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandIndex } = clue;

    // deal with straight flush clues - which have to be for the first hand
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_STRAIGHT_FLUSH && solutionHandIndex === 0) {
      const suitsWithoutStraightFlushHints = getSuitsWithoutStraightFlushHints(cardsStillAvailable, solutionHandIndex, solutionOptions);
      if (suitsWithoutStraightFlushHints.length) {
        return suitsWithoutStraightFlushHints;
      }
    }
  }

  // no other hints yet
  return [];
};

const applyNumberNotUsedHint = (solutionOptions, hint) => {
  const { number, solutionOptionsIndex, handOptionsIndex } = hint;
  logIfDevEnv(`applying HINT_NUMBER_NOT_USED for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);
  return toggleNumberOptionInSolutionOptions(number - 1, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyNoStraightFlushInSuitHint = (solutionOptions, hint) => {
  const { suit, solutionOptionsIndex, handOptionsIndex } = hint;
  logIfDevEnv(`applying HINT_NO_STRAIGHT_FLUSH_IN_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);
  return toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

// apply the given hint - this assumes it is a valid hint for the given solutionOptions
export const applyHint = (solutionOptions, hint) => {
  const { hintType } = hint;
  switch (hintType) {
    case HINT_NUMBER_NOT_USED:
      return applyNumberNotUsedHint(solutionOptions, hint);

    case HINT_NO_STRAIGHT_FLUSH_IN_SUIT:
      return applyNoStraightFlushInSuitHint(solutionOptions, hint);

    default:
      console.log(`ERROR: applyHint cannot cope with hintType ${hintType}!!!`);
      return solutionOptions;
  }
};
