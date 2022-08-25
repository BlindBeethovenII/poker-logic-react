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
  countTrueBooleansInArray,
  getSuitOptionsValueInCardOptions,
  countNumberAvailable,
  setNumberOptionOnlyInSolutionOptions,
  cardSelectedInSolutionOptions,
} from './solution-functions';

import { sortedSuitCardsContainStraight, createCard } from './card-functions';

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
        if (cardOptions.numberOptions[number - 1]) {
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
  clues: [clue],
});

// get the hints for the suits that cannot make a straight flush
export const getSuitsWithoutStraightFlushHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  SUITS.forEach((suit) => {
    // convert suit name to suit options index which is the same as cards still available index, to find the suits available cards
    const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);

    const suitCardsAvailable = cardsStillAvailable[suitOptionsIndex];

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
          if (getSuitOptionsValueInCardOptions(cardOptions, suitOptionsIndex) && countTrueBooleansInArray(cardOptions.suitOptions) > 1) {
            hints.push(createHintSameNSuitCardsInSolutionOptions(suit, solutionOptionsIndex, handOptionsIndex));
          }
        });
      });
    }
  });

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
  clues: [clue],
});

// if there are 4 cards of a number in cardsStillAvailable then we can create a hint
// note that the hint includes an array of such numbers - the apply hint will set it to the single number if this array is of length 1
export const getFourOfAKindNumberHints = (cardsStillAvailable, solutionHandsIndex, solutionOptions, clue) => {
  const hints = [];

  const numbersAvailable = [];

  NUMBERS.forEach((number) => {
    // first count then number of cards of this number still available
    let count = countNumberAvailable(number, cardsStillAvailable);

    // and remember the four cards of this number might already be placed, so add those to the count
    // note: this relies on solutionOptions being valid
    SUITS.forEach((suit) => {
      if (cardSelectedInSolutionOptions(createCard(suit, number), solutionOptions)) {
        count += 1;
      }
    });

    // found, if 4 are available or already in place
    if (count === 4) {
      numbersAvailable.push(number);
    }
  });

  // if we have at least one number which has 4 cards available, then we can create a hint - one for each of the first 4 cards of this solutionHandsIndex
  // note that the solutionHandsIndex here is the solutionOptionsIndex
  // don't create a hint if it is a single numbersAvailable and that card is already selected in the solution options
  // note we rely on these cards being the first four cards S H D C
  if (numbersAvailable.length === 1) {
    // we have a single number, so need to check if card is set
    const number = numbersAvailable[0];
    if (!cardSelectedInSolutionOptions(createCard(SUIT_SPADES, number), solutionOptions)) {
      hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 0, clue));
    }
    if (!cardSelectedInSolutionOptions(createCard(SUIT_HEARTS, number), solutionOptions)) {
      hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 1, clue));
    }
    if (!cardSelectedInSolutionOptions(createCard(SUIT_DIAMONDS, number), solutionOptions)) {
      hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 2, clue));
    }
    if (!cardSelectedInSolutionOptions(createCard(SUIT_CLUBS, number), solutionOptions)) {
      hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 3, clue));
    }
  } else if (numbersAvailable.length > 1) {
    // we have multiple numbers available - so don't need to check if card is set
    hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 0, clue));
    hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 1, clue));
    hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 2, clue));
    hints.push(createHintFourOfAKindNumber(numbersAvailable, solutionHandsIndex, 3, clue));
  }

  return hints;
};

// --------- //
// get hints //
// --------- //

// get the next possible hints (being an array of hints of the same type)
export const getHints = (solutionOptions, solution, clues, cardsAvailable) => {
  const { solutionHands, missingNumber } = solution;

  // first see if number not used
  const numberNotUsedHints = getNumberNotUsedHints(solutionOptions, solutionHands, missingNumber);
  if (numberNotUsedHints.length) {
    return numberNotUsedHints;
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
      const fourOfAKindNUmberHints = getFourOfAKindNumberHints(cardsStillAvailable, solutionHandsIndex, solutionOptions, clue);
      if (fourOfAKindNUmberHints.length) {
        return fourOfAKindNUmberHints;
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
  const { number, solutionOptionsIndex, handOptionsIndex } = hint;
  logIfDevEnv(`applying HINT_NUMBER_NOT_USED for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);
  return toggleNumberOptionInSolutionOptions(number - 1, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyNoStraightFlushInSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clues,
  } = hint;

  // this hint only uses one clue
  const clue = clues[0];

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_NO_STRAIGHT_FLUSH_IN_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);
  return toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applySameNSuitCardsInSolutionOptionsHint = (solutionOptions, hint) => {
  const { suit, solutionOptionsIndex, handOptionsIndex } = hint;
  logIfDevEnv(`applying HINT_SAME_N_SUIT_CARDS_IN_SOLUTION_OPTIONS for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);
  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

const applyFourOfAKindNUmberHint = (solutionOptions, hint) => {
  const {
    numbers,
    solutionOptionsIndex,
    handOptionsIndex,
    clues,
  } = hint;

  // this hint only uses one clue
  const clue = clues[0];

  // we do something different if numbers is to a single number, as opposed to a number of numbers
  if (numbers.length === 1) {
    const number = numbers[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_FOUR_OF_A_KIND_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    const solutionOptions1 = setNumberOptionOnlyInSolutionOptions(number - 1, solutionOptionsIndex, handOptionsIndex, solutionOptions);

    // furthermore we know the suit based on the handOptionsIndex, as we order a four of a kind S, H, D, C
    // so suitOptionsIndex is handOptionsIndex (weirdly :-)
    return setSuitOptionOnlyInSolutionOptions(handOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions1);
  }

  // TODO

  // eslint-disable-next-line max-len
  logIfDevEnv(`TODO applying HINT_FOUR_OF_A_KIND_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);
  return solutionOptions;
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

    case HINT_FOUR_OF_A_KIND_NUMBERS:
      return applyFourOfAKindNUmberHint(solutionOptions, hint);

    default:
      console.log(`ERROR: applyHint cannot cope with hintType ${hintType}!!!`);
      return solutionOptions;
  }
};
