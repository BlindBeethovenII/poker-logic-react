// create clue functions

import {
  CLUE_HAND_OF_TYPE,
  CLUE_SUIT_AND_NUMBER,
  CLUE_SUIT,
  CLUE_NOT_SUIT,
  CLUE_NUMBER,
  CLUE_NOT_NUMBER,
  CLUE_CARDS_SAME_NUMBER,
  CLUE_CARDS_NOT_SAME_NUMBER,
  CLUE_CARDS_NUMBER_HIGHER_THAN,
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
  CLUE_HAND_TYPE_DEDUCED_FROM_SOLUTION_OPTIONS,
  CLUE_HAND_TYPE_DEDUCED_FROM_CARDS_STILL_AVAILABLE,
} from './constants';

// import logIfDevEnv from './logIfDevEnv';

// ----------------- //
// CLUE_HAND_OF_TYPE //
// ----------------- //

export const createClueHandOfType = (handType, solutionHandsIndex, deduced) => ({
  clueType: CLUE_HAND_OF_TYPE,
  handType,
  solutionHandsIndex,
  deduced,
});

// -------------------- //
// CLUE_SUIT_AND_NUMBER //
// -------------------- //

export const createClueSuitAndNumber = (suit, number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_SUIT_AND_NUMBER,
  suit,
  number,
  solutionHandsIndex,
  handOptionsIndex,
});

// --------- //
// CLUE_SUIT //
// --------- //

export const createClueSuit = (suit, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_SUIT,
  suit,
  solutionHandsIndex,
  handOptionsIndex,
});

// ------------- //
// CLUE_NOT_SUIT //
// ------------- //

export const createClueNotSuit = (suit, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NOT_SUIT,
  suit,
  solutionHandsIndex,
  handOptionsIndex,
});

// ----------- //
// CLUE_NUMBER //
// ----------- //

export const createClueNumber = (number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NUMBER,
  number,
  solutionHandsIndex,
  handOptionsIndex,
});

// --------------- //
// CLUE_NOT_NUMBER //
// --------------- //

export const createClueNotNumber = (number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NOT_NUMBER,
  number,
  solutionHandsIndex,
  handOptionsIndex,
});

// ---------------------- //
// CLUE_CARDS_SAME_NUMBER //
// ---------------------- //
export const createClueCardsSameNumber = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2) => ({
  clueType: CLUE_CARDS_SAME_NUMBER,
  solutionHandsIndex1,
  handOptionsIndex1,
  solutionHandsIndex2,
  handOptionsIndex2,
});

// -------------------------- //
// CLUE_CARDS_NOT_SAME_NUMBER //
// -------------------------- //
export const createClueCardsNotSameNumber = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2) => ({
  clueType: CLUE_CARDS_NOT_SAME_NUMBER,
  solutionHandsIndex1,
  handOptionsIndex1,
  solutionHandsIndex2,
  handOptionsIndex2,
});

// ------------------------------ //
// CLUE_CARDS_NUMBER_HIGHER_THAN //
// ------------------------------ //
export const createClueCardsNumberHigherThan = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2) => ({
  clueType: CLUE_CARDS_NUMBER_HIGHER_THAN,
  solutionHandsIndex1,
  handOptionsIndex1,
  solutionHandsIndex2,
  handOptionsIndex2,
});

// -------------------- //
// CLUE_CARDS_SAME_SUIT //
// -------------------- //
export const createClueCardsSameSuit = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2) => ({
  clueType: CLUE_CARDS_SAME_SUIT,
  solutionHandsIndex1,
  handOptionsIndex1,
  solutionHandsIndex2,
  handOptionsIndex2,
});

// ------------------------ //
// CLUE_CARDS_NOT_SAME_SUIT //
// ------------------------ //
export const createClueCardsNotSameSuit = (solutionHandsIndex1, handOptionsIndex1, solutionHandsIndex2, handOptionsIndex2) => ({
  clueType: CLUE_CARDS_NOT_SAME_SUIT,
  solutionHandsIndex1,
  handOptionsIndex1,
  solutionHandsIndex2,
  handOptionsIndex2,
});

// ------------- //
// CLUE_RED_SUIT //
// ------------- //

export const createClueRedSuit = (solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_RED_SUIT,
  solutionHandsIndex,
  handOptionsIndex,
});

// --------------- //
// CLUE_BLACK_SUIT //
// --------------- //

export const createClueBlackSuit = (solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_BLACK_SUIT,
  solutionHandsIndex,
  handOptionsIndex,
});

// -------------- //
// CLUE_RED_SUITS //
// -------------- //

export const createClueRedSuits = (solutionHandsIndex) => ({
  clueType: CLUE_RED_SUITS,
  solutionHandsIndex,
});

// ---------------- //
// CLUE_BLACK_SUITS //
// ---------------- //

export const createClueBlackSuits = (solutionHandsIndex) => ({
  clueType: CLUE_BLACK_SUITS,
  solutionHandsIndex,
});

// -------------- //
// CLUE_CARD_EVEN //
// -------------- //

export const createClueCardEven = (solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_CARD_EVEN,
  solutionHandsIndex,
  handOptionsIndex,
});

// ------------- //
// CLUE_CARD_ODD //
// ------------- //

export const createClueCardOdd = (solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_CARD_ODD,
  solutionHandsIndex,
  handOptionsIndex,
});

// -------------- //
// CLUE_HAND_EVEN //
// -------------- //

export const createClueHandEven = (solutionHandsIndex) => ({
  clueType: CLUE_HAND_EVEN,
  solutionHandsIndex,
});

// ------------- //
// CLUE_HAND_ODD //
// ------------- //

export const createClueHandOdd = (solutionHandsIndex) => ({
  clueType: CLUE_HAND_ODD,
  solutionHandsIndex,
});

// -------------------- //
// CLUE_HAND_HAS_NUMBER //
// -------------------- //

export const createClueHandHasNumber = (number, solutionHandsIndex) => ({
  clueType: CLUE_HAND_HAS_NUMBER,
  number,
  solutionHandsIndex,
});

// -------------------- //
// CLUE_HAND_NOT_NUMBER //
// -------------------- //

export const createClueHandNotNumber = (number, solutionHandsIndex) => ({
  clueType: CLUE_HAND_NOT_NUMBER,
  number,
  solutionHandsIndex,
});

// ------------------ //
// CLUE_HAND_HAS_SUIT //
// ------------------ //

export const createClueHandHasSuit = (suit, solutionHandsIndex) => ({
  clueType: CLUE_HAND_HAS_SUIT,
  suit,
  solutionHandsIndex,
});

// ------------------ //
// CLUE_HAND_NOT_SUIT //
// ------------------ //

export const createClueHandNotSuit = (suit, solutionHandsIndex) => ({
  clueType: CLUE_HAND_NOT_SUIT,
  suit,
  solutionHandsIndex,
});

// ----------------------------- //
// CLUE_HAND_HAS_SUIT_AND_NUMBER //
// ----------------------------- //

export const createClueHandHasSuitAndNumber = (suit, number, solutionHandsIndex) => ({
  clueType: CLUE_HAND_HAS_SUIT_AND_NUMBER,
  suit,
  number,
  solutionHandsIndex,
});

// ----------------------------- //
// CLUE_HAND_NOT_SUIT_AND_NUMBER //
// ----------------------------- //

export const createClueHandNotSuitAndNumber = (suit, number, solutionHandsIndex) => ({
  clueType: CLUE_HAND_NOT_SUIT_AND_NUMBER,
  suit,
  number,
  solutionHandsIndex,
});

// ----------------------- //
// CLUE_HAND_LOWEST_NUMBER //
// ----------------------- //

export const createClueHandLowestNumber = (number, solutionHandsIndex) => ({
  clueType: CLUE_HAND_LOWEST_NUMBER,
  number,
  solutionHandsIndex,
});

// ------------------------ //
// CLUE_HAND_HIGHEST_NUMBER //
// ------------------------ //

export const createClueHandHighestNumber = (number, solutionHandsIndex) => ({
  clueType: CLUE_HAND_HIGHEST_NUMBER,
  number,
  solutionHandsIndex,
});

// -------------------------------------------- //
// CLUE_HAND_TYPE_DEDUCED_FROM_SOLUTION_OPTIONS //
// -------------------------------------------- //

export const createClueHandTypeDeducedFromSolutionOptions = (solutionHandsIndex) => ({
  clueType: CLUE_HAND_TYPE_DEDUCED_FROM_SOLUTION_OPTIONS,
  solutionHandsIndex,
});

// ------------------------------------------------- //
// CLUE_HAND_TYPE_DEDUCED_FROM_CARDS_STILL_AVAILABLE //
// ------------------------------------------------- //

export const createClueHandTypeDeducedFromCardsStillAvailable = (solutionHandsIndex) => ({
  clueType: CLUE_HAND_TYPE_DEDUCED_FROM_CARDS_STILL_AVAILABLE,
  solutionHandsIndex,
});
