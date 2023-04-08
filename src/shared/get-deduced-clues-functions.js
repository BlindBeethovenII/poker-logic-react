// get deduced clues functions

import { sortHand, calcHandType, getMaxCountOfSameCardNumber } from './card-functions';

import { clueExists } from './clueExists';

import { createClueHandOfType, createClueHandTypeDeducedFromSolutionOptions, createClueHandTypeDeducedFromCardsStillAvailable } from './create-clue-functions';

import { canHandOptionsBeHandType, getPlacedCardsInHandOptions, getHandsInWhichCardCanStillBePlaced } from './solution-functions';

import {
  CLUE_HAND_OF_TYPE,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
  HAND_TYPES_SORTED,
} from './constants';

import logIfDevEnv from './logIfDevEnv';

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
            // logIfDevEnv(`getDeducedClues found two hand type clues with the same solutionHandsIndex diff as clueType diff ${indexDiff}`);
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

// helper function to return possible hand types based on solutionHandsIndex and other hand types
export const getPossibleHandTypesBasedOnOthers = (solutionHandsIndex, knownHandTypes) => {
  const possibleHandTypes = new Set(HAND_TYPES_SORTED);

  // first look down from where we are, and remove the first we meet and below
  let foundHandType = false;
  for (let i = solutionHandsIndex + 1; i < knownHandTypes.length && !foundHandType; i += 1) {
    const handType = knownHandTypes[i];
    if (handType !== undefined) {
      // we've found a hand type
      foundHandType = true;

      // calculate how far we can 'back up' through the undefines we have gone through
      const firstHandTypeToRemove = handType + (i - solutionHandsIndex - 1);

      // note: this relies on hand types being integers and ordered and the lowest being 1
      for (let handTypeToRemove = firstHandTypeToRemove; handTypeToRemove > 0; handTypeToRemove -= 1) {
        possibleHandTypes.delete(handTypeToRemove);
      }
    }
  }

  // if a hand type wasn't found then that is the same as one less than the both hand type being at one index below
  if (!foundHandType) {
    // calculate how far we can 'back up' through the undefines we have gone through
    const handType = HAND_TYPE_HIGH_CARD - 1;
    const i = knownHandTypes.length;
    const firstHandTypeToRemove = handType + (i - solutionHandsIndex - 1);
    for (let handTypeToRemove = firstHandTypeToRemove; handTypeToRemove > 0; handTypeToRemove -= 1) {
      possibleHandTypes.delete(handTypeToRemove);
    }
  }

  // first look up from where we are, and remove the first we meet and above
  foundHandType = false;
  for (let i = solutionHandsIndex - 1; i >= 0 && !foundHandType; i -= 1) {
    const handType = knownHandTypes[i];
    if (handType !== undefined) {
      // we've found a hand type
      foundHandType = true;

      // calculate how far we can 'back down' through the undefines we have gone through
      const firstHandTypeToRemove = handType - (solutionHandsIndex - i - 1);

      // remove this hand type and above
      for (let handTypeToRemove = firstHandTypeToRemove; handTypeToRemove <= HAND_TYPE_STRAIGHT_FLUSH; handTypeToRemove += 1) {
        possibleHandTypes.delete(handTypeToRemove);
      }
    }
  }

  // always remove all the hand types that exactly fit into our hand type upwards, as if this one were one of them, there would be none left to fit in above/
  // that is solutionHandsIndex 1 cannot be the first hand type (HAND_TYPE_STRAIGHT_FLUSH) because that can never be anywhere else but 0
  for (let i = 0; i < solutionHandsIndex; i += 1) {
    possibleHandTypes.delete(HAND_TYPE_STRAIGHT_FLUSH - i);
  }

  return Array.from(possibleHandTypes);
};

// return array of deduced clues from the given solutionOptions and clues, returning the empty array if none
const getDeducedCluesFromSolutionOptions = (cardsStillAvailable, cardsAvailable, solutionOptions, clues) => {
  const deducedClues = [];

  // first work out what hand types we know
  const knownHandTypes = [undefined, undefined, undefined, undefined];
  for (let i = 0; i < clues.length; i += 1) {
    const clue = clues[i];
    const { clueType, handType, solutionHandsIndex } = clue;
    if (clueType === CLUE_HAND_OF_TYPE) {
      // this is a known hand type
      knownHandTypes[solutionHandsIndex] = handType;
    }
  }

  // do some prep work

  // look at each card that is still available and see if it can only be placed in a single hand
  const requiredCardsBySolutionHandsIndex = [[], [], [], []];
  cardsStillAvailable.forEach((suitCardsAvailable) => {
    suitCardsAvailable.forEach((card) => {
      // in which hands can this card be placed?
      const possibleHands = getHandsInWhichCardCanStillBePlaced(card, solutionOptions);

      // if there is only one, then remember it
      if (possibleHands.length === 1) {
        const possibleHand = possibleHands[0];
        requiredCardsBySolutionHandsIndex[possibleHand].push(card);
      } else if (possibleHands.length === 0) {
        console.error(`getDeducedCluesFromSolutionOptions: this should never happen - card ${JSON.stringify(card)} cannot be placed in a hand`);
      }
    });
  });

  // console.error('TODO REMOVE getDeducedCluesFromSolutionOptions requiredCardsBySolutionHandsIndex is', requiredCardsBySolutionHandsIndex);

  // consider any hand type we don't know yet
  for (let solutionHandsIndex = 0; solutionHandsIndex < knownHandTypes.length; solutionHandsIndex += 1) {
    if (knownHandTypes[solutionHandsIndex] === undefined) {
      // first, restrict the possible hand types based on the hand types of the hands above and/or below this one
      const possibleHandTypes = getPossibleHandTypesBasedOnOthers(solutionHandsIndex, knownHandTypes);
      logIfDevEnv(`getDeducedCluesFromSolutionOptions possibleHandTypes for solutionHandsIndex ${solutionHandsIndex}: ${possibleHandTypes}`);

      // check each possible hand type and reject those that are no longer possible given the current solutionOptions, cardsAvailable and cardsStillAvailable
      const stillPossibleHandTypesSet = new Set(possibleHandTypes);
      const handOptions = solutionOptions[solutionHandsIndex];

      // there may be certain cards in cardsStillAvailable can only now go in this hand
      const requiredCards = requiredCardsBySolutionHandsIndex[solutionHandsIndex];

      // we need to know the max number of cards of the same number (e.g. [A, A, A, K] is 3)
      const maxCountOfSameCardNumber = getMaxCountOfSameCardNumber(requiredCards);

      for (let possibleHandTypeIndex = 0; possibleHandTypeIndex < possibleHandTypes.length; possibleHandTypeIndex += 1) {
        const possibleHandType = possibleHandTypes[possibleHandTypeIndex];
        if (!canHandOptionsBeHandType(handOptions, possibleHandType, cardsStillAvailable, requiredCards, maxCountOfSameCardNumber)) {
          stillPossibleHandTypesSet.delete(possibleHandType);
        }
      }

      const stillPossibleHandTypes = Array.from(stillPossibleHandTypesSet);
      logIfDevEnv(`getDeducedCluesFromSolutionOptions stillPossibleHandTypes for solutionHandsIndex ${solutionHandsIndex}: ${stillPossibleHandTypes}`);

      // if no possible hand types - then we have a problem!
      if (stillPossibleHandTypes.length === 0) {
        console.error(
          `getDeducedCluesFromSolutionOptions: this should never happen - no stillPossibleHandTypes for solutionHandsIndex ${solutionHandsIndex}: possibleHandTypes = ${possibleHandTypes}`,
        );
      } else if (stillPossibleHandTypes.length === 1) {
        // if there is only a single hand type left, then create the deduced clue to state that it is this hand type
        // note: this new clue can't already be in clues or deducedClues at this point, so we don't need to check
        const handType = stillPossibleHandTypes[0];
        deducedClues.push(createClueHandOfType(handType, solutionHandsIndex, [createClueHandTypeDeducedFromSolutionOptions(solutionHandsIndex)]));

        // we now know a hand type, so previous hand types might be restricted, so start the loop again
        knownHandTypes[solutionHandsIndex] = handType;
        solutionHandsIndex = -1;
      } else {
        // we now cover the case where there are n cardsStillAvailable and n unplaced cards in this handOptions
        // which means these n cardsStillAvailable must go in this hand, and so these n cardsStillAvailable and the placed cards in handOptions can only make one hand type
        const cardsStillAvailableArray = [...cardsStillAvailable[0], ...cardsStillAvailable[1], ...cardsStillAvailable[2], ...cardsStillAvailable[3]];
        const nCardsStillAvailable = cardsStillAvailableArray.length;
        const handOptionsPlacedCardsArray = getPlacedCardsInHandOptions(handOptions);
        const nHandOptionsPlacedCards = handOptionsPlacedCardsArray.length;
        if (nCardsStillAvailable === 5 - nHandOptionsPlacedCards) {
          // combine the cardsStillAvailable and handOptionsPlacedCards into a sorted hand
          const hand = sortHand([...cardsStillAvailableArray, ...handOptionsPlacedCardsArray]);
          const handType = calcHandType(hand);
          deducedClues.push(createClueHandOfType(handType, solutionHandsIndex, [createClueHandTypeDeducedFromCardsStillAvailable(solutionHandsIndex)]));
          logIfDevEnv(`getDeducedCluesFromSolutionOptions created hand type clue ${handType} for solutionHandsIndex ${solutionHandsIndex} as ${nCardsStillAvailable} card(s) must be in this hand`);

          // we now know a hand type, so previous hand types might be restricted, so start the loop again
          knownHandTypes[solutionHandsIndex] = handType;
          solutionHandsIndex = -1;
        }
      }
    }
  }

  return deducedClues;
};

// uses solutionOptions to add in deduced hand type clues; as well as calling addInDeducedClues() again if a new hand type clue is added, to create the hand type clues for the gaps
export const addInDeducedCluesFromSolutionOptions = (cardsStillAvailable, cardsAvailable, solutionOptions, clues) => {
  const deducedClues = getDeducedCluesFromSolutionOptions(cardsStillAvailable, cardsAvailable, solutionOptions, clues);
  if (deducedClues.length) {
    return [...clues, ...deducedClues];
  }

  // just return the original clues
  return clues;
};
