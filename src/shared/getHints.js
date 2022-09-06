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
  allNumbersFromFirstInSecond,
  isAnotherSuitSetInCardOptions,
  isAnotherNumberSetInCardOptions,
  canPairOfSuitsOfNumberFitIn,
  canThreeOfSuitsOfNumberFitIn,
  getSuitsOfNumberAvailableForGivenCardsOfHand,
} from './solution-functions';

import {
  sortedSuitCardsContainStraight,
  createCard,
  sortSuit,
} from './card-functions';

import {
  NUMBERS,
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
  CLUE_SUIT,
  CLUE_NOT_SUIT,
  CLUE_NUMBER,
  CLUE_NOT_NUMBER,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_PAIR,
  HAND_TYPE_TWO_PAIR,
  HINT_NUMBER_NOT_USED,
  HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
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
  HINT_CLUE_SUIT,
  HINT_CLUE_NOT_SUIT,
  HINT_CLUE_NUMBER,
  HINT_CLUE_NOT_NUMBER,
  HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT,
  HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT,
  HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT,
  HINT_PAIR_NUMBERS_ALL_SAME_SUIT,
  HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL,
  HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL,
} from './constants';

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

// get the hints for the suits that cannot make a straight flush
export const getSuitsWithoutStraightFlushHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same as cards still available index, to find the suits available cards
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    let suitCardsAvailable = [...cardsStillAvailable[suitOptionsIndex]];

    const handOptions = solutionOptions[solutionHandsIndex];

    let needToSortAgain = false;

    // need to add back in in any cards that are already placed - as they are excluded from cardsStillAvailable
    [0, 1, 2, 3, 4].forEach((handOptionsIndex) => {
      const cardOptions = handOptions[handOptionsIndex];
      if (isCardOptionsAPlacedCard(cardOptions)) {
        const setSuit = getFirstSuitSet(cardOptions);
        // only interested if this is for our suit
        if (setSuit === suit) {
          suitCardsAvailable.push(createCard(suit, getFirstNumberSet(cardOptions)));
          needToSortAgain = true;
        }
      }
    });

    if (needToSortAgain) {
      // we added a card to the end, so we need to sort again
      suitCardsAvailable = sortSuit(suitCardsAvailable);
    }

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
    if (!allNumbersFromFirstInSecond(cardOptionsNumbers, numbersAvailable)) {
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
    if (!allNumbersFromFirstInSecond(cardOptionsNumbers, numbersAvailable)) {
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
    if (!allNumbersFromFirstInSecond(cardOptionsNumbers, numbersAvailable)) {
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

// if the named card does not have this suit as the placed still then create a HINT_CLUE_SUIT hint to place it
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

  if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex) && countSuitsInCardOptions(cardOptions) > 1) {
    hints.push(createHintClueNotSuit(suit, solutionHandsIndex, handOptionsIndex, clue));
  }

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

// if the named card still allows the suit then create a HINT_CLUE_NOT_NUMBER hint to remove it
export const getClueNotNumberHints = (number, solutionHandsIndex, handOptionsIndex, solutionOptions, clue) => {
  const hints = [];

  // just one card to look at
  const cardOptions = solutionOptions[solutionHandsIndex][handOptionsIndex];

  if (getNumberOptionsValueInCardOptions(cardOptions, number) && countNumbersInCardOptions(cardOptions) > 1) {
    hints.push(createHintClueNotNumber(number, solutionHandsIndex, handOptionsIndex, clue));
  }

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

  // if we don't have two or more numbers, then no chance of restricting anything
  if (numbersAvailable.length < 2) {
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
    if (!allNumbersFromFirstInSecond(cardOptionsNumbers, numbersAvailableRestricted)) {
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

  // if we don't have three or more numbers, then no chance of restricting anything
  if (numbersAvailable.length < 3) {
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
    if (!allNumbersFromFirstInSecond(cardOptionsNumbers, numbersAvailableRestricted)) {
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

// --------- //
// get hints //
// --------- //

// get the next possible hints (being an array of hints of the same type)
export const getHints = (solutionOptions, solution, clues, cardsAvailable) => {
  const { solutionHands, missingNumber } = solution;

  // first check that solution options are valid
  if (!solutionOptionsValid(solutionOptions, solutionHands)) {
    // TODO - provide a way for the user to go back to the last good solutionOptions
    // for now just return no more hints
    return [];
  }

  // see if number not used
  const numberNotUsedHints = getNumberNotUsedHints(solutionOptions, solutionHands, missingNumber);
  if (numberNotUsedHints.length) {
    return numberNotUsedHints;
  }

  // first look through clues to process the basic clues, vis CLUE_NOT_SUIT CLUE_NOT_NUMBER
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType } = clue;

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

  // which of the cards available are still available after the solutionOptions have been considered
  const cardsStillAvailable = getCardsStillAvailable(cardsAvailable, solutionOptions);

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

  // look through each clue individually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;

    // hand type clue: straight flush (which has to be for the first hand, but we don't care about that actually)
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_STRAIGHT_FLUSH) {
      const suitsWithoutStraightFlushHints = getSuitsWithoutStraightFlushHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (suitsWithoutStraightFlushHints.length) {
        return suitsWithoutStraightFlushHints;
      }
    }

    // hand of type clue: four of a kind
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

    // hand type clue: full house
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

    // hand type clue: flush
    // TODO

    // hand type clue: straight
    // TODO

    // hand type clue: three of a kind
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
    }

    // hand type clue: two pair
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

    // hand type clue: pair
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
    }

    // hand type clue: high card
    // TODO
  }

  // no other hints yet
  return [];
};
