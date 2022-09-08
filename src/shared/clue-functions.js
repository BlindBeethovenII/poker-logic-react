// useful clue functions

import { calcHandType } from './card-functions';

import {
  createSolutionOptions,
  getCardsAvailable,
  isSolutionOptionsComplete,
  isCardOptionsAPlacedCard,
  countNumbersInCardOptions,
  countSuitsInCardOptions,
  getNumberOptionsValueInCardOptions,
  getSuitOptionsValueInCardOptions,
  convertSuitToSuitOptionsIndex,
} from './solution-functions';

import { applyAllHintsToSolutionOptions } from './apply-hints-functions';

import {
  CLUE_HAND_OF_TYPE,
  CLUE_SUIT_AND_NUMBER,
  CLUE_SUIT,
  CLUE_NOT_SUIT,
  CLUE_NUMBER,
  CLUE_NOT_NUMBER,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
  NUMBERS,
  SUITS,
} from './constants';

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

// --------------- //
// CLUE_NOT_NUMBER //
// --------------- //

export const createClueNotNumber = (number, solutionHandsIndex, handOptionsIndex) => ({
  clueType: CLUE_NOT_NUMBER,
  number,
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

// --------------------------- //
// createCluesForSolutionHands //
// --------------------------- //

export const createCluesForSolutionHands = (solution) => {
  const { solutionHands, missingNumber } = solution;

  const clues = [];

  // add a HAND OF TYPE clue for each solution hand - but not if that handtype can be deduced
  const handType1 = calcHandType(solutionHands[0]);
  const handType2 = calcHandType(solutionHands[1]);
  const handType3 = calcHandType(solutionHands[2]);
  const handType4 = calcHandType(solutionHands[3]);
  let needHandType1Clue = true;
  let needHandType2Clue = true;
  let needHandType3Clue = true;
  let needHandType4Clue = true;

  // if 2nd hand is 4 of a kind then we will deduce 1st hand is straight flush
  if (handType2 === HAND_TYPE_FOUR_OF_A_KIND) {
    needHandType1Clue = false;
  }

  // if 3rd hand is full house then we will deduce 1st hand is straight flush and 2nd hand is four of a kind
  if (handType3 === HAND_TYPE_FULL_HOUSE) {
    needHandType1Clue = false;
    needHandType2Clue = false;
  }

  // if 4th hand is a flush then we will deduce 1st hand is straight flush and 2nd hand is four of a kind and 3rd hand is full house
  if (handType4 === HAND_TYPE_FLUSH) {
    needHandType1Clue = false;
    needHandType2Clue = false;
    needHandType3Clue = false;
  }

  // if 3rd hand is pair then we will deduce 4th hand is high card
  if (handType3 === HAND_TYPE_PAIR) {
    needHandType4Clue = false;
  }

  // if 2nd hand is two pair then we will deduce 3rd hand is pair and 4th hand is high card
  if (handType2 === HAND_TYPE_TWO_PAIR) {
    needHandType4Clue = false;
    needHandType3Clue = false;
  }

  // if 1st hand is three of a kind then we will deduce 2nd hand is two pair and 3rd hand is pair and 4th hand is high card
  if (handType1 === HAND_TYPE_THREE_OF_A_KIND) {
    needHandType4Clue = false;
    needHandType3Clue = false;
    needHandType2Clue = false;
  }

  // add in each hand type clue, if it is needed
  if (needHandType1Clue) {
    clues.push(createClueHandOfType(handType1, 0));
  }
  if (needHandType2Clue) {
    clues.push(createClueHandOfType(handType2, 1));
  }
  if (needHandType3Clue) {
    clues.push(createClueHandOfType(handType3, 2));
  }
  if (needHandType4Clue) {
    clues.push(createClueHandOfType(handType4, 3));
  }

  // TODO change approach here later
  // not good to do a SUIT_AND_NUMBER for every card, otherwise it just removes the HAND_TYPE clues and leaves 19 SUIT_AND_NUMBER clues
  // so for now rotate through SUIT_AND_NUMBER, SUIT and NUMBER clues for the cards
  let nextClueType = CLUE_SUIT_AND_NUMBER;
  solutionHands.forEach((solutionHand, solutionHandsIndex) => {
    solutionHand.forEach((card, solutionHandIndex) => {
      const { suit, number } = card;
      if (nextClueType === CLUE_SUIT_AND_NUMBER) {
        clues.push(createClueSuitAndNumber(suit, number, solutionHandsIndex, solutionHandIndex));
        nextClueType = CLUE_SUIT;
      } else if (nextClueType === CLUE_SUIT) {
        clues.push(createClueSuit(suit, solutionHandsIndex, solutionHandIndex));
        nextClueType = CLUE_NUMBER;
      } else {
        clues.push(createClueNumber(number, solutionHandsIndex, solutionHandIndex));
        nextClueType = CLUE_SUIT_AND_NUMBER;
      }
    });
  });

  // sometimes these clues can't solve the puzzle - so apply the above to a new solutionOptions and fill in the gaps with NOT_SUIT and NOT_NUMBER clues
  const solutionOptions = createSolutionOptions(missingNumber);
  const cardsAvailable = getCardsAvailable(solutionHands);
  const newSolutionOptions = applyAllHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
  if (!isSolutionOptionsComplete(cardsAvailable, newSolutionOptions)) {
    newSolutionOptions.forEach((handOptions, solutionOptionsIndex) => {
      handOptions.forEach((cardOptions, handOptionsIndex) => {
        if (!isCardOptionsAPlacedCard(cardOptions)) {
          // we need to know the correct card for here
          const card = solutionHands[solutionOptionsIndex][handOptionsIndex];
          if (countNumbersInCardOptions(cardOptions) > 1) {
            // create a NOT_NUMBER clue for each of the unwanted numbers
            NUMBERS.forEach((number) => {
              if (number !== card.number && getNumberOptionsValueInCardOptions(cardOptions, number)) {
                clues.push(createClueNotNumber(number, solutionOptionsIndex, handOptionsIndex));
              }
            });
          }
          if (countSuitsInCardOptions(cardOptions) > 1) {
            // create a NOT_SUIT clue for each of the unwanted suits
            SUITS.forEach((suit) => {
              if (suit !== card.suit && getSuitOptionsValueInCardOptions(cardOptions, convertSuitToSuitOptionsIndex(suit))) {
                clues.push(createClueNotSuit(suit, solutionOptionsIndex, handOptionsIndex));
              }
            });
          }
        }
      });
    });
  }

  return clues;
};

// --------------------------------------- //
// addInDeducedClues and support functions //
// --------------------------------------- //

// return true if the two given clues are fundamentally equal
const cluesEqual = (clue1, clue2) => {
  if (clue1.clueType === clue2.clueType) {
    if (clue1.clueType === CLUE_HAND_OF_TYPE && clue1.handType === clue2.handType && clue1.solutionHandsIndex === clue2.solutionHandsIndex) {
      return true;
    }
  }

  return false;
};

// return true if the given clue already exists in the given clues array
const clueExists = (clue, clues) => {
  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const nextClue = clues[i];
    if (cluesEqual(clue, nextClue)) {
      // found it
      return true;
    }
  }

  return false;
};

// return array of deduced clues from the given clues, returning the empty array if none
const getDeducedClues = (clues) => {
  const result = [];

  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;

    // if 2nd hand is 4 of a kind then 1st hand is straight flush
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FOUR_OF_A_KIND && solutionHandsIndex === 1) {
      const newClue = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        result.push(newClue);
      }
    }

    // if 3rd hand is full house then 1st hand is straight flush and 2nd hand is four of a kind
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FULL_HOUSE && solutionHandsIndex === 2) {
      const newClue1 = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, clue);
      // check we don't have the deduced clues already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
    }

    // if 4th hand is a flush then 1st hand is straight flush and 2nd hand is four of a kind and 3rd hand is full house
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FLUSH && solutionHandsIndex === 3) {
      const newClue1 = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, clue);
      const newClue3 = createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2, clue);
      // check we don't have the deduced clues already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
      if (!clueExists(newClue3, clues)) {
        result.push(newClue3);
      }
    }

    // if 3rd hand is pair then 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_PAIR && solutionHandsIndex === 2) {
      const newClue = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        result.push(newClue);
      }
    }

    // if 2nd hand is two pair then 3rd hand is pair and 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_TWO_PAIR && solutionHandsIndex === 1) {
      const newClue1 = createClueHandOfType(HAND_TYPE_PAIR, 2, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
    }

    // if 1st hand is three of a kind then 2nd hand is two pair and 3rd hand is pair and 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_THREE_OF_A_KIND && solutionHandsIndex === 0) {
      const newClue1 = createClueHandOfType(HAND_TYPE_TWO_PAIR, 1, clue);
      const newClue2 = createClueHandOfType(HAND_TYPE_PAIR, 2, clue);
      const newClue3 = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, clue);
      // check we don't have the deduced clue already
      if (!clueExists(newClue1, clues)) {
        result.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        result.push(newClue2);
      }
      if (!clueExists(newClue3, clues)) {
        result.push(newClue3);
      }
    }
  }

  return result;
};

// add any deduced clues to the given clues array
export const addInDeducedClues = (clues) => {
  const deducedClues = getDeducedClues(clues);
  if (deducedClues.length) {
    return [...clues, ...deducedClues];
  }

  // just return the original clues
  return clues;
};

// create the initial showClues array for the given clues - which is just an array of true bools of the same length
export const createInitialShowClues = (clues) => {
  const result = [];
  for (let index = 0; index < clues.length; index += 1) {
    result.push(true);
  }
  return result;
};
