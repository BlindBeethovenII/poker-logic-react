// useful hint functions

import { HINT_NUMBER_NOT_USED } from './constants';

import { toggleNumberOptionInSolutionOptions, getNumbersNotUsedInSolution } from './solution-functions';

import logIfDevEnv from './logIfDevEnv';

// create HINT_NUMBER_NOT_USED
export const createHintNumberNotUsed = (number, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_NUMBER_NOT_USED,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// look to see if a number is not used, and still in the solution options
export const getNumberNotUsedHint = (solutionOptions, solutionHands, missingNumber) => {
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

// get the next possible hint
export const getHint = (solutionOptions, solution) => {
  const { solutionHands, missingNumber } = solution;
  return getNumberNotUsedHint(solutionOptions, solutionHands, missingNumber);
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
