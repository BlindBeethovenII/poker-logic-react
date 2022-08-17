// useful solution functions

import { NUMBERS, HINT_NUMBER_NOT_USED } from './constants';

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
            hint: HINT_NUMBER_NOT_USED,
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
