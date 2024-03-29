// ****************************** //
// getHints and support functions //
// ****************************** //

import {
  getNumbersNotUsedInSolution,
  convertSuitToSuitOptionsIndex,
  getCardsStillAvailable,
  getSuitOptionsValue,
  countSuitTrueInSolutionOptions,
  countNumberTrueInSolutionOptions,
  countSuitsInCardOptions,
  countNumbersInCardOptions,
  getSuitOptionsValueInCardOptions,
  getNumberOptionsValueInCardOptions,
  countNumberAvailable,
  countSuitAvailable,
  getFirstSuitSet,
  getFirstNumberSet,
  isCardOptionsAPlacedCard,
  solutionOptionsValid,
  isNumberTrueInCardOptions,
  isNumberPlacedInCardOptions,
  isSuitPlacedInCardOptions,
  isNumberPlaced,
  countSuitPlacedInSolutionOptions,
  countSuitPlacedInSolutionOptionsWithoutNumberPlaced,
  countNumberPlacedInSolutionOptions,
  countNumberPlacedInSolutionOptionsWithoutSuitPlaced,
  getSuitsOfNumberInAvailable,
  getNumbersOfSuitInAvailable,
  getNumbersFromCardOptions,
  getSuitsFromCardOptions,
  allItemsFromFirstInSecond,
  isAnotherSuitSetInCardOptions,
  isAnotherNumberSetInCardOptions,
  canPairOfSuitsOfNumberFitIn,
  canThreeOfSuitsOfNumberFitIn,
  getSuitsOfNumberAvailableForGivenCardsOfHand,
  countWhichOfSuitsPossibleInCardOptions,
  countWhichOfNumbersPossibleInCardOptions,
  getMaxNumberInCardOptions,
  getMinNumberInCardOptions,
  suitPossibleInAllHandOptions,
  addPlacedCardsOfSuitFromHandOptions,
  filterOutImpossibleByNumberStraightsInHandOptions,
  isCardPlacedInCardOptions,
} from './solution-functions';

import {
  sortedSuitCardsContainStraight,
  createCard,
  cardNumberGE,
  cardNumberLE,
  subtractNFromCardNumber,
  addNToCardNumber,
  getStraights,
} from './card-functions';

import { addInDeducedCluesFromSolutionOptions } from './get-deduced-clues-functions';

import {
  NUMBERS,
  NUMBERS_SORTED,
  SUITS,
  SUIT_SPADES,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  INDEX_SUIT_SPADES,
  INDEX_SUIT_HEARTS,
  INDEX_SUIT_DIAMONDS,
  INDEX_SUIT_CLUBS,
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
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_PAIR,
  HAND_TYPE_TWO_PAIR,
  HINT_NUMBER_NOT_USED,
  HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
  HINT_NO_STRAIGHT_FLUSH_IN_NUMBER,
  HINT_SAME_COUNT_LEFT_SUIT,
  HINT_SAME_COUNT_LEFT_NUMBER,
  HINT_FOUR_OF_A_KIND_NUMBERS,
  HINT_FOUR_OF_A_KIND_SUIT,
  HINT_PLACED_CARD_REMOVE_SUIT,
  HINT_PLACED_CARD_REMOVE_NUMBER,
  HINT_NUMBER_USED_UP,
  HINT_ALL_OF_SUIT_PLACED,
  HINT_ALL_OF_SUIT_PLACED_NUMBERS,
  HINT_ALL_OF_NUMBER_PLACED,
  HINT_ALL_OF_NUMBER_PLACED_SUITS,
  HINT_THREE_OF_A_KIND_NUMBERS,
  HINT_THREE_OF_A_KIND_SUITS,
  HINT_PAIR_NUMBERS,
  HINT_PAIR_SUITS,
  HINT_CLUE_SUIT_AND_NUMBER,
  HINT_CLUE_SUIT,
  HINT_CLUE_NOT_SUIT,
  HINT_CLUE_NUMBER,
  HINT_CLUE_NOT_NUMBER,
  HINT_CLUE_CARDS_SAME_NUMBER,
  HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE,
  HINT_CLUE_CARDS_NOT_SAME_NUMBER,
  HINT_CLUE_CARDS_SAME_SUIT,
  HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE,
  HINT_CLUE_CARDS_NOT_SAME_SUIT,
  HINT_CLUE_RED_SUIT,
  HINT_CLUE_BLACK_SUIT,
  HINT_CLUE_CARD_EVEN,
  HINT_CLUE_CARD_ODD,
  HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT,
  HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT,
  HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT,
  HINT_PAIR_NUMBERS_ALL_SAME_SUIT,
  HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL,
  HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL,
  HINT_ALL_SUITS_OF_NUMBER_NOT_POSSIBLE,
  HINT_ALL_NUMBERS_OF_SUIT_NOT_POSSIBLE,
  HAND_TYPE_FLUSH,
  HINT_FLUSH_SUIT,
  HINT_SORT_RULE_NUMBERS,
  HAND_TYPE_HIGH_CARD,
  HINT_FLUSH_POSSIBLE_SUITS,
  HINT_STRAIGHT_NUMBER_KNOWN,
  HAND_TYPE_STRAIGHT,
  NUMBER_K,
  NUMBER_A,
  HINT_NO_STRAIGHT_IN_NUMBER,
  HINT_ALL_SUIT_PLACED_ONLY_PLACE_FOR_NUMBER,
  NUMBER_3,
  NUMBER_5,
  NUMBER_7,
  NUMBER_9,
  NUMBER_J,
  NUMBER_2,
  NUMBER_4,
  NUMBER_6,
  NUMBER_8,
  NUMBER_10,
  NUMBER_Q,
  NUMBER_NONE,
  CARD_1,
  CARD_2,
  CARD_3,
  CARD_4,
  CARD_5,
} from './constants';

// import logIfDevEnv from './logIfDevEnv';

// -------------------- //
// HINT_NUMBER_NOT_USED //
// -------------------- //

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
  const hints = [];

  // each card options that still has this number results in a hint to remove it
  numbersNotUsed.forEach((number) => {
    solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
      handOptions.forEach((cardOptions, handOptionsIndex) => {
        if (isNumberTrueInCardOptions(number, cardOptions)) {
          hints.push(createHintNumberNotUsed(number, solutionOptionsIndex, handOptionsIndex));
        }
      });
    });
  });

  return hints;
};

// -------------------------- //
// HINT_STRAIGHT_NUMBER_KNOWN //
// -------------------------- //

// create HINT_STRAIGHT_NUMBER_KNOWN
export const createHintStraightNumberKnown = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_STRAIGHT_NUMBER_KNOWN,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// get the hints when a number in a straight can be set because another number in the straight is known
export const getStraightNumberKnownHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // helper function to cope with AKQJ10
  const getNumberFromNumberSetAndOffsets = (numberSet, i, j) => {
    const result = numberSet + i - j;
    if (result > NUMBER_K) {
      // this must be the setting of the A, based on numberSet of K, Q, J or 10
      return NUMBER_A;
    }

    if (numberSet === NUMBER_A && i !== 4) {
      // we need a different formula to set the K, Q, J or 10 for A, K, Q, J, 10 - this does not apply to 5,4,3,2,A
      return 14 - j;
    }

    // otherwise straight formula
    return result;
  };

  // look at each cardOptions in this hand
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];
    if (countNumbersInCardOptions(cardOptions) === 1) {
      // a number is set here, so raise hints to set other numbers
      const numberSet = getFirstNumberSet(cardOptions);

      // all cards before this, can't have been set, so we need a hint to set their number
      for (let j = 0; j < i; j += 1) {
        hints.push(createHintStraightNumberKnown(getNumberFromNumberSetAndOffsets(numberSet, i, j), solutionHandsIndex, j, clue));
      }

      // all cards after, we need to check and only create a clue if they don't have their number set yet
      for (let j = i + 1; j < handOptions.length; j += 1) {
        const cardOptions2 = handOptions[j];
        if (countNumbersInCardOptions(cardOptions2) > 1) {
          hints.push(createHintStraightNumberKnown(getNumberFromNumberSetAndOffsets(numberSet, i, j), solutionHandsIndex, j, clue));
        }
      }

      // return any hints found - if none found, then all numbers of straight are set correctly
      return hints;
    }
  }

  // didn't find a set number
  return [];
};

// ------------------------------ //
// HINT_NO_STRAIGHT_FLUSH_IN_SUIT //
// ------------------------------ //

// create HINT_NO_STRAIGHT_FLUSH_IN_SUIT
export const createHintNoStraightFlushInSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// get the hints to remove a suit for which a straight flush is not possible
export const getNoStraightFlushInSuitHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same as the index used in cards still available, to find the suits still available cards
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    // get the cards available for this suit - adding back in any already placed in this handOptions
    const suitCardsAvailable = addPlacedCardsOfSuitFromHandOptions(cardsStillAvailable[suitOptionsIndex], suit, handOptions);

    if (!sortedSuitCardsContainStraight(suitCardsAvailable)) {
      // the available cards for this suit cannot make a straight, so generate hints to remove this suit from the card options for all these hand options
      // BUT only if that is still a card suit option
      // the solutionOptionsIndex is the same as the solutionHandsIndex here
      if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, 0, suitOptionsIndex)) {
        hints.push(createHintNoStraightFlushInSuit(suit, solutionHandsIndex, 0, clue));
      }
      if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, 1, suitOptionsIndex)) {
        hints.push(createHintNoStraightFlushInSuit(suit, solutionHandsIndex, 1, clue));
      }
      if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, 2, suitOptionsIndex)) {
        hints.push(createHintNoStraightFlushInSuit(suit, solutionHandsIndex, 2, clue));
      }
      if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, 3, suitOptionsIndex)) {
        hints.push(createHintNoStraightFlushInSuit(suit, solutionHandsIndex, 3, clue));
      }
      if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, 4, suitOptionsIndex)) {
        hints.push(createHintNoStraightFlushInSuit(suit, solutionHandsIndex, 4, clue));
      }
    }
  });

  return hints;
};

// -------------------------------- //
// HINT_NO_STRAIGHT_FLUSH_IN_NUMBER //
// -------------------------------- //

// create HINT_NO_STRAIGHT_FLUSH_IN_NUMBER
export const createHintNoStraightFlushInNumber = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_NO_STRAIGHT_FLUSH_IN_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// get the hints to remove a number for which a straight flush is not possible
export const getNoStraightFlushInNumberHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // first a quick check, if any numbers already set, then we will never generate a clue to remove a number as HINT_STRAIGHT_NUMBER_KNOWN will have done that
  let numberSet = false;
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];
    if (countNumbersInCardOptions(cardOptions) === 1) {
      // logIfDevEnv('getNoStraightFlushInNumberHints does not need to do anything as it found a number set');
      numberSet = true;
    }
  }
  if (numberSet) {
    return [];
  }

  // first consider the case where the suit is known
  let suit;
  for (let i = 0; i < handOptions.length && !suit; i += 1) {
    const cardOptions = handOptions[i];
    if (countSuitsInCardOptions(cardOptions) === 1) {
      suit = getFirstSuitSet(cardOptions);
    }
  }

  if (suit) {
    // this is the suit of the flush - now look for straights in that suit

    // convert suit name to suit options index which is the same as the index used in cards still available, to find the suits still available cards
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    // get the cards available for this suit - adding back in any already placed in this handOptions
    const suitCardsAvailable = addPlacedCardsOfSuitFromHandOptions(
      cardsStillAvailable[suitOptionsIndex],
      suit,
      handOptions,
    );

    // get all possible straights - this is an array of each possible straights
    // and filter out straights whose numbers are not a possible option in the corresponding cards of handOptions
    const allPossibleStraights = filterOutImpossibleByNumberStraightsInHandOptions(getStraights(suitCardsAvailable), handOptions);

    // convert these into the possible numbers for each hand
    const possibleNumbersByHand = [];
    [0, 1, 2, 3, 4].forEach((handOptionsIndex) => {
      const possibleNumbersAtHand = [];
      for (let i = 0; i < allPossibleStraights.length; i += 1) {
        const possibleStraight = allPossibleStraights[i];
        possibleNumbersAtHand.push(possibleStraight[handOptionsIndex].number);
      }
      possibleNumbersByHand.push(possibleNumbersAtHand);
    });

    // go through each cardOptions of this hand
    for (let i = 0; i < handOptions.length; i += 1) {
      const cardOptions = handOptions[i];

      // look at each of the still possible numbers for this card
      const currentPossibleNumbers = getNumbersFromCardOptions(cardOptions);

      // any number not in possibleNumbersByHand for this hand can be removed by the HINT_NO_STRAIGHT_FLUSH_IN_NUMBER hint
      const possibleNumbersForThisHand = possibleNumbersByHand[i];

      currentPossibleNumbers.forEach((number) => {
        if (!possibleNumbersForThisHand.includes(number)) {
          hints.push(createHintNoStraightFlushInNumber(number, solutionHandsIndex, i, clue));
        }
      });
    }

    return hints;
  }

  // This following could just about be combined with the above - but I keep it separate to make it clearer what is going on in the two cases

  // it is not the case that a suit is set - so go through each suit, to gather its possible straights, and combine together to see if any numbers are not possible so can be removed by the hint
  const possibleNumbersByHand = [[], [], [], [], []];
  SUITS.forEach((suit1) => {
    // convert suit name to suit options index which is the same as the index used in cards still available, to find the suits still available cards
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit1);

    // get the cards available for this suit - we don't need to add any back, as none will have been placed in this handOptions - otherwise this would be the suit set case
    const suitCardsAvailable = cardsStillAvailable[suitOptionsIndex];

    // get all possible straights - this is an array of each possible straights
    // and filter out straights whose numbers are not a possible option in the corresponding cards of handOptions
    const allPossibleStraights = filterOutImpossibleByNumberStraightsInHandOptions(getStraights(suitCardsAvailable), handOptions);

    // add each number to the corresponding possibleNumbersByHand, if not already there
    [0, 1, 2, 3, 4].forEach((handOptionsIndex) => {
      const possibleNumbersAtHand = possibleNumbersByHand[handOptionsIndex];
      for (let i = 0; i < allPossibleStraights.length; i += 1) {
        const possibleStraight = allPossibleStraights[i];
        const { number } = possibleStraight[handOptionsIndex];
        if (!possibleNumbersAtHand.includes(number)) {
          possibleNumbersAtHand.push(number);
        }
      }
    });
  });

  // go through each cardOptions of this hand
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];

    // look at each of the still possible numbers for this card
    const currentPossibleNumbers = getNumbersFromCardOptions(cardOptions);

    // any number not in possibleNumbersByHand for this hand can be removed by the HINT_NO_STRAIGHT_FLUSH_IN_NUMBER hint
    const possibleNumbersForThisHand = possibleNumbersByHand[i];

    currentPossibleNumbers.forEach((number) => {
      if (!possibleNumbersForThisHand.includes(number)) {
        hints.push(createHintNoStraightFlushInNumber(number, solutionHandsIndex, i, clue));
      }
    });
  }

  return hints;
};

// -------------------------- //
// HINT_NO_STRAIGHT_IN_NUMBER //
// -------------------------- //

// create HINT_NO_STRAIGHT_IN_NUMBER
export const createHintNoStraightInNumber = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_NO_STRAIGHT_IN_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// get hints to remove a number for which a straight is not possible
export const getNoStraightInNumberHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // first a quick check, if any numbers already set, then we will never generate a clue to remove a number as HINT_STRAIGHT_NUMBER_KNOWN will have done that
  let numberSet = false;
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];
    if (countNumbersInCardOptions(cardOptions) === 1) {
      // logIfDevEnv('getNoStraightInNumberHints does not need to do anything as it found a number set');
      numberSet = true;
    }
  }
  if (numberSet) {
    return [];
  }

  // creating cardsAvailable in spades but for the numbers that are available across all suits - so I can use getStraights() and same approach as for straight flush above
  // not starting with cardsStillAvailable as we are just interested in numbers and card's number can be placed without its suit being placed
  // and if given cardsStillAvailable we'd still have to hunt these down - so just as easy to work with cardsAvailable
  const cardsOfNumbersAvailableForStraight = [];
  NUMBERS_SORTED.forEach((number) => {
    // how many of this number are in cards available
    const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

    // how many cards in solutionOptions have this number placed
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    // so we need at least 1 available after numberPlacedCount has been removed, for this number to be available for a straight
    if (numberAvailableCount - numberPlacedCount >= 1) {
      cardsOfNumbersAvailableForStraight.push(createCard(SUIT_SPADES, number));
    }
  });

  // get all possible straights - this is an array of each possible straights - remember the cards are in spades, but we only care about the number - the suit is irrelevant
  // and filter out straights whose numbers are not a possible option in the corresponding cards of handOptions
  const allPossibleStraights = filterOutImpossibleByNumberStraightsInHandOptions(getStraights(cardsOfNumbersAvailableForStraight), handOptions);

  // convert these into the possible numbers for each hand
  const possibleNumbersByHand = [];
  [0, 1, 2, 3, 4].forEach((handOptionsIndex) => {
    const possibleNumbersAtHand = [];
    for (let i = 0; i < allPossibleStraights.length; i += 1) {
      const possibleStraight = allPossibleStraights[i];
      possibleNumbersAtHand.push(possibleStraight[handOptionsIndex].number);
    }
    possibleNumbersByHand.push(possibleNumbersAtHand);
  });

  // go through each cardOptions of this hand
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];

    // look at each of the still possible numbers for this card
    const currentPossibleNumbers = getNumbersFromCardOptions(cardOptions);

    // any number not in possibleNumbersByHand for this hand can be removed by the HINT_NO_STRAIGHT_FLUSH_IN_NUMBER hint
    const possibleNumbersForThisHand = possibleNumbersByHand[i];

    currentPossibleNumbers.forEach((number) => {
      if (!possibleNumbersForThisHand.includes(number)) {
        hints.push(createHintNoStraightInNumber(number, solutionHandsIndex, i, clue));
      }
    });
  }

  return hints;
};

// ------------------------- //
// HINT_SAME_COUNT_LEFT_SUIT //
// ------------------------- //

// create HINT_SAME_COUNT_LEFT_SUIT
export const createHintSameCountLeftSuit = (suit, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_SAME_COUNT_LEFT_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if there are n cards of a suit in cardsAvailable and also only n cardsOptions in solutionOptions with that suit is available and not placed
// then all those cards must be that suit
export const getSameCountLeftSuitHints = (cardsAvailable, solutionOptions) => {
  const hints = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same index into cards available
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    // easy to count - just the length
    const suitCardsAvailableCount = cardsAvailable[suitOptionsIndex].length;

    // how many cards in solutionOptions still allow this suit
    const countSuitTrue = countSuitTrueInSolutionOptions(solutionOptions, suitOptionsIndex);

    if (suitCardsAvailableCount === countSuitTrue) {
      // all the solution options that have this suit as true, and another suit as true, can now be set to true only for this suit
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex) && countSuitsInCardOptions(cardOptions) > 1) {
            hints.push(createHintSameCountLeftSuit(suit, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// --------------------------- //
// HINT_SAME_COUNT_LEFT_NUMBER //
// --------------------------- //

// create HINT_SAME_COUNT_LEFT_SUIT
export const createHintSameCountLeftNumber = (number, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_SAME_COUNT_LEFT_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if there are n cards of a number in cardsAvailable and also only n cardsOptions in solutionOptions with that number is available and not placed
// then all those cards must be that number
export const getSameCountLeftNumberHints = (cardsAvailable, solutionOptions) => {
  const hints = [];

  NUMBERS.forEach((number) => {
    // how many of this number are in cards available
    const numberCardsAvailableCount = countNumberAvailable(number, cardsAvailable);

    // how many cards in solutionOptions still allow this number
    const countNumberTrue = countNumberTrueInSolutionOptions(solutionOptions, number);

    if (numberCardsAvailableCount === countNumberTrue) {
      // all the solution options that have this number as true, and another number as true, can now be set to true only for this number
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (getNumberOptionsValueInCardOptions(cardOptions, number) && countNumbersInCardOptions(cardOptions) > 1) {
            hints.push(createHintSameCountLeftNumber(number, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// ------------------------ //
// HINT_FOUR_OF_A_KIND_SUIT //
// ------------------------ //

// create HINT_FOUR_OF_A_KIND_SUIT
export const createHintFourOfAKindSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FOUR_OF_A_KIND_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// we know the suits for 4 of a kind are S H D C in order, create a hint if a corresponding card allows another suit
export const getFourOfAKindSuitHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];

  // Note: the following assumes that solutionOptions is valid - if cardOptions suitOptions true bool count was 1, then it must be the suit in question

  // if first card has more than one suit available then create hint to set to S
  if (countSuitsInCardOptions(cardOptions1) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_SPADES, solutionHandsIndex, 0, clue));
  }

  // if second card has more than one suit available then create hint to set to H
  if (countSuitsInCardOptions(cardOptions2) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_HEARTS, solutionHandsIndex, 1, clue));
  }

  // if first card has more than one suit available then create hint to set to D
  if (countSuitsInCardOptions(cardOptions3) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_DIAMONDS, solutionHandsIndex, 2, clue));
  }

  // if first card has more than one suit available then create hint to set to C
  if (countSuitsInCardOptions(cardOptions4) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_CLUBS, solutionHandsIndex, 3, clue));
  }

  return hints;
};

// --------------------------- //
// HINT_FOUR_OF_A_KIND_NUMBERS //
// --------------------------- //

// create HINT_FOUR_OF_A_KIND_NUMBERS
export const createHintFourOfAKindNumbers = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FOUR_OF_A_KIND_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 4 cards of a number in cardsStillAvailable or already placed then we can create a hint
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getFourOfAKindNumbersHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const cardOptions4 = handOptions[3];
  const countNumbers1 = countNumbersInCardOptions(cardOptions1);
  const countNumbers2 = countNumbersInCardOptions(cardOptions2);
  const countNumbers3 = countNumbersInCardOptions(cardOptions3);
  const countNumbers4 = countNumbersInCardOptions(cardOptions4);

  // because we are working from a valid solution
  // if one of the first 4 cards has a single number set then that must be the number for the other cards in the first 4 positions
  if (countNumbers1 === 1) {
    // first card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions1));
  } else if (countNumbers2 === 1) {
    // second card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions2));
  } else if (countNumbers3 === 1) {
    // third card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions3));
  } else if (countNumbers4 === 1) {
    // fourth card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions4));
  }

  // if we didn't find one that way, then look for the numbers with 4 cards still available
  if (!numbersAvailable.length) {
    NUMBERS.forEach((number) => {
      // count the number of cards of this number still available
      const count = countNumberAvailable(number, cardsStillAvailable);

      // we've dealt with a number is set in the first 4 cards - so we don't have to add that to the count here now

      // this number has 4 available, so it is part of the hint
      if (count === 4) {
        // need to check this number isn't placed anywhere yet - a placed number doesn't remove a corresponding card from cardsStillAvailable
        if (!isNumberPlaced(number, solutionOptions)) {
          numbersAvailable.push(number);
        }
      }
    });
  }

  // if we have at least one number which has 4 cards available, then we can create a hint - one for each of the first 4 cards of this solutionHandsIndex
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  // work through the first four cards in this handOptions
  [0, 1, 2, 3].forEach((handOptionsIndex) => {
    // if any of the numbers still available in this cardOptions is not in numbersAvailable then we need a clue
    const cardOptionsNumbers = getNumbersFromCardOptions(handOptions[handOptionsIndex]);
    if (!allItemsFromFirstInSecond(cardOptionsNumbers, numbersAvailable)) {
      hints.push(createHintFourOfAKindNumbers(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ---------------------------- //
// HINT_PLACED_CARD_REMOVE_SUIT //
// ---------------------------- //

// create HINT_PLACED_CARD_REMOVE_SUIT
export const createHintPlacedCardRemoveSuit = (suit, solutionOptionsIndex, handOptionsIndex, placedCard) => ({
  hintType: HINT_PLACED_CARD_REMOVE_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  placedCard,
});

// if an available card has been placed, e.g. 6D, then if its number, e.g. 6, has been placed elsewhere than that cannot be the suit, e.g. D
export const getPlacedCardRemoveSuitHints = (solutionOptions) => {
  const hints = [];

  // look through all the cardOptions to find a placed card
  solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
    handOptions.forEach((cardOptions, handOptionsIndex) => {
      if (isCardOptionsAPlacedCard(cardOptions)) {
        // this cardOptions is a placed card
        // form the placed card for the hint
        const suit = getFirstSuitSet(cardOptions);
        const number = getFirstNumberSet(cardOptions);
        const placedCard = createCard(suit, number);
        const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

        // go through all the card options again, looking for any that have the number placed and the suit still available
        // Note: this relies on a valid solution options - that is, this number cannot be already be placed in two different places
        solutionOptions.forEach((handOptions2, solutionOptionsIndex2) => {
          handOptions2.forEach((cardOptions2, handOptionsIndex2) => {
            // remember to ignore ours
            if (solutionOptionsIndex !== solutionOptionsIndex2 || handOptionsIndex !== handOptionsIndex2) {
              // if this number is placed here
              if (isNumberPlacedInCardOptions(number, cardOptions2)) {
                // if the suit still available
                if (getSuitOptionsValueInCardOptions(cardOptions2, suitOptionsIndex)) {
                  // we can form the hint for this
                  hints.push(createHintPlacedCardRemoveSuit(suit, solutionOptionsIndex2, handOptionsIndex2, placedCard));
                }
              }
            }
          });
        });
      }
    });
  });

  return hints;
};

// ------------------------------ //
// HINT_PLACED_CARD_REMOVE_NUMBER //
// ------------------------------ //

// create HINT_PLACED_CARD_REMOVE_NUMBER
export const createHintPlacedCardRemoveNumber = (number, solutionOptionsIndex, handOptionsIndex, placedCard) => ({
  hintType: HINT_PLACED_CARD_REMOVE_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  placedCard,
});

// if an available card has been placed, e.g. 6D, then if its suit, e.g. D, has been placed elsewhere than that cannot be the number, e.g. 6
export const getPlacedCardRemoveNumberHints = (solutionOptions) => {
  const hints = [];

  // look through all the cardOptions to find a placed card
  solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
    handOptions.forEach((cardOptions, handOptionsIndex) => {
      if (isCardOptionsAPlacedCard(cardOptions)) {
        // this cardOptions is a placed card
        // form the placed card for the hint
        const suit = getFirstSuitSet(cardOptions);
        const number = getFirstNumberSet(cardOptions);
        const placedCard = createCard(suit, number);

        // go through all the card options again, looking for any that have the suit placed and the number still available
        // Note: this relies on a valid solution options - that is, this number cannot be already be placed in two different places
        solutionOptions.forEach((handOptions2, solutionOptionsIndex2) => {
          handOptions2.forEach((cardOptions2, handOptionsIndex2) => {
            // remember to ignore ours
            if (solutionOptionsIndex !== solutionOptionsIndex2 || handOptionsIndex !== handOptionsIndex2) {
              // if this suit is placed here
              if (isSuitPlacedInCardOptions(suit, cardOptions2)) {
                // if the number still available
                if (getNumberOptionsValueInCardOptions(cardOptions2, number)) {
                  // we can form the hint for this
                  hints.push(createHintPlacedCardRemoveNumber(number, solutionOptionsIndex2, handOptionsIndex2, placedCard));
                }
              }
            }
          });
        });
      }
    });
  });

  return hints;
};

// ------------------- //
// HINT_NUMBER_USED_UP //
// ------------------- //

// create HINT_NUMBER_USED_UP
export const createHintNumberUsedUp = (number, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_NUMBER_USED_UP,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// look to see if a number is now used up
export const getNumberUsedUpHints = (cardsStillAvailable, cardsAvailable, solutionOptions) => {
  const hints = [];

  // consider each number
  NUMBERS.forEach((number) => {
    // we are interested if this number is in cardsAvailable but no longer in cardsStillAvailable
    if (countNumberAvailable(number, cardsAvailable) > 0 && countNumberAvailable(number, cardsStillAvailable) === 0) {
      // add a hint for each place this number is still available and not the placed number (as that was in the count)
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (isNumberTrueInCardOptions(number, cardOptions) && !isNumberPlacedInCardOptions(number, cardOptions)) {
            hints.push(createHintNumberUsedUp(number, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// ----------------------- //
// HINT_ALL_OF_SUIT_PLACED //
// ----------------------- //

// create HINT_ALL_OF_SUIT_PLACED
export const createHintAllOfSuitPlaced = (suit, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_ALL_OF_SUIT_PLACED,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if n cards available for a suit, and solutionOptions has placed n of that suit, then can remove all other instances of that suit from solutionOptions
export const getAllOfSuitPlacedHints = (cardsAvailable, solutionOptions) => {
  const hints = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same index into cards available
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    // easy to count - just the length
    const suitCardsAvailableCount = cardsAvailable[suitOptionsIndex].length;

    // how many cards in solutionOptions have this suit placed
    const suitPlacedCount = countSuitPlacedInSolutionOptions(suit, solutionOptions);

    if (suitCardsAvailableCount === suitPlacedCount) {
      // create a hint for each cardOptions that has this suit as true, but not as the placed suit
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex) && !isSuitPlacedInCardOptions(suit, cardOptions)) {
            hints.push(createHintAllOfSuitPlaced(suit, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// ------------------------------- //
// HINT_ALL_OF_SUIT_PLACED_NUMBERS //
// ------------------------------- //

// create HINT_ALL_OF_SUIT_PLACED_NUMBERS
export const createHintAllOfSuitPlacedNumbers = (suit, numbers, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_ALL_OF_SUIT_PLACED_NUMBERS,
  suit,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if n cards available for a suit, and solutionOptions has placed n of that suit without the number placed, then can restrict those cards to the numbers of the still available for that suit
export const getAllOfSuitPlacedNumbersHints = (cardsStillAvailable, solutionOptions) => {
  const hints = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same index into cards available
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    // easy to count - just the length
    const suitCardsStillAvailableCount = cardsStillAvailable[suitOptionsIndex].length;

    // how many cards in solutionOptions have this suit placed but for which the number is not yet placed
    const suitPlacedCountWithoutNumber = countSuitPlacedInSolutionOptionsWithoutNumberPlaced(suit, solutionOptions);

    if (suitCardsStillAvailableCount === suitPlacedCountWithoutNumber) {
      // we need to know the numbers still available for this suit
      const numbers = getNumbersOfSuitInAvailable(suit, cardsStillAvailable);

      // create a hint for each cardOptions that has this suit placed but for which the number is not yet placed, and for which it has a number not in numbers (i.e. one to remove)
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (isSuitPlacedInCardOptions(suit, cardOptions) && countNumbersInCardOptions(cardOptions) > 1 && isAnotherNumberSetInCardOptions(cardOptions, numbers)) {
            hints.push(createHintAllOfSuitPlacedNumbers(suit, numbers, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// ------------------------- //
// HINT_ALL_OF_NUMBER_PLACED //
// ------------------------- //

// create HINT_ALL_OF_NUMBER_PLACED
export const createHintAllOfNumberPlaced = (number, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_ALL_OF_NUMBER_PLACED,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if n cards available for a number, and solutionOptions has placed n of that number, then can remove all other instances of that number from solutionOptions
export const getAllOfNumberPlacedHints = (cardsAvailable, solutionOptions) => {
  const hints = [];

  NUMBERS.forEach((number) => {
    // count how many of this number are in cardsAvailable
    const numberCardsAvailableCount = countNumberAvailable(number, cardsAvailable);

    // how many cards in solutionOptions have this number placed
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    if (numberCardsAvailableCount === numberPlacedCount) {
      // create a hint for each cardOptions that has this number as true, but not as the placed number
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (getNumberOptionsValueInCardOptions(cardOptions, number) && !isNumberPlacedInCardOptions(number, cardOptions)) {
            hints.push(createHintAllOfNumberPlaced(number, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// ------------------------------- //
// HINT_ALL_OF_NUMBER_PLACED_SUITS //
// ------------------------------- //

// create HINT_ALL_OF_NUMBER_PLACED_SUITS
export const createHintAllOfNumberPlacedSuits = (number, suits, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_ALL_OF_NUMBER_PLACED_SUITS,
  number,
  suits,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if n cards still available for a number, and solutionOptions has placed n cards of that number without the suit placed, then can restrict those cards to the suits of the still available for that number
export const getAllOfNumberPlacedSuitsHints = (cardsStillAvailable, solutionOptions) => {
  const hints = [];

  NUMBERS.forEach((number) => {
    // count how many of this number are in cardsStillAvailable
    const numberCardsStillAvailableCount = countNumberAvailable(number, cardsStillAvailable);

    // how many cards in solutionOptions have this number placed but for which the suit is not yet placed
    const numberPlacedCountWithoutSuit = countNumberPlacedInSolutionOptionsWithoutSuitPlaced(number, solutionOptions);

    if (numberCardsStillAvailableCount === numberPlacedCountWithoutSuit) {
      // we need to know the suits still available for this number
      const suits = getSuitsOfNumberInAvailable(number, cardsStillAvailable);

      // create a hint for each cardOptions that has this number as placed but for which the suit is not yet placed, and for which it has a suit not in suits (i.e. one to remove)
      solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
        handOptions.forEach((cardOptions, handOptionsIndex) => {
          if (isNumberPlacedInCardOptions(number, cardOptions) && countSuitsInCardOptions(cardOptions) > 1 && isAnotherSuitSetInCardOptions(cardOptions, suits)) {
            hints.push(createHintAllOfNumberPlacedSuits(number, suits, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

  return hints;
};

// ---------------------------- //
// HINT_THREE_OF_A_KIND_NUMBERS //
// --------------------------- //

// create HINT_THREE_OF_A_KIND_NUMBERS
export const createHintThreeOfAKindNumbers = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_THREE_OF_A_KIND_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 3 cards of a number in cardsAvailable for which the number hasn't been placed elsewhere then we can create a hint for the first 3 hands
// note this applies to the 3 of a kind in a full house as well
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getThreeOfAKindNumbersHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const countNumbers1 = countNumbersInCardOptions(cardOptions1);
  const countNumbers2 = countNumbersInCardOptions(cardOptions2);
  const countNumbers3 = countNumbersInCardOptions(cardOptions3);

  // because we are working from a valid solution
  // if one of the first 3 cards has a single number set, then it must be the number for the other cards in the first 3 positions
  if (countNumbers1 === 1) {
    // first card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions1));
  } else if (countNumbers2 === 1) {
    // second card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions2));
  } else if (countNumbers3 === 1) {
    // third card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions3));
  }

  // if we didn't find one that way, then look for the numbers with at least 3 cards still available
  if (!numbersAvailable.length) {
    NUMBERS.forEach((number) => {
      // count the number of cards of this number available in the solution
      const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

      // and count how many of these have been placed
      // note: numberPlacedCount will not include any in the first three positions of this hand, as the above will have found those
      const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

      // so if we need at least 3 available after numberPlacedCount has been removed
      if (numberAvailableCount - numberPlacedCount >= 3) {
        numbersAvailable.push(number);
      }
    });
  }

  // if we have at least one number which has 3 cards available, then we can create a hint - one for each of the first 3 cards of this solutionHandsIndex
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  // work through the first 3 cards in this handOptions
  [0, 1, 2].forEach((handOptionsIndex) => {
    // if any of the numbers still available in this cardOptions is not in numbersAvailable then we need a clue
    const cardOptionsNumbers = getNumbersFromCardOptions(handOptions[handOptionsIndex]);
    if (!allItemsFromFirstInSecond(cardOptionsNumbers, numbersAvailable)) {
      hints.push(createHintThreeOfAKindNumbers(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// -------------------------- //
// HINT_THREE_OF_A_KIND_SUITS //
// -------------------------- //

// create HINT_THREE_OF_A_KIND_SUITS
export const createHintThreeOfAKindSuits = (suits, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_THREE_OF_A_KIND_SUITS,
  suits,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 3 cards of a number in cardsAvailable for which the number hasn't been placed elsewhere, then we can use the suits of those numbers for hints for the first 3 hands
// note this applies to the 3 of a kind in a full house as well
// note that the hint includes an array of such suits - the apply hint will set it to the single suit if this array is of length 1
// note we rely on HINT_THREE_OF_A_KIND_NUMBERS already being applied - so if only a single number is possible it will be the only number by now
export const getThreeOfAKindSuitsHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const countNumbers1 = countNumbersInCardOptions(cardOptions1);
  const countNumbers2 = countNumbersInCardOptions(cardOptions2);
  const countNumbers3 = countNumbersInCardOptions(cardOptions3);

  // because we are working from a valid solution, and as HINT_THREE_OF_A_KIND_NUMBERS has been applied (or not applicable because the user has done it)
  // if any of first 3 cards has a single number set, then it is the number for the first 3 positions (so if multiple they will be the same - we just consider the first)
  if (countNumbers1 === 1) {
    // first card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions1));
  } else if (countNumbers2 === 1) {
    // second card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions2));
  } else if (countNumbers3 === 1) {
    // third card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions3));
  }

  if (!numbersAvailable.length) {
    // didn't find a number already placed in the first three cards, so look through all the numbers
    NUMBERS.forEach((number2) => {
      // count the number of cards of this number in the solution
      const numberAvailableCount = countNumberAvailable(number2, cardsAvailable);

      // and how many of this number have been placed anywhere
      // note: numberPlacedCount will not include any in the first three positions of this hand, as the above will have found those
      const numberPlacedCount = countNumberPlacedInSolutionOptions(number2, solutionOptions);

      // so if we need at least 3 available after numberPlacedCount has been removed
      if (numberAvailableCount - numberPlacedCount >= 3) {
        numbersAvailable.push(number2);
      }
    });
  }

  if (!numbersAvailable.length) {
    console.error('getThreeOfAKindSuitsHints could not find any numbers that have at least 3 cards available');
    return [];
  }

  // get the suits available for these available numbers that can still be placed in the first 3 positions
  const suits = getSuitsOfNumberAvailableForGivenCardsOfHand(numbersAvailable, cardsAvailable, solutionHandsIndex, solutionOptions, 0, 1, 2);

  // there should be at least 3
  if (suits.length < 3) {
    console.error(`getThreeOfAKindSuitsHints needs at least 3 suits for numbers ${numbersAvailable} but got ${suits}`);
    return [];
  }

  // if there are three, then we know they go in this order in the first 3 hands
  if (suits.length === 3) {
    // work through the first 3 cards in this handOptions
    [0, 1, 2].forEach((handOptionsIndex) => {
      // because we are working from a valid option, if only one suit is an option - it must be the right one
      // so only need a clue if cardOptions still allows more than one suit
      if (countSuitsInCardOptions(handOptions[handOptionsIndex]) > 1) {
        hints.push(createHintThreeOfAKindSuits([suits[handOptionsIndex]], solutionHandsIndex, handOptionsIndex, clue));
      }
    });

    // these are the hints - of course they might be empty if the first three suits are already set - which means this hint will never be applicable
    return hints;
  }

  // so, by here suits must contain all 4 suits
  // in that case, the first card is S/H, second card is H/D, third card is D/C

  // TODO could improve the following to use the new function isAnotherSuitSetInCardOptions() - see getPairSuitsHints() below

  // if the second card's suit is set, then it restricts either the first, or the third, depending on its value
  if (countSuitsInCardOptions(cardOptions2) === 1) {
    const suit = getFirstSuitSet(cardOptions2);
    if (suit === SUIT_HEARTS) {
      // the first card must be a S
      if (countSuitsInCardOptions(cardOptions1) > 1) {
        hints.push(createHintThreeOfAKindSuits([SUIT_SPADES], solutionHandsIndex, 0, clue));
      }
      // and the third card is a D/C, so if either S or H current set then the hint is needed
      const thirdCardOptions = cardOptions3;
      if (getSuitOptionsValueInCardOptions(thirdCardOptions, INDEX_SUIT_SPADES) || getSuitOptionsValueInCardOptions(thirdCardOptions, INDEX_SUIT_HEARTS)) {
        hints.push(createHintThreeOfAKindSuits([SUIT_DIAMONDS, SUIT_CLUBS], solutionHandsIndex, 2, clue));
      }
      return hints;
    }

    if (suit === SUIT_DIAMONDS) {
      // the first card is a S/H, so if either D or C current set then the hint is needed
      const firstCardOptions = cardOptions1;
      if (getSuitOptionsValueInCardOptions(firstCardOptions, INDEX_SUIT_DIAMONDS) || getSuitOptionsValueInCardOptions(firstCardOptions, INDEX_SUIT_CLUBS)) {
        hints.push(createHintThreeOfAKindSuits([SUIT_SPADES, SUIT_HEARTS], solutionHandsIndex, 0, clue));
      }
      // the third card must be a C
      if (countSuitsInCardOptions(cardOptions3) > 1) {
        hints.push(createHintThreeOfAKindSuits([SUIT_CLUBS], solutionHandsIndex, 2, clue));
      }
      return hints;
    }

    // shouldn't get here
    console.error(`getThreeOfAKindSuitsHints the second hand suit is set to ${suit} but it should be H or D`);
    return [];
  }

  // the first card is a S/H, so if either D or C current set then the hint is needed
  const firstCardOptions = cardOptions1;
  if (getSuitOptionsValueInCardOptions(firstCardOptions, INDEX_SUIT_DIAMONDS) || getSuitOptionsValueInCardOptions(firstCardOptions, INDEX_SUIT_CLUBS)) {
    hints.push(createHintThreeOfAKindSuits([SUIT_SPADES, SUIT_HEARTS], solutionHandsIndex, 0, clue));
  }

  // the second card is a H/D, so if either S or C current set then the hint is needed
  const secondCardOptions = cardOptions2;
  if (getSuitOptionsValueInCardOptions(secondCardOptions, INDEX_SUIT_SPADES) || getSuitOptionsValueInCardOptions(secondCardOptions, INDEX_SUIT_CLUBS)) {
    hints.push(createHintThreeOfAKindSuits([SUIT_HEARTS, SUIT_DIAMONDS], solutionHandsIndex, 1, clue));
  }

  // and the third card is a D/C, so if either S or H current set then the hint is needed
  const thirdCardOptions = cardOptions3;
  if (getSuitOptionsValueInCardOptions(thirdCardOptions, INDEX_SUIT_SPADES) || getSuitOptionsValueInCardOptions(thirdCardOptions, INDEX_SUIT_HEARTS)) {
    hints.push(createHintThreeOfAKindSuits([SUIT_DIAMONDS, SUIT_CLUBS], solutionHandsIndex, 2, clue));
  }

  // these are the hints - of course they might be empty if the first three suits are already set - which means this hint will never be applicable
  return hints;
};

// ----------------- //
// HINT_PAIR_NUMBERS //
// ----------------- //

// create HINT_PAIR_NUMBERS
export const createHintPairNumbers = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_PAIR_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 2 cards of a number in cardsAvailable or already placed in position then we can create a hint for the pair
// note this applies to the pair in a full house and for the pairs of two pairs - the handOptions indexes are given
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getPairNumbersHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue, handOptionsIndex1, handOptionsIndex2) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[handOptionsIndex1];
  const cardOptions2 = handOptions[handOptionsIndex2];
  const countNumbers1 = countNumbersInCardOptions(cardOptions1);
  const countNumbers2 = countNumbersInCardOptions(cardOptions2);

  // because we are working from a valid solution
  // if both numbers are already set - then no point in continuing
  if (countNumbers1 === 1 && countNumbers2 === 1) {
    return [];
  }

  // because we are working from a valid solution
  // if either card in the pair has a single number set, then it must be the number for the other card in the pair
  if (countNumbers1 === 1) {
    // fourth card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions1));
  } else if (countNumbers2 === 1) {
    // fifth card has a single number set
    numbersAvailable.push(getFirstNumberSet(cardOptions2));
  }

  // if we didn't find one that way, then look for the numbers with at least 2 cards still available
  if (!numbersAvailable.length) {
    NUMBERS.forEach((number) => {
      // count the number of cards of this number
      const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

      // and how many have been placed already
      // note: this will not include any in the pair, as the above will have found those
      const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

      // so if we need at least 2 available after numberPlacedCount has been removed
      if (numberAvailableCount - numberPlacedCount >= 2) {
        numbersAvailable.push(number);
      }
    });
  }

  // work through the two cards of the pair in this handOptions
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  [handOptionsIndex1, handOptionsIndex2].forEach((handOptionsIndex) => {
    // if any of the numbers still available in this cardOptions are not in numbersAvailable then we need a clue to restrict this card to numbersAvailable
    const cardOptionsNumbers = getNumbersFromCardOptions(handOptions[handOptionsIndex]);
    if (!allItemsFromFirstInSecond(cardOptionsNumbers, numbersAvailable)) {
      hints.push(createHintPairNumbers(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// --------------- //
// HINT_PAIR_SUITS //
// --------------- //

// create HINT_PAIR_SUITS
export const createHintPairSuits = (suits, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_PAIR_SUITS,
  suits,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 2 cards of a number in cardsAvailable for which the number hasn't been placed elsewhere, then we can use the suits of those numbers for hints of a pair
// note this applies to the pair of a kind in a full house and two pairs as well, the handOptions indexes are given
// note that the hint includes an array of such suits - the apply hint will set it to the single suit if this array is of length 1
// note we rely on HINT_PAIR_NUMBERS already being applied - so if only a single number is possible it will be the only number by now
export const getPairSuitsHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue, handOptionsIndex1, handOptionsIndex2) => {
  const handOptions = solutionOptions[solutionHandsIndex];
  const firstCardOptions = handOptions[handOptionsIndex1];
  const secondCardOptions = handOptions[handOptionsIndex2];
  const countSuits1 = countSuitsInCardOptions(firstCardOptions);
  const countSuits2 = countSuitsInCardOptions(secondCardOptions);

  // if the suits of the pair are already all set, then nothing to do here
  if (countSuits1 === 1 && countSuits2 === 1) {
    return [];
  }

  const hints = [];

  const numbersAvailable = [];

  // because we are working from a valid solution, and as HINT_PAIR_NUMBERS has been applied (or not applicable because the user has done it)
  // if either of the pair has a single number set, then it is the number for the pair (if bother are set they will be the same - we just consider the first)
  if (countNumbersInCardOptions(firstCardOptions) === 1) {
    // first card has a single number set
    numbersAvailable.push(getFirstNumberSet(firstCardOptions));
  } else if (countNumbersInCardOptions(secondCardOptions) === 1) {
    // second card has a single number set
    numbersAvailable.push(getFirstNumberSet(secondCardOptions));
  }

  if (!numbersAvailable.length) {
    // didn't find a number already placed in the pair, so look through all the numbers
    NUMBERS.forEach((number2) => {
      // count the number of cards of this number in the solution
      const numberAvailableCount = countNumberAvailable(number2, cardsAvailable);

      // and how many of this number have been placed anywhere
      // note: this will not include any in the pair of this hand, as the above will have found those
      const numberPlacedCount = countNumberPlacedInSolutionOptions(number2, solutionOptions);

      // so if we need at least 2 available after numberPlacedCount has been removed
      if (numberAvailableCount - numberPlacedCount >= 2) {
        numbersAvailable.push(number2);
      }
    });
  }

  if (!numbersAvailable.length) {
    console.error('getPairSuitsHints could not find any numbers that have at least 2 cards available');
    return [];
  }

  // get the suits available for these available numbers that can still be placed in the two positions
  const suits = getSuitsOfNumberAvailableForGivenCardsOfHand(numbersAvailable, cardsAvailable, solutionHandsIndex, solutionOptions, handOptionsIndex1, handOptionsIndex2);

  // there should be at least 2
  if (suits.length < 2) {
    console.error(`getPairSuitsHints needs at least 2 suits for numbers ${numbersAvailable} but got ${suits}`);
    return [];
  }

  // if there are 2 suits available, then we know they go in this order in the pair
  if (suits.length === 2) {
    // work through the 2 cards in this handOptions
    [handOptionsIndex1, handOptionsIndex2].forEach((handOptionsIndex, index) => {
      // because we are working from a valid option, if only one suit is an option - it must be the right one
      // so only need a clue if cardOptions still allows more than one suit
      if (countSuitsInCardOptions(handOptions[handOptionsIndex]) > 1) {
        hints.push(createHintPairSuits([suits[index]], solutionHandsIndex, handOptionsIndex, clue));
      }
    });

    // these are the hints - of course they might be empty if the first three suits are already set - which means this hint will never be applicable
    return hints;
  }

  // if there are 3 suits available, then we can split then 1st/2nd for the first card of the pair, and 2nd/3rd for the second card of the pair
  // these three are either SHD, SHC, SDC or HDC
  if (suits.length === 3) {
    const suits1and2 = [suits[0], suits[1]];
    const suits2and3 = [suits[1], suits[2]];

    // one of the suits might already be set, if so, that might reduce the options for the other suit
    // is the 1st card's suit is set
    if (countSuits1 === 1) {
      const suit1 = getFirstSuitSet(firstCardOptions);
      if (suit1 === suits[0]) {
        // if this is the 1st suit of the 3 suits available
        // then the suit of the second card in the pair must be the 2nd/3rd suits
        // the second card must have more than one suit still available here
        // but we only need a clue, if this card still have options beyond these two suits
        if (isAnotherSuitSetInCardOptions(secondCardOptions, suits2and3)) {
          hints.push(createHintPairSuits(suits2and3, solutionHandsIndex, handOptionsIndex2, clue));
        }
      } else if (suit1 === suits[1]) {
        // else if this is the 2nd suit of the 3 suits available
        // then the suit of the second card in the pair must be the 3rd suit
        // the second card must have more than one suit still available here
        // but we only need a clue, if this card still have options beyond this suit
        const suits2 = [suits[2]];
        if (isAnotherSuitSetInCardOptions(secondCardOptions, suits2)) {
          hints.push(createHintPairSuits(suits2, solutionHandsIndex, handOptionsIndex2, clue));
        }
      } else {
        // we should never get here
        console.error(`getPairSuitsHints first pair placed suit ${suit1} should be either the first or second suit in suits avilable ${suits}`);
        return [];
      }

      return hints;
    }

    if (countSuits2 === 1) {
      // same for the second suit
      const suit2 = getFirstSuitSet(secondCardOptions);
      if (suit2 === suits[2]) {
        // if this is the 3rd suit of the 3 suits available
        // then the suit of the first card in the pair must be the 1st/2nd suits
        // the first card must have more than one suit still available here
        // but we only need a clue, if this card still have options beyond these two suits
        if (isAnotherSuitSetInCardOptions(firstCardOptions, suits1and2)) {
          hints.push(createHintPairSuits(suits1and2, solutionHandsIndex, handOptionsIndex1, clue));
        }
      } else if (suit2 === suits[1]) {
        // else if this is the 2nd suit of the 3 suits available
        // then the suit of the first card in the pair must be the 1st suit
        // the first card must have more than one suit still available here
        // but we only need a clue, if this card still have options beyond this suit
        const suits0 = [suits[0]];
        if (isAnotherSuitSetInCardOptions(firstCardOptions, suits0)) {
          hints.push(createHintPairSuits(suits0, solutionHandsIndex, handOptionsIndex1, clue));
        }
      } else {
        // we should never get here
        console.error(`getPairSuitsHints second pair placed suit ${suit2} should be either the second or third suit in suits avilable ${suits}`);
        return [];
      }

      return hints;
    }

    // neither pair has its suit already set
    // the first card will be the 1st or 2nd suit - only create hint if another options is still set
    if (isAnotherSuitSetInCardOptions(firstCardOptions, suits1and2)) {
      hints.push(createHintPairSuits(suits1and2, solutionHandsIndex, handOptionsIndex1, clue));
    }
    // the second card will be the 2nd or 3rd suit - only create hint if another options is still set
    if (isAnotherSuitSetInCardOptions(secondCardOptions, suits2and3)) {
      hints.push(createHintPairSuits(suits2and3, solutionHandsIndex, handOptionsIndex2, clue));
    }

    return hints;
  }

  // TODO - perhaps could apply the following approach to the 3 suits case above??

  // so, by here suits must contain all 4 suits
  // all we know is that the first card of the pair cannot be the C and the second card of the pair cannot be the spade
  // that is, the first card is S/H/D and the second card is H/D/C

  // however if either card has their suit placed (both cannot have their suit placed) then that restricts the options for the other
  if (countSuits1 === 1) {
    const suit1 = getFirstSuitSet(firstCardOptions);
    let possibleSuits;

    if (suit1 === SUIT_SPADES) {
      possibleSuits = [SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS];
    } else if (suit1 === SUIT_HEARTS) {
      possibleSuits = [SUIT_DIAMONDS, SUIT_CLUBS];
    } else if (suit1 === SUIT_DIAMONDS) {
      possibleSuits = [SUIT_CLUBS];
    } else {
      // we should never get here
      console.error(`getPairSuitsHints first card of pair has placed suit ${suit1} which is not possible at this point`);
      return [];
    }

    if (isAnotherSuitSetInCardOptions(secondCardOptions, possibleSuits)) {
      // if any other suit is still set then we need a hint to remove it
      hints.push(createHintPairSuits(possibleSuits, solutionHandsIndex, handOptionsIndex2, clue));
    }

    return hints;
  }

  if (countSuits2 === 1) {
    const suit2 = getFirstSuitSet(secondCardOptions);

    let possibleSuits;

    if (suit2 === SUIT_HEARTS) {
      possibleSuits = [SUIT_SPADES];
    } else if (suit2 === SUIT_DIAMONDS) {
      possibleSuits = [SUIT_SPADES, SUIT_HEARTS];
    } else if (suit2 === SUIT_CLUBS) {
      possibleSuits = [SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS];
    } else {
      // we should never get here
      console.error(`getPairSuitsHints second card of pair has placed suit ${suit2} which is not possible at this point`);
      return [];
    }

    if (isAnotherSuitSetInCardOptions(firstCardOptions, possibleSuits)) {
      // if any other suit is still set then we need a hint to remove it
      hints.push(createHintPairSuits(possibleSuits, solutionHandsIndex, handOptionsIndex1, clue));
    }

    return hints;
  }

  // so neither has their suit set, so the first card is S/H/D and the second card is H/D/C - but only if they have another suit set
  if (getSuitOptionsValueInCardOptions(firstCardOptions, INDEX_SUIT_CLUBS)) {
    hints.push(createHintPairSuits([SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS], solutionHandsIndex, handOptionsIndex1, clue));
  }
  if (getSuitOptionsValueInCardOptions(secondCardOptions, INDEX_SUIT_SPADES)) {
    hints.push(createHintPairSuits([SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS], solutionHandsIndex, handOptionsIndex2, clue));
  }

  // these are the hints - of course they might be empty if the first three suits are already set - which means this hint will never be applicable
  return hints;
};

// ------------------------- //
// HINT_CLUE_SUIT_AND_NUMBER //
// ------------------------- //

// create HINT_CLUE_SUIT_AND_NUMBER
export const createHintClueSuitAndNumber = (suit, number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_SUIT_AND_NUMBER,
  suit,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card does not have this suit as the placed suit or the number as the placed number then create a HINT_CLUE_SUIT_AND_NUMBER hint to place them/it
export const getClueSuitAndNumberHints = (suit, number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  // as we are working from a valid solution options we just care if more than one suit is still possible
  if (countSuitsInCardOptions(cardOptions) > 1) {
    hints.push(createHintClueSuitAndNumber(suit, number, solutionHandsIndex, handOptionsIndex, clue));
  } else if (countNumbersInCardOptions(cardOptions) > 1) {
    hints.push(createHintClueSuitAndNumber(suit, number, solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if a single card in this hand still allows this suit/number then create a HINT_CLUE_SUIT_AND_NUMBER hint to set that suit/number for that card
export const getClueHandHasSuitAndNumberHints = (suit, number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
  const handOptions = solutionOptions[solutionHandsIndex];

  // find all the cards that still allow this suit/number
  const handOptionsIndexes = [];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex) && getNumberOptionsValueInCardOptions(cardOptions, number)) {
      handOptionsIndexes.push(handOptionsIndex);
    }
  });

  // we can only create a hint if there is only one possible place for this suit/number and the suit/number is not yet placed there
  if (handOptionsIndexes.length === 1) {
    const handOptionsIndex = handOptionsIndexes[0];
    if (countSuitsInCardOptions(solutionOptions[solutionHandsIndex][handOptionsIndex]) > 1
        || countNumbersInCardOptions(solutionOptions[solutionHandsIndex][handOptionsIndex]) > 1) {
      // it is not set here, so create the hint to set this card to this suit/number
      hints.push(createHintClueSuitAndNumber(suit, number, solutionHandsIndex, handOptionsIndex, clue));
    }
  }

  return hints;
};

// -------------- //
// HINT_CLUE_SUIT //
// -------------- //

// create HINT_CLUE_SUIT
export const createHintClueSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card does not have this suit as the placed suit then create a HINT_CLUE_SUIT hint to place it
export const getClueSuitHints = (suit, solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  // as we are working from a valid solution options we just care if more than one suit is still possible
  if (countSuitsInCardOptions(cardOptions) > 1) {
    hints.push(createHintClueSuit(suit, solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if a single card in this hand still allows this suit then create a HINT_CLUE_SUIT hint to set that suit for that card
export const getClueHandHasSuitHints = (suit, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
  const handOptions = solutionOptions[solutionHandsIndex];

  // find all the cards that still allow this suit
  const handOptionsIndexes = [];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
      handOptionsIndexes.push(handOptionsIndex);
    }
  });

  // we can only create a hint if there is only one possible place for this suit and the suit is not yet placed there
  if (handOptionsIndexes.length === 1) {
    const handOptionsIndex = handOptionsIndexes[0];
    if (countSuitsInCardOptions(solutionOptions[solutionHandsIndex][handOptionsIndex]) > 1) {
      // it is not set here, so create the hint to set this card to this suit
      hints.push(createHintClueSuit(suit, solutionHandsIndex, handOptionsIndex, clue));
    }
  }

  return hints;
};

// ------------------ //
// HINT_CLUE_NOT_SUIT //
// ------------------ //

// create HINT_CLUE_NOT_SUIT
export const createHintClueNotSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_NOT_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card still allows the suit then create a HINT_CLUE_NOT_SUIT hint
export const getClueNotSuitHints = (suit, solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

  if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
    hints.push(createHintClueNotSuit(suit, solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if any cards in this hand still allow this suit then create a HINT_CLUE_NOT_SUIT hint to remove that suit from that card
export const getClueHandNotSuitHints = (suit, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
      hints.push(createHintClueNotSuit(suit, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// if any cards in this hand have given number set but still allow the suit then create a HINT_CLUE_NOT_SUIT hint to remove that suit from that card
export const getClueHandNotSuitAndNumberHintsRemoveSuit = (suit, number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    // if our number is placed and the suit is still possible, then create hint to remove that suit
    if (isNumberPlacedInCardOptions(number, cardOptions) && getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex)) {
      hints.push(createHintClueNotSuit(suit, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ---------------- //
// HINT_CLUE_NUMBER //
// ---------------- //

// create HINT_CLUE_NUMBER
export const createHintClueNumber = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card does not have this number placed then create a HINT_CLUE_NUMBER hint to place it
export const getClueNumberHints = (number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  // as we are working from a valid solution options we just care if more than one number is still possible
  if (countNumbersInCardOptions(cardOptions) > 1) {
    hints.push(createHintClueNumber(number, solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if a single card in this hand still allows this number then create a HINT_CLUE_NUMBER hint to set that number for that card
export const getClueHandHasNumberHints = (number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // find all the cards that still allow this number
  const handOptionsIndexes = [];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getNumberOptionsValueInCardOptions(cardOptions, number)) {
      handOptionsIndexes.push(handOptionsIndex);
    }
  });

  // we can only create a hint if there is only one possible place for this number and the number is not yet placed there
  if (handOptionsIndexes.length === 1) {
    const handOptionsIndex = handOptionsIndexes[0];
    if (countNumbersInCardOptions(solutionOptions[solutionHandsIndex][handOptionsIndex]) > 1) {
      // it is not set here, so create the hint to set this card to this number
      hints.push(createHintClueNumber(number, solutionHandsIndex, handOptionsIndex, clue));
    }
  }

  return hints;
};

// -------------------- //
// HINT_CLUE_NOT_NUMBER //
// -------------------- //

// create HINT_CLUE_NOT_NUMBER
export const createHintClueNotNumber = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_NOT_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card still allows the number then create a HINT_CLUE_NOT_NUMBER hint to remove it
export const getClueNotNumberHints = (number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  if (getNumberOptionsValueInCardOptions(cardOptions, number)) {
    hints.push(createHintClueNotNumber(number, solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if any cards in this hand still allow this number then create a HINT_CLUE_NOT_NUMBER hint to remove that number from that card
export const getClueHandNotNumberHints = (number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getNumberOptionsValueInCardOptions(cardOptions, number)) {
      hints.push(createHintClueNotNumber(number, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// if any cards in this hand have given suit set but still allow the number then create a HINT_CLUE_NOT_NUMBER hint to remove that number from that card
export const getClueHandNotSuitAndNumberHintsRemoveNumber = (suit, number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    // if our suit is placed and the number is still possible, then create hint to remove that number
    if (isSuitPlacedInCardOptions(suit, cardOptions) && getNumberOptionsValueInCardOptions(cardOptions, number)) {
      hints.push(createHintClueNotNumber(number, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// if any cards in this hand still allow a lower number then create a HINT_CLUE_NOT_NUMBER hint to remove that number from that card
export const getClueHandLowestNumberHints = (number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    NUMBERS.forEach((numberToCheck) => {
      // Note: NUMBER_A constant is 1 but for this A is considered greater than a K, so A can never be a number lower than the given number
      if (numberToCheck !== NUMBER_A && numberToCheck < number && getNumberOptionsValueInCardOptions(cardOptions, numberToCheck)) {
        hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex, handOptionsIndex, clue));
      }
    });
  });

  return hints;
};

// if any cards in this hand still allow a higher number then create a HINT_CLUE_NOT_NUMBER hint to remove that number from that card
export const getClueHandHighestNumberHints = (number, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // if number is NUMBER_A then nothing is higher than that, so we will never be able to create a HINT_CLUE_NOT_NUMBER for this hand
  if (number !== NUMBER_A) {
    // look at each card
    const handOptions = solutionOptions[solutionHandsIndex];
    handOptions.forEach((cardOptions, handOptionsIndex) => {
      NUMBERS.forEach((numberToCheck) => {
        // Note: NUMBER_A constant is 1 but for this A is considered greater than a K, so if we get here A will always be higher than the given number
        if ((numberToCheck === NUMBER_A || numberToCheck > number) && getNumberOptionsValueInCardOptions(cardOptions, numberToCheck)) {
          hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex, handOptionsIndex, clue));
        }
      });
    });
  }

  return hints;
};

// if any numbers in the first card are lower than the lowest number of the second card create a HINT_CLUE_NOT_NUMBER hint to remove that number from the first card - and vice versa
export const getClueCardsNumberHigherThanHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue) => {
  const hints = [];

  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];

  // find the lowest number in card 2 (must return a value otherwise solutionsOptions is not valid)
  const card2LowestNumber = getMinNumberInCardOptions(cardOptions2);

  // now look through all card 1 remaining numbers, and if any are lower or equal than this create a HINT_CLUE_NOT_NUMBER to remove that number from card 1
  NUMBERS.forEach((numberToCheck) => {
    // Note: NUMBER_A constant is 1 but for this A is considered greater than a K, so A can never be a lower number than card 2's lowest number
    if (numberToCheck !== NUMBER_A && numberToCheck <= card2LowestNumber && getNumberOptionsValueInCardOptions(cardOptions1, numberToCheck)) {
      hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex1, handOptionsIndex1, clue));
    }
  });

  // now do the other way around - this clue says that card 2 is lower than card 1

  // find the highest number in card 1 (must return a value otherwise solutionsOptions is not valid)
  const card1HighestNumber = getMaxNumberInCardOptions(cardOptions1);

  // now look through all card 2 remaining numbers, and if any are higher or equal than this create a HINT_CLUE_NOT_NUMBER to remove that number from card 2
  NUMBERS.forEach((numberToCheck) => {
    // Note: NUMBER_A constant is 1 but for this A is considered greater than a K, so A is always higher or equal to card 1's highest number
    if (numberToCheck === NUMBER_A && getNumberOptionsValueInCardOptions(cardOptions2, numberToCheck)) {
      hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex2, handOptionsIndex2, clue));
    } else if (numberToCheck >= card1HighestNumber && card1HighestNumber !== NUMBER_A && getNumberOptionsValueInCardOptions(cardOptions2, numberToCheck)) {
      // nothing can be higher than card 1's A
      hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  });

  return hints;
};

// if any number in the first card does not have that number - nHigher in the second create a HINT_CLUE_NOT_NUMBER hint to remove that number from the first card
// if any number in the second card does not have that number + nHigher in the first create a HINT_CLUE_NOT_NUMBER hint to remove that number from the second card
export const getClueCardsNumberNHigherThanHints = (nHigher, solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue) => {
  const hints = [];

  const card1Options = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const card1Numbers = getNumbersFromCardOptions(card1Options);
  const card2Options = solutionOptions[solutionHandsIndex2][handOptionsIndex2];
  const card2Numbers = getNumbersFromCardOptions(card2Options);

  // now look through all card 1 numbers, if card 2 doesn't have the number nHigher lower than this number create a HINT_CLUE_NOT_NUMBER to remove that number from card 1
  card1Numbers.forEach((numberToCheck) => {
    const card2Number = subtractNFromCardNumber(nHigher, numberToCheck);
    // NOTE: This can never be NUMBER_A so we don't have to worry about that here
    if (card2Number !== NUMBER_NONE && !getNumberOptionsValueInCardOptions(card2Options, card2Number)) {
      hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex1, handOptionsIndex1, clue));
    }
  });

  // now look through all card 2 numbers, if card 1 doesn't have the number nHigher higher than this number create a HINT_CLUE_NOT_NUMBER to remove that number from card 2
  card2Numbers.forEach((numberToCheck) => {
    const card1Number = addNToCardNumber(nHigher, numberToCheck);
    if (card1Number !== NUMBER_NONE && !getNumberOptionsValueInCardOptions(card1Options, card1Number)) {
      hints.push(createHintClueNotNumber(numberToCheck, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  });

  return hints;
};

// --------------------------- //
// HINT_CLUE_CARDS_SAME_NUMBER //
// --------------------------- //

// create HINT_CLUE_CARDS_SAME_NUMBER
export const createHintClueCardsSameNumber = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARDS_SAME_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// create HINT_CLUE_CARDS_SAME_NUMBER hint to remove any numbers that are not possible in the other card, for both the first and second given card positions
export const getClueCardsSameNumberHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue) => {
  const hints = [];

  // need to compare the card options for these two cards
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];

  // for through all possible numbers from the first, and if it is not possible in the second then create a hint to remove it from the first
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  numbers1.forEach((number) => {
    if (!getNumberOptionsValueInCardOptions(cardOptions2, number)) {
      hints.push(createHintClueCardsSameNumber(number, solutionHandsIndex1, handOptionsIndex1, clue));
    }
  });

  // and vice versa
  const numbers2 = getNumbersFromCardOptions(cardOptions2);
  numbers2.forEach((number) => {
    if (!getNumberOptionsValueInCardOptions(cardOptions1, number)) {
      hints.push(createHintClueCardsSameNumber(number, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  });

  return hints;
};

// --------------------------------------------- //
// HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE //
// --------------------------------------------- //

// create HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE
export const createHintClueCardsSameNumberTwoNotAvailable = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// create HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE hint to remove any numbers which don't have enough available to fill these two slots
export const getClueCardsSameNumberTwoNotAvailableHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, cardsAvailable, solutionOptions, clue) => {
  const hints = [];

  // we can assume here that HINT_CLUE_CARDS_SAME_NUMBER has already been applied, so both sets of numbers are the same
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const numbers = getNumbersFromCardOptions(cardOptions1);

  // we have to check that the number hasn't been placed - if it has, then both have, and so nothing for us to do
  if (numbers.length === 1) {
    return [];
  }

  // for all possible numbers still available at these two positions
  numbers.forEach((number) => {
    // how many of this number are in cards available
    const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

    // how many cards in solutionOptions have this number placed
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    // we need at least 2 available after numberPlacedCount has been removed, for this number to be available for both of these cards
    if (numberAvailableCount - numberPlacedCount < 2) {
      // at least 2 not available - so remove this number in both places
      hints.push(createHintClueCardsSameNumberTwoNotAvailable(number, solutionHandsIndex1, handOptionsIndex1, clue));
      hints.push(createHintClueCardsSameNumberTwoNotAvailable(number, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  });

  return hints;
};

// ----------------------------------------------- //
// HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE //
// ----------------------------------------------- //

// create HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE
export const createHintClueCardsSameNumberThreeNotAvailable = (number, solutionOptionsIndex, handOptionsIndex, clue1, clue2) => ({
  hintType: HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue1,
  clue2,
});

// create HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE hint to remove any numbers which don't have enough available to fill these three slots
// eslint-disable-next-line max-len
export const getClueCardsSameNumberThreeNotAvailableHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndex3, handOptionsIndex3, cardsAvailable, solutionOptions, clue1, clue2) => {
  const hints = [];

  // Note: I originally thought that I would have to check the first handOption to check a number hadn't been placed as I thought the SAME_NUMBER hints would have been applied
  // But the other two numbers could have been set by other hints - so checking all 3

  // check that a number hasn't been placed in the first handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  if (numbers1.length === 1) {
    return [];
  }

  // check that a number hasn't been placed in the second handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];
  const numbers2 = getNumbersFromCardOptions(cardOptions2);
  if (numbers2.length === 1) {
    return [];
  }

  // check that a number hasn't been placed in the third handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions3 = solutionOptions[solutionHandsIndex3][handOptionsIndex3];
  const numbers3 = getNumbersFromCardOptions(cardOptions3);
  if (numbers3.length === 1) {
    return [];
  }

  // for all possible numbers still available at these three positions (can just use the first numbers, because at some point the others will be aligned)
  numbers1.forEach((number) => {
    // how many of this number are in cards available
    const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

    // how many cards in solutionOptions have this number placed
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    // we need at least 3 available after numberPlacedCount has been removed, for this number to be available for all three cards
    if (numberAvailableCount - numberPlacedCount < 3) {
      // at least 3 not available - so remove this number from all three cards
      hints.push(createHintClueCardsSameNumberThreeNotAvailable(number, solutionHandsIndex1, handOptionsIndex1, clue1, clue2));
      hints.push(createHintClueCardsSameNumberThreeNotAvailable(number, solutionHandsIndex2, handOptionsIndex2, clue1, clue2));
      hints.push(createHintClueCardsSameNumberThreeNotAvailable(number, solutionHandsIndex3, handOptionsIndex3, clue1, clue2));

      // console.error(`getClueCardsSameNumberThreeNotAvailableHints: removing number ${number} solutionOptions is`, solutionOptions);
    }
  });

  return hints;
};

// ---------------------------------------------- //
// HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE //
// ---------------------------------------------- //

// create HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE
export const createHintClueCardsSameNumberFourNotAvailable = (number, solutionOptionsIndex, handOptionsIndex, clue1, clue2) => ({
  hintType: HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue1,
  clue2,
});

// create HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE hint to remove any numbers which don't have enough available to fill these four slots
// eslint-disable-next-line max-len
export const getClueCardsSameNumberFourNotAvailableHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndex3, handOptionsIndex3, solutionHandsIndex4, handOptionsIndex4, cardsAvailable, solutionOptions, clue1, clue2) => {
  const hints = [];

  // Note: I originally thought that I would have to check the first handOption to check a number hadn't been placed as I thought the SAME_NUMBER hints would have been applied
  // But the other three numbers could have been set by other hints - so checking all 3

  // check that a number hasn't been placed in the first handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  if (numbers1.length === 1) {
    return [];
  }

  // check that a number hasn't been placed in the second handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];
  const numbers2 = getNumbersFromCardOptions(cardOptions2);
  if (numbers2.length === 1) {
    return [];
  }

  // check that a number hasn't been placed in the third handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions3 = solutionOptions[solutionHandsIndex3][handOptionsIndex3];
  const numbers3 = getNumbersFromCardOptions(cardOptions3);
  if (numbers3.length === 1) {
    return [];
  }

  // check that a number hasn't been placed in the fourth handOption - if it has then HINT_CLUE_CARDS_SAME_NUMBER will set the others, and so nothing for us to do
  const cardOptions4 = solutionOptions[solutionHandsIndex4][handOptionsIndex4];
  const numbers4 = getNumbersFromCardOptions(cardOptions4);
  if (numbers4.length === 1) {
    return [];
  }

  // for all possible numbers still available at these four positions (can just use the first numbers, because at some point the others will be aligned)
  numbers1.forEach((number) => {
    // how many of this number are in cards available
    const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

    // how many cards in solutionOptions have this number placed
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    // we need at least 4 available after numberPlacedCount has been removed, for this number to be available for all four cards
    if (numberAvailableCount - numberPlacedCount < 4) {
      // at least 4 not available - so remove this number from all four cards
      hints.push(createHintClueCardsSameNumberFourNotAvailable(number, solutionHandsIndex1, handOptionsIndex1, clue1, clue2));
      hints.push(createHintClueCardsSameNumberFourNotAvailable(number, solutionHandsIndex2, handOptionsIndex2, clue1, clue2));
      hints.push(createHintClueCardsSameNumberFourNotAvailable(number, solutionHandsIndex3, handOptionsIndex3, clue1, clue2));
      hints.push(createHintClueCardsSameNumberFourNotAvailable(number, solutionHandsIndex4, handOptionsIndex4, clue1, clue2));
    }
  });

  return hints;
};

// ------------------------------- //
// HINT_CLUE_CARDS_NOT_SAME_NUMBER //
// ------------------------------- //

// create HINT_CLUE_CARDS_NOT_SAME_NUMBER
export const createHintClueCardsNotSameNumber = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARDS_NOT_SAME_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if card1 or card2 has a defined number, and the other card still allows that number, then create HINT_CLUE_CARDS_NOT_SAME_NUMBER hint to remove that number
export const getClueCardsNotSameNumberHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue) => {
  const hints = [];

  // need to compare the card options for these two cards
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];

  if (countNumbersInCardOptions(cardOptions1) === 1) {
    // a number is set here, create a hint if it still possible in the other card options
    const numberSet1 = getFirstNumberSet(cardOptions1);
    if (getNumberOptionsValueInCardOptions(cardOptions2, numberSet1)) {
      hints.push(createHintClueCardsNotSameNumber(numberSet1, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  }

  if (countNumbersInCardOptions(cardOptions2) === 1) {
    // a number is set here, create a hint if it still possible in the other card options
    const numberSet2 = getFirstNumberSet(cardOptions2);
    if (getNumberOptionsValueInCardOptions(cardOptions1, numberSet2)) {
      hints.push(createHintClueCardsNotSameNumber(numberSet2, solutionHandsIndex1, handOptionsIndex1, clue));
    }
  }

  return hints;
};

// ------------------------- //
// HINT_CLUE_CARDS_SAME_SUIT //
// ------------------------- //

// create HINT_CLUE_CARDS_SAME_SUIT
export const createHintClueCardsSameSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARDS_SAME_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// create HINT_CLUE_CARDS_SAME_SUIT hint to remove any suits that are not possible in the other card, for both the first and second given card positions
export const getClueCardsSameSuitHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue) => {
  const hints = [];

  // need to compare the card options for these two cards
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];

  // for through all possible suits from the first, and if it is not possible in the second then create a hint to remove it from the first
  const suits1 = getSuitsFromCardOptions(cardOptions1);
  suits1.forEach((suit) => {
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
    if (!getSuitOptionsValueInCardOptions(cardOptions2, suitOptionsIndex)) {
      hints.push(createHintClueCardsSameSuit(suit, solutionHandsIndex1, handOptionsIndex1, clue));
    }
  });

  // and vice versa
  const suits2 = getSuitsFromCardOptions(cardOptions2);
  suits2.forEach((suit) => {
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
    if (!getSuitOptionsValueInCardOptions(cardOptions1, suitOptionsIndex)) {
      hints.push(createHintClueCardsSameSuit(suit, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  });

  return hints;
};

// ------------------------------------------- //
// HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE //
// ------------------------------------------- //

// create HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE
export const createHintClueCardsSameSuitTwoNotAvailable = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// create HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE hint to remove any suits which don't have enough available to fill these two slots
export const getClueCardsSameSuitTwoNotAvailableHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, cardsAvailable, solutionOptions, clue) => {
  const hints = [];

  // we first check that neither of these cards has their suit already placed
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];

  const suits1 = getSuitsFromCardOptions(cardOptions1);
  const suits2 = getSuitsFromCardOptions(cardOptions2);

  // if any suits have been placed then other hints will set them all to this suit
  if (suits1.length === 1 || suits2.length === 1) {
    return [];
  }

  // for all possible suits still available at the first positions (if other suits are available at other positions other clues will remove)
  suits1.forEach((suit) => {
    // how many of this suit are in cards available
    const suitAvailableCount = countSuitAvailable(suit, cardsAvailable);

    // how many cards in solutionOptions have this suit placed
    const suitPlacedCount = countSuitPlacedInSolutionOptions(suit, solutionOptions);

    // so we need at least 2 available after suitPlacedCount has been removed, for this suit to be available for both of these cards
    if (suitAvailableCount - suitPlacedCount < 2) {
      // at least 2 not available - so remove this suit in both places
      hints.push(createHintClueCardsSameSuitTwoNotAvailable(suit, solutionHandsIndex1, handOptionsIndex1, clue));
      hints.push(createHintClueCardsSameSuitTwoNotAvailable(suit, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  });

  return hints;
};

// --------------------------------------------- //
// HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE //
// --------------------------------------------- //

// create HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE
export const createHintClueCardsSameSuitThreeNotAvailable = (suit, solutionOptionsIndex, handOptionsIndex, clue1, clue2) => ({
  hintType: HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue1,
  clue2,
});

// create HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE hint to remove any suits which don't have enough available to fill these three slots
// eslint-disable-next-line max-len
export const getClueCardsSameSuitThreeNotAvailableHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndex3, handOptionsIndex3, cardsAvailable, solutionOptions, clue1, clue2) => {
  const hints = [];

  // we first check that none of these cards has their suit already placed
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];
  const cardOptions3 = solutionOptions[solutionHandsIndex3][handOptionsIndex3];

  const suits1 = getSuitsFromCardOptions(cardOptions1);
  const suits2 = getSuitsFromCardOptions(cardOptions2);
  const suits3 = getSuitsFromCardOptions(cardOptions3);

  // if any suits have been placed then other hints will set them all to this suit
  if (suits1.length === 1 || suits2.length === 1 || suits3.length === 1) {
    return [];
  }

  // for all possible suits still available at the first positions (if other suits are available at other positions other clues will remove)
  suits1.forEach((suit) => {
    // how many of this suit are in cards available
    const suitAvailableCount = countSuitAvailable(suit, cardsAvailable);

    // how many cards in solutionOptions have this suit placed
    const suitPlacedCount = countSuitPlacedInSolutionOptions(suit, solutionOptions);

    // so we need at least 3 available after suitPlacedCount has been removed, for this suit to be available for all three cards
    if (suitAvailableCount - suitPlacedCount < 3) {
      // at least 3 not available - so remove this suit from all three cards
      hints.push(createHintClueCardsSameSuitThreeNotAvailable(suit, solutionHandsIndex1, handOptionsIndex1, clue1, clue2));
      hints.push(createHintClueCardsSameSuitThreeNotAvailable(suit, solutionHandsIndex2, handOptionsIndex2, clue1, clue2));
      hints.push(createHintClueCardsSameSuitThreeNotAvailable(suit, solutionHandsIndex3, handOptionsIndex3, clue1, clue2));
    }
  });

  return hints;
};

// --------------------------------------------- //
// HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE //
// --------------------------------------------- //

// create HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE
export const createHintClueCardsSameSuitSixNotAvailable = (suit, solutionOptionsIndex, handOptionsIndex, clue1, clue2) => ({
  hintType: HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue1,
  clue2,
});

// create HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE hint to remove any suits which don't have enough available to fill these six slots (first is straight flush/flush)
export const getClueCardsSameSuitSixNotAvailableHints = (solutionHandsIndexFlush, solutionHandsIndexCard, handOptionsIndexCard, cardsAvailable, solutionOptions, clue1, clue2) => {
  const hints = [];

  // we first check that none of these cards has their suit already placed
  const cardOptions1 = solutionOptions[solutionHandsIndexFlush][CARD_1];
  const cardOptions2 = solutionOptions[solutionHandsIndexFlush][CARD_2];
  const cardOptions3 = solutionOptions[solutionHandsIndexFlush][CARD_3];
  const cardOptions4 = solutionOptions[solutionHandsIndexFlush][CARD_4];
  const cardOptions5 = solutionOptions[solutionHandsIndexFlush][CARD_5];
  const cardOptions6 = solutionOptions[solutionHandsIndexCard][handOptionsIndexCard];

  const suits1 = getSuitsFromCardOptions(cardOptions1);
  const suits2 = getSuitsFromCardOptions(cardOptions2);
  const suits3 = getSuitsFromCardOptions(cardOptions3);
  const suits4 = getSuitsFromCardOptions(cardOptions4);
  const suits5 = getSuitsFromCardOptions(cardOptions5);
  const suits6 = getSuitsFromCardOptions(cardOptions6);

  // if any suits have been placed then other hints will set them all to this suit
  if (suits1.length === 1 || suits2.length === 1 || suits3.length === 1 || suits4.length === 1 || suits5.length === 1 || suits6.length === 1) {
    return [];
  }

  // for all possible suits still available at the first positions (if other suits are available at other positions other clues will remove)
  suits1.forEach((suit) => {
    // how many of this suit are in cards available
    const suitAvailableCount = countSuitAvailable(suit, cardsAvailable);

    // how many cards in solutionOptions have this suit placed
    const suitPlacedCount = countSuitPlacedInSolutionOptions(suit, solutionOptions);

    // so we need at least 6 available after suitPlacedCount has been removed, for this suit to be available for all six cards
    // note: if one of the 6 has been placed then other hints will have set all cards to be the same suit - so we are looking for 6 available at this point
    if (suitAvailableCount - suitPlacedCount < 6) {
      // at least 6 not available - so remove this suit from all six cards
      hints.push(createHintClueCardsSameSuitSixNotAvailable(suit, solutionHandsIndexFlush, CARD_1, clue1, clue2));
      hints.push(createHintClueCardsSameSuitSixNotAvailable(suit, solutionHandsIndexFlush, CARD_2, clue1, clue2));
      hints.push(createHintClueCardsSameSuitSixNotAvailable(suit, solutionHandsIndexFlush, CARD_3, clue1, clue2));
      hints.push(createHintClueCardsSameSuitSixNotAvailable(suit, solutionHandsIndexFlush, CARD_4, clue1, clue2));
      hints.push(createHintClueCardsSameSuitSixNotAvailable(suit, solutionHandsIndexFlush, CARD_5, clue1, clue2));
      hints.push(createHintClueCardsSameSuitSixNotAvailable(suit, solutionHandsIndexCard, handOptionsIndexCard, clue1, clue2));
    }
  });

  return hints;
};

// ----------------------------- //
// HINT_CLUE_CARDS_NOT_SAME_SUIT //
// ----------------------------- //

// create HINT_CLUE_CARDS_NOT_SAME_SUIT
export const createHintClueCardsNotSameSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARDS_NOT_SAME_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if card1 or card2 has a defined suit, and the other card still allows that suit, then create HINT_CLUE_CARDS_NOT_SAME_SUIT hint to remove that suit
export const getClueCardsNotSameSuitHints = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue) => {
  const hints = [];

  // need to compare the card options for these two cards
  const cardOptions1 = solutionOptions[solutionHandsIndex1][handOptionsIndex1];
  const cardOptions2 = solutionOptions[solutionHandsIndex2][handOptionsIndex2];

  if (countSuitsInCardOptions(cardOptions1) === 1) {
    // a suit is set here, create a hint if it still possible in the other card options
    const suitSet1 = getFirstSuitSet(cardOptions1);
    const suitOptionsIndex1 = convertSuitToSuitOptionsIndex(suitSet1);
    if (getSuitOptionsValueInCardOptions(cardOptions2, suitOptionsIndex1)) {
      hints.push(createHintClueCardsNotSameSuit(suitSet1, solutionHandsIndex2, handOptionsIndex2, clue));
    }
  }

  if (countSuitsInCardOptions(cardOptions2) === 1) {
    // a suit is set here, create a hint if it still possible in the other card options
    const suitSet2 = getFirstSuitSet(cardOptions2);
    const suitOptionsIndex2 = convertSuitToSuitOptionsIndex(suitSet2);
    if (getSuitOptionsValueInCardOptions(cardOptions1, suitOptionsIndex2)) {
      hints.push(createHintClueCardsNotSameSuit(suitSet2, solutionHandsIndex1, handOptionsIndex1, clue));
    }
  }

  return hints;
};

// ------------------ //
// HINT_CLUE_RED_SUIT //
// ------------------ //

// create HINT_CLUE_RED_SUIT
export const createHintClueRedSuit = (solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_RED_SUIT,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card still allows a black suit then create a HINT_CLUE_RED_SUIT hint to remove one or both black suits
export const getClueRedSuitHints = (solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  if (getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_SPADES) || getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_CLUBS)) {
    hints.push(createHintClueRedSuit(solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if any cards in this hand still allows a black suit then create a HINT_CLUE_RED_SUIT hint to remove one or both black suits from that card
export const getClueRedSuitsHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_SPADES) || getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_CLUBS)) {
      hints.push(createHintClueRedSuit(solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// -------------------- //
// HINT_CLUE_BLACK_SUIT //
// -------------------- //

// create HINT_CLUE_BLACK_SUIT
export const createHintClueBlackSuit = (solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_BLACK_SUIT,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card still allows a red suit then create a HINT_CLUE_BLACK_SUIT hint to remove one or both red suits
export const getClueBlackSuitHints = (solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  if (getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_HEARTS) || getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_DIAMONDS)) {
    hints.push(createHintClueBlackSuit(solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if any cards in this hand still allows a red suit then create a HINT_CLUE_BLACK_SUIT hint to remove one or both red suits from that card
export const getClueBlackSuitsHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    if (getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_HEARTS) || getSuitOptionsValueInCardOptions(cardOptions, INDEX_SUIT_DIAMONDS)) {
      hints.push(createHintClueBlackSuit(solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ------------------- //
// HINT_CLUE_CARD_EVEN //
// ------------------- //

// create HINT_CLUE_CARD_EVEN
export const createHintClueCardEven = (solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARD_EVEN,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card still allows one or more odd numbers then create a HINT_CLUE_CARD_EVEN hint to remove those numbers
export const getClueCardEvenHints = (solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  // A is considered even
  if (getNumberOptionsValueInCardOptions(cardOptions, NUMBER_3)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_5)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_7)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_9)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_J)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_K)) {
    hints.push(createHintClueCardEven(solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if any cards in this hand still allows one or more odd numbers then create a HINT_CLUE_CARD_EVEN hint to remove the odd numbers from that card
export const getClueHandEvenHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    // A is considered even
    if (getNumberOptionsValueInCardOptions(cardOptions, NUMBER_3)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_5)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_7)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_9)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_J)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_K)) {
      hints.push(createHintClueCardEven(solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ------------------ //
// HINT_CLUE_CARD_ODD //
// ------------------ //

// create HINT_CLUE_CARD_ODD
export const createHintClueCardOdd = (solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_CLUE_CARD_ODD,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if the named card still allows one or more even numbers then create a HINT_CLUE_CARD_ODD hint to remove those numbers
export const getClueCardOddHints = (solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  // A is considered even
  if (getNumberOptionsValueInCardOptions(cardOptions, NUMBER_2)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_4)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_6)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_8)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_10)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_Q)
   || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_A)) {
    hints.push(createHintClueCardOdd(solutionHandsIndex, handOptionsIndex, clue));
  }

  return hints;
};

// if any cards in this hand still allows one or more even numbers then create a HINT_CLUE_CARD_ODD hint to remove the even numbers from that card
export const getClueHandOddHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  // look at each card
  const handOptions = solutionOptions[solutionHandsIndex];
  handOptions.forEach((cardOptions, handOptionsIndex) => {
    // A is considered even
    if (getNumberOptionsValueInCardOptions(cardOptions, NUMBER_2)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_4)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_6)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_8)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_10)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_Q)
    || getNumberOptionsValueInCardOptions(cardOptions, NUMBER_A)) {
      hints.push(createHintClueCardOdd(solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ------------------------------------ //
// HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT //
// ------------------------------------ //

// create HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT
export const createHintPairNumbersRestrictedBySuit = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 2 or more cards of a number are available (either in cardsAvailable or already placed in position)
// then look to restrict to the numbers whose suits can still fit in
// note this applies to the pair in a full house and for the pairs of two pairs - the handOptions indexes are given
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getPairNumbersRestrictedBySuitHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue, handOptionsIndex1, handOptionsIndex2) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[handOptionsIndex1];
  const cardOptions2 = handOptions[handOptionsIndex2];
  const countNumbers1 = countNumbersInCardOptions(cardOptions1);
  const countNumbers2 = countNumbersInCardOptions(cardOptions2);

  // because we are working from a valid solution
  // if both numbers are already set - then no point in continuing
  // in fact if either number is set - then HINT_PAIR_NUMBERS will set the other to that number and no point in continuing as there won't be a further number to remove
  if (countNumbers1 === 1 || countNumbers2 === 1) {
    return [];
  }

  // look for numbers that can still place a pair here (same logic as HINT_PAIR_NUMBERS)
  NUMBERS.forEach((number) => {
    // count the number of cards of this number
    const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

    // count the number placed
    // note: this will not include any in pair, as the above will have found those
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    // so if we need at least 2 available after numberPlacedCount has been removed
    if (numberAvailableCount - numberPlacedCount >= 2) {
      numbersAvailable.push(number);
    }
  });

  // we should have at least one number, to be a valid solution (and likely two or more)
  if (!numbersAvailable.length) {
    console.error('getPairNumbersRestrictedBySuitHints could not find any numbers that have at least 2 cards available');
    return [];
  }

  // we want to restrict these to numbers for which a pair of that number can still be placed because of the suits still available for that number
  const numbersAvailableRestricted = [];
  numbersAvailable.forEach((number) => {
    if (canPairOfSuitsOfNumberFitIn(number, solutionHandsIndex, handOptionsIndex1, handOptionsIndex2, cardsAvailable, solutionOptions)) {
      numbersAvailableRestricted.push(number);
    }
  });

  // we should have at least one number, to be a valid solution
  if (!numbersAvailableRestricted.length) {
    console.error('getPairNumbersRestrictedBySuitHints could not find any numbers that have at least 2 cards available for which the suits fit in');
    return [];
  }

  // work through the two cards of the pair in this handOptions
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  [handOptionsIndex1, handOptionsIndex2].forEach((handOptionsIndex) => {
    // if any of the numbers still available in this cardOptions are not in numbersAvailable then we need a clue to restrict this card to numbersAvailable
    const cardOptionsNumbers = getNumbersFromCardOptions(handOptions[handOptionsIndex]);
    if (!allItemsFromFirstInSecond(cardOptionsNumbers, numbersAvailableRestricted)) {
      hints.push(createHintPairNumbersRestrictedBySuit(numbersAvailableRestricted, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ----------------------------------------------- //
// HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT //
// ----------------------------------------------- //

// create HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT
export const createHintThreeOfAKindNumbersRestrictedBySuit = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 3 or more cards of a number are available (either in cardsAvailable or already placed in position)
// then look to restrict to the numbers whose suits can still fit in
// note this applies to the 3 of a kind in a full house as well
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getThreeOfAKindNumbersRestrictedBySuitHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];
  const countNumbers1 = countNumbersInCardOptions(cardOptions1);
  const countNumbers2 = countNumbersInCardOptions(cardOptions2);
  const countNumbers3 = countNumbersInCardOptions(cardOptions3);

  // because we are working from a valid solution
  // if all of the three numbers are already set - then no point in continuing
  // in fact if any of the number are set - then HINT_THREE_OF_A_KIND_NUMBERS will set the other to that number and no point in continuing as there won't be a further number to remove
  if (countNumbers1 === 1 || countNumbers2 === 1 || countNumbers3 === 1) {
    return [];
  }

  // look for numbers that can still place three of a kind here (same logic as HINT_THREE_OF_A_KIND_NUMBERS)
  NUMBERS.forEach((number) => {
    // count the number of cards of this number
    const numberAvailableCount = countNumberAvailable(number, cardsAvailable);

    // count the number placed
    // note: this will not include any in the first three positions of this hand, as the above will have found those
    const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

    // so if we need at least 3 available after numberPlacedCount has been removed
    if (numberAvailableCount - numberPlacedCount >= 3) {
      numbersAvailable.push(number);
    }
  });

  // we should have at least one number, to be a valid solution (and more likely two or more)
  if (!numbersAvailable.length) {
    console.error('getThreeOfAKindNumbersRestrictedBySuitHints could not find any numbers that have at least 3 cards available');
    return [];
  }

  // we want to restrict these to numbers for which three of a kind of that number can still be placed because of the suits still available for that number
  const numbersAvailableRestricted = [];
  numbersAvailable.forEach((number) => {
    if (canThreeOfSuitsOfNumberFitIn(number, solutionHandsIndex, cardsAvailable, solutionOptions)) {
      numbersAvailableRestricted.push(number);
    }
  });

  // we should have at least one number, to be a valid solution
  if (!numbersAvailableRestricted.length) {
    console.error('getThreeOfAKindNumbersRestrictedBySuitHints could not find any numbers that have at least 3 cards available for which the suits fit in');
    return [];
  }

  // work through the three cards in this handOptions
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  [0, 1, 2].forEach((handOptionsIndex) => {
    // if any of the numbers still available in this cardOptions are not in numbersAvailable then we need a clue to restrict this card to numbersAvailable
    const cardOptionsNumbers = getNumbersFromCardOptions(handOptions[handOptionsIndex]);
    if (!allItemsFromFirstInSecond(cardOptionsNumbers, numbersAvailableRestricted)) {
      hints.push(createHintThreeOfAKindNumbersRestrictedBySuit(numbersAvailableRestricted, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// ------------------------------------------ //
// HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT //
// ------------------------------------------ //

// create HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT
export const createHintThreeOfAKindNumbersAllSameSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if all the possible numbers to make up the three of a kind all have the same three suits then we know the suits of the three cards due to the suit ordering
// note this applies to the 3 of a kind in a full house as well
export const getThreeOfAKindNumbersAllSameSuitHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];

  // get the numbers still possible from the first three positions
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  const numbers2 = getNumbersFromCardOptions(cardOptions2);
  const numbers3 = getNumbersFromCardOptions(cardOptions3);

  // get all the numbers that appear in any of these three arrays
  NUMBERS.forEach((number) => {
    if (numbers1.includes(number) || numbers2.includes(number) || numbers3.includes(number)) {
      numbersAvailable.push(number);
    }
  });

  // get the suits available for these available numbers that can still be placed in the first 3 positions
  const suits = getSuitsOfNumberAvailableForGivenCardsOfHand(numbersAvailable, cardsAvailable, solutionHandsIndex, solutionOptions, 0, 1, 2);

  // there should be at least 3
  if (suits.length < 3) {
    console.error(`getThreeOfAKindNumbersAllSameSuitHints needs at least 3 suits for numbers ${numbersAvailable} but got ${suits}`);
    return [];
  }

  // this hint only applies when just three suits are possible
  if (suits.length > 3) {
    return [];
  }

  // so we know these three suits must be in this order in the first three cards
  if (countSuitsInCardOptions(cardOptions1) > 1) {
    hints.push(createHintThreeOfAKindNumbersAllSameSuit(suits[0], solutionHandsIndex, 0, clue));
  }
  if (countSuitsInCardOptions(cardOptions2) > 1) {
    hints.push(createHintThreeOfAKindNumbersAllSameSuit(suits[1], solutionHandsIndex, 1, clue));
  }
  if (countSuitsInCardOptions(cardOptions3) > 1) {
    hints.push(createHintThreeOfAKindNumbersAllSameSuit(suits[2], solutionHandsIndex, 2, clue));
  }

  return hints;
};

// ------------------------------- //
// HINT_PAIR_NUMBERS_ALL_SAME_SUIT //
// ------------------------------- //

// create HINT_PAIR_NUMBERS_ALL_SAME_SUIT
export const createHintPairNumbersAllSameSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_PAIR_NUMBERS_ALL_SAME_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if all the possible numbers to make up the pair all have the same three suits then we know the suits of the pair cards due to the suit ordering
// note this applies to the pair in a full house and for the pairs of two pairs - the handOptions indexes are given
export const getPairNumbersAllSameSuitHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue, handOptionsIndex1, handOptionsIndex2) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[handOptionsIndex1];
  const cardOptions2 = handOptions[handOptionsIndex2];

  // get the numbers still possible from the two positions
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  const numbers2 = getNumbersFromCardOptions(cardOptions2);

  // get all the numbers that appear in either of these two arrays
  NUMBERS.forEach((number) => {
    if (numbers1.includes(number) || numbers2.includes(number)) {
      numbersAvailable.push(number);
    }
  });

  // get the suits available for these available numbers that can still be placed in the two positions
  const suits = getSuitsOfNumberAvailableForGivenCardsOfHand(numbersAvailable, cardsAvailable, solutionHandsIndex, solutionOptions, handOptionsIndex1, handOptionsIndex2);

  // there should be at least 2
  if (suits.length < 2) {
    console.error(`getPairNumbersAllSameSuitHints needs at least 2 suits for numbers ${numbersAvailable} but got ${suits}`);
    return [];
  }

  // this hint only applies when just two suits are possible
  if (suits.length > 2) {
    return [];
  }

  // so we know the two suits must be in this order in the two cards
  if (countSuitsInCardOptions(cardOptions1) > 1) {
    hints.push(createHintPairNumbersAllSameSuit(suits[0], solutionHandsIndex, handOptionsIndex1, clue));
  }
  if (countSuitsInCardOptions(cardOptions2) > 1) {
    hints.push(createHintPairNumbersAllSameSuit(suits[1], solutionHandsIndex, handOptionsIndex2, clue));
  }

  return hints;
};

// ---------------------------------------------- //
// HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL //
// ---------------------------------------------- //

// create HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL
export const createHintThreeOfAKindNumbersNumberNotInAll = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// any number currently possible in a three of a kind cardOptions must also be possible in all three cardOptions, if not remove it from any that still have it
// note this applies to the 3 of a kind in a full house as well
export const getThreeOfAKindNumbersNumberNotInAllHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[0];
  const cardOptions2 = handOptions[1];
  const cardOptions3 = handOptions[2];

  // get the numbers still possible from the first three positions
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  const numbers2 = getNumbersFromCardOptions(cardOptions2);
  const numbers3 = getNumbersFromCardOptions(cardOptions3);

  // get all the numbers that appear in any of these three arrays
  NUMBERS.forEach((number) => {
    if (numbers1.includes(number) || numbers2.includes(number) || numbers3.includes(number)) {
      numbersAvailable.push(number);
    }
  });

  // if we only have one number then the number for this three of a kind is already known and there is nothing for this hint to do
  if (numbersAvailable.length === 1) {
    return [];
  }

  // consider each number
  numbersAvailable.forEach((number) => {
    // if this number is not in all three cardOptions
    if (!getNumberOptionsValueInCardOptions(cardOptions1, number)
    || !getNumberOptionsValueInCardOptions(cardOptions2, number)
    || !getNumberOptionsValueInCardOptions(cardOptions3, number)) {
      // create hint to remove it from any that it is currently possible in
      if (getNumberOptionsValueInCardOptions(cardOptions1, number)) {
        hints.push(createHintThreeOfAKindNumbersNumberNotInAll(number, solutionHandsIndex, 0, clue));
      }
      if (getNumberOptionsValueInCardOptions(cardOptions2, number)) {
        hints.push(createHintThreeOfAKindNumbersNumberNotInAll(number, solutionHandsIndex, 1, clue));
      }
      if (getNumberOptionsValueInCardOptions(cardOptions3, number)) {
        hints.push(createHintThreeOfAKindNumbersNumberNotInAll(number, solutionHandsIndex, 2, clue));
      }
    }
  });

  return hints;
};

// ----------------------------------- //
// HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL //
// ----------------------------------- //

// create HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL
export const createHintPairNumbersNumberNotInAll = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// any number currently possible in a pair cardOptions must also be possible in both cardOptions, if not remove it from any (the other) that still have it
// note this applies to the pair in a full house and for the pairs of two pairs - the handOptions indexes are given
export const getPairNumbersNumberNotInAllHints = (solutionHandsIndex, solutionOptions, clue, handOptionsIndex1, handOptionsIndex2) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];
  const cardOptions1 = handOptions[handOptionsIndex1];
  const cardOptions2 = handOptions[handOptionsIndex2];

  // get the numbers still possible from the two positions
  const numbers1 = getNumbersFromCardOptions(cardOptions1);
  const numbers2 = getNumbersFromCardOptions(cardOptions2);

  // get all the numbers that appear in any of these two arrays
  NUMBERS.forEach((number) => {
    if (numbers1.includes(number) || numbers2.includes(number)) {
      numbersAvailable.push(number);
    }
  });

  // if we only have one number then the number for this pair is already known and there is nothing for this hint to do
  if (numbersAvailable.length === 1) {
    return [];
  }

  // consider each number
  numbersAvailable.forEach((number) => {
    // if this number is not in both cardOptions
    if (!getNumberOptionsValueInCardOptions(cardOptions1, number) || !getNumberOptionsValueInCardOptions(cardOptions2, number)) {
      // create hint to remove it from any that it is currently possible in
      if (getNumberOptionsValueInCardOptions(cardOptions1, number)) {
        hints.push(createHintPairNumbersNumberNotInAll(number, solutionHandsIndex, handOptionsIndex1, clue));
      }
      if (getNumberOptionsValueInCardOptions(cardOptions2, number)) {
        hints.push(createHintPairNumbersNumberNotInAll(number, solutionHandsIndex, handOptionsIndex2, clue));
      }
    }
  });

  return hints;
};

// ------------------------------------- //
// HINT_ALL_SUITS_OF_NUMBER_NOT_POSSIBLE //
// ------------------------------------- //

// create HINT_ALL_SUITS_OF_NUMBER_NOT_POSSIBLE
export const createHintAllSuitsOfNumberNotPossible = (number, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_ALL_SUITS_OF_NUMBER_NOT_POSSIBLE,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if none of the still available suits for a possible number of a cardOptions are possible in that cardOptions then the number cannot be placed here either, so remove the number
export const getAllSuitsOfNumberNotPossibleHints = (cardsStillAvailable, solutionOptions) => {
  const hints = [];

  // look at each cardOptions
  solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
    handOptions.forEach((cardOptions, handOptionsIndex) => {
      // only interested if there is more than one number still possible, as a placed number cannot be moved by this hint
      if (countNumbersInCardOptions(cardOptions) > 1 > 0) {
        // consider each number still allowed here
        const numbers = getNumbersFromCardOptions(cardOptions);
        numbers.forEach((number) => {
          // get the suits for this number left in cardsStillAvailable
          const suits = getSuitsOfNumberInAvailable(number, cardsStillAvailable);
          // if none of these suits are possible then create a hint to remove the number
          if (countWhichOfSuitsPossibleInCardOptions(suits, cardOptions) === 0) {
            hints.push(createHintAllSuitsOfNumberNotPossible(number, solutionOptionsIndex, handOptionsIndex));
          }
        });
      }
    });
  });

  return hints;
};

// ------------------------------------- //
// HINT_ALL_NUMBERS_OF_SUIT_NOT_POSSIBLE //
// ------------------------------------- //

// create HINT_ALL_NUMBERS_OF_SUIT_NOT_POSSIBLE
export const createHintAllNumbersOfSuitNotPossible = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_ALL_NUMBERS_OF_SUIT_NOT_POSSIBLE,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if none of the still available numbers for a possible suit of a cardOptions are possible in that cardOptions then the suit cannot be placed here either, so remove the suit
export const getAllNumbersOfSuitNotPossibleHints = (cardsStillAvailable, solutionOptions) => {
  const hints = [];

  // look at each cardOptions
  solutionOptions.forEach((handOptions, solutionOptionsIndex) => {
    handOptions.forEach((cardOptions, handOptionsIndex) => {
      // only interested if there is more than one suit still possible, as a placed suit cannot be moved by this hint
      if (countSuitsInCardOptions(cardOptions) > 1) {
        // consider each suit still allowed here
        const suits = getSuitsFromCardOptions(cardOptions);
        suits.forEach((suit) => {
          // get the numbers for this suit left in cardsStillAvailable
          const numbers = getNumbersOfSuitInAvailable(suit, cardsStillAvailable);
          // if none of these numbers are possible then create a hint to remove the suit
          if (countWhichOfNumbersPossibleInCardOptions(numbers, cardOptions) === 0) {
            hints.push(createHintAllNumbersOfSuitNotPossible(suit, solutionOptionsIndex, handOptionsIndex));
          }
        });
      }
    });
  });

  return hints;
};

// --------------- //
// HINT_FLUSH_SUIT //
// --------------- //

// create HINT_FLUSH_SUIT
export const createHintFlushSuit = (suit, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FLUSH_SUIT,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// create a hint to set the suit for the other cards in a flush, when a suit is already set for one of the cards, and other cards have additional suits still possible
export const getFlushSuitHints = (solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // Note: the following assumes that solutionOptions is valid - if one of the cards has a single suit placed, that suit is possible for the other cards

  // first look to see if a suit is set
  let suit;
  for (let i = 0; i < handOptions.length && suit === undefined; i += 1) {
    const cardOptions = handOptions[i];
    if (countSuitsInCardOptions(cardOptions) === 1) {
      suit = getFirstSuitSet(cardOptions);
    }
  }

  // if there is a suit - create a hint for any card that has more than 1 suit still possible
  if (suit) {
    for (let i = 0; i < handOptions.length; i += 1) {
      const cardOptions = handOptions[i];
      if (countSuitsInCardOptions(cardOptions) > 1) {
        hints.push(createHintFlushSuit(suit, solutionHandsIndex, i, clue));
      }
    }
  }

  return hints;
};

// ------------------------- //
// HINT_FLUSH_POSSIBLE_SUITS //
// ------------------------- //

// create HINT_FLUSH_POSSIBLE_SUITS
export const createHintFlushPossibleSuits = (suits, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FLUSH_POSSIBLE_SUITS,
  suits,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// only cards of these suits are still available to make a flush
// assumes 'FLUSH SUIT' hint already applied - so does nothing if a card has its suit set
// takes notice of suits not allowed for cards of this hand
export const getFlushPossibleSuitsHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // first look to see if a suit is set - if so, nothing for us to do
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];
    if (countSuitsInCardOptions(cardOptions) === 1) {
      return [];
    }
  }

  // we want to determine which suits are still possible because a) that suit is still possible in all 5 cards of this hand; and b) there are still 5 cards of this suit left to place
  const possibleSuitsInHandOptions = [];
  SUITS.forEach((suit) => {
    // if suit is possible in all cards then remember it
    if (suitPossibleInAllHandOptions(suit, handOptions)) {
      possibleSuitsInHandOptions.push(suit);
    }
  });

  // of these only keep those for which there are 5 or more cards of this suit not yet placed
  const possibleSuits = [];
  possibleSuitsInHandOptions.forEach((suit) => {
    // easy to count how many cards of this suit altogether
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
    const suitCardsAvailableCount = cardsAvailable[suitOptionsIndex].length;
    const suitPlacedCount = countSuitPlacedInSolutionOptions(suit, solutionOptions);
    // remember this suit cannot be placed in our cards at this point, so we can just say 5 or more that can still be placed are needed
    if (suitCardsAvailableCount - suitPlacedCount >= 5) {
      possibleSuits.push(suit);
    }
  });

  // now look in each cardOption to see if a clue is needed to restrict it to these possible suits
  for (let i = 0; i < handOptions.length; i += 1) {
    const cardOptions = handOptions[i];
    const cardOptionsSuits = getSuitsFromCardOptions(cardOptions);
    if (!allItemsFromFirstInSecond(cardOptionsSuits, possibleSuits)) {
      hints.push(createHintFlushPossibleSuits(possibleSuits, solutionHandsIndex, i, clue));
    }
  }

  return hints;
};

// ---------------------- //
// HINT_SORT_RULE_NUMBERS //
// ---------------------- //

// create HINT_SORT_RULE_NUMBERS
export const createHintSortRuleNumbers = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_SORT_RULE_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// for certain hand types, the numbers at certain indexes must obey the number sort order (e.g. for three of a kind card 4 must be higher than card 5)
// this hint removes numbers that break that sort rule
// note: this might produce hints to restrict some numbers, which next time round will generate more hints
export const getSortRuleNumbersHints = (solutionHandsIndex, solutionOptions, indexes, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // we move down the indexes in pairs, the numbers in the 2nd must be smaller than the maximum number in the first
  for (let i = 0; i < indexes.length - 1; i += 1) {
    const index1 = indexes[i];
    const index2 = indexes[i + 1];
    const cardOptions1 = handOptions[index1];
    const cardOptions2 = handOptions[index2];

    // all numbers in the 2nd must be smaller than the maximum number in the first
    const maxNumberIn1 = getMaxNumberInCardOptions(cardOptions1);
    const numbersToRemoveIn2 = [];
    NUMBERS_SORTED.forEach((number) => {
      if (cardNumberGE(number, maxNumberIn1) && isNumberTrueInCardOptions(number, cardOptions2)) {
        numbersToRemoveIn2.push(number);
      }
    });

    // create a clue to remove these numbers if we found at least one
    if (numbersToRemoveIn2.length) {
      hints.push(createHintSortRuleNumbers(numbersToRemoveIn2, solutionHandsIndex, index2, clue));
    }
  }

  // we now move up the indexes in pairs, all numbers in the 1st must be larger than the minimum number in the second
  for (let i = indexes.length - 2; i >= 0; i -= 1) {
    const index1 = indexes[i];
    const index2 = indexes[i + 1];
    const cardOptions1 = handOptions[index1];
    const cardOptions2 = handOptions[index2];

    // all numbers in the 1st must be larger than the minimum number in the second
    const minNumberIn2 = getMinNumberInCardOptions(cardOptions2);
    const numbersToRemoveIn1 = [];
    NUMBERS_SORTED.forEach((number) => {
      if (cardNumberLE(number, minNumberIn2) && isNumberTrueInCardOptions(number, cardOptions1)) {
        numbersToRemoveIn1.push(number);
      }
    });

    // create a clue to remove these numbers if we found at least one
    if (numbersToRemoveIn1.length) {
      hints.push(createHintSortRuleNumbers(numbersToRemoveIn1, solutionHandsIndex, index1, clue));
    }
  }

  return hints;
};

// ------------------------------------------ //
// HINT_ALL_SUIT_PLACED_ONLY_PLACE_FOR_NUMBER //
// ------------------------------------------ //

// create HINT_ALL_SUIT_PLACED_ONLY_PLACE_FOR_NUMBER
export const createHintAllSuitPlacedOnlyPlaceForNumber = (number, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_ALL_SUIT_PLACED_ONLY_PLACE_FOR_NUMBER,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if all of a suit is placed, and a number of a card of that suit can only go in one place, and is not yet placed there, then it must go there
export const getAllSuitPlacedOnlyPlaceForNumberHints = (cardsAvailable, solutionOptions) => {
  const hints = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same index into cards available
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    // easy to count the cards available for this suit - just the length
    const suitCardsAvailableCount = cardsAvailable[suitOptionsIndex].length;

    // how many cards in solutionOptions still allow this suit
    const countSuitTrue = countSuitTrueInSolutionOptions(solutionOptions, suitOptionsIndex);

    // this hint is used after HINT_SAME_COUNT_LEFT_SUIT, so if these counts are the same then all are placed for this suit
    if (suitCardsAvailableCount === countSuitTrue) {
      // go through each card available in this suit
      const suitCardsAvailable = cardsAvailable[suitOptionsIndex];
      suitCardsAvailable.forEach((card) => {
        // look through all cardOptions of the solutionOptions, noting where this card of this suit can still be placed
        const { number } = card;

        // remember that if this card is placed, then no hint is needed
        const cardCanBePlaced = [];
        let cardIsPlaced = false;
        for (let solutionOptionsIndex = 0; solutionOptionsIndex < solutionOptions.length && !cardIsPlaced; solutionOptionsIndex += 1) {
          const handOptions = solutionOptions[solutionOptionsIndex];
          for (let handOptionsIndex = 0; handOptionsIndex < handOptions.length && !cardIsPlaced; handOptionsIndex += 1) {
            const cardOptions = handOptions[handOptionsIndex];
            if (isCardPlacedInCardOptions(card, cardOptions)) {
              cardIsPlaced = true;
            } else if (isSuitPlacedInCardOptions(suit, cardOptions) && getNumberOptionsValueInCardOptions(cardOptions, number)) {
              // if the suit is placed and the number is possible, then note that this card can be placed where
              cardCanBePlaced.push({ solutionOptionsIndex, handOptionsIndex });
            }
          }
        }

        // if card wasn't placed, and only one place that it can be placed, then create the hint
        if (!cardIsPlaced && cardCanBePlaced.length === 1) {
          const { solutionOptionsIndex, handOptionsIndex } = cardCanBePlaced[0];
          hints.push(createHintAllSuitPlacedOnlyPlaceForNumber(number, solutionOptionsIndex, handOptionsIndex));
        }
      });
    }
  });

  return hints;
};

// --------- //
// get hints //
// --------- //

// get the next possible hints (being an array of hints of the same type)
export const getHints = (solutionOptions, solution, theClues, cardsAvailable, basicCluesOnly) => {
  const { solutionHands, missingNumber } = solution;

  // first check that solution options are valid
  if (!solutionOptionsValid(solutionOptions, solutionHands)) {
    // TODO - provide a way for the user to go back to the last good solutionOptions
    // for now just return no more hints
    return [];
  }

  // create our own copy of the clues, as we might add to the clues array later
  let clues = [...theClues];

  // first look through clues to process the basic clues, vis CLUE_NOT_SUIT CLUE_NOT_NUMBER
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType } = clue;

    // clue suit and number
    if (clueType === CLUE_SUIT_AND_NUMBER) {
      const {
        suit,
        number,
        solutionHandsIndex,
        handOptionsIndex,
      } = clue;
      const clueSuitAndNumberHints = getClueSuitAndNumberHints(suit, number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueSuitAndNumberHints.length) {
        return clueSuitAndNumberHints;
      }
    }

    // clue suit
    if (clueType === CLUE_SUIT) {
      const { suit, solutionHandsIndex, handOptionsIndex } = clue;
      const clueSuitHints = getClueSuitHints(suit, solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueSuitHints.length) {
        return clueSuitHints;
      }
    }

    // clue not suit
    if (clueType === CLUE_NOT_SUIT) {
      const { suit, solutionHandsIndex, handOptionsIndex } = clue;
      const clueNotSuitHints = getClueNotSuitHints(suit, solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueNotSuitHints.length) {
        return clueNotSuitHints;
      }
    }

    // clue number
    if (clueType === CLUE_NUMBER) {
      const { number, solutionHandsIndex, handOptionsIndex } = clue;
      const clueNumberHints = getClueNumberHints(number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueNumberHints.length) {
        return clueNumberHints;
      }
    }

    // clue not number
    if (clueType === CLUE_NOT_NUMBER) {
      const { number, solutionHandsIndex, handOptionsIndex } = clue;
      const clueNotNumberHints = getClueNotNumberHints(number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueNotNumberHints.length) {
        return clueNotNumberHints;
      }
    }

    // clue red suit
    if (clueType === CLUE_RED_SUIT) {
      const { solutionHandsIndex, handOptionsIndex } = clue;
      const clueRedSuitHints = getClueRedSuitHints(solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueRedSuitHints.length) {
        return clueRedSuitHints;
      }
    }

    // clue black suit
    if (clueType === CLUE_BLACK_SUIT) {
      const { solutionHandsIndex, handOptionsIndex } = clue;
      const clueBlackSuitHints = getClueBlackSuitHints(solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueBlackSuitHints.length) {
        return clueBlackSuitHints;
      }
    }

    // clue red suits
    if (clueType === CLUE_RED_SUITS) {
      const { solutionHandsIndex } = clue;
      const clueRedSuitsHints = getClueRedSuitsHints(solutionHandsIndex, solutionOptions, clue);
      if (clueRedSuitsHints.length) {
        return clueRedSuitsHints;
      }
    }

    // clue black suits
    if (clueType === CLUE_BLACK_SUITS) {
      const { solutionHandsIndex } = clue;
      const clueBlackSuitsHints = getClueBlackSuitsHints(solutionHandsIndex, solutionOptions, clue);
      if (clueBlackSuitsHints.length) {
        return clueBlackSuitsHints;
      }
    }

    // clue card even
    if (clueType === CLUE_CARD_EVEN) {
      const { solutionHandsIndex, handOptionsIndex } = clue;
      const clueCardEvenHints = getClueCardEvenHints(solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueCardEvenHints.length) {
        return clueCardEvenHints;
      }
    }

    // clue card odd
    if (clueType === CLUE_CARD_ODD) {
      const { solutionHandsIndex, handOptionsIndex } = clue;
      const clueCardOddHints = getClueCardOddHints(solutionHandsIndex, handOptionsIndex, solutionOptions, clue);
      if (clueCardOddHints.length) {
        return clueCardOddHints;
      }
    }

    // clue hand even
    if (clueType === CLUE_HAND_EVEN) {
      const { solutionHandsIndex } = clue;
      const clueHandEvenHints = getClueHandEvenHints(solutionHandsIndex, solutionOptions, clue);
      if (clueHandEvenHints.length) {
        return clueHandEvenHints;
      }
    }

    // clue hand odd
    if (clueType === CLUE_HAND_ODD) {
      const { solutionHandsIndex } = clue;
      const clueHandOddHints = getClueHandOddHints(solutionHandsIndex, solutionOptions, clue);
      if (clueHandOddHints.length) {
        return clueHandOddHints;
      }
    }

    // clue hand not number
    if (clueType === CLUE_HAND_NOT_NUMBER) {
      const { number, solutionHandsIndex } = clue;
      const clueHandNotNumberHints = getClueHandNotNumberHints(number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandNotNumberHints.length) {
        return clueHandNotNumberHints;
      }
    }

    // clue hand not suit
    if (clueType === CLUE_HAND_NOT_SUIT) {
      const { suit, solutionHandsIndex } = clue;
      const clueHandNotSuitHints = getClueHandNotSuitHints(suit, solutionHandsIndex, solutionOptions, clue);
      if (clueHandNotSuitHints.length) {
        return clueHandNotSuitHints;
      }
    }

    // clue hand lowest number
    if (clueType === CLUE_HAND_LOWEST_NUMBER) {
      const { number, solutionHandsIndex } = clue;
      const clueHandLowestNumberHints = getClueHandLowestNumberHints(number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandLowestNumberHints.length) {
        return clueHandLowestNumberHints;
      }
    }

    // clue hand highest number
    if (clueType === CLUE_HAND_HIGHEST_NUMBER) {
      const { number, solutionHandsIndex } = clue;
      const clueHandHighestNumberHints = getClueHandHighestNumberHints(number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandHighestNumberHints.length) {
        return clueHandHighestNumberHints;
      }
    }
  }

  // don't continue if we are only processing basic clues
  if (basicCluesOnly) {
    return [];
  }

  // see if number not used
  const numberNotUsedHints = getNumberNotUsedHints(solutionOptions, solutionHands, missingNumber);
  if (numberNotUsedHints.length) {
    return numberNotUsedHints;
  }

  // see if all n cards available for a number are placed for that number
  const allOfNumberPlacedHints = getAllOfNumberPlacedHints(cardsAvailable, solutionOptions);
  if (allOfNumberPlacedHints.length) {
    return allOfNumberPlacedHints;
  }

  // see if all n cards available for a suit are placed for that suit
  const allOfSuitPlacedHints = getAllOfSuitPlacedHints(cardsAvailable, solutionOptions);
  if (allOfSuitPlacedHints.length) {
    return allOfSuitPlacedHints;
  }

  // see if the solution options only the same count of cards of a suit left and not placed as there are cards of that suit in cardsAvailable
  const sameCountLeftSuitHints = getSameCountLeftSuitHints(cardsAvailable, solutionOptions);
  if (sameCountLeftSuitHints.length) {
    return sameCountLeftSuitHints;
  }

  // see if the solution options only the same count of cards of a number left and not placed as there are cards of that number in cardsAvailable
  const sameCountLeftNumberHints = getSameCountLeftNumberHints(cardsAvailable, solutionOptions);
  if (sameCountLeftNumberHints.length) {
    return sameCountLeftNumberHints;
  }

  // see if all of a suit is placed, and a number of a card of that suit can only go in one place, and is not yet placed there, then it must go there
  const allSuitPlacedOnlyPlaceForNumberHints = getAllSuitPlacedOnlyPlaceForNumberHints(cardsAvailable, solutionOptions);
  if (allSuitPlacedOnlyPlaceForNumberHints.length) {
    return allSuitPlacedOnlyPlaceForNumberHints;
  }

  // which of the cards available are still available after the solutionOptions have been considered
  const cardsStillAvailable = getCardsStillAvailable(cardsAvailable, solutionOptions);

  // see if a suit can be removed from a cardOptions because none of the still available numbers for that suit are possible in that cardOptions
  const allNumbersOfSuitNotPossibleHints = getAllNumbersOfSuitNotPossibleHints(cardsStillAvailable, solutionOptions);
  if (allNumbersOfSuitNotPossibleHints.length) {
    return allNumbersOfSuitNotPossibleHints;
  }

  // see if a number can be removed from a cardOptions because none of the still available suits for that number are possible in that cardOptions
  const allSuitsOfNumberNotPossibleHints = getAllSuitsOfNumberNotPossibleHints(cardsStillAvailable, solutionOptions);
  if (allSuitsOfNumberNotPossibleHints.length) {
    return allSuitsOfNumberNotPossibleHints;
  }

  // if n cards still available for a number, and solutionOptions has placed n cards of that number without the suit placed, then can restrict those cards to the suits of the still available for that number
  const allOfNumberPlacedSuitsHints = getAllOfNumberPlacedSuitsHints(cardsStillAvailable, solutionOptions);
  if (allOfNumberPlacedSuitsHints.length) {
    return allOfNumberPlacedSuitsHints;
  }

  // see if n cards available for a suit, and solutionOptions has placed n of that suit without the number placed, then can restrict those cards to the numbers of the still available for that suit
  const allOfSuitPlacedNumbersHints = getAllOfSuitPlacedNumbersHints(cardsStillAvailable, solutionOptions);
  if (allOfSuitPlacedNumbersHints.length) {
    return allOfSuitPlacedNumbersHints;
  }

  // see if a number from cards available is now used
  const numberUsedUpHints = getNumberUsedUpHints(cardsStillAvailable, cardsAvailable, solutionOptions);
  if (numberUsedUpHints.length) {
    return numberUsedUpHints;
  }

  // see if can remove suit in other card options for a placed card
  const placedCardRemoveSuitHints = getPlacedCardRemoveSuitHints(solutionOptions);
  if (placedCardRemoveSuitHints.length) {
    return placedCardRemoveSuitHints;
  }

  // see if can remove number in other card options for a placed card
  const placedCardRemoveNumberHints = getPlacedCardRemoveNumberHints(solutionOptions);
  if (placedCardRemoveNumberHints.length) {
    return placedCardRemoveNumberHints;
  }

  // add in any hand type clues we can deduce
  clues = addInDeducedCluesFromSolutionOptions(cardsStillAvailable, cardsAvailable, solutionOptions, clues);

  // look through all the other clue individually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;

    // clue hand has suit and number
    if (clueType === CLUE_HAND_HAS_SUIT_AND_NUMBER) {
      const { suit, number } = clue;
      const clueHandHasSuitAndNumberHints = getClueHandHasSuitAndNumberHints(suit, number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandHasSuitAndNumberHints.length) {
        return clueHandHasSuitAndNumberHints;
      }
    }

    // clue hand has number
    if (clueType === CLUE_HAND_HAS_NUMBER) {
      const { number } = clue;
      const clueHandHasNumberHints = getClueHandHasNumberHints(number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandHasNumberHints.length) {
        return clueHandHasNumberHints;
      }
    }

    // clue hand has suit
    if (clueType === CLUE_HAND_HAS_SUIT) {
      const { suit } = clue;
      const clueHandHasSuitHints = getClueHandHasSuitHints(suit, solutionHandsIndex, solutionOptions, clue);
      if (clueHandHasSuitHints.length) {
        return clueHandHasSuitHints;
      }
    }

    // clue hand not suit and number
    if (clueType === CLUE_HAND_NOT_SUIT_AND_NUMBER) {
      const { suit, number } = clue;
      // first look for cards from which we can remove the number if this suit is placed in that card
      const clueHandNotSuitAndNumberHintsRemoveNumber = getClueHandNotSuitAndNumberHintsRemoveNumber(suit, number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandNotSuitAndNumberHintsRemoveNumber.length) {
        return clueHandNotSuitAndNumberHintsRemoveNumber;
      }

      // and next look for cards from which we can remove the suit if this number is placed in that card
      const clueHandNotSuitAndNumberHintsRemoveSuit = getClueHandNotSuitAndNumberHintsRemoveSuit(suit, number, solutionHandsIndex, solutionOptions, clue);
      if (clueHandNotSuitAndNumberHintsRemoveSuit.length) {
        return clueHandNotSuitAndNumberHintsRemoveSuit;
      }
    }

    // clue: CLUE_CARDS_SAME_NUMBER
    if (clueType === CLUE_CARDS_SAME_NUMBER) {
      const {
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsSameNumberHints = getClueCardsSameNumberHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue);
      if (clueCardsSameNumberHints.length) {
        return clueCardsSameNumberHints;
      }

      // eslint-disable-next-line max-len
      const clueCardsSameNumberTwoNotAvailableHints = getClueCardsSameNumberTwoNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, cardsAvailable, solutionOptions, clue);
      if (clueCardsSameNumberTwoNotAvailableHints.length) {
        return clueCardsSameNumberTwoNotAvailableHints;
      }

      // if there is another CLUE_CARDS_SAME_NUMBER which involves either of these cards then we can do HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE
      // look forward from where we are
      for (let j = i + 1; j < clues.length; j += 1) {
        const clue2 = clues[j];
        const { clueType: clueType2 } = clue2;
        if (clueType2 === CLUE_CARDS_SAME_NUMBER) {
          const {
            solutionHandsIndex1: solutionHandsIndexClue21,
            handOptionsIndex1: handOptionsIndexClue21,
            solutionHandsIndex2: solutionHandsIndexClue22,
            handOptionsIndex2: handOptionsIndexClue22,
          } = clue2;

          if (solutionHandsIndex1 === solutionHandsIndexClue21 && handOptionsIndex1 === handOptionsIndexClue21) {
            // first card of both clues match
            // eslint-disable-next-line max-len
            const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue22, handOptionsIndexClue22, cardsAvailable, solutionOptions, clue, clue2);
            if (clueCardsSameNumberThreeNotAvailableHints.length) {
              return clueCardsSameNumberThreeNotAvailableHints;
            }
          }

          if (solutionHandsIndex2 === solutionHandsIndexClue21 && handOptionsIndex2 === handOptionsIndexClue21) {
            // second card of first clue matches first card of second clue
            // eslint-disable-next-line max-len
            const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue22, handOptionsIndexClue22, cardsAvailable, solutionOptions, clue, clue2);
            if (clueCardsSameNumberThreeNotAvailableHints.length) {
              return clueCardsSameNumberThreeNotAvailableHints;
            }
          }

          if (solutionHandsIndex1 === solutionHandsIndexClue22 && handOptionsIndex1 === handOptionsIndexClue22) {
            // first card of first clue matches second card of second clue
            // eslint-disable-next-line max-len
            const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue21, handOptionsIndexClue21, cardsAvailable, solutionOptions, clue, clue2);
            if (clueCardsSameNumberThreeNotAvailableHints.length) {
              return clueCardsSameNumberThreeNotAvailableHints;
            }
          }
        }
      }

      // now look to see if there is a HAND_OF_TYPE clue that relates to this, to check we have enough cards of that number to fulfill both clues
      for (let j = 0; j < clues.length; j += 1) {
        const clue2 = clues[j];
        const { clueType: clueType2 } = clue2;
        if (clueType2 === CLUE_HAND_OF_TYPE) {
          const {
            handType: handTypeClue2,
            solutionHandsIndex: solutionHandsIndexClue2,
          } = clue2;

          // first consider the case where 4 cards are needed for the same number into a three of a kind
          if (handTypeClue2 === HAND_TYPE_FULL_HOUSE || handTypeClue2 === HAND_TYPE_THREE_OF_A_KIND) {
            // if same number clue matches card 1, card 2 or card 3 of the hand type hand, then we need to check 4 cards are available
            // remember the same number clue can be either way around
            const part1Matches = (solutionHandsIndex1 === solutionHandsIndexClue2 && (handOptionsIndex1 === 0 || handOptionsIndex1 === 1 || handOptionsIndex1 === 2));
            if (part1Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberFourNotAvailableHints = getClueCardsSameNumberFourNotAvailableHints(solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue2, 0, solutionHandsIndexClue2, 1, solutionHandsIndexClue2, 2, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberFourNotAvailableHints.length) {
                return clueCardsSameNumberFourNotAvailableHints;
              }
            }

            const part2Matches = (solutionHandsIndex2 === solutionHandsIndexClue2 && (handOptionsIndex2 === 0 || handOptionsIndex2 === 1 || handOptionsIndex2 === 2));
            if (part2Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberFourNotAvailableHints = getClueCardsSameNumberFourNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndexClue2, 0, solutionHandsIndexClue2, 1, solutionHandsIndexClue2, 2, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberFourNotAvailableHints.length) {
                return clueCardsSameNumberFourNotAvailableHints;
              }
            }
          }

          // now consider where 3 cards are needed for the same number into a pair - this case covers a pair, and the first pair of two pair
          if (handTypeClue2 === HAND_TYPE_PAIR || handTypeClue2 === HAND_TYPE_TWO_PAIR) {
            // if same number clue matches card 1 or card 2 of the hand type hand, then we need to check 3 cards are available
            // remember the same number clue can be either way around
            const part1Matches = (solutionHandsIndex1 === solutionHandsIndexClue2 && (handOptionsIndex1 === 0 || handOptionsIndex1 === 1));
            if (part1Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue2, 0, solutionHandsIndexClue2, 1, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberThreeNotAvailableHints.length) {
                return clueCardsSameNumberThreeNotAvailableHints;
              }
            }

            const part2Matches = (solutionHandsIndex2 === solutionHandsIndexClue2 && (handOptionsIndex2 === 0 || handOptionsIndex2 === 1));
            if (part2Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndexClue2, 0, solutionHandsIndexClue2, 1, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberThreeNotAvailableHints.length) {
                return clueCardsSameNumberThreeNotAvailableHints;
              }
            }
          }

          // now consider where 3 cards are needed for the same number into a pair - this case the second pair of two pair
          if (handTypeClue2 === HAND_TYPE_TWO_PAIR) {
            // if same number clue matches card 1 or card 2 of the hand type hand, then we need to check 3 cards are available
            // remember the same number clue can be either way around
            const part1Matches = (solutionHandsIndex1 === solutionHandsIndexClue2 && (handOptionsIndex1 === 2 || handOptionsIndex1 === 3));
            if (part1Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue2, 2, solutionHandsIndexClue2, 3, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberThreeNotAvailableHints.length) {
                return clueCardsSameNumberThreeNotAvailableHints;
              }
            }

            const part2Matches = (solutionHandsIndex2 === solutionHandsIndexClue2 && (handOptionsIndex2 === 2 || handOptionsIndex2 === 3));
            if (part2Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndexClue2, 2, solutionHandsIndexClue2, 3, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberThreeNotAvailableHints.length) {
                return clueCardsSameNumberThreeNotAvailableHints;
              }
            }
          }

          // now consider where 3 cards are needed for the same number into a pair - this case the pair of a full house
          if (handTypeClue2 === HAND_TYPE_FULL_HOUSE) {
            // if same number clue matches card 1 or card 2 of the hand type hand, then we need to check 3 cards are available
            // remember the same number clue can be either way around
            const part1Matches = (solutionHandsIndex1 === solutionHandsIndexClue2 && (handOptionsIndex1 === 3 || handOptionsIndex1 === 4));
            if (part1Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue2, 3, solutionHandsIndexClue2, 4, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberThreeNotAvailableHints.length) {
                return clueCardsSameNumberThreeNotAvailableHints;
              }
            }

            const part2Matches = (solutionHandsIndex2 === solutionHandsIndexClue2 && (handOptionsIndex2 === 3 || handOptionsIndex2 === 4));
            if (part2Matches) {
              // eslint-disable-next-line max-len
              const clueCardsSameNumberThreeNotAvailableHints = getClueCardsSameNumberThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndexClue2, 3, solutionHandsIndexClue2, 4, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameNumberThreeNotAvailableHints.length) {
                return clueCardsSameNumberThreeNotAvailableHints;
              }
            }
          }
        }
      }
    }

    // clue: CLUE_CARDS_NOT_SAME_NUMBER
    if (clueType === CLUE_CARDS_NOT_SAME_NUMBER) {
      const {
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsNotSameNumberHints = getClueCardsNotSameNumberHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue);
      if (clueCardsNotSameNumberHints.length) {
        return clueCardsNotSameNumberHints;
      }
    }

    // clue: CLUE_CARDS_NUMBER_HIGHER_THAN
    if (clueType === CLUE_CARDS_NUMBER_HIGHER_THAN) {
      const {
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsNumberHigherThanHints = getClueCardsNumberHigherThanHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue);
      if (clueCardsNumberHigherThanHints.length) {
        return clueCardsNumberHigherThanHints;
      }
    }

    // clue: CLUE_CARDS_LOWER_HIGHER_THAN
    if (clueType === CLUE_CARDS_NUMBER_LOWER_THAN) {
      const {
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsNumberHigherThanHints = getClueCardsNumberHigherThanHints(solutionHandsIndex2, handOptionsIndex2, solutionHandsIndex1, handOptionsIndex1, solutionOptions, clue);
      if (clueCardsNumberHigherThanHints.length) {
        return clueCardsNumberHigherThanHints;
      }
    }

    // clue: CLUE_CARDS_NUMBER_N_HIGHER_THAN
    if (clueType === CLUE_CARDS_NUMBER_N_HIGHER_THAN) {
      const {
        number,
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsNumberNHigherThanHints = getClueCardsNumberNHigherThanHints(number, solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue);
      if (clueCardsNumberNHigherThanHints.length) {
        return clueCardsNumberNHigherThanHints;
      }
    }

    // clue: CLUE_CARDS_NUMBER_N_LOWER_THAN
    if (clueType === CLUE_CARDS_NUMBER_N_LOWER_THAN) {
      const {
        number,
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsNumberNHigherThanHints = getClueCardsNumberNHigherThanHints(number, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndex1, handOptionsIndex1, solutionOptions, clue);
      if (clueCardsNumberNHigherThanHints.length) {
        return clueCardsNumberNHigherThanHints;
      }
    }

    // clue: CLUE_CARDS_SAME_SUIT
    if (clueType === CLUE_CARDS_SAME_SUIT) {
      const {
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsSameSuitHints = getClueCardsSameSuitHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue);
      if (clueCardsSameSuitHints.length) {
        return clueCardsSameSuitHints;
      }

      // eslint-disable-next-line max-len
      const clueCardsSameSuitTwoNotAvailableHints = getClueCardsSameSuitTwoNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, cardsAvailable, solutionOptions, clue);
      if (clueCardsSameSuitTwoNotAvailableHints.length) {
        return clueCardsSameSuitTwoNotAvailableHints;
      }

      // if there is another CLUE_CARDS_SAME_SUIT which involves either of these cards then we can do HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE
      // look forward from where we are
      for (let j = i + 1; j < clues.length; j += 1) {
        const clue2 = clues[j];
        const { clueType: clueType2 } = clue2;
        if (clueType2 === CLUE_CARDS_SAME_SUIT) {
          const {
            solutionHandsIndex1: solutionHandsIndexClue21,
            handOptionsIndex1: handOptionsIndexClue21,
            solutionHandsIndex2: solutionHandsIndexClue22,
            handOptionsIndex2: handOptionsIndexClue22,
          } = clue2;

          if (solutionHandsIndex1 === solutionHandsIndexClue21 && handOptionsIndex1 === handOptionsIndexClue21) {
            // first card of both clues match
            // eslint-disable-next-line max-len
            const clueCardsSameSuitThreeNotAvailableHints = getClueCardsSameSuitThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue22, handOptionsIndexClue22, cardsAvailable, solutionOptions, clue, clue2);
            if (clueCardsSameSuitThreeNotAvailableHints.length) {
              return clueCardsSameSuitThreeNotAvailableHints;
            }
          }

          if (solutionHandsIndex2 === solutionHandsIndexClue21 && handOptionsIndex2 === handOptionsIndexClue21) {
            // second card of first clue matches first card of second clue
            // eslint-disable-next-line max-len
            const clueCardsSameSuitThreeNotAvailableHints = getClueCardsSameSuitThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue22, handOptionsIndexClue22, cardsAvailable, solutionOptions, clue, clue2);
            if (clueCardsSameSuitThreeNotAvailableHints.length) {
              return clueCardsSameSuitThreeNotAvailableHints;
            }
          }

          if (solutionHandsIndex1 === solutionHandsIndexClue22 && handOptionsIndex1 === handOptionsIndexClue22) {
            // first card of first clue matches second card of second clue
            // eslint-disable-next-line max-len
            const clueCardsSameSuitThreeNotAvailableHints = getClueCardsSameSuitThreeNotAvailableHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionHandsIndexClue21, handOptionsIndexClue21, cardsAvailable, solutionOptions, clue, clue2);
            if (clueCardsSameSuitThreeNotAvailableHints.length) {
              return clueCardsSameSuitThreeNotAvailableHints;
            }
          }
        }
      }

      // now look to see if there is a HAND_OF_TYPE clue that relates to this, to check we have enough cards of that number to fulfill both clues
      for (let j = 0; j < clues.length; j += 1) {
        const clue2 = clues[j];
        const { clueType: clueType2 } = clue2;
        if (clueType2 === CLUE_HAND_OF_TYPE) {
          const {
            handType: handTypeClue2,
            solutionHandsIndex: solutionHandsIndexClue2,
          } = clue2;

          // consider the case where 6 cards are needed for the same suit in a straight flush or flush
          if (handTypeClue2 === HAND_TYPE_STRAIGHT_FLUSH || handTypeClue2 === HAND_TYPE_FLUSH) {
            // if same suit clue matches then straight flush/flush hand, then we need to check 6 cards are available
            // remember the hand/card of the same suit clue that matches the straight flush/flush hand can be either of the two cards in the same suit clue
            const part1Matches = (solutionHandsIndex1 === solutionHandsIndexClue2);
            if (part1Matches) {
              const clueCardsSameSuitSixNotAvailableHints = getClueCardsSameSuitSixNotAvailableHints(solutionHandsIndexClue2, solutionHandsIndex2, handOptionsIndex2, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameSuitSixNotAvailableHints.length) {
                return clueCardsSameSuitSixNotAvailableHints;
              }
            }

            const part2Matches = (solutionHandsIndex2 === solutionHandsIndexClue2);
            if (part2Matches) {
              const clueCardsSameSuitSixNotAvailableHints = getClueCardsSameSuitSixNotAvailableHints(solutionHandsIndexClue2, solutionHandsIndex1, handOptionsIndex1, cardsAvailable, solutionOptions, clue, clue2);
              if (clueCardsSameSuitSixNotAvailableHints.length) {
                return clueCardsSameSuitSixNotAvailableHints;
              }
            }
          }
        }
      }
    }

    // clue: CLUE_CARDS_NOT_SAME_SUIT
    if (clueType === CLUE_CARDS_NOT_SAME_SUIT) {
      const {
        solutionHandsIndex1,
        handOptionsIndex1,
        solutionHandsIndex2,
        handOptionsIndex2,
      } = clue;
      const clueCardsNotSameSuitHints = getClueCardsNotSameSuitHints(solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2, solutionOptions, clue);
      if (clueCardsNotSameSuitHints.length) {
        return clueCardsNotSameSuitHints;
      }
    }

    // hand type clue: HAND_TYPE_STRAIGHT_FLUSH
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_STRAIGHT_FLUSH) {
      const straightNumberKnownHints = getStraightNumberKnownHints(solutionHandsIndex, solutionOptions, clue);
      if (straightNumberKnownHints.length) {
        return straightNumberKnownHints;
      }

      const noStraightFlushInSuitHints = getNoStraightFlushInSuitHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (noStraightFlushInSuitHints.length) {
        return noStraightFlushInSuitHints;
      }

      const flushSuitHints = getFlushSuitHints(solutionHandsIndex, solutionOptions, clue);
      if (flushSuitHints.length) {
        return flushSuitHints;
      }

      const flushPossibleSuitsHints = getFlushPossibleSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (flushPossibleSuitsHints.length) {
        return flushPossibleSuitsHints;
      }

      const noStraightFlushInNumberHints = getNoStraightFlushInNumberHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (noStraightFlushInNumberHints.length) {
        return noStraightFlushInNumberHints;
      }
    }

    // hand of type clue: HAND_TYPE_FOUR_OF_A_KIND
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FOUR_OF_A_KIND) {
      const fourOfAKindSuitHints = getFourOfAKindSuitHints(solutionHandsIndex, solutionOptions, clue);
      if (fourOfAKindSuitHints.length) {
        return fourOfAKindSuitHints;
      }

      const fourOfAKindNumberHints = getFourOfAKindNumbersHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fourOfAKindNumberHints.length) {
        return fourOfAKindNumberHints;
      }
    }

    // hand type clue: HAND_TYPE_FULL_HOUSE
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FULL_HOUSE) {
      const threeOfAKindNumbersHints = getThreeOfAKindNumbersHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersHints.length) {
        return threeOfAKindNumbersHints;
      }

      const threeOfAKindSuitsHints = getThreeOfAKindSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindSuitsHints.length) {
        return threeOfAKindSuitsHints;
      }

      const threeOfAKindNumbersNumberNotInAllHints = getThreeOfAKindNumbersNumberNotInAllHints(solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersNumberNotInAllHints.length) {
        return threeOfAKindNumbersNumberNotInAllHints;
      }

      const threeOfAKindNumbersAllSameSuitHints = getThreeOfAKindNumbersAllSameSuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersAllSameSuitHints.length) {
        return threeOfAKindNumbersAllSameSuitHints;
      }

      const pairNumbersHints = getPairNumbersHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 3, 4);
      if (pairNumbersHints.length) {
        return pairNumbersHints;
      }

      const pairSuitsHints = getPairSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 3, 4);
      if (pairSuitsHints.length) {
        return pairSuitsHints;
      }

      const pairNumbersNumberNotInAllHints = getPairNumbersNumberNotInAllHints(solutionHandsIndex, solutionOptions, clue, 3, 4);
      if (pairNumbersNumberNotInAllHints.length) {
        return pairNumbersNumberNotInAllHints;
      }

      const pairNumbersAllSameSuitHints = getPairNumbersAllSameSuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 3, 4);
      if (pairNumbersAllSameSuitHints.length) {
        return pairNumbersAllSameSuitHints;
      }

      const threeOfAKindNumbersRestrictedBySuitHints = getThreeOfAKindNumbersRestrictedBySuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersRestrictedBySuitHints.length) {
        return threeOfAKindNumbersRestrictedBySuitHints;
      }

      const pairNumbersRestrictedBySuitHints = getPairNumbersRestrictedBySuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 3, 4);
      if (pairNumbersRestrictedBySuitHints.length) {
        return pairNumbersRestrictedBySuitHints;
      }
    }

    // hand type clue: HAND_TYPE_FLUSH
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FLUSH) {
      const flushSuitHints = getFlushSuitHints(solutionHandsIndex, solutionOptions, clue);
      if (flushSuitHints.length) {
        return flushSuitHints;
      }

      const flushPossibleSuitsHints = getFlushPossibleSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (flushPossibleSuitsHints.length) {
        return flushPossibleSuitsHints;
      }

      const sortRuleNumbersHints = getSortRuleNumbersHints(solutionHandsIndex, solutionOptions, [0, 1, 2, 3, 4], clue);
      if (sortRuleNumbersHints.length) {
        return sortRuleNumbersHints;
      }
    }

    // hand type clue: HAND_TYPE_STRAIGHT
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_STRAIGHT) {
      const straightNumberKnownHints = getStraightNumberKnownHints(solutionHandsIndex, solutionOptions, clue);
      if (straightNumberKnownHints.length) {
        return straightNumberKnownHints;
      }

      const noStraightInNumberHints = getNoStraightInNumberHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (noStraightInNumberHints.length) {
        return noStraightInNumberHints;
      }
    }

    // hand type clue: HAND_TYPE_THREE_OF_A_KIND
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_THREE_OF_A_KIND) {
      const threeOfAKindNumbersHints = getThreeOfAKindNumbersHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersHints.length) {
        return threeOfAKindNumbersHints;
      }

      const threeOfAKindSuitsHints = getThreeOfAKindSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindSuitsHints.length) {
        return threeOfAKindSuitsHints;
      }

      const threeOfAKindNumbersNumberNotInAllHints = getThreeOfAKindNumbersNumberNotInAllHints(solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersNumberNotInAllHints.length) {
        return threeOfAKindNumbersNumberNotInAllHints;
      }

      const threeOfAKindNumbersAllSameSuitHints = getThreeOfAKindNumbersAllSameSuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersAllSameSuitHints.length) {
        return threeOfAKindNumbersAllSameSuitHints;
      }

      const threeOfAKindNumbersRestrictedBySuitHints = getThreeOfAKindNumbersRestrictedBySuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (threeOfAKindNumbersRestrictedBySuitHints.length) {
        return threeOfAKindNumbersRestrictedBySuitHints;
      }

      const sortRuleNumbersHints = getSortRuleNumbersHints(solutionHandsIndex, solutionOptions, [3, 4], clue);
      if (sortRuleNumbersHints.length) {
        return sortRuleNumbersHints;
      }
    }

    // hand type clue: HAND_TYPE_TWO_PAIR
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_TWO_PAIR) {
      const pairNumbersHints1 = getPairNumbersHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersHints1.length) {
        return pairNumbersHints1;
      }

      const pairSuitsHints1 = getPairSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairSuitsHints1.length) {
        return pairSuitsHints1;
      }

      const pairNumbersNumberNotInAllHints1 = getPairNumbersNumberNotInAllHints(solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersNumberNotInAllHints1.length) {
        return pairNumbersNumberNotInAllHints1;
      }

      const pairNumbersAllSameSuitHints1 = getPairNumbersAllSameSuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersAllSameSuitHints1.length) {
        return pairNumbersAllSameSuitHints1;
      }

      const pairNumbersHints2 = getPairNumbersHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 2, 3);
      if (pairNumbersHints2.length) {
        return pairNumbersHints2;
      }

      const pairSuitsHints2 = getPairSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 2, 3);
      if (pairSuitsHints2.length) {
        return pairSuitsHints2;
      }

      const pairNumbersNumberNotInAllHints2 = getPairNumbersNumberNotInAllHints(solutionHandsIndex, solutionOptions, clue, 2, 3);
      if (pairNumbersNumberNotInAllHints2.length) {
        return pairNumbersNumberNotInAllHints2;
      }

      const pairNumbersAllSameSuitHints2 = getPairNumbersAllSameSuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 2, 3);
      if (pairNumbersAllSameSuitHints2.length) {
        return pairNumbersAllSameSuitHints2;
      }

      const pairNumbersRestrictedBySuitHints1 = getPairNumbersRestrictedBySuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersRestrictedBySuitHints1.length) {
        return pairNumbersRestrictedBySuitHints1;
      }

      const pairNumbersRestrictedBySuitHints2 = getPairNumbersRestrictedBySuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 2, 3);
      if (pairNumbersRestrictedBySuitHints2.length) {
        return pairNumbersRestrictedBySuitHints2;
      }
    }

    // hand type clue: HAND_TYPE_PAIR
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_PAIR) {
      const pairNumbersHints = getPairNumbersHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersHints.length) {
        return pairNumbersHints;
      }

      const pairSuitsHints = getPairSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairSuitsHints.length) {
        return pairSuitsHints;
      }

      const pairNumbersNumberNotInAllHints = getPairNumbersNumberNotInAllHints(solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersNumberNotInAllHints.length) {
        return pairNumbersNumberNotInAllHints;
      }

      const pairNumbersAllSameSuitHints = getPairNumbersAllSameSuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersAllSameSuitHints.length) {
        return pairNumbersAllSameSuitHints;
      }

      const pairNumbersRestrictedBySuitHints = getPairNumbersRestrictedBySuitHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue, 0, 1);
      if (pairNumbersRestrictedBySuitHints.length) {
        return pairNumbersRestrictedBySuitHints;
      }

      const sortRuleNumbersHints = getSortRuleNumbersHints(solutionHandsIndex, solutionOptions, [2, 3, 4], clue);
      if (sortRuleNumbersHints.length) {
        return sortRuleNumbersHints;
      }
    }

    // hand type clue: HAND_TYPE_HIGH_CARD
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_HIGH_CARD) {
      const sortRuleNumbersHints = getSortRuleNumbersHints(solutionHandsIndex, solutionOptions, [0, 1, 2, 3, 4], clue);
      if (sortRuleNumbersHints.length) {
        return sortRuleNumbersHints;
      }
    }
  }

  // no other hints yet
  return [];
};
