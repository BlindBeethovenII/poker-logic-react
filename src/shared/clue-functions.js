// useful clue functions

import shuffle from 'lodash.shuffle';

import {
  calcHandType,
  cardSuitToFillColour,
  isCardEven,
} from './card-functions';

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

import {
  createClueHandOfType,
  createClueSuitAndNumber,
  createClueSuit,
  createClueNotSuit,
  createClueNumber,
  createClueNotNumber,
  createClueCardsSameNumber,
  createClueCardsNotSameNumber,
  createClueCardsSameSuit,
  createClueCardsNotSameSuit,
  createClueRedSuit,
  createClueBlackSuit,
  createClueRedSuits,
  createClueBlackSuits,
  createClueCardEven,
  createClueCardOdd,
  createClueHandEven,
  createClueHandOdd,
  createClueHandHasNumber,
  createClueHandNotNumber,
  createClueHandHasSuit,
  createClueHandNotSuit,
  createClueHandHasSuitAndNumber,
  createClueHandNotSuitAndNumber,
  createClueHandLowestNumber,
  createClueHandHighestNumber,
} from './create-clue-functions';

import { clueExists } from './clueExists';

import { applyAllHintsToSolutionOptions } from './apply-hints-functions';

import {
  CLUE_HAND_OF_TYPE,
  CLUE_SUIT_AND_NUMBER,
  CLUE_SUIT,
  CLUE_NUMBER,
  CLUE_RED_SUIT,
  CLUE_CARD_EVEN,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  NUMBERS,
  SUITS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_RED,
  SUIT_BLACK,
  CLUE_ORDERING,
  CLUE_ORDERING_REDUCING,
  NUMBER_A,
} from './constants';

// import logIfDevEnv from './logIfDevEnv';

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
  // so for now rotate through SUIT_AND_NUMBER, SUIT, SUIT_RED, SUIT_BLACK, CARD_EVEN, CARD_ODD and NUMBER clues for the cards
  let nextClueType = CLUE_SUIT_AND_NUMBER;
  solutionHands.forEach((solutionHand, solutionHandsIndex) => {
    solutionHand.forEach((card, solutionHandIndex) => {
      const { suit, number } = card;
      if (nextClueType === CLUE_SUIT_AND_NUMBER) {
        clues.push(createClueSuitAndNumber(suit, number, solutionHandsIndex, solutionHandIndex));
        nextClueType = CLUE_SUIT;
      } else if (nextClueType === CLUE_SUIT) {
        clues.push(createClueSuit(suit, solutionHandsIndex, solutionHandIndex));
        nextClueType = CLUE_RED_SUIT;
      } else if (nextClueType === CLUE_RED_SUIT) {
        // note: this covers both red suit and black suits
        if (suit === SUIT_HEARTS || suit === SUIT_DIAMONDS) {
          clues.push(createClueRedSuit(solutionHandsIndex, solutionHandIndex));
        } else {
          clues.push(createClueBlackSuit(solutionHandsIndex, solutionHandIndex));
        }
        nextClueType = CLUE_CARD_EVEN;
      } else if (nextClueType === CLUE_CARD_EVEN) {
        // note: this covers both card even and card odd
        if (isCardEven(number)) {
          clues.push(createClueCardEven(solutionHandsIndex, solutionHandIndex));
        } else {
          clues.push(createClueCardOdd(solutionHandsIndex, solutionHandIndex));
        }
        nextClueType = CLUE_NUMBER;
      } else {
        clues.push(createClueNumber(number, solutionHandsIndex, solutionHandIndex));
        nextClueType = CLUE_SUIT_AND_NUMBER;
      }
    });
  });

  // TODO change approach here later
  // add in all red or all black clue if a hand is solely made of red or black cards
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    let soleColour;
    solutionHand.forEach((card) => {
      const nextColour = cardSuitToFillColour(card.suit);
      if (!soleColour) {
        // first card
        soleColour = nextColour;
      } else if (soleColour !== nextColour) {
        // not the first card: this is a different colour than those that went before, so remember
        soleColour = 'DIFFERENT';
      }
    });

    // if soleColour is red or black then create corresponding clue
    if (soleColour === SUIT_RED) {
      clues.push(createClueRedSuits(solutionHandsIndex));
    } else if (soleColour === SUIT_BLACK) {
      clues.push(createClueBlackSuits(solutionHandsIndex));
    }
  }

  // TODO change approach here later
  // add in all cards even or all cards odd clue if a hand is solely made of even or odd cards
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    let soleParity;
    solutionHand.forEach((card) => {
      const nextParity = isCardEven(card.number);
      if (soleParity === undefined) {
        // first card
        soleParity = nextParity;
      } else if (soleParity !== nextParity) {
        // not the first card: this is a different parity than those that went before, so remember
        soleParity = 'DIFFERENT';
      }
    });

    // if soleParity is true or false then create corresponding clue
    if (soleParity === true) {
      clues.push(createClueHandEven(solutionHandsIndex));
    } else if (soleParity === false) {
      clues.push(createClueHandOdd(solutionHandsIndex));
    }
  }

  // TODO change approach here later
  // create an 'HAND HAS NUMBER' for each hand
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];

    // for this hand, select a random card, and create the hand has number clue for its number
    const solutionHandIndex = shuffle([0, 1, 2, 3, 4])[0];
    const card = solutionHand[solutionHandIndex];
    clues.push(createClueHandHasNumber(card.number, solutionHandsIndex));
  }

  // TODO change approach here later
  // create an 'HAND NOT NUMBER' for each hand
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    const numbersNotUsed = new Set(NUMBERS);
    solutionHand.forEach((card) => {
      numbersNotUsed.delete(card.number);
    });

    // now pick a random number that is not used to create the clue
    const number = shuffle(Array.from(numbersNotUsed))[0];
    clues.push(createClueHandNotNumber(number, solutionHandsIndex));
  }

  // TODO change approach here later
  // create an 'HAND HAS SUIT' for each hand
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];

    // for this hand, select a random card, and create the hand has suit clue for its suit
    const solutionHandIndex = shuffle([0, 1, 2, 3, 4])[0];
    const card = solutionHand[solutionHandIndex];
    clues.push(createClueHandHasSuit(card.suit, solutionHandsIndex));
  }

  // TODO change approach here later
  // create all possible 'HAND NOT SUIT' clues for each hand
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];
    const suitsNotUsed = new Set(SUITS);
    solutionHand.forEach((card) => {
      suitsNotUsed.delete(card.suit);
    });

    // create an 'HAND NOT SUIT' for all remaining suits
    suitsNotUsed.forEach((suit) => {
      clues.push(createClueHandNotSuit(suit, solutionHandsIndex));
    });
  }

  // TODO change approach here later
  // create a couple of 'HAND HAS SUIT AND NUMBER' for each hand
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];

    // for this hand, select two random cards, and create the hand has suit/number clue for it
    const randomisedIndexes = shuffle([0, 1, 2, 3, 4]);
    const solutionHandIndex1 = randomisedIndexes[0];
    const card1 = solutionHand[solutionHandIndex1];
    clues.push(createClueHandHasSuitAndNumber(card1.suit, card1.number, solutionHandsIndex));
    const solutionHandIndex2 = randomisedIndexes[1];
    const card2 = solutionHand[solutionHandIndex2];
    clues.push(createClueHandHasSuitAndNumber(card2.suit, card2.number, solutionHandsIndex));
  }

  // TODO change approach here later
  // create a few 'HAND NOT SUIT AND NUMBER' for each hand
  // these must be based on actual cards in the solution
  for (let nHints = 0; nHints < 5; nHints += 1) {
    // creating 5 hints

    // select a random solutionHand
    const solutionHandsIndex = shuffle([0, 1, 2, 3])[0];

    // select a random card from that soluiton hand
    const solutionHandIndex = shuffle([0, 1, 2, 3, 4])[0];
    const card = solutionHands[solutionHandsIndex][solutionHandIndex];

    // select a random other hand - as this card cannot be in that hand
    const otherSolutionHandsIndexes = [];
    for (let i = 0; i < 4; i += 1) {
      if (i !== solutionHandsIndex) {
        otherSolutionHandsIndexes.push(i);
      }
    }
    const otherSolutionHandsIndex = shuffle(otherSolutionHandsIndexes)[0];
    clues.push(createClueHandNotSuitAndNumber(card.suit, card.number, otherSolutionHandsIndex));
  }

  // TODO change approach here later
  // create a 'HAND LOWEST NUMBER' for each hand - where A is considered higher than a K
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];

    // find the lowest number
    let lowestNumber = solutionHand[0].number;
    // this could be an A, if so, set lowestNumber to 14 so we always get a lower number than this from the remaining 4 cards
    if (lowestNumber === NUMBER_A) {
      lowestNumber = 14;
    }
    for (let solutionHandIndex = 1; solutionHandIndex < solutionHand.length; solutionHandIndex += 1) {
      const nextNumber = solutionHand[solutionHandIndex].number;
      if (nextNumber !== NUMBER_A && nextNumber < lowestNumber) {
        lowestNumber = nextNumber;
      }
    }

    clues.push(createClueHandLowestNumber(lowestNumber, solutionHandsIndex));
  }

  // TODO change approach here later
  // create a 'HAND HIGHEST NUMBER' for each hand - where A is considered higher than a K
  for (let solutionHandsIndex = 0; solutionHandsIndex < solutionHands.length; solutionHandsIndex += 1) {
    const solutionHand = solutionHands[solutionHandsIndex];

    if (solutionHand[0].number === NUMBER_A
        || solutionHand[1].number === NUMBER_A
        || solutionHand[2].number === NUMBER_A
        || solutionHand[3].number === NUMBER_A
        || solutionHand[4].number === NUMBER_A) {
      clues.push(createClueHandHighestNumber(NUMBER_A, solutionHandsIndex));
    } else {
      // find the highest number (A already dealt with)
      let highestNumber = solutionHand[0].number;
      for (let solutionHandIndex = 1; solutionHandIndex < solutionHand.length; solutionHandIndex += 1) {
        const nextNumber = solutionHand[solutionHandIndex].number;
        if (nextNumber > highestNumber) {
          highestNumber = nextNumber;
        }
      }
      clues.push(createClueHandHighestNumber(highestNumber, solutionHandsIndex));
    }
  }

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

  // TODO change approach here later
  // create some random 'CARDS SAME SUIT' clues
  // iterate over all but the last hand
  for (let solutionHandsIndex1 = 0; solutionHandsIndex1 < solutionHands.length - 1; solutionHandsIndex1 += 1) {
    const solutionHand1 = solutionHands[solutionHandsIndex1];

    // choose a random card from this hand
    const solutionHandIndex1 = shuffle([0, 1, 2, 3, 4])[0];
    const card1 = solutionHand1[solutionHandIndex1];

    // then iterate over the remaining hands
    for (let solutionHandsIndex2 = solutionHandsIndex1 + 1; solutionHandsIndex2 < solutionHands.length; solutionHandsIndex2 += 1) {
      const solutionHand2 = solutionHands[solutionHandsIndex2];
      solutionHand2.forEach((card2, solutionHandIndex2) => {
        // if these are the same suit, add a clue
        if (card1.suit === card2.suit) {
          clues.push(createClueCardsSameSuit(solutionHandsIndex1, solutionHandIndex1, solutionHandsIndex2, solutionHandIndex2));
        }
      });
    }
  }

  // TODO change approach here later
  // create some random 'CARDS NOT SAME NUMBER' clues
  // iterate over all but the last hand
  for (let solutionHandsIndex1 = 0; solutionHandsIndex1 < solutionHands.length - 1; solutionHandsIndex1 += 1) {
    const solutionHand1 = solutionHands[solutionHandsIndex1];

    // choose a random card from this hand
    const solutionHandIndex1 = shuffle([0, 1, 2, 3, 4])[0];
    const card1 = solutionHand1[solutionHandIndex1];

    // then iterate over the remaining hands
    for (let solutionHandsIndex2 = solutionHandsIndex1 + 1; solutionHandsIndex2 < solutionHands.length; solutionHandsIndex2 += 1) {
      const solutionHand2 = solutionHands[solutionHandsIndex2];

      // choose a random card from this hand
      const solutionHandIndex2 = shuffle([0, 1, 2, 3, 4])[0];
      const card2 = solutionHand2[solutionHandIndex2];

      // if these are not the same number, add a clue
      if (card1.number !== card2.number) {
        clues.push(createClueCardsNotSameNumber(solutionHandsIndex1, solutionHandIndex1, solutionHandsIndex2, solutionHandIndex2));
      }
    }
  }

  // TODO change approach here later
  // create some random 'CARDS NOT SAME SUIT' clues
  // iterate over all but the last hand
  for (let solutionHandsIndex1 = 0; solutionHandsIndex1 < solutionHands.length - 1; solutionHandsIndex1 += 1) {
    const solutionHand1 = solutionHands[solutionHandsIndex1];

    // choose a random card from this hand
    const solutionHandIndex1 = shuffle([0, 1, 2, 3, 4])[0];
    const card1 = solutionHand1[solutionHandIndex1];

    // then iterate over the remaining hands
    for (let solutionHandsIndex2 = solutionHandsIndex1 + 1; solutionHandsIndex2 < solutionHands.length; solutionHandsIndex2 += 1) {
      const solutionHand2 = solutionHands[solutionHandsIndex2];

      // choose a random card from this hand
      const solutionHandIndex2 = shuffle([0, 1, 2, 3, 4])[0];
      const card2 = solutionHand2[solutionHandIndex2];

      // if these are not the same suit, add a clue
      if (card1.suit !== card2.suit) {
        clues.push(createClueCardsNotSameSuit(solutionHandsIndex1, solutionHandIndex1, solutionHandsIndex2, solutionHandIndex2));
      }
    }
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

// create the initial showClues array for the given clues - which is just an array of true bools of the same length
export const createInitialShowClues = (clues) => {
  const result = [];
  for (let index = 0; index < clues.length; index += 1) {
    result.push(true);
  }
  return result;
};

// the sort compare function for clue sorting
const clueCompare = (clue1, clue2) => {
  const { clueType: clueType1, deduced: deduced1 } = clue1;
  const { clueType: clueType2, deduced: deduced2 } = clue2;

  // special case for deduced clue - they always go to the end, as sometimes they are not shown - and if we sort to front, then there is a gap
  if (deduced1 && !deduced2) {
    // move a deduced clue after a non-deduced clue
    return 1;
  }

  // special case if both CLUE_HAND_OF_TYPE - these we compare by their handType
  if (clueType1 === CLUE_HAND_OF_TYPE && clueType2 === CLUE_HAND_OF_TYPE) {
    return clue2.handType - clue1.handType;
  }

  // otherwise just compare their entry in the CLUE_ORDERING object
  let clue1Ordering = CLUE_ORDERING[clueType1];
  if (!clue1Ordering) {
    // cope with it missing
    clue1Ordering = 99;
  }

  let clue2Ordering = CLUE_ORDERING[clueType2];
  if (!clue2Ordering) {
    // cope with it missing
    clue2Ordering = 999;
  }

  return clue2Ordering - clue1Ordering;
};

// sort clues according to CLUE_ORDERING for showing
export const sortCluesShowing = (cluesParam) => {
  // copy of clues param as the array.sort() sorts in place
  const clues = [...cluesParam];

  clues.sort(clueCompare);

  return clues;
};

// the sort compare function for clue sorting for reducing
const clueCompareReducing = (clue1, clue2) => {
  const { clueType: clueType1 } = clue1;
  const { clueType: clueType2 } = clue2;

  // special case if both CLUE_HAND_OF_TYPE - these we compare by their handType
  if (clueType1 === CLUE_HAND_OF_TYPE && clueType2 === CLUE_HAND_OF_TYPE) {
    return clue2.handType - clue1.handType;
  }

  // otherwise just compare their entry in the CLUE_ORDERING object
  let clue1Ordering = CLUE_ORDERING_REDUCING[clueType1];
  if (!clue1Ordering) {
    // cope with it missing
    clue1Ordering = 99;
  }

  let clue2Ordering = CLUE_ORDERING_REDUCING[clueType2];
  if (!clue2Ordering) {
    // cope with it missing
    clue2Ordering = 999;
  }

  return clue2Ordering - clue1Ordering;
};

// sort clues according to CLUE_ORDERING_REDUCING for reducing
// Note: no longer used - will make this a user option eventually
export const sortCluesReducing = (cluesParam) => {
  // copy of clues param as the array.sort() sorts in place
  const clues = [...cluesParam];

  clues.sort(clueCompareReducing);

  return clues;
};

// support function to decide if a clue is to be shown
// a clue is always shown if it is not deduced from another/other clues
// a clue with deduced defined is shown to the user if any of its deduced clues is no longer still in clues
//   - that it, either of those clues was removed by reduceClues() and now they are not available to the user to deduce the deduced clue
// otherwise the deduced clue is not shown
export const showDeducedClue = (clue, clues) => {
  const { deduced } = clue;
  if (deduced === undefined) {
    return true;
  }

  // the clue is deduced, we need to show it it any of its deduces clues is no longer still in clues
  for (let i = 0; i < deduced.length; i += 1) {
    if (!clueExists(deduced[i], clues)) {
      return true;
    }
  }

  // otherwise the deduced clue is not show
  return false;
};
