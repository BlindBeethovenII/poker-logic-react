// ******************************************* //
// apply hint along with its support functions //
// ******************************************* //

import {
  toggleNumberOptionInSolutionOptions,
  toggleSuitOptionInSolutionOptions,
  setSuitOptionOnlyInSolutionOptions,
  convertSuitToSuitOptionsIndex,
  setNumberOptionOnlyInSolutionOptions,
  isSuitTrueInCardOptions,
  isNumberTrueInCardOptions,
} from './solution-functions';

import { clueToString } from './clue-functions';

import {
  SUITS,
  NUMBERS,
  HINT_NUMBER_NOT_USED,
  HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
  HINT_SAME_NUMBER_LEFT_SUIT,
  HINT_FOUR_OF_A_KIND_NUMBERS,
  HINT_FOUR_OF_A_KIND_SUIT,
  HINT_PLACED_CARD_REMOVE_SUIT,
  HINT_PLACED_CARD_REMOVE_NUMBER,
  HINT_NUMBER_USED_UP,
  HINT_ALL_OF_SUIT_PLACED,
  HINT_ALL_OF_NUMBER_PLACED,
  HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS,
  HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS,
  HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS,
} from './constants';

import logIfDevEnv from './logIfDevEnv';

export const applyNumberNotUsedHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_NUMBER_NOT_USED for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyNoStraightFlushInSuitHint = (solutionOptions, hint) => {
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

export const applySameNumberLeftSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_SAME_NUMBER_LEFT_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyFourOfAKindSuitHint = (solutionOptions, hint) => {
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

export const applyFourOfAKindNumbersHint = (solutionOptions, hint) => {
  const {
    numbers,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // we do something different if numbers is to a single number, as opposed to multiple numbers
  if (numbers.length === 1) {
    const number = numbers[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_FOUR_OF_A_KIND_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_FOUR_OF_A_KIND_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyPlacedCardRemoveSuitHint = (solutionOptions, hint) => {
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

export const applyPlacedCardRemoveNumberHint = (solutionOptions, hint) => {
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

export const applyNumberUsedUpHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_NUMBER_USED_UP for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyAllOfSuitPlacedHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_ALL_OF_SUIT_PLACED for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyAllOfNumberPlacedHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_ALL_OF_SUIT_PLACED for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyFullHouseThreeOfAKindNumbersHints = (solutionOptions, hint) => {
  const {
    numbers,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // we do something different if numbers is to a single number, as opposed to multiple numbers
  if (numbers.length === 1) {
    const number = numbers[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyFullHouseThreeOfAKindSuitsHints = (solutionOptions, hint) => {
  const {
    suits,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // we do something different if suits is to a single suit, as opposed to multiple suits
  if (suits.length === 1) {
    const suit = suits[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the suit
    return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS for suits ${suits} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  let newSolutionOptions = solutionOptions;

  const cardOptions = solutionOptions[solutionOptionsIndex][handOptionsIndex];

  // toggle (to off) any other suit that is currently set
  SUITS.forEach((suit) => {
    if (!suits.includes(suit) && isSuitTrueInCardOptions(suit, cardOptions)) {
      // this suit is not part of the solution, so toggle off
      newSolutionOptions = toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, newSolutionOptions);
    }
  });

  return newSolutionOptions;
};

export const applyPairOfAFullHouseNumbersHints = (solutionOptions, hint) => {
  const {
    numbers,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // we do something different if numbers is to a single number, as opposed to multiple numbers
  if (numbers.length === 1) {
    const number = numbers[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

// apply the given hint - this assumes it is a valid hint for the given solutionOptions
export const applyHint = (solutionOptions, hint) => {
  const { hintType } = hint;
  switch (hintType) {
    case HINT_NUMBER_NOT_USED:
      return applyNumberNotUsedHint(solutionOptions, hint);

    case HINT_NO_STRAIGHT_FLUSH_IN_SUIT:
      return applyNoStraightFlushInSuitHint(solutionOptions, hint);

    case HINT_SAME_NUMBER_LEFT_SUIT:
      return applySameNumberLeftSuitHint(solutionOptions, hint);

    case HINT_FOUR_OF_A_KIND_SUIT:
      return applyFourOfAKindSuitHint(solutionOptions, hint);

    case HINT_FOUR_OF_A_KIND_NUMBERS:
      return applyFourOfAKindNumbersHint(solutionOptions, hint);

    case HINT_PLACED_CARD_REMOVE_SUIT:
      return applyPlacedCardRemoveSuitHint(solutionOptions, hint);

    case HINT_PLACED_CARD_REMOVE_NUMBER:
      return applyPlacedCardRemoveNumberHint(solutionOptions, hint);

    case HINT_NUMBER_USED_UP:
      return applyNumberUsedUpHint(solutionOptions, hint);

    case HINT_ALL_OF_SUIT_PLACED:
      return applyAllOfSuitPlacedHint(solutionOptions, hint);

    case HINT_ALL_OF_NUMBER_PLACED:
      return applyAllOfNumberPlacedHint(solutionOptions, hint);

    case HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS:
      return applyFullHouseThreeOfAKindNumbersHints(solutionOptions, hint);

    case HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS:
      return applyFullHouseThreeOfAKindSuitsHints(solutionOptions, hint);

    case HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS:
      return applyPairOfAFullHouseNumbersHints(solutionOptions, hint);

    default:
      console.log(`ERROR: applyHint cannot cope with hintType ${hintType}!!!`);
      return solutionOptions;
  }
};
