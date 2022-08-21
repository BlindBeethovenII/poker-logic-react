// useful hint functions

import { toggleNumberOptionInSolutionOptions, getNumbersNotUsedInSolution } from './solution-functions';

import { HINT_NUMBER_NOT_USED, CLUE_HAND_OF_TYPE, HAND_TYPE_STRAIGHT_FLUSH } from './constants';

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

export const getSuitsWithoutStraightFlushHints = () => {
  const result = [];

  return result;
};

// get the next possible hint
export const getHint = (solutionOptions, solution, clues) => {
  const { solutionHands, missingNumber } = solution;

  // first see if number not used - this returns an array
  const numberNotUsedHints = getNumberNotUsedHints(solutionOptions, solutionHands, missingNumber);
  if (numberNotUsedHints.length) {
    return numberNotUsedHints;
  }

  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandIndex } = clue;

    // deal with straight flush clues - which have to be for the first hand
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_STRAIGHT_FLUSH && solutionHandIndex === 0) {
      const suitsWithoutStraightFlushHints = getSuitsWithoutStraightFlushHints(solutionOptions, solutionHands);
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

// apply the given hint - this assumes it is a valid hint for the given solutionOptions
export const applyHint = (solutionOptions, hint) => {
  const { hintType } = hint;
  switch (hintType) {
    case HINT_NUMBER_NOT_USED:
      return applyNumberNotUsedHint(solutionOptions, hint);

    default:
      console.log(`ERROR: applyHint cannot cope with hintType ${hintType}!!!`);
      return solutionOptions;
  }
};
