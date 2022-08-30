// useful hint functions

import {
  toggleNumberOptionInSolutionOptions,
  toggleSuitOptionInSolutionOptions,
  setSuitOptionOnlyInSolutionOptions,
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
  setNumberOptionOnlyInSolutionOptions,
  getFirstSuitSet,
  getFirstNumberSet,
  isCardOptionsAPlacedCard,
  solutionOptionsValid,
  isNumberTrueInCardOptions,
  isNumberPlacedInCardOptions,
  isSuitPlacedInCardOptions,
  isNumberPlaced,
} from './solution-functions';

import {
  sortedSuitCardsContainStraight,
  createCard,
  sortSuit,
} from './card-functions';

import { clueToString } from './clue-functions';

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
} from './constants';

import logIfDevEnv from './logIfDevEnv';

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

    // easy to count - just the lengh
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
export const createHintFourOfAKindNumber = (numbers, solutionOptionsIndex, handOptionsIndex, clue) => ({
  hintType: HINT_FOUR_OF_A_KIND_NUMBERS,
  numbers,
  solutionOptionsIndex,
  handOptionsIndex,
  clue,
});

// if there are 4 cards of a number in cardsStillAvailable then we can create a hint
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getFourOfAKindNumberHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  const handOptions = solutionOptions[solutionHandsIndex];

  // because we are working from a valid solution
  // if one of the first 4 cards has a single number set, then this must be the number for the other cards
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
    // if more than this number is allowed, then create the hint to set this card to this number
    // Note: the following assumes that solutionOptions is valid - if cardOptions numberOptions true bool count was 1, then it must be the number in question
    if (countNumbersInCardOptions(handOptions[handOptionsIndex]) > numbersAvailable.length) {
      hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, handOptionsIndex, clue));
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

  // see if we the solution options only has n cards of a suit left where n is the number of cards of that suit in cardsAvailable
  const sameNSuitCardsInSolutionOptionsHints = getSameNSuitCardsInSolutionOptionsHints(cardsAvailable, solutionOptions);
  if (sameNSuitCardsInSolutionOptionsHints.length) {
    return sameNSuitCardsInSolutionOptionsHints;
  }

  // which of the cards available are still available after the solutionOptions have been considered
  const cardsStillAvailable = getCardsStillAvailable(cardsAvailable, solutionOptions);

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

      const fourOfAKindNumberHints = getFourOfAKindNumberHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fourOfAKindNumberHints.length) {
        return fourOfAKindNumberHints;
      }
    }
  }

  // no other hints yet
  return [];
};

// ---------- //
// apply hint //
// ---------- //

const applyNumberNotUsedHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_NUMBER_NOT_USED for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyNoStraightFlushInSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_NO_STRAIGHT_FLUSH_IN_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applySameNSuitCardsInSolutionOptionsHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyFourOfAKindSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_FOUR_OF_A_KIND_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyFourOfAKindNumberHint = (solutionOptions, hint) => {
  const {
    numbers,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // we do something different if numbers is to a single number, as opposed to a number of numbers
  if (numbers.length === 1) {
    const number = numbers[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_FOUR_OF_A_KIND_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`TODO applying HINT_FOUR_OF_A_KIND_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  let newSolutionOptions = solutionOptions;

  const cardOptions = solutionOptions[solutionOptionsIndex][handOptionsIndex];

  // given solution functions we have, we will toggle (to off) any other number that is currently set
  NUMBERS.forEach((number) => {
    if (!numbers.includes(number) && isNumberTrueInCardOptions(number, cardOptions)) {
      // this number is not part of the solution, so toggle off
      newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, newSolutionOptions);
    }
  });

  return newSolutionOptions;
};

const applyPlacedCardRemoveSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    placedCard,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PLACED_CARD_REMOVE_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} because placed card ${placedCard.id}`);

  return toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyPlacedCardRemoveNumberHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
    placedCard,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PLACED_CARD_REMOVE_NUMBER for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} because placed card ${placedCard.id}`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

// apply the given hint - this assumes it is a valid hint for the given solutionOptions
export const applyHint = (solutionOptions, hint) => {
  const { hintType } = hint;
  switch (hintType) {
    case HINT_NUMBER_NOT_USED:
      return applyNumberNotUsedHint(solutionOptions, hint);

    case HINT_NO_STRAIGHT_FLUSH_IN_SUIT:
      return applyNoStraightFlushInSuitHint(solutionOptions, hint);

    case HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS:
      return applySameNSuitCardsInSolutionOptionsHint(solutionOptions, hint);

    case HINT_FOUR_OF_A_KIND_SUIT:
      return applyFourOfAKindSuitHint(solutionOptions, hint);

    case HINT_FOUR_OF_A_KIND_NUMBERS:
      return applyFourOfAKindNumberHint(solutionOptions, hint);

    case HINT_PLACED_CARD_REMOVE_SUIT:
      return applyPlacedCardRemoveSuitHint(solutionOptions, hint);

    case HINT_PLACED_CARD_REMOVE_NUMBER:
      return applyPlacedCardRemoveNumberHint(solutionOptions, hint);

    default:
      console.log(`ERROR: applyHint cannot cope with hintType ${hintType}!!!`);
      return solutionOptions;
  }
};
