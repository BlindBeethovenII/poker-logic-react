// useful solution functions

import {
  NUMBERS,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
} from './constants';

// create the initial solution options
export const createSolutionOptions = (missingNumber) => {
  const solutionOptions = [
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

  // unset the missing number
  solutionOptions.forEach((handOptions) => {
    handOptions.forEach((cardOptions) => {
      const { numberOptions } = cardOptions;
      numberOptions[missingNumber - 1] = false;
    });
  });

  return solutionOptions;
};

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
export const setNumberOptionOnlyInSolutionOptions = (numberOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
  newNumberOptions[numberOptionsIndex] = true;
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

// ------------------------- //
// solution helper functions //
// ------------------------- //

// convert suit to suitOptionsIndex
export const convertSuitToSuitOptionsIndex = (suit) => {
  let result = -1;
  if (suit === SUIT_SPADES) {
    result = 0;
  } else if (suit === SUIT_HEARTS) {
    result = 1;
  } else if (suit === SUIT_DIAMONDS) {
    result = 2;
  } else if (suit === SUIT_CLUBS) {
    result = 3;
  } else {
    console.error(`convertSuitToSuitOptionsIndex cannot cope with suit ${suit}`);
  }
  return result;
};

// returns an array of numbers not used, not including the missing number
export const getNumbersNotUsedInSolution = (solutionHands, missingNumber) => {
  const result = [];

  NUMBERS.forEach((number) => {
    if (number !== missingNumber) {
      let used = false;
      solutionHands.every((solutionHand) => solutionHand.every((card) => {
        if (card.number === number) {
          used = true;
          // stop the loop
          return false;
        }
        // continue the loop
        return true;
      }));

      if (!used) {
        result.push(number);
      }
    }
  });

  return result;
};

// return true if given card is in the given solution hands
export const cardInSolutionHands = (card, solutionHands) => {
  let result = false;
  solutionHands.every((solutionHand) => solutionHand.every((solutionHandCard) => {
    if (solutionHandCard.suit === card.suit && solutionHandCard.number === card.number) {
      result = true;
      // stop the loop
      return false;
    }
    // continue the loop
    return true;
  }));
  return result;
};

// helper function for reduce() to count the number of true booleans in an array of booleans
const countBooleansReducer = (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0);

// helper function
const suitSelectedInSuitOptions = (suit, suitOptions) => {
  const suitOptionsCount = suitOptions.reduce(countBooleansReducer);
  // return true if there is only a single suit selected and it is our suit
  return suitOptionsCount === 1 && suitOptions[convertSuitToSuitOptionsIndex(suit)];
};

// helper function
const numberSelectedInNumberOptions = (number, numberOptions) => {
  const numberOptionsCount = numberOptions.reduce(countBooleansReducer);
  // return true if there is only a single number selected and it is our number (remember missingNumber option always false)
  return numberOptionsCount === 1 && numberOptions[number - 1];
};

// helper function
const cardSelectedInCardOptions = (card, cardOptions) => {
  const { suit, number } = card;
  const { suitOptions, numberOptions } = cardOptions;
  return suitSelectedInSuitOptions(suit, suitOptions) && numberSelectedInNumberOptions(number, numberOptions);
};

// return true if given card is 'selected' in the given solution options
export const cardSelectedInSolutionOptions = (card, solutionOptions) => {
  let result = false;
  solutionOptions.every((handOptions) => handOptions.every((cardOptions) => {
    if (cardSelectedInCardOptions(card, cardOptions)) {
      result = true;
      // stop the loop
      return false;
    }
    // continue the loop
    return true;
  }));
  return result;
};
