// useful solution functions

import {
  createCard,
  sortSuit,
  getStraights,
} from './card-functions';

import {
  HAND_TYPE_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_HIGH_CARD,
  HAND_TYPE_PAIR,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  INDEX_SUIT_CLUBS,
  INDEX_SUIT_DIAMONDS,
  INDEX_SUIT_HEARTS,
  INDEX_SUIT_SPADES,
  NUMBERS,
  NUMBERS_SORTED,
  NUMBER_10,
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
  NUMBER_A,
  NUMBER_J,
  NUMBER_K,
  NUMBER_Q,
  SUITS,
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
export const setNumberOptionOnlyInSolutionOptions = (number, solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
  newNumberOptions[number - 1] = true;
  const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// toggle the given number option index
export const toggleNumberOptionInSolutionOptions = (number, solutionOptionsIndex, handOptionsIndex, solutionOptions) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions, numberOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [...numberOptions];
  newNumberOptions[number - 1] = !numberOptions[number - 1];
  const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
  const newHandOptions = [...handOptions];
  newHandOptions[handOptionsIndex] = newCardOptions;
  const newSolutionOptions = [...solutionOptions];
  newSolutionOptions[solutionOptionsIndex] = newHandOptions;
  return newSolutionOptions;
};

// reset all the number options
export const resetNumberOptionsInSolutionOptions = (solutionOptionsIndex, handOptionsIndex, solutionOptions, missingNumber) => {
  const handOptions = solutionOptions[solutionOptionsIndex];
  const { suitOptions } = handOptions[handOptionsIndex];
  const newNumberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
  // don't forget to set the missing number to false
  newNumberOptions[missingNumber - 1] = false;
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
  if (suit === SUIT_SPADES) {
    return INDEX_SUIT_SPADES;
  }

  if (suit === SUIT_HEARTS) {
    return INDEX_SUIT_HEARTS;
  }

  if (suit === SUIT_DIAMONDS) {
    return INDEX_SUIT_DIAMONDS;
  }

  if (suit === SUIT_CLUBS) {
    return INDEX_SUIT_CLUBS;
  }

  console.error(`convertSuitToSuitOptionsIndex cannot cope with suit ${suit}`);
  return -1;
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
export const isCardInSolutionHands = (card, solutionHands) => {
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

// helper function
const getCardsAvailableInSuitSorted = (suit, solutionHands) => {
  const cards = [];
  NUMBERS_SORTED.forEach((number) => {
    const card = createCard(suit, number);
    if (isCardInSolutionHands(card, solutionHands)) {
      cards.push(card);
    }
  });
  return cards;
};

// cards available are suit sorted cards from the generated solution
export const getCardsAvailable = (solutionHands) => [
  getCardsAvailableInSuitSorted(SUIT_SPADES, solutionHands),
  getCardsAvailableInSuitSorted(SUIT_HEARTS, solutionHands),
  getCardsAvailableInSuitSorted(SUIT_DIAMONDS, solutionHands),
  getCardsAvailableInSuitSorted(SUIT_CLUBS, solutionHands),
];

// helper function for reduce() to count the number of true booleans in an array of booleans
const countBooleansReducer = (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0);

export const countTrueBooleansInArray = (boolArray) => boolArray.reduce(countBooleansReducer, 0);

// count suits still set in the given cardOptions
export const countSuitsInCardOptions = (cardOptions) => countTrueBooleansInArray(cardOptions.suitOptions);

// count numbers still set in the given cardOptions
export const countNumbersInCardOptions = (cardOptions) => countTrueBooleansInArray(cardOptions.numberOptions);

// helper function
const isSuitPlacedInSuitOptions = (suit, suitOptions) => {
  const suitOptionsCount = countTrueBooleansInArray(suitOptions);
  // return true if there is only a single suit selected and it is our suit
  return suitOptionsCount === 1 && suitOptions[convertSuitToSuitOptionsIndex(suit)];
};

// helper function
const isNumberPlacedInNumberOptions = (number, numberOptions) => {
  const numberOptionsCount = countTrueBooleansInArray(numberOptions);
  // return true if there is only a single number selected and it is our number (remember missingNumber option always false)
  return numberOptionsCount === 1 && numberOptions[number - 1];
};

// helper function
export const isCardPlacedInCardOptions = (card, cardOptions) => {
  const { suit, number } = card;
  const { suitOptions, numberOptions } = cardOptions;
  return isSuitPlacedInSuitOptions(suit, suitOptions) && isNumberPlacedInNumberOptions(number, numberOptions);
};

// return true if given card is placed in the given solution options
export const isCardPlacedInSolutionOptions = (card, solutionOptions) => {
  let result = false;
  solutionOptions.every((handOptions) => handOptions.every((cardOptions) => {
    if (isCardPlacedInCardOptions(card, cardOptions)) {
      result = true;
      // stop the loop
      return false;
    }
    // continue the loop
    return true;
  }));
  return result;
};

// return true if given suit bool is true in the cardOptions suitOptions
export const isSuitTrueInCardOptions = (suit, cardOptions) => {
  const { suitOptions } = cardOptions;
  return suitOptions[convertSuitToSuitOptionsIndex(suit)];
};

// return true if given number bool is true in the cardOptions numberOptions
export const isNumberTrueInCardOptions = (number, cardOptions) => {
  const { numberOptions } = cardOptions;
  return numberOptions[number - 1];
};

// return true if the given suit is placed in the given cardOptions
export const isSuitPlacedInCardOptions = (suit, cardOptions) => {
  const { suitOptions } = cardOptions;
  return isSuitPlacedInSuitOptions(suit, suitOptions);
};

// return true if the given number is placed in the given cardOptions
export const isNumberPlacedInCardOptions = (number, cardOptions) => {
  const { numberOptions } = cardOptions;
  return isNumberPlacedInNumberOptions(number, numberOptions);
};

// return true if the given number is placed in the given solutionOptions
export const isNumberPlaced = (number, solutionOptions) => {
  for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length; solutionOptionsIndex += 1) {
    const handOptions = solutionOptions[solutionOptionsIndex];
    for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
      const cardOptions = handOptions[handOptionsIndex];
      if (isNumberPlacedInCardOptions(number, cardOptions)) {
        // found one
        return true;
      }
    }
  }

  // nope number not placed
  return false;
};

// return the cards still available in solution options from the given card array
const cardsStillAvailableFromArray = (cards, solutionOptions) => {
  const result = [];

  cards.forEach((card) => {
    let isCardPlaced = false;

    solutionOptions.every((handOptions) => handOptions.every((cardOptions) => {
      if (isCardPlacedInCardOptions(card, cardOptions)) {
        isCardPlaced = true;
        // stop the loop
        return false;
      }
      // continue the loop
      return true;
    }));

    // if the card is not placed then it is still available
    if (!isCardPlaced) {
      result.push(card);
    }
  });

  return result;
};

// return the cards that are still available in solution options
export const getCardsStillAvailable = (cardsAvailable, solutionOptions) => [
  cardsStillAvailableFromArray(cardsAvailable[0], solutionOptions),
  cardsStillAvailableFromArray(cardsAvailable[1], solutionOptions),
  cardsStillAvailableFromArray(cardsAvailable[2], solutionOptions),
  cardsStillAvailableFromArray(cardsAvailable[3], solutionOptions),
];

// return a count of cards that are still available in solution options
export const countCardsStillAvailable = (cardsAvailable, solutionOptions) =>
  cardsStillAvailableFromArray(cardsAvailable[0], solutionOptions).length
  + cardsStillAvailableFromArray(cardsAvailable[1], solutionOptions).length
  + cardsStillAvailableFromArray(cardsAvailable[2], solutionOptions).length
  + cardsStillAvailableFromArray(cardsAvailable[3], solutionOptions).length;

// helper function
const countNumberAvailableInSuitCardsAvailable = (number, suitCardsAvailable) => {
  const countIfSameNumber = (accumulator, card) => accumulator + (card.number === number ? 1 : 0);
  return suitCardsAvailable.reduce(countIfSameNumber, 0);
};

// count how many cards of this number are in the given cardsAvailable
export const countNumberAvailable = (number, cardsAvailable) => countNumberAvailableInSuitCardsAvailable(number, cardsAvailable[0])
  + countNumberAvailableInSuitCardsAvailable(number, cardsAvailable[1])
  + countNumberAvailableInSuitCardsAvailable(number, cardsAvailable[2])
  + countNumberAvailableInSuitCardsAvailable(number, cardsAvailable[3]);

// return true if a card of this number is in the given array of suit cards
const numberInSuitCardsAvailable = (number, suitCardsAvailable) => {
  for (let i = 0; i < suitCardsAvailable.length; i += 1) {
    if (suitCardsAvailable[i].number === number) {
      return true;
    }
  }

  return false;
};

// get the suits of the given number in the given cardsAvailable - in order
export const getSuitsOfNumberInAvailable = (number, cardsAvailable) => {
  const result = [];
  if (numberInSuitCardsAvailable(number, cardsAvailable[0])) {
    result.push(SUIT_SPADES);
  }
  if (numberInSuitCardsAvailable(number, cardsAvailable[1])) {
    result.push(SUIT_HEARTS);
  }
  if (numberInSuitCardsAvailable(number, cardsAvailable[2])) {
    result.push(SUIT_DIAMONDS);
  }
  if (numberInSuitCardsAvailable(number, cardsAvailable[3])) {
    result.push(SUIT_CLUBS);
  }
  return result;
};

// get the suit indexes of the given number in the given cardsAvailable - in order
export const getSuitIndexesOfNumberInAvailable = (number, cardsAvailable) => {
  const result = [];
  if (numberInSuitCardsAvailable(number, cardsAvailable[0])) {
    result.push(INDEX_SUIT_SPADES);
  }
  if (numberInSuitCardsAvailable(number, cardsAvailable[1])) {
    result.push(INDEX_SUIT_HEARTS);
  }
  if (numberInSuitCardsAvailable(number, cardsAvailable[2])) {
    result.push(INDEX_SUIT_DIAMONDS);
  }
  if (numberInSuitCardsAvailable(number, cardsAvailable[3])) {
    result.push(INDEX_SUIT_CLUBS);
  }
  return result;
};

// get an array of numbers from the given array of suit cards
const getNumbersFromSuitCardsAvailable = (suitCardsAvailable) => {
  const result = [];

  for (let i = 0; i < suitCardsAvailable.length; i += 1) {
    result.push(suitCardsAvailable[i].number);
  }

  return result;
};

// get the numbers of the given suit in the given cardsAvailable
export const getNumbersOfSuitInAvailable = (suit, cardsAvailable) => {
  if (suit === SUIT_SPADES) {
    return getNumbersFromSuitCardsAvailable(cardsAvailable[0]);
  }
  if (suit === SUIT_HEARTS) {
    return getNumbersFromSuitCardsAvailable(cardsAvailable[1]);
  }
  if (suit === SUIT_DIAMONDS) {
    return getNumbersFromSuitCardsAvailable(cardsAvailable[2]);
  }
  if (suit === SUIT_CLUBS) {
    return getNumbersFromSuitCardsAvailable(cardsAvailable[3]);
  }

  // should not get here
  console.error(`getNumbersOfSuitInAvailable cannot cope with suit ${suit}`);
  return [];
};

// return the number of cards in the name suit in the given cardsAvailable
export const countSuitAvailable = (suit, cardsAvailable) => {
  if (suit === SUIT_SPADES) {
    return cardsAvailable[0].length;
  }
  if (suit === SUIT_HEARTS) {
    return cardsAvailable[1].length;
  }
  if (suit === SUIT_DIAMONDS) {
    return cardsAvailable[2].length;
  }
  if (suit === SUIT_CLUBS) {
    return cardsAvailable[3].length;
  }

  // should not get here
  console.error(`countSuitAvailable cannot cope with suit ${suit}`);
  return 0;
};

// get the value of a specific suit options boolean in the given solution options
export const getSuitOptionsValue = (solutionOptions, solutionOptionsIndex, handOptionsIndex, suitOptionsIndex) =>
  solutionOptions[solutionOptionsIndex][handOptionsIndex].suitOptions[suitOptionsIndex];

// get the value of a specific number options boolean in the given solution options
export const getNumberOptionsValue = (solutionOptions, solutionOptionsIndex, handOptionsIndex, number) =>
  solutionOptions[solutionOptionsIndex][handOptionsIndex].numberOptions[number - 1];

// get the value of a specific suit options boolean in the given hand options
export const getSuitOptionsValueInHandOptions = (handOptions, handOptionsIndex, suitOptionsIndex) =>
  handOptions[handOptionsIndex].suitOptions[suitOptionsIndex];

// get the value of a specific suit options boolean in the given card options
export const getSuitOptionsValueInCardOptions = (cardOptions, suitOptionsIndex) =>
  cardOptions.suitOptions[suitOptionsIndex];

// get the value of a specific number options boolean in the given card options
export const getNumberOptionsValueInCardOptions = (cardOptions, number) =>
  cardOptions.numberOptions[number - 1];

// count the number of cardOptions for which this this suitOptionsIndex is true in the given handOptions
export const countSuitTrueInHandOptions = (handOptions, suitOptionsIndex) => {
  const countIfSuitOptionTrue = (accumulator, currentValue) => accumulator + (currentValue.suitOptions[suitOptionsIndex] ? 1 : 0);
  return handOptions.reduce(countIfSuitOptionTrue, 0);
};

// count the number of cardOptions for which this suitOptionsIndex is true in the whole solutionOptions
export const countSuitTrueInSolutionOptions = (solutionOptions, suitOptionsIndex) => (
  countSuitTrueInHandOptions(solutionOptions[0], suitOptionsIndex)
  + countSuitTrueInHandOptions(solutionOptions[1], suitOptionsIndex)
  + countSuitTrueInHandOptions(solutionOptions[2], suitOptionsIndex)
  + countSuitTrueInHandOptions(solutionOptions[3], suitOptionsIndex)
);

// count the number of cardOptions for which this this number is true in the given handOptions
export const countNumberTrueInHandOptions = (handOptions, number) => {
  const countIfNumberOptionTrue = (accumulator, currentValue) => accumulator + (currentValue.numberOptions[number - 1] ? 1 : 0);
  return handOptions.reduce(countIfNumberOptionTrue, 0);
};

// count the number of cardOptions for which this number is true in the whole solutionOptions
export const countNumberTrueInSolutionOptions = (solutionOptions, number) => (
  countNumberTrueInHandOptions(solutionOptions[0], number)
  + countNumberTrueInHandOptions(solutionOptions[1], number)
  + countNumberTrueInHandOptions(solutionOptions[2], number)
  + countNumberTrueInHandOptions(solutionOptions[3], number)
);

// count how many times the suit is placed in the given solutionOptions
export const countSuitPlacedInSolutionOptions = (suit, solutionOptions) => {
  let count = 0;
  for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length; solutionOptionsIndex += 1) {
    const handOptions = solutionOptions[solutionOptionsIndex];
    for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
      const cardOptions = handOptions[handOptionsIndex];
      if (isSuitPlacedInCardOptions(suit, cardOptions)) {
        // found one
        count += 1;
      }
    }
  }

  return count;
};

// count how many times the suit is placed in the given solutionOptions but for which the number is not yet placed
export const countSuitPlacedInSolutionOptionsWithoutNumberPlaced = (suit, solutionOptions) => {
  let count = 0;
  for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length; solutionOptionsIndex += 1) {
    const handOptions = solutionOptions[solutionOptionsIndex];
    for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
      const cardOptions = handOptions[handOptionsIndex];
      if (isSuitPlacedInCardOptions(suit, cardOptions) && countNumbersInCardOptions(cardOptions) > 1) {
        // found one
        count += 1;
      }
    }
  }

  return count;
};

// count how many times the number is placed in the given solutionOptions
export const countNumberPlacedInSolutionOptions = (number, solutionOptions) => {
  let count = 0;
  for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length; solutionOptionsIndex += 1) {
    const handOptions = solutionOptions[solutionOptionsIndex];
    for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
      const cardOptions = handOptions[handOptionsIndex];
      if (isNumberPlacedInCardOptions(number, cardOptions)) {
        // found one
        count += 1;
      }
    }
  }

  return count;
};

// count how many times the number is placed in the given solutionOptions but for which the suit is not yet placed
export const countNumberPlacedInSolutionOptionsWithoutSuitPlaced = (number, solutionOptions) => {
  let count = 0;
  for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length; solutionOptionsIndex += 1) {
    const handOptions = solutionOptions[solutionOptionsIndex];
    for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
      const cardOptions = handOptions[handOptionsIndex];
      if (isNumberPlacedInCardOptions(number, cardOptions) && countSuitsInCardOptions(cardOptions) > 1) {
        // found one
        count += 1;
      }
    }
  }

  return count;
};

// return the first suit that is set in the given cardOptions - there should be at least one set
export const getFirstSuitSet = (cardOptions) => {
  const { suitOptions } = cardOptions;
  for (let i = 0; i < suitOptions.length; i += 1) {
    if (suitOptions[i]) {
      return SUITS[i];
    }
  }

  // didn't find one - this should only be called if there is one
  console.error('getFirstSuitSet did not find a set suit in the cardOptions suitOptions');
  return 0;
};

// return the first number that is set in the given cardOptions - there should be at least one set
export const getFirstNumberSet = (cardOptions) => {
  const { numberOptions } = cardOptions;
  for (let i = 0; i < numberOptions.length; i += 1) {
    if (numberOptions[i]) {
      return i + 1;
    }
  }

  // didn't find one - this should only be called if there is one
  console.error('getFirstNumberSet did not find a set number in the cardOptions numberOptions');
  return 0;
};

// return true if the given cardOptions is now a placed card
export const isCardOptionsAPlacedCard = (cardOptions) => (countSuitsInCardOptions(cardOptions) === 1 && countNumbersInCardOptions(cardOptions) === 1);

// return the cards that are placed in the given handOptions
export const getPlacedCardsInHandOptions = (handOptions) => {
  const result = [];

  handOptions.forEach((cardOptions) => {
    if (isCardOptionsAPlacedCard(cardOptions)) {
      result.push(createCard(getFirstSuitSet(cardOptions), getFirstNumberSet(cardOptions)));
    }
  });

  return result;
};

// return true if the solutionOptions are still valid
// that is, can the solutionHands still be placed in their corresponding cardOptions
// and are the placed cards those of the corresponding solutionHand
// actually - now, this is equivalent to checking each card of the solution can still be placed (which includes: is placed) in its corresponding cardOptions
export const solutionOptionsValid = (solutionOptions, solutionHands) => {
  // now check that card of the solutionHand can still be placed somewhere
  for (let solutionHandsIndex = 0; solutionHandsIndex < 4; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    const handOptions = solutionOptions[solutionHandsIndex];

    // work through each card of the solutionHand
    for (let solutionHandIndex = 0; solutionHandIndex < solutionHand.length; solutionHandIndex += 1) {
      const { id, suit, number } = solutionHand[solutionHandIndex];

      // we now look at the same position in the handOptions
      const cardOptions = handOptions[solutionHandIndex];

      // check this solution card's suit is still possible
      if (!isSuitTrueInCardOptions(suit, cardOptions)) {
        // eslint-disable-next-line max-len
        console.error(`solutionOptionsValid: solutionHand card ${id}'s suit cannot be placed in cardOptions at solutionOptionsIndex ${solutionHandsIndex} handOptionsIndex ${solutionHandIndex}`);
        return false;
      }

      // check this solution card's number is still possible
      if (!isNumberTrueInCardOptions(number, cardOptions)) {
        // eslint-disable-next-line max-len
        console.error(`solutionOptionsValid: solutionHand card ${id}'s number cannot be placed in cardOptions at solutionOptionsIndex ${solutionHandsIndex} handOptionsIndex ${solutionHandIndex}`);
        return false;
      }
    }
  }

  // everthing is good
  return true;
};

// get numbers still available from cardOptions
export const getNumbersFromCardOptions = (cardOptions) => {
  const result = [];
  NUMBERS.forEach((number) => {
    if (getNumberOptionsValueInCardOptions(cardOptions, number)) {
      result.push(number);
    }
  });
  return result;
};

// get suits still available from cardOptions
export const getSuitsFromCardOptions = (cardOptions) => {
  const result = [];
  SUITS.forEach((suit) => {
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
    if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
      result.push(suit);
    }
  });
  return result;
};

// return true if all items in the first array are in the second array
export const allItemsFromFirstInSecond = (array1, array2) => {
  for (let i = 0; i < array1.length; i += 1) {
    if (!array2.includes(array1[i])) {
      return false;
    }
  }

  // yep, all present and correct
  return true;
};

// return true if another suit, not in the given suits, is set in the given card options
export const isAnotherSuitSetInCardOptions = (cardOptions, suits) => {
  let result = false;
  SUITS.forEach((suit) => {
    if (!suits.includes(suit) && getSuitOptionsValueInCardOptions(cardOptions, convertSuitToSuitOptionsIndex(suit))) {
      result = true;
    }
  });

  return result;
};

// return true if another number, not in the given numbers, is set in the given card options
export const isAnotherNumberSetInCardOptions = (cardOptions, numbers) => {
  let result = false;
  NUMBERS.forEach((number) => {
    if (!numbers.includes(number) && getNumberOptionsValueInCardOptions(cardOptions, number)) {
      result = true;
    }
  });

  return result;
};

// return true if an available pair of this number can fit into the stated pair position by suit
// note: it is known that the given number is a possibility here - we are just interested in the suits fitting
export const canPairOfSuitsOfNumberFitIn = (number, solutionHandsIndex, handOptionsIndex1, handOptionsIndex2, cardsAvailable, solutionOptions) => {
  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[handOptionsIndex1];
  const cardOptions2 = handOptions[handOptionsIndex2];

  // first get all the suit indexs of the suits available for this number
  const suitIndexes = getSuitIndexesOfNumberInAvailable(number, cardsAvailable);

  // consider all pairs - remembering order must be obeyed
  for (let suitIndex1 = 0; suitIndex1 < suitIndexes.length - 1; suitIndex1 += 1) {
    const suitOptionsIndex1 = suitIndexes[suitIndex1];
    // only continue if this suit can be placed in the first card
    if (getSuitOptionsValueInCardOptions(cardOptions1, suitOptionsIndex1)) {
      for (let suitIndex2 = suitIndex1 + 1; suitIndex2 < suitIndexes.length; suitIndex2 += 1) {
        const suitOptionsIndex2 = suitIndexes[suitIndex2];
        if (getSuitOptionsValueInCardOptions(cardOptions2, suitOptionsIndex2)) {
          // yes this pair can fit
          return true;
        }
      }
    }
  }

  // couldn't find a valid pair of suits for this number
  return false;
};

// return true if there a three of this number can fit into the first three cards by suit
// note: it is known that the given number is a possibility here - we are just interested in the suits fitting
export const canThreeOfSuitsOfNumberFitIn = (number, solutionHandsIndex, cardsAvailable, solutionOptions) => {
  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];

  // first get all the suit indexs of the suits available for this number
  const suitIndexes = getSuitIndexesOfNumberInAvailable(number, cardsAvailable);

  // consider all triples - remembering order must be obeyed
  for (let suitIndex1 = 0; suitIndex1 < suitIndexes.length - 2; suitIndex1 += 1) {
    const suitOptionsIndex1 = suitIndexes[suitIndex1];
    // only continue if this suit can be placed in the first card
    if (getSuitOptionsValueInCardOptions(cardOptions1, suitOptionsIndex1)) {
      for (let suitIndex2 = suitIndex1 + 1; suitIndex2 < suitIndexes.length - 1; suitIndex2 += 1) {
        const suitOptionsIndex2 = suitIndexes[suitIndex2];
        // only continue if this suit can be placed in the second card
        if (getSuitOptionsValueInCardOptions(cardOptions2, suitOptionsIndex2)) {
          for (let suitIndex3 = suitIndex2 + 1; suitIndex3 < suitIndexes.length; suitIndex3 += 1) {
            const suitOptionsIndex3 = suitIndexes[suitIndex3];
            if (getSuitOptionsValueInCardOptions(cardOptions3, suitOptionsIndex3)) {
              // yes this triple can fit
              return true;
            }
          }
        }
      }
    }
  }

  // couldn't find a valid pair of suits for this number
  return false;
};

// convert the given numbers into their suits from given cards available for which the suits can still be placed into given position indexes of the given solutionHandIndex hand
// position index params are so this code works for pair and three of a kind (for a pair index3 will be undefined which will always not match the condition)
// we exclude a number's suit if it is placed outside of the first n cards as that card is not available to be later placed in the first n cards
// eslint-disable-next-line max-len
export const getSuitsOfNumberAvailableForGivenCardsOfHand = (numbers, cardsAvailable, solutionHandsIndex, solutionOptions, handOptionsIndex1, handOptionsIndex2, handOptionsIndex3) => {
  // convert the numbers into suits for the available numbers
  const repeatedSuits = [];
  numbers.forEach((number) => {
    // first get all the suits for this card
    const allSuits = getSuitsOfNumberInAvailable(number, cardsAvailable);
    // we don't want to include a suit for this number that is placed outside of the first n cards as that suit is not actually available for the first n cards
    allSuits.forEach((suit) => {
      const card = createCard(suit, number);
      let cardIsPlaced = false;
      for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length; solutionOptionsIndex += 1) {
        const handOptions = solutionOptions[solutionOptionsIndex];
        for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
          if (solutionHandsIndex !== solutionOptionsIndex
            || (handOptionsIndex !== handOptionsIndex1 && handOptionsIndex !== handOptionsIndex2 && handOptionsIndex !== handOptionsIndex3)) {
            const cardOptions = handOptions[handOptionsIndex];
            if (isCardPlacedInCardOptions(card, cardOptions)) {
              cardIsPlaced = true;
            }
          }
        }
      }
      if (!cardIsPlaced) {
        // this card isn't already placed, so remember its suit
        repeatedSuits.push(suit);
      }
    });
  });

  // slim these down so no repeats and in the corrected order
  const suits = [];
  SUITS.forEach((suit) => {
    if (repeatedSuits.includes(suit)) {
      suits.push(suit);
    }
  });

  return suits;
};

// return true if the given suit is possible in all cards of the given handOptions
export const suitPossibleInAllHandOptions = (suit, handOptions) => {
  let suitPossible = true;
  const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
  for (let i = 0; i < handOptions.length && suitPossible; i += 1) {
    const cardOptions = handOptions[i];
    if (!getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
      suitPossible = false;
    }
  }
  return suitPossible;
};

// return the count of which of the given suits are still possible in the given cardOptions
export const countWhichOfSuitsPossibleInCardOptions = (suits, cardOptions) => {
  let result = 0;

  for (let i = 0; i < suits.length; i += 1) {
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suits[i]);
    if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
      result += 1;
    }
  }

  return result;
};

// return the count of which of the given numbers are still possible in the given cardOptions
export const countWhichOfNumbersPossibleInCardOptions = (numbers, cardOptions) => {
  let result = 0;

  for (let i = 0; i < numbers.length; i += 1) {
    if (getNumberOptionsValueInCardOptions(cardOptions, numbers[i])) {
      result += 1;
    }
  }

  return result;
};

// return true if solutionOptions is complete, that is, no cards are still available, that is all cards have been placed
export const isSolutionOptionsComplete = (cardsAvailable, solutionOptions) => countCardsStillAvailable(cardsAvailable, solutionOptions) === 0;

// return the maximum number still possible in the given cardOptions
export const getMaxNumberInCardOptions = (cardOptions) => {
  for (let i = 0; i < NUMBERS_SORTED.length; i += 1) {
    const number = NUMBERS_SORTED[i];
    if (isNumberTrueInCardOptions(number, cardOptions)) {
      return number;
    }
  }

  // should never get here
  console.error(`getMaxNumberInCardOptions could not find possible number in given cardOptions ${JSON.stringify(cardOptions)}`);

  return -1;
};

// return the number number still possible in the given cardOptions
export const getMinNumberInCardOptions = (cardOptions) => {
  for (let i = NUMBERS_SORTED.length - 1; i >= 0; i -= 1) {
    const number = NUMBERS_SORTED[i];
    if (isNumberTrueInCardOptions(number, cardOptions)) {
      return number;
    }
  }

  // should never get here
  console.error(`getMinNumberInCardOptions could not find possible number in given cardOptions ${JSON.stringify(cardOptions)}`);

  return -1;
};

// common code for get hint functions - add cards back into given array of cards which are a placed card for the given suit in the given handOptions, sorting result
export const addPlacedCardsOfSuitFromHandOptions = (cards, suit, handOptions) => {
  let result = [...cards];

  // need to add back in in any cards that are already placed for this suit in handOptions
  let needToSortAgain = false;
  [0, 1, 2, 3, 4].forEach((handOptionsIndex) => {
    const cardOptions = handOptions[handOptionsIndex];
    if (isCardOptionsAPlacedCard(cardOptions)) {
      const setSuit = getFirstSuitSet(cardOptions);
      // only interested if this is for our suit
      if (setSuit === suit) {
        result.push(createCard(suit, getFirstNumberSet(cardOptions)));
        needToSortAgain = true;
      }
    }
  });

  if (needToSortAgain) {
    // we added a card to the end, so we need to sort again
    result = sortSuit(result);
  }

  return result;
};

// filter out straights not possible in the given handOptions
export const filterOutImpossibleByNumberStraightsInHandOptions = (allPossibleStraightsUnfiltered, handOptions) => {
  const allPossibleStraights = [];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];
  const cardOptions5 = handOptions[4];
  for (let i = 0; i < allPossibleStraightsUnfiltered.length; i += 1) {
    const possibleStraight = allPossibleStraightsUnfiltered[i];
    if (getNumberOptionsValueInCardOptions(cardOptions1, possibleStraight[0].number)
      && getNumberOptionsValueInCardOptions(cardOptions2, possibleStraight[1].number)
      && getNumberOptionsValueInCardOptions(cardOptions3, possibleStraight[2].number)
      && getNumberOptionsValueInCardOptions(cardOptions4, possibleStraight[3].number)
      && getNumberOptionsValueInCardOptions(cardOptions5, possibleStraight[4].number)) {
      allPossibleStraights.push(possibleStraight);
    }
  }
  return allPossibleStraights;
};

// helper function return true if possibleNumbers includes another number besides n
const anotherNumberIsPossible = (possibleNumbers, n) => {
  // simple approach - convert into a set, remove n, and check set is not empty
  const possibleNumbersSet = new Set(possibleNumbers);
  possibleNumbersSet.delete(n);
  return possibleNumbersSet.size > 0;
};

// helper function return true if given possible suits are all placed and the same suit
const allPossibleSuitsPlacedAndSameSuit = (possibleSuits1, possibleSuits2, possibleSuits3, possibleSuits4, possibleSuits5) => {
  if (possibleSuits1.length !== 1 || possibleSuits2.length !== 1 || possibleSuits3.length !== 1 || possibleSuits4.length !== 1 || possibleSuits5.length !== 1) {
    return false;
  }

  const possibleSuit1 = possibleSuits1[0];
  return (possibleSuit1 === possibleSuits2[0] && possibleSuit1 === possibleSuits3[0] && possibleSuit1 === possibleSuits4[0] && possibleSuit1 === possibleSuits5[0]);
};

// helper function to return true if a straight flush can be made from the possible numbers and suits
// uses similar code to the get-hints-function getNoStraightFlushInNumberHints()
// eslint-disable-next-line max-len
const possibleHandOptionsCanBeStraightFlush = (handOptions, cardsStillAvailable) => {
  // go through all of the first possible suits
  const cardOptions1 = handOptions[0];
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  for (let i = 0; i < possibleSuits1.length; i += 1) {
    const possibleSuit1 = possibleSuits1[i];

    // get all possible straights in this suit - this is an array of each possible straights
    // remembering to add back in any cards already placed in this handOptions
    // and filter out straights whose numbers are not a possible option in the corresponding cards of handOptions
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(possibleSuit1);
    const suitCardsAvailable = addPlacedCardsOfSuitFromHandOptions(
      cardsStillAvailable[suitOptionsIndex],
      possibleSuit1,
      handOptions,
    );
    const allPossibleStraights = filterOutImpossibleByNumberStraightsInHandOptions(getStraights(suitCardsAvailable), handOptions);

    // if there is one or more of these, then we can be a straight flush in this suit
    if (allPossibleStraights.length) {
      return true;
    }
  }

  // couldn't find a straight flush
  return false;
};

// helper function to return true if a four of a kind can be made from the possible handOptions
const possibleHandOptionsCanBeFourOfAKind = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);
  const possibleNumbers3 = getNumbersFromCardOptions(cardOptions3);
  const possibleNumbers4 = getNumbersFromCardOptions(cardOptions4);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);
  const possibleSuits4 = getSuitsFromCardOptions(cardOptions4);

  // first check the suits - four of a kind has to be S H D C
  if (!possibleSuits1.includes(SUIT_SPADES) || !possibleSuits2.includes(SUIT_HEARTS) || !possibleSuits3.includes(SUIT_DIAMONDS) || !possibleSuits4.includes(SUIT_CLUBS)) {
    return false;
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];

    // to be four of a kind, we need this number is be possible in 2, 3 and 4
    if (possibleNumbers2.includes(possibleNumber1)
      && possibleNumbers3.includes(possibleNumber1)
      && possibleNumbers4.includes(possibleNumber1)) {
      return true;
    }
  }

  // can't be four of a kind
  return false;
};

// helper function to return true if a full house can be made from the possible handOptions
const possibleHandOptionsCanBeFullHouse = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];
  const cardOptions5 = handOptions[4];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);
  const possibleNumbers3 = getNumbersFromCardOptions(cardOptions3);
  const possibleNumbers4 = getNumbersFromCardOptions(cardOptions4);
  const possibleNumbers5 = getNumbersFromCardOptions(cardOptions5);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);
  const possibleSuits4 = getSuitsFromCardOptions(cardOptions4);
  const possibleSuits5 = getSuitsFromCardOptions(cardOptions5);

  // first check if the suits of two of the first three cards are placed and the same suit, then this cannot be a three of a kind - as these numbers must be different - so we are not a full house

  // if first suit placed
  if (possibleSuits1.length === 1) {
    const possibleSuit1 = possibleSuits1[0];

    // if second suit placed and the same, we are not three of a kind
    if (possibleSuits2.length === 1 && possibleSuit1 === possibleSuits2[0]) {
      return false;
    }

    // if third suit placed and the same, we are not three of a kind
    if (possibleSuits3.length === 1 && possibleSuit1 === possibleSuits3[0]) {
      return false;
    }
  }

  // if second suit placed
  if (possibleSuits2.length === 1) {
    const possibleSuit2 = possibleSuits2[0];

    // if third suit placed and the same, we are not three of a kind
    if (possibleSuits3.length === 1 && possibleSuit2 === possibleSuits3[0]) {
      return false;
    }
  }

  // then check if the suits of cards four and five are placed and the same suit, then those are not two pair - as these numbers must be different - so we can't be a full house
  if (possibleSuits4.length === 1) {
    const possibleSuit4 = possibleSuits4[0];

    // if fifth suit placed and the same, that cannot be a pair
    if (possibleSuits5.length === 1 && possibleSuit4 === possibleSuits5[0]) {
      return false;
    }
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];

    // to be three of a kind, we need this number is be possible in 2 and 3, and a different number possible in 4
    if (possibleNumbers2.includes(possibleNumber1)
      && possibleNumbers3.includes(possibleNumber1)
      && anotherNumberIsPossible(possibleNumbers4, possibleNumber1)) {
      // now go through all the fourth possible numbers
      for (let j = 0; j < possibleNumbers4.length; j += 1) {
        const possibleNumber4 = possibleNumbers4[j];

        // needs to be a different number than the three of a kind otherwise that is four of a kind
        if (possibleNumber4 !== possibleNumber1) {
          // card 5 needs to allow this 4th number
          if (possibleNumbers5.includes(possibleNumber4)) {
            return true;
          }
        }
      }
    }
  }

  // can't be full house
  return false;
};

// helper function to return true if a flush can be made from the possible handOptions
const possibleHandOptionsCanBeFlush = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];
  const cardOptions5 = handOptions[4];

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);
  const possibleSuits4 = getSuitsFromCardOptions(cardOptions4);
  const possibleSuits5 = getSuitsFromCardOptions(cardOptions5);

  // go through all of the first possible suits
  for (let i = 0; i < possibleSuits1.length; i += 1) {
    const possibleSuit1 = possibleSuits1[i];

    // to be a flush, each of the other possible suits needs to allow the first suit
    if (possibleSuits2.includes(possibleSuit1)
      && possibleSuits3.includes(possibleSuit1)
      && possibleSuits4.includes(possibleSuit1)
      && possibleSuits5.includes(possibleSuit1)) {
      return true;
    }
  }

  // can't be a flush
  return false;
};

// helper function to return true if a straight can be made from the possible handOptions
const possibleHandOptionsCanBeStraight = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];
  const cardOptions5 = handOptions[4];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);
  const possibleNumbers3 = getNumbersFromCardOptions(cardOptions3);
  const possibleNumbers4 = getNumbersFromCardOptions(cardOptions4);
  const possibleNumbers5 = getNumbersFromCardOptions(cardOptions5);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);
  const possibleSuits4 = getSuitsFromCardOptions(cardOptions4);
  const possibleSuits5 = getSuitsFromCardOptions(cardOptions5);

  // first check if all suits are placed and the same, then we are not a straight - we are either a flush or straight flush
  if (allPossibleSuitsPlacedAndSameSuit(possibleSuits1, possibleSuits2, possibleSuits3, possibleSuits4, possibleSuits5)) {
    return false;
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];
    // first check for normal straights, where each number is 1 apart
    if (possibleNumbers2.includes(possibleNumber1 + 1)
      && possibleNumbers3.includes(possibleNumber1 + 2)
      && possibleNumbers4.includes(possibleNumber1 + 3)
      && possibleNumbers5.includes(possibleNumber1 + 4)) {
      return true;
    }

    // check for A K Q J 10
    if (possibleNumber1 === NUMBER_A) {
      if (possibleNumbers2.includes(NUMBER_K)
        && possibleNumbers3.includes(NUMBER_Q)
        && possibleNumbers4.includes(NUMBER_J)
        && possibleNumbers5.includes(NUMBER_10)) {
        return true;
      }
    }

    // check for 5 4 3 2 A
    if (possibleNumber1 === NUMBER_5) {
      if (possibleNumbers2.includes(NUMBER_4)
        && possibleNumbers3.includes(NUMBER_3)
        && possibleNumbers4.includes(NUMBER_2)
        && possibleNumbers5.includes(NUMBER_A)) {
        return true;
      }
    }
  }

  // couldn't find a straight
  return false;
};

// helper function to return true if a three of a kind can be made from the possible handOptions
const possibleHandOptionsCanBeThreeOfAKind = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);
  const possibleNumbers3 = getNumbersFromCardOptions(cardOptions3);
  const possibleNumbers4 = getNumbersFromCardOptions(cardOptions4);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);

  // first check the suits
  // TODO I guess we should really find the actual suits of possible 3 of a kind numbers available??!!
  const possibleSuit1Spade = possibleSuits1.includes(SUIT_SPADES);
  const possibleSuit1Heart = possibleSuits1.includes(SUIT_HEARTS);
  const possibleSuit2Heart = possibleSuits2.includes(SUIT_HEARTS);
  const possibleSuit2Diamond = possibleSuits2.includes(SUIT_DIAMONDS);
  const possibleSuit3Diamond = possibleSuits3.includes(SUIT_DIAMONDS);
  const possibleSuit3Club = possibleSuits3.includes(SUIT_CLUBS);

  // the first three suits must be SHD, SHC or HDC
  const possibleSHD = possibleSuit1Spade && possibleSuit2Heart && possibleSuit3Diamond;
  const possibleSHC = possibleSuit1Spade && possibleSuit2Heart && possibleSuit3Club;
  const possibleHDC = possibleSuit1Heart && possibleSuit2Diamond && possibleSuit3Club;

  if (!possibleSHD && !possibleSHC && !possibleHDC) {
    return false;
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];

    // to be three of a kind, we need this number is be possible in 2 and 3, and a different number possible in 4
    if (possibleNumbers2.includes(possibleNumber1)
      && possibleNumbers3.includes(possibleNumber1)
      && anotherNumberIsPossible(possibleNumbers4, possibleNumber1)) {
      return true;
    }
  }

  // can't be three of a kind
  return false;
};

// helper function to return true if two pair can be made from the possible handOptions
const possibleHandOptionsCanBeTwoPair = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);
  const possibleNumbers3 = getNumbersFromCardOptions(cardOptions3);
  const possibleNumbers4 = getNumbersFromCardOptions(cardOptions4);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);
  const possibleSuits4 = getSuitsFromCardOptions(cardOptions4);

  // first check if the suits of the first two cards are placed and the same suit, then we are not two pair - as these numbers must be different
  if (possibleSuits1.length === 1) {
    const possibleSuit1 = possibleSuits1[0];

    // if second suit placed and the same, we are not two pair
    if (possibleSuits2.length === 1 && possibleSuit1 === possibleSuits2[0]) {
      return false;
    }
  }

  // then check if the suits of cards three and four are placed and the same suit, then we are not two pair - as these numbers must be different
  if (possibleSuits3.length === 1) {
    const possibleSuit3 = possibleSuits3[0];

    // if fourth suit placed and the same, we are not two pair
    if (possibleSuits4.length === 1 && possibleSuit3 === possibleSuits4[0]) {
      return false;
    }
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];

    // to be two pair, this number must be possible the second
    if (possibleNumbers2.includes(possibleNumber1)) {
      // now go through all the third possible numbers
      for (let j = 0; j < possibleNumbers3.length; j += 1) {
        const possibleNumber3 = possibleNumbers3[j];

        // needs to be a different number (otherwise that is three or four of a kind)
        if (possibleNumber3 !== possibleNumber1) {
          // we just care if card 4 allows this third number - no reason to consider possibleNumbers5
          if (possibleNumbers4.includes(possibleNumber3)) {
            return true;
          }
        }
      }
    }
  }

  // can't be two pair
  return false;
};

// helper function to return true if a pair can be made from the possible handOptions
const possibleHandOptionsCanBePair = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);
  const possibleNumbers3 = getNumbersFromCardOptions(cardOptions3);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);

  // first check if the suits of the first two cards are placed and the same suit, then we are not a pair - as these numbers must be different
  if (possibleSuits1.length === 1) {
    const possibleSuit1 = possibleSuits1[0];

    // if second suit placed and the same, we are not a pair
    if (possibleSuits2.length === 1 && possibleSuit1 === possibleSuits2[0]) {
      return false;
    }
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];

    // to be a pair, this number must be possible the second, and we need a different number available for the third
    if (possibleNumbers2.includes(possibleNumber1)
      && anotherNumberIsPossible(possibleNumbers3, possibleNumber1)) {
      return true;
    }
  }

  // can't be a pair
  return false;
};

// helper function to return true if a high card can be made from the possible handOptions
const possibleHandOptionsCanBeHighCard = (handOptions) => {
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];
  const cardOptions5 = handOptions[4];

  // we will be interested in the possible numbers left for each card
  const possibleNumbers1 = getNumbersFromCardOptions(cardOptions1);
  const possibleNumbers2 = getNumbersFromCardOptions(cardOptions2);

  // we will be interested in the possible suits left for each card
  const possibleSuits1 = getSuitsFromCardOptions(cardOptions1);
  const possibleSuits2 = getSuitsFromCardOptions(cardOptions2);
  const possibleSuits3 = getSuitsFromCardOptions(cardOptions3);
  const possibleSuits4 = getSuitsFromCardOptions(cardOptions4);
  const possibleSuits5 = getSuitsFromCardOptions(cardOptions5);

  // first check if all suits are placed and the same, then we are not a high card - we are either a flush or straight flush
  if (allPossibleSuitsPlacedAndSameSuit(possibleSuits1, possibleSuits2, possibleSuits3, possibleSuits4, possibleSuits5)) {
    return false;
  }

  // go through all of the first possible numbers
  for (let i = 0; i < possibleNumbers1.length; i += 1) {
    const possibleNumber1 = possibleNumbers1[i];

    // to be a high card we need a different number available for the second
    if (anotherNumberIsPossible(possibleNumbers2, possibleNumber1)) {
      return true;
    }
  }

  // can't be a high card
  return false;
};

// can the given handOptions be the given hand type based on the given cardsAvailable and cardsStillAvailable
export const canHandOptionsBeHandType = (handOptions, handType, cardsStillAvailable /* , cardsAvailable */) => {
  if (handType === HAND_TYPE_STRAIGHT_FLUSH) {
    return possibleHandOptionsCanBeStraightFlush(handOptions, cardsStillAvailable);
  }

  if (handType === HAND_TYPE_FOUR_OF_A_KIND) {
    return possibleHandOptionsCanBeFourOfAKind(handOptions);
  }

  if (handType === HAND_TYPE_FULL_HOUSE) {
    return possibleHandOptionsCanBeFullHouse(handOptions);
  }

  if (handType === HAND_TYPE_FLUSH) {
    return possibleHandOptionsCanBeFlush(handOptions);
  }

  if (handType === HAND_TYPE_STRAIGHT) {
    return possibleHandOptionsCanBeStraight(handOptions);
  }

  if (handType === HAND_TYPE_THREE_OF_A_KIND) {
    return possibleHandOptionsCanBeThreeOfAKind(handOptions);
  }

  if (handType === HAND_TYPE_TWO_PAIR) {
    return possibleHandOptionsCanBeTwoPair(handOptions);
  }

  if (handType === HAND_TYPE_PAIR) {
    return possibleHandOptionsCanBePair(handOptions);
  }

  if (handType === HAND_TYPE_HIGH_CARD) {
    return possibleHandOptionsCanBeHighCard(handOptions);
  }

  // we should never get here
  console.error(`canHandOptionsBeHandType cannot cope with handType ${handType}`);
  return true;
};
