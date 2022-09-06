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

export const applySameCountLeftSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_SAME_COUNT_LEFT_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applySameCountLeftNumberHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_SAME_COUNT_LEFT_NUMBER for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
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

export const applyAllOfSuitPlacedNumbersHint = (solutionOptions, hint) => {
  const {
    suit,
    numbers,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  // we do something different if numbers is to a single number, as opposed to multiple numbers
  if (numbers.length === 1) {
    const number = numbers[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_ALL_OF_SUIT_PLACED_NUMBERS for suit ${suit} for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_ALL_OF_SUIT_PLACED_NUMBERS for suit ${suit} for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

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

export const applyAllOfNumberPlacedHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  logIfDevEnv(`applying HINT_ALL_OF_NUMBER_PLACED for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyAllOfNumberPlacedSuitsHint = (solutionOptions, hint) => {
  const {
    number,
    suits,
    solutionOptionsIndex,
    handOptionsIndex,
  } = hint;

  // we do something different if suits is to a single suit, as opposed to multiple suits
  if (suits.length === 1) {
    const suit = suits[0];
    // eslint-disable-next-line max-len
    logIfDevEnv(`applying HINT_ALL_OF_NUMBER_PLACED_SUITS for number ${number} for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

    // we know this must be the suit
    return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_ALL_OF_NUMBER_PLACED_SUITS for number ${number} for suits ${suits} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex}`);

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

export const applyThreeOfAKindNumbersHint = (solutionOptions, hint) => {
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
    logIfDevEnv(`applying HINT_THREE_OF_A_KIND_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_THREE_OF_A_KIND_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyThreeOfAKindSuitsHint = (solutionOptions, hint) => {
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
    logIfDevEnv(`applying HINT_THREE_OF_A_KIND_SUITS for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the suit
    return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_THREE_OF_A_KIND_SUITS for suits ${suits} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyPairNumbersHint = (solutionOptions, hint) => {
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
    logIfDevEnv(`applying HINT_PAIR_NUMBERS for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PAIR_NUMBERS for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyPairSuitsHint = (solutionOptions, hint) => {
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
    logIfDevEnv(`applying HINT_PAIR_SUITS for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the suit
    return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PAIR_SUITS for suits ${suits} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyClueSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_CLUE_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyClueNotSuitHint = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_CLUE_NOT_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return toggleSuitOptionInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyClueNumberHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_CLUE_NUMBER for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyClueNotNumberHint = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_CLUE_NOT_NUMBER for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyPairNumbersRestrictedBySuitHint = (solutionOptions, hint) => {
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
    logIfDevEnv(`applying HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyThreeOfAKindNumbersRestrictedBySuitHint = (solutionOptions, hint) => {
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
    logIfDevEnv(`applying HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

    // we know this must be the number
    return setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
  }

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT for numbers ${numbers} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

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

export const applyThreeOfAKindNumbersAllSameSuit = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyPairNumbersAllSameSuit = (solutionOptions, hint) => {
  const {
    suit,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PAIR_NUMBERS_ALL_SAME_SUIT for suit ${suit} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyThreeOfAKindNumbersNumberNotInAll = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

export const applyPairNumbersNumberNotInAll = (solutionOptions, hint) => {
  const {
    number,
    solutionOptionsIndex,
    handOptionsIndex,
    clue,
  } = hint;

  // eslint-disable-next-line max-len
  logIfDevEnv(`applying HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL for number ${number} to solutionOptionsIndex ${solutionOptionsIndex} and handOptionsIndex ${handOptionsIndex} [Clue: ${clueToString(clue)}]`);

  return toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
};

// ------------------------------------------------------------------------------------ //
// apply the given hint - this assumes it is a valid hint for the given solutionOptions //
// ------------------------------------------------------------------------------------ //
export const applyHint = (solutionOptions, hint) => {
  const { hintType } = hint;
  switch (hintType) {
    case HINT_NUMBER_NOT_USED:
      return applyNumberNotUsedHint(solutionOptions, hint);

    case HINT_NO_STRAIGHT_FLUSH_IN_SUIT:
      return applyNoStraightFlushInSuitHint(solutionOptions, hint);

    case HINT_SAME_COUNT_LEFT_SUIT:
      return applySameCountLeftSuitHint(solutionOptions, hint);

    case HINT_SAME_COUNT_LEFT_NUMBER:
      return applySameCountLeftNumberHint(solutionOptions, hint);

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

    case HINT_ALL_OF_SUIT_PLACED_NUMBERS:
      return applyAllOfSuitPlacedNumbersHint(solutionOptions, hint);

    case HINT_ALL_OF_NUMBER_PLACED:
      return applyAllOfNumberPlacedHint(solutionOptions, hint);

    case HINT_ALL_OF_NUMBER_PLACED_SUITS:
      return applyAllOfNumberPlacedSuitsHint(solutionOptions, hint);

    case HINT_THREE_OF_A_KIND_NUMBERS:
      return applyThreeOfAKindNumbersHint(solutionOptions, hint);

    case HINT_THREE_OF_A_KIND_SUITS:
      return applyThreeOfAKindSuitsHint(solutionOptions, hint);

    case HINT_PAIR_NUMBERS:
      return applyPairNumbersHint(solutionOptions, hint);

    case HINT_PAIR_SUITS:
      return applyPairSuitsHint(solutionOptions, hint);

    case HINT_CLUE_SUIT:
      return applyClueSuitHint(solutionOptions, hint);

    case HINT_CLUE_NOT_SUIT:
      return applyClueNotSuitHint(solutionOptions, hint);

    case HINT_CLUE_NUMBER:
      return applyClueNumberHint(solutionOptions, hint);

    case HINT_CLUE_NOT_NUMBER:
      return applyClueNotNumberHint(solutionOptions, hint);

    case HINT_PAIR_NUMBERS_RESTRICTED_BY_SUIT:
      return applyPairNumbersRestrictedBySuitHint(solutionOptions, hint);

    case HINT_THREE_OF_A_KIND_NUMBERS_RESTRICTED_BY_SUIT:
      return applyThreeOfAKindNumbersRestrictedBySuitHint(solutionOptions, hint);

    case HINT_THREE_OF_A_KIND_NUMBERS_ALL_SAME_SUIT:
      return applyThreeOfAKindNumbersAllSameSuit(solutionOptions, hint);

    case HINT_PAIR_NUMBERS_ALL_SAME_SUIT:
      return applyPairNumbersAllSameSuit(solutionOptions, hint);

    case HINT_THREE_OF_A_KIND_NUMBERS_NUMBER_NOT_IN_ALL:
      return applyThreeOfAKindNumbersNumberNotInAll(solutionOptions, hint);

    case HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL:
      return applyPairNumbersNumberNotInAll(solutionOptions, hint);

    default:
      console.log(`ERROR: applyHint cannot cope with hintType ${hintType}!!!`);
      return solutionOptions;
  }
};
