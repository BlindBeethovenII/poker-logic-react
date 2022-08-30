// useful solution functions

import { createCard, cardsEqual } from './card-functions';

import {
  NUMBERS,
  NUMBERS_SORTED,
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
export const getCardsAvailableInSuitSorted = (suit, solutionHands) => {
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

// count suits available in the given cardOptions
export const countSuitsInCardOptions = (cardOptions) => countTrueBooleansInArray(cardOptions.suitOptions);

// count numbers available in the given cardOptions
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
const isCardPlacedInCardOptions = (card, cardOptions) => {
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

// return the cards still available in solution options from the given card array
const cardsStillAvailableFromArray = (cards, solutionOptions) => {
  const result = [];

  cards.forEach((card) => {
    let cardIsPlaced = false;

    solutionOptions.every((handOptions) => handOptions.every((cardOptions) => {
      if (isCardPlacedInCardOptions(card, cardOptions)) {
        cardIsPlaced = true;
        // stop the loop
        return false;
      }
      // continue the loop
      return true;
    }));

    // if the card is not placed then it is still available
    if (!cardIsPlaced) {
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

// get the value of a specific suit options boolean in the given solution options
export const getSuitOptionsValue = (solutionOptions, solutionOptionsIndex, handOptionsIndex, suitOptionsIndex) =>
  solutionOptions[solutionOptionsIndex][handOptionsIndex].suitOptions[suitOptionsIndex];

// get the value of a specific number options boolean in the given solution options
export const getNumberOptionsValue = (solutionOptions, solutionOptionsIndex, handOptionsIndex, numberOptionsIndex) =>
  solutionOptions[solutionOptionsIndex][handOptionsIndex].numberOptions[numberOptionsIndex];

// get the value of a specific suit options boolean in the given hand options
export const getSuitOptionsValueInHandOptions = (handOptions, handOptionsIndex, suitOptionsIndex) =>
  handOptions[handOptionsIndex].suitOptions[suitOptionsIndex];

// get the value of a specific suit options boolean in the given card options
export const getSuitOptionsValueInCardOptions = (cardOptions, suitOptionsIndex) =>
  cardOptions.suitOptions[suitOptionsIndex];

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
export const cardOptionsIsPlacedCard = (cardOptions) => (countSuitsInCardOptions(cardOptions) === 1 && countNumbersInCardOptions(cardOptions) === 1);

// return the cards that are placed in the given handOptions
const getPlacedCardsInHandOptions = (handOptions) => {
  const result = [];

  handOptions.forEach((cardOptions) => {
    if (cardOptionsIsPlacedCard(cardOptions)) {
      result.push(createCard(getFirstSuitSet(cardOptions), getFirstNumberSet(cardOptions)));
    }
  });

  return result;
};

// return true if the solutionOptions are still valid
// that is, can the solutionHands still be placed in it
// and are the placed cards in the corresponding solutionHand
export const solutionOptionsValid = (solutionOptions, solutionHands) => {
  // first check each placed cards are allowed in the corresponding solutionHand
  for (let solutionHandsIndex = 0; solutionHandsIndex < 4; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    const handOptions = solutionOptions[solutionHandsIndex];

    // get the placed cards in this handOptions
    const placedCards = getPlacedCardsInHandOptions(handOptions);
    for (let i = 0; i < placedCards.length; i += 1) {
      const placedCard = placedCards[i];

      // look for this card
      let found = false;
      for (let j = 0; j < solutionHand.length && !found; j += 1) {
        const solutionHandCard = solutionHand[j];
        if (cardsEqual(placedCard, solutionHandCard)) {
          found = true;
        }
      }

      // did we find it
      if (!found) {
        console.error(`solutionOptionsValid: placed card ${placedCard.id} is not a card in solutionHandsIndex ${solutionHandsIndex}`);
        return false;
      }
    }
  }

  // now check that card of the solutionHand can still be placed somewhere
  for (let solutionHandsIndex = 0; solutionHandsIndex < 4; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    const handOptions = solutionOptions[solutionHandsIndex];

    // work through each card of the solutionHand
    for (let solutionHandIndex = 0; solutionHandIndex < solutionHand.length; solutionHandIndex += 1) {
      const { id, suit, number } = solutionHand[solutionHandIndex];
      const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

      let found = false;

      // look through the handOptions to see if it can still be placed in at least one
      for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length && !found; handOptionsIndex += 1) {
        const { suitOptions, numberOptions } = handOptions[handOptionsIndex];
        if (suitOptions[suitOptionsIndex] && numberOptions[number - 1]) {
          // yes it can be placed here
          found = true;
        }
      }

      // did we find a place for this solutionHand card?
      if (!found) {
        console.error(`solutionOptionsValid: solutionHand card ${id} cannot be placed any where in solutionOptionsIndex ${solutionHandsIndex}`);
        return false;
      }
    }
  }

  // now check that each handOption allows at least one of the solutionHand cards in it
  for (let solutionHandsIndex = 0; solutionHandsIndex < 4; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    const handOptions = solutionOptions[solutionHandsIndex];

    for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length; handOptionsIndex += 1) {
      const { suitOptions, numberOptions } = handOptions[handOptionsIndex];

      let found = false;

      for (let solutionHandIndex = 0; solutionHandIndex < solutionHand.length && !found; solutionHandIndex += 1) {
        const { suit, number } = solutionHand[solutionHandIndex];
        const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
        if (suitOptions[suitOptionsIndex] && numberOptions[number - 1]) {
          // yes it can be placed here
          found = true;
        }
      }

      // did we find a solutionHand card that can fit in here?
      if (!found) {
        console.error(`solutionOptionsValid: solutionOptionsIndex ${solutionHandsIndex} handOptionsIndex ${handOptionsIndex} does not allow any of the solutionHand cards`);
        return false;
      }
    }
  }

  // TODO - Is there another case to worry about - I can't find a good example and I'm half sure the above checks cover that case???

  // everything is okay
  return true;
};
