// ****************************** //
// getHints and support functions //
// ****************************** //

import {
  getNumbersNotUsedInSolution,
  convertSuitToSuitOptionsIndex,
  getCardsStillAvailable,
  getSuitOptionsValue,
  countSuitTrueInSolutionOptions,
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
  countNumberPlacedInSolutionOptions,
  getSuitsOfNumberInAvailable,
} from './solution-functions';

import {
  sortedSuitCardsContainStraight,
  createCard,
  sortSuit,
} from './card-functions';

import {
  SUITS,
  HAND_TYPE_STRAIGHT_FLUSH,
  HINT_NUMBER_NOT_USED,
  HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
  HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS,
  HINT_FOUR_OF_A_KIND_NUMBERS,
  CLUE_HAND_OF_TYPE,
  HAND_TYPE_FOUR_OF_A_KIND,
  NUMBERS,
  SUIT_SPADES,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  HINT_FOUR_OF_A_KIND_SUIT,
  HINT_PLACED_CARD_REMOVE_SUIT,
  HINT_PLACED_CARD_REMOVE_NUMBER,
  HINT_NUMBER_USED_UP,
  HINT_ALL_OF_SUIT_PLACED,
  HINT_ALL_OF_NUMBER_PLACED,
  HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_THREE_OF_A_KIND,
  HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS,
  HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS,
  INDEX_SUIT_SPADES,
  INDEX_SUIT_HEARTS,
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

// ------------------------------------------ //
// HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS //
// ------------------------------------------ //

// create HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS
export const createHintSameNSuitCardsInSolutionOptions = (suit, solutionOptionsIndex, handOptionsIndex) => ({
  hintType: HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS,
  suit,
  solutionOptionsIndex,
  handOptionsIndex,
});

// if there are n cards of a suit in cardsAvailable and also only n cards in solutionOptions with that suit option
// then all those cards must be that suit
export const getSameNSuitCardsInSolutionOptionsHints = (cardsAvailable, solutionOptions) => {
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
            hints.push(createHintSameNSuitCardsInSolutionOptions(suit, solutionOptionsIndex, handOptionsIndex));
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

// if there are 4 cards of a number in cardsStillAvailable then we can create hints for the S H D C suits of this four of a kind
export const getFourOfAKindSuitHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // Note: the following assumes that solutionOptions is valid - if cardOptions suitOptions true bool count was 1, then it must be the suit in question

  // if first card has more than one suit available then create hint to set to S
  if (countSuitsInCardOptions(handOptions[0]) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_SPADES, solutionHandsIndex, 0, clue));
  }

  // if second card has more than one suit available then create hint to set to H
  if (countSuitsInCardOptions(handOptions[1]) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_HEARTS, solutionHandsIndex, 1, clue));
  }

  // if first card has more than one suit available then create hint to set to D
  if (countSuitsInCardOptions(handOptions[2]) > 1) {
    hints.push(createHintFourOfAKindSuit(SUIT_DIAMONDS, solutionHandsIndex, 2, clue));
  }

  // if first card has more than one suit available then create hint to set to C
  if (countSuitsInCardOptions(handOptions[3]) > 1) {
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

  // because we are working from a valid solution
  // if one of the first 4 cards has a single number set then that must be the number for the other cards in the first 4 positions
  if (countNumbersInCardOptions(handOptions[0]) === 1) {
    // first card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[0]));
  } else if (countNumbersInCardOptions(handOptions[1]) === 1) {
    // second card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[1]));
  } else if (countNumbersInCardOptions(handOptions[2]) === 1) {
    // third card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[2]));
  } else if (countNumbersInCardOptions(handOptions[3]) === 1) {
    // fourth card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[3]));
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
  // we don't create a hint if the number of numbers currently available in that numberOption is the same as our numbers
  // note this relies on solutionOptions being valid here - that is, those numbers are the same numbers as we've found - as we are working with a valid solutionOptions

  // work through the first four cards in this handOptions
  [0, 1, 2, 3].forEach((handOptionsIndex) => {
    // if more than this number is allowed, then create the hint to set this card to this number - to remove the others
    // Note: the following assumes that solutionOptions is valid - if numbers count in cardOptions is the same as the numbersAvailable length, then they are the same numbers
    if (countNumbersInCardOptions(handOptions[handOptionsIndex]) > numbersAvailable.length) {
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

// --------------------------------------- //
// HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS //
// --------------------------------------- //

// create HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS
export const createHintFullHouseThreeOfAKindNumbers = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 3 cards of a number in cardsStillAvailable or already placed then we can create a hint for the first 3 hands
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getFullHouseThreeOfAKindNumbersHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // because we are working from a valid solution
  // if one of the first 3 cards has a single number set, then it must be the number for the other cards in the first 3 positions
  if (countNumbersInCardOptions(handOptions[0]) === 1) {
    // first card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[0]));
  } else if (countNumbersInCardOptions(handOptions[1]) === 1) {
    // second card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[1]));
  } else if (countNumbersInCardOptions(handOptions[2]) === 1) {
    // third card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[2]));
  }

  // if we didn't find one that way, then look for the numbers with at least 3 cards still available
  if (!numbersAvailable.length) {
    NUMBERS.forEach((number) => {
      // count the number of cards of this number still available
      const numberAvailableCount = countNumberAvailable(number, cardsStillAvailable);

      // we need to consider if this number has been placed anywhere yet, as a placed number doesn't remove a corresponding card from cardsStillAvailable
      const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

      // note that this numberPlacedCount will not include any in the first three positions of this hand, as the above will have found those
      // so if we need at least 3 available after numberPlacedCount has been removed
      if (numberAvailableCount - numberPlacedCount >= 3) {
        numbersAvailable.push(number);
      }
    });
  }

  // if we have at least one number which has 3 cards available, then we can create a hint - one for each of the first 3 cards of this solutionHandsIndex
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  // we don't create a hint if the number of numbers currently available in that numberOption is the same as our numbers
  // note this relies on solutionOptions being valid here - that is, those numbers are the same numbers as we've found - as we are working with a valid solutionOptions

  // work through the first 3 cards in this handOptions
  [0, 1, 2].forEach((handOptionsIndex) => {
    // if more than this number is allowed in this cardOptions, then create the hint to set this card to this number
    // Note: the following assumes that solutionOptions is valid - if numbers count in cardOptions is the same as the numbersAvailable length, then they are the same numbers
    if (countNumbersInCardOptions(handOptions[handOptionsIndex]) > numbersAvailable.length) {
      hints.push(createHintFullHouseThreeOfAKindNumbers(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
    }
  });

  return hints;
};

// --------------------------------------- //
// HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS //
// --------------------------------------- //

// create HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS
export const createHintFullHouseThreeOfAKindSuits = (suits, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS,
  suits,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 3 cards of a number in cardsStillAvailable or already placed then we can create a hint for the first 3 hands
// note that the hint includes an array of such suits - the apply hint will set it to the single suit if this array is of length 1
// note we rely on HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS already being applied - so if only a single number is possible it will be the only number by now
export const getFullHouseThreeOfAKindSuitsHints = (cardsAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // because we are working from a valid solution, and as HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS has been applied (or not applicable because the user has done it)
  // if any of first 3 cards has a single number set, then it is the number for the first 3 positions (so if multiple they will be the same - we just consider the first)
  let number;
  if (countNumbersInCardOptions(handOptions[0]) === 1) {
    // first card has a single number set
    number = getFirstNumberSet(handOptions[0]);
  } else if (countNumbersInCardOptions(handOptions[1]) === 1) {
    // second card has a single number set
    number = getFirstNumberSet(handOptions[1]);
  } else if (countNumbersInCardOptions(handOptions[2]) === 1) {
    // third card has a single number set
    number = getFirstNumberSet(handOptions[2]);
  }

  if (number !== undefined) {
    // we found the number, so we can just consider the possible suits for the cards of this number
    const suits = getSuitsOfNumberInAvailable(number, cardsAvailable);

    // there should be at least 3
    if (suits.length < 3) {
      console.error(`getFullHouseThreeOfAKindSuitsHints needs at least 3 suits for number ${number} but got ${suits}`);
      return [];
    }

    // if there are three, then we know they go in this order in the first 3 hands
    if (suits.length === 3) {
      // work through the first 3 cards in this handOptions
      [0, 1, 2].forEach((handOptionsIndex) => {
        // because we are working from a valid option, if only one suit is an option - it must be the right one
        // so only need a clue if cardOptions still allows more than one suit
        if (countSuitsInCardOptions(handOptions[handOptionsIndex]) > 1) {
          hints.push(createHintFullHouseThreeOfAKindSuits([suits[handOptionsIndex]], solutionHandsIndex, handOptionsIndex, clue));
        }
      });

      // these are the hints - of course they might be empty if the first three suits are already set - which means this hint will never be applicable
      return hints;
    }

    // so, by here suits must contain all 4 suits
    // in that case, the first card is S/H, second card is H/D, third card is D/C
    // if the second card's suit is set, then it restricts either the first, or the third, depending on its value
    if (countSuitsInCardOptions(handOptions[1]) === 1) {
      const suit = getFirstSuitSet(handOptions[1]);
      if (suit === SUIT_HEARTS) {
        // the first card must be a S
        if (countSuitsInCardOptions(handOptions[0]) > 1) {
          hints.push(createHintFullHouseThreeOfAKindSuits([SUIT_SPADES], solutionHandsIndex, 0, clue));
        }
        // and the third card is a D/C
        // if either S or H current set then the hint is needed
        const thirdCardOptions = handOptions[2];
        if (getSuitOptionsValueInCardOptions(thirdCardOptions, INDEX_SUIT_SPADES) || getSuitOptionsValueInCardOptions(thirdCardOptions, INDEX_SUIT_HEARTS)) {
          hints.push(createHintFullHouseThreeOfAKindSuits([SUIT_DIAMONDS, SUIT_CLUBS], solutionHandsIndex, 2, clue));
        }
        return hints;
      }

      if (suit === SUIT_DIAMONDS) {
        // TODO
        return [];
      }

      // shouldn't get here
      console.error(`getFullHouseThreeOfAKindSuitsHints the number is number ${number} and the second hand suit is set to ${suit} but it should be H or D`);
      return [];
    }

    // work through the first 3 cards in this handOptions
    [0, 1, 2].forEach((handOptionsIndex) => {
      // because we are working from a valid option, if only one suit is an option - it must be the right one
      // so only need a clue if cardOptions still allows more than one suit
      if (countSuitsInCardOptions(handOptions[handOptionsIndex]) > 1) {
        hints.push(createHintFullHouseThreeOfAKindSuits([suits[handOptionsIndex]], solutionHandsIndex, handOptionsIndex, clue));
      }
    });

    // these are the hints - of course they might be empty if the first three suits are already set - which means this hint will never be applicable
    return hints;
  }

  // if we didn't find one that way, then look for the numbers with at least 3 cards still available
  // if (!numbersAvailable.length) {
  //   NUMBERS.forEach((number) => {
  //     // count the number of cards of this number still available
  //     const numberAvailableCount = countNumberAvailable(number, cardsStillAvailable);

  //     // we need to consider if this number has been placed anywhere yet, as a placed number doesn't remove a corresponding card from cardsStillAvailable
  //     const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

  //     // note that this numberPlacedCount will not include any in the first three positions of this hand, as the above will have found those
  //     // so if we need at least 3 available after numberPlacedCount has been removed
  //     if (numberAvailableCount - numberPlacedCount >= 3) {
  //       numbersAvailable.push(number);
  //     }
  //   });
  // }

  // if we have at least one number which has 3 cards available, then we can create a hint - one for each of the first 3 cards of this solutionHandsIndex
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  // we don't create a hint if the number of numbers currently available in that numberOption is the same as our numbers
  // note this relies on solutionOptions being valid here - that is, those numbers are the same numbers as we've found - as we are working with a valid solutionOptions

  // work through the first 3 cards in this handOptions
  // [0, 1, 2].forEach((handOptionsIndex) => {
  //   // if more than this number is allowed in this cardOptions, then create the hint to set this card to this number
  //   // Note: the following assumes that solutionOptions is valid - if numbers count in cardOptions is the same as the numbersAvailable length, then they are the same numbers
  //   if (countNumbersInCardOptions(handOptions[handOptionsIndex]) > numbersAvailable.length) {
  //     hints.push(createHintFullHouseThreeOfAKindSuits(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
  //   }
  // });

  return hints;
};

// --------------------------------- //
// HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS //
// --------------------------------- //

// create HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS
export const createHintPairOfAFullHouseNumbers = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 2 cards of a number in cardsStillAvailable or already placed in position then we can create a hint for the pair hands of a full house
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getPairOfAFullHouseNumbersHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // because we are working from a valid solution
  // if either card in the pair has a single number set, then it must be the number for the other card in the pair
  if (countNumbersInCardOptions(handOptions[3]) === 1) {
    // fourth card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[3]));
  } else if (countNumbersInCardOptions(handOptions[4]) === 1) {
    // fifth card has a single number set
    numbersAvailable.push(getFirstNumberSet(handOptions[4]));
  }

  // if we didn't find one that way, then look for the numbers with at least 2 cards still available
  if (!numbersAvailable.length) {
    NUMBERS.forEach((number) => {
      // count the number of cards of this number still available
      const numberAvailableCount = countNumberAvailable(number, cardsStillAvailable);

      // we need to consider if this number has been placed anywhere yet, as a placed number doesn't remove a corresponding card from cardsStillAvailable
      const numberPlacedCount = countNumberPlacedInSolutionOptions(number, solutionOptions);

      // note that this numberPlacedCount will not include any in pair of the full house, as the above will have found those
      // so if we need at least 2 available after numberPlacedCount has been removed
      if (numberAvailableCount - numberPlacedCount >= 2) {
        numbersAvailable.push(number);
      }
    });
  }

  // if we have at least one number which has 2 cards available, then we can create a hint - one for each of the pair the full house at this solutionHandsIndex
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  // we don't create a hint if the number of numbers currently available in that numberOption is the same as our numbers
  // note this relies on solutionOptions being valid here - that is, those numbers are the same numbers as we've found - as we are working with a valid solutionOptions

  // work through the two cards of the pair in this handOptions
  [3, 4].forEach((handOptionsIndex) => {
    // if more than this number is allowed in this cardOptions, then create the hint to set this card to this number
    // Note: the following assumes that solutionOptions is valid - if numbers count in cardOptions is the same as the numbersAvailable length, then they are the same numbers
    if (countNumbersInCardOptions(handOptions[handOptionsIndex]) > numbersAvailable.length) {
      hints.push(createHintPairOfAFullHouseNumbers(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
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

  // see if all n cards available for a suit are placed for that suit
  const allOfSuitPlacedHints = getAllOfSuitPlacedHints(cardsAvailable, solutionOptions);
  if (allOfSuitPlacedHints.length) {
    return allOfSuitPlacedHints;
  }

  // see if all n cards available for a number are placed for that number
  const allOfNumberPlacedHints = getAllOfNumberPlacedHints(cardsAvailable, solutionOptions);
  if (allOfNumberPlacedHints.length) {
    return allOfNumberPlacedHints;
  }

  // see if the solution options only has n cards of a suit left where n is the number of cards of that suit in cardsAvailable
  const sameNSuitCardsInSolutionOptionsHints = getSameNSuitCardsInSolutionOptionsHints(cardsAvailable, solutionOptions);
  if (sameNSuitCardsInSolutionOptionsHints.length) {
    return sameNSuitCardsInSolutionOptionsHints;
  }

  // which of the cards available are still available after the solutionOptions have been considered
  const cardsStillAvailable = getCardsStillAvailable(cardsAvailable, solutionOptions);

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

  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;

    // deal with hand of type straight flush clue (which has to be for the first hand, but we don't care about that actually)
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_STRAIGHT_FLUSH) {
      const suitsWithoutStraightFlushHints = getSuitsWithoutStraightFlushHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (suitsWithoutStraightFlushHints.length) {
        return suitsWithoutStraightFlushHints;
      }
    }

    // deal with hand of type four of a kind
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FOUR_OF_A_KIND) {
      const fourOfAKindSuitHints = getFourOfAKindSuitHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fourOfAKindSuitHints.length) {
        return fourOfAKindSuitHints;
      }

      const fourOfAKindNumberHints = getFourOfAKindNumbersHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fourOfAKindNumberHints.length) {
        return fourOfAKindNumberHints;
      }
    }

    // deal common aspects of full house and three of a kind
    if (clueType === CLUE_HAND_OF_TYPE && (handType === HAND_TYPE_FULL_HOUSE || handType === HAND_TYPE_THREE_OF_A_KIND)) {
      const fullHouseThreeOfAKindNumbersHints = getFullHouseThreeOfAKindNumbersHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fullHouseThreeOfAKindNumbersHints.length) {
        return fullHouseThreeOfAKindNumbersHints;
      }

      const fullHouseThreeOfAKindSuitsHints = getFullHouseThreeOfAKindSuitsHints(cardsAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fullHouseThreeOfAKindSuitsHints.length) {
        return fullHouseThreeOfAKindSuitsHints;
      }
    }

    // deal full house
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FULL_HOUSE) {
      const pairOfAFullHouseNumbersHints = getPairOfAFullHouseNumbersHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (pairOfAFullHouseNumbersHints.length) {
        return pairOfAFullHouseNumbersHints;
      }
    }
  }

  // no other hints yet
  return [];
};
