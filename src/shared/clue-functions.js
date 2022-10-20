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
  CLUE_CARDS_SAME_NUMBER,
  CLUE_CARDS_NOT_SAME_NUMBER,
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

import logIfDevEnv from './logIfDevEnv';

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

  // if 1st hand and 3rd hand have a single hand type between them then we don't need a hand type clue for the 2nd hand as it will be deduced later
  if (handType1 - handType3 === 2) {
    needHandType2Clue = false;
  }

  // if 2nd hand and 4th hand have a single hand type between them then we don't need a hand type clue for the 3rd hand as it will be deduced later
  if (handType2 - handType4 === 2) {
    needHandType3Clue = false;
  }

  // if 1st hand and 4th hand have two hand types between them then we don't need hand type clues for the 2nd and 3rd hands as they will be deduced later
  if (handType1 - handType4 === 3) {
    needHandType2Clue = false;
    needHandType3Clue = false;
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

  // TODO change approach here later
  // create some random 'CARDS SAME NUMBER' clues
  // iterate over all but the last hand
  for (let solutionHandsIndex1 = 0; solutionHandsIndex1 < solutionHands.length - 1; solutionHandsIndex1 += 1) {
    const solutionHand1 = solutionHands[solutionHandsIndex1];
    solutionHand1.forEach((card1, solutionHandIndex1) => {
      // then iterate over the remaining hands
      for (let solutionHandsIndex2 = solutionHandsIndex1 + 1; solutionHandsIndex2 < solutionHands.length; solutionHandsIndex2 += 1) {
        const solutionHand2 = solutionHands[solutionHandsIndex2];
        solutionHand2.forEach((card2, solutionHandIndex2) => {
          // if these are the same number, add a clue
          if (card1.number === card2.number) {
            clues.push(createClueCardsSameNumber(solutionHandsIndex1, solutionHandIndex1, solutionHandsIndex2, solutionHandIndex2));
          }
        });
      }
    });
  }

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

// return true if the two given clues are fundamentally equal - for now we just cope with hand type clues
const cluesEqual = (clue1, clue2) => {
  if (clue1.clueType === clue2.clueType) {
    if (clue1.clueType === CLUE_HAND_OF_TYPE && clue1.handType === clue2.handType && clue1.solutionHandsIndex === clue2.solutionHandsIndex) {
      return true;
    }
  }

  return false;
};

// return true if the given clue already exists in the given clues array
export const clueExists = (clue, clues) => {
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
  const deducedClues = [];

  // look through each clue indvidually
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;

    // if 2nd hand is 4 of a kind then 1st hand is straight flush
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FOUR_OF_A_KIND && solutionHandsIndex === 1) {
      const newClue = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, [clue]);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        deducedClues.push(newClue);
      }
    }

    // if 3rd hand is full house then 1st hand is straight flush and 2nd hand is four of a kind
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FULL_HOUSE && solutionHandsIndex === 2) {
      const newClue1 = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, [clue]);
      const newClue2 = createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, [clue]);
      // check we don't have the deduced clues already
      if (!clueExists(newClue1, clues)) {
        deducedClues.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        deducedClues.push(newClue2);
      }
    }

    // if 4th hand is a flush then 1st hand is straight flush and 2nd hand is four of a kind and 3rd hand is full house
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_FLUSH && solutionHandsIndex === 3) {
      const newClue1 = createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, [clue]);
      const newClue2 = createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, [clue]);
      const newClue3 = createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2, [clue]);
      // check we don't have the deduced clues already
      if (!clueExists(newClue1, clues)) {
        deducedClues.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        deducedClues.push(newClue2);
      }
      if (!clueExists(newClue3, clues)) {
        deducedClues.push(newClue3);
      }
    }

    // if 3rd hand is pair then 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_PAIR && solutionHandsIndex === 2) {
      const newClue = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, [clue]);
      // check we don't have the deduced clue already
      if (!clueExists(newClue, clues)) {
        deducedClues.push(newClue);
      }
    }

    // if 2nd hand is two pair then 3rd hand is pair and 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_TWO_PAIR && solutionHandsIndex === 1) {
      const newClue1 = createClueHandOfType(HAND_TYPE_PAIR, 2, [clue]);
      const newClue2 = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, [clue]);
      // check we don't have the deduced clue already
      if (!clueExists(newClue1, clues)) {
        deducedClues.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        deducedClues.push(newClue2);
      }
    }

    // if 1st hand is three of a kind then 2nd hand is two pair and 3rd hand is pair and 4th hand is high card
    if (clueType === CLUE_HAND_OF_TYPE && handType === HAND_TYPE_THREE_OF_A_KIND && solutionHandsIndex === 0) {
      const newClue1 = createClueHandOfType(HAND_TYPE_TWO_PAIR, 1, [clue]);
      const newClue2 = createClueHandOfType(HAND_TYPE_PAIR, 2, [clue]);
      const newClue3 = createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, [clue]);
      // check we don't have the deduced clue already
      if (!clueExists(newClue1, clues)) {
        deducedClues.push(newClue1);
      }
      if (!clueExists(newClue2, clues)) {
        deducedClues.push(newClue2);
      }
      if (!clueExists(newClue3, clues)) {
        deducedClues.push(newClue3);
      }
    }
  }

  // now look through each clue in pairs for hand type clues for hands with the same gap as the types of clues between them
  for (let i = 0; i < clues.length - 1; i += 1) {
    const clue1 = clues[i];
    const { clueType: clueType1 } = clue1;
    if (clueType1 === CLUE_HAND_OF_TYPE) {
      for (let j = i + 1; j < clues.length; j += 1) {
        const clue2 = clues[j];
        const { clueType: clueType2 } = clue2;
        if (clueType2 === CLUE_HAND_OF_TYPE) {
          // okay we have two hand type clues
          // we are interested if the diff in the solutionHandsIndexes is the same as the diff in the hand type values (as these are consequtive numbers)
          // the clues can be either way round but the abs of the diff will be the same
          const { solutionHandsIndex: solutionHandsIndex1, handType: handType1 } = clue1;
          const { solutionHandsIndex: solutionHandsIndex2, handType: handType2 } = clue2;
          const indexDiff = Math.abs(solutionHandsIndex1 - solutionHandsIndex2);
          const handTypeDiff = Math.abs(handType1 - handType2);
          if (indexDiff === handTypeDiff) {
            logIfDevEnv(`getDeducedClues found two hand type clues with the same solutionHandsIndex diff as clueType diff ${indexDiff}`);
            const lowerHandType = handType1 < handType2 ? handType1 : handType2;
            const lowerSolutionHandsIndex = solutionHandsIndex1 < solutionHandsIndex2 ? solutionHandsIndex1 : solutionHandsIndex2;
            if (indexDiff === 2) {
              // just create one hand type clue for the middle hand
              const newClue = createClueHandOfType(lowerHandType + 1, lowerSolutionHandsIndex + 1, [clue1, clue2]);
              // check we don't have the deduced clue already
              if (!clueExists(newClue, clues) && !clueExists(newClue, deducedClues)) {
                deducedClues.push(newClue);
              }
            } else if (indexDiff === 3) {
              // this is the only other possibility with 4 hands
              // we need to create a hand type clue for the 2nd hand and another for the third hand
              const newClue1 = createClueHandOfType(lowerHandType + 2, lowerSolutionHandsIndex + 1, [clue1, clue2]);
              // check we don't have the deduced clue already
              if (!clueExists(newClue1, clues) && !clueExists(newClue1, deducedClues)) {
                deducedClues.push(newClue1);
              }
              const newClue2 = createClueHandOfType(lowerHandType + 1, lowerSolutionHandsIndex + 2, [clue1, clue2]);
              // check we don't have the deduced clue already
              if (!clueExists(newClue2, clues) && !clueExists(newClue2, deducedClues)) {
                deducedClues.push(newClue2);
              }
            }
          }
        }
      }
    }
  }

  return deducedClues;
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
