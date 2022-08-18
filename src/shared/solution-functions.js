// useful solution functions

import { NUMBERS, HINT_NUMBER_NOT_USED } from './constants';

import logIfDevEnv from './logIfDevEnv';

// create the initial solution options
export const createSolutionOptions = () => [
  [
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
  ],
  [
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
  ],
  [
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
  ],
  [
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
  ],
];

// ---------------------------- //
// solution options update code //
// ---------------------------- //

// set the given suit options index as the only selected suit option
export const setSuitOptionOnlyInSolutionOptions = (suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { numberOptions } = handOptions[handOptionsIndex];
  const newSuitOptions = [false, false, false, false];
  newSuitOptions[suitOptionsIndex] = true;
  const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// toggle the given suit option index
export const toggleSuitOptionInSolutionOptions = (suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions, numberOptions } = handOptions[handOptionsIndex];
  const newSuitOptions = [...suitOptions];
  newSuitOptions[suitOptionsIndex] = !suitOptions[suitOptionsIndex];
  const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// reset all the suit options
export const resetSuitOptionsInSolutionOptions = (solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { numberOptions } = handOptions[handOptionsIndex];
  const newSuitOptions = [true, true, true, true];
  const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// set the given number options index as the only selected number option
export const setNumberOptionOnlyInSolutionOptions = (numberOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions, solution) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
  newNumberOptions[numberOptionsIndex] = true;
  // and the missing number entry is always true as well (which we assume in 'only one number selected' count)
  newNumberOptions[solution.missingNumber - 1] = true;
  const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// toggle the given number option index
export const toggleNumberOptionInSolutionOptions = (numberOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions, numberOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [...numberOptions];
  newNumberOptions[numberOptionsIndex] = !numberOptions[numberOptionsIndex];
  const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// reset all the number options
export const resetNumberOptionsInSolutionOptions = (solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
  const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// --------------------   //
// hint generation code   //
// --------------------   //

// returns an array of numbers not used, not including the missing number
export const getNumbersNotUsedInSolution = (solutionHands, missingNumber) => {
  const result = [];

  NUMBERS.forEach((number) => {
    if (number !== missingNumber) {
      let used = false;
      solutionHands.forEach((solutionHand) => {
        solutionHand.forEach((card) => {
          if (card.number === number) {
            used = true;
          }
        });
      });

      if (!used) {
        result.push(number);
      }
    }
  });

  return result;
};

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
          result.push({
            hintType: HINT_NUMBER_NOT_USED,
            number,
            solutionOptionsIndex,
            handOptionsIndex,
          });
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
