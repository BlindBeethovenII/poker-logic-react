// useful card functions

import shuffle from 'lodash.shuffle';

import CardSuitSpadesImage from '../images/cards/spades.png';
import CardSuitHeartsImage from '../images/cards/hearts.png';
import CardSuitDiamondsImage from '../images/cards/diamonds.png';
import CardSuitClubsImage from '../images/cards/clubs.png';

import {
  CARD_WIDTH,
  CARD_HEIGHT,
  NUMBER_A,
  NUMBER_K,
  NUMBER_Q,
  NUMBER_J,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
  SUITS,
  NUMBERS,
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
  NUMBER_10,
} from './constants';

import logIfDevEnv from './logIfDevEnv';

// calc left based on given column
export function colToLeft(col) {
  return 21 + (col * CARD_WIDTH);
}

// calc top based on given row
export function rowToTop(row) {
  return 20 + (row * CARD_HEIGHT);
}

// calc left based on given column for the small cards
export function colToLeftSmall(col) {
  return colToLeft(7) - 10 + (col * (CARD_WIDTH / 2));
}

// calc top based on given row for the small cards
export function rowToTopSmall(row) {
  return 24 + (row * (CARD_HEIGHT / 2));
}

export const cardNumberToString = (number) => {
  if (number === NUMBER_A) return 'A';
  if (number === NUMBER_K) return 'K';
  if (number === NUMBER_Q) return 'Q';
  if (number === NUMBER_J) return 'J';
  return number;
};

export const cardSuitToImage = (suit) => {
  if (suit === SUIT_CLUBS) return CardSuitClubsImage;
  if (suit === SUIT_DIAMONDS) return CardSuitDiamondsImage;
  if (suit === SUIT_HEARTS) return CardSuitHeartsImage;
  return CardSuitSpadesImage;
};

export const cardSuitToFillColour = (suit) => {
  if (suit === SUIT_CLUBS || SUIT_SPADES) return 'black';
  return 'red';
};

// the simple algorithm to generate the player and opponent card id from the card's suit and number
export const generateCardId = (suit, number) => `card_${suit}_${number}`;

// create the card object for the given suit/number
export const createCard = (suit, number) => ({
  id: generateCardId(suit, number),
  suit,
  number,
});

// helper function for suit ordering
const suitToN = (suit) => {
  if (suit === SUIT_CLUBS) return 1;
  if (suit === SUIT_DIAMONDS) return 2;
  if (suit === SUIT_HEARTS) return 3;
  return 4;
};

// helper function to say if a suit is less than another suit
const suitLessThan = (s1, s2) => suitToN(s1) < suitToN(s2);

// sort a hand
const sortHand = (handParam) => {
  // simple copy of hand param (just to get around eslint complaint about assigning to function params)
  const hand = [handParam[0], handParam[1], handParam[2], handParam[3], handParam[4]];

  // do bubble sort to order the cards
  for (let length = 5; length > 1; length -= 1) {
    // move the smallest card from first entry to length
    for (let i = 0; i < length - 1; i += 1) {
      const thisHandNumber = hand[i].number;
      const nextHandNumber = hand[i + 1].number;
      let swap = false;
      if (thisHandNumber === NUMBER_A || nextHandNumber === NUMBER_A) {
        // NUMBER_A is less than all other numbers but considered the greatest, so special code for that
        if (nextHandNumber === NUMBER_A && thisHandNumber !== NUMBER_A) {
          // if this number is not an ace and the next is, then this is smaller, so move to the right
          swap = true;
        }
        // else this is a NUMBER_A and so cannot be smaller than the next number
      } else if (thisHandNumber < nextHandNumber) {
        // this is smaller, so move to the right
        swap = true;
      }
      // if the numbers are the same - then sort suits S, H, D, C
      if (thisHandNumber === nextHandNumber && suitLessThan(hand[i].suit, hand[i + 1].suit)) {
        swap = true;
      }
      if (swap) {
        // this is smaller, so move to the right
        const card = hand[i + 1];
        hand[i + 1] = hand[i];
        hand[i] = card;
      }
    }
  }

  return hand;
};

// return true if the hand is 5 cards of the same suit
function handIsFlush(sortedHand) {
  // first card
  const firstCard = sortedHand[0];
  for (let i = 1; i < 5; i += 1) {
    const nextCard = sortedHand[i];
    if (nextCard.suit !== firstCard.suit) {
      return false;
    }
  }
  return true;
}

// return true if the sorted hand is a straight
function handIsStraight(sortedHand) {
  // all cards are defined, so easy to see if they are a straight
  if (
    sortedHand[0].number === sortedHand[1].number - 1
    && sortedHand[1].number === sortedHand[2].number - 1
    && sortedHand[2].number === sortedHand[3].number - 1
    && sortedHand[3].number === sortedHand[4].number - 1
  ) {
    return true;
  }

  // don't forget A K Q J 10
  if (
    sortedHand[0].number === NUMBER_A
    && sortedHand[1].number === NUMBER_K
    && sortedHand[2].number === NUMBER_Q
    && sortedHand[3].number === NUMBER_J
    && sortedHand[4].number === NUMBER_10
  ) {
    return true;
  }

  // it is not a straight
  return false;
}

// return the length of the longest number in the sorted hand
function handLongestNumber(sortedHand) {
  let longestCount = 0;
  let currentCount = 0;
  let currentCard = sortedHand[0];

  // we have a card
  currentCount = 1;

  for (let i = 1; i < 5; i += 1) {
    const nextCard = sortedHand[i];

    // if same as previous increment
    if (nextCard.number === currentCard.number) {
      // same number
      currentCount += 1;
    } else {
      // we are moving to the next, see if current is a longer
      if (currentCount > longestCount) {
        longestCount = currentCount;
      }
      currentCard = nextCard;
      // back to counting from 1
      currentCount = 1;
    }
  }

  // check one we have been working on
  if (currentCount > longestCount) {
    longestCount = currentCount;
  }

  return longestCount;
}

// return true if the sorted hand is a full house
function handIsFullHouse(sortedHand) {
  // to be a full house it must be 2 of same followed by 3 of same, or 3 of same followed by 2 of same
  if (
    sortedHand[0].number === sortedHand[1].number
    && sortedHand[2].number === sortedHand[3].number
    && sortedHand[3].number === sortedHand[4].number
  ) {
    return true;
  }

  if (
    sortedHand[0].number === sortedHand[1].number
    && sortedHand[1].number === sortedHand[2].number
    && sortedHand[3].number === sortedHand[4].number
  ) {
    return true;
  }

  // it is not a full house
  return false;
}

// return true if the sorted hand is two pairs (note this will be called after checking for full house)
function handIsTwoPairs(sortedHand) {
  // to be a two pairs it must be 2,2,1 (same test) or 2,1,2 or 1,2,2
  if (sortedHand[0].number === sortedHand[1].number && sortedHand[2].number === sortedHand[3].number) {
    return true;
  }

  if (sortedHand[0].number === sortedHand[1].number && sortedHand[3].number === sortedHand[4].number) {
    return true;
  }

  if (sortedHand[1].number === sortedHand[2].number && sortedHand[3].number === sortedHand[4].number) {
    return true;
  }

  return false;
}

// return the type of the given hand
export const calcHandType = (hand) => {
  // work out if the hand is a flush, being 5 cards of the same suit
  const isFlush = handIsFlush(hand);

  // work out if the hand is a straight, being 5 cards of consequtive numbers
  const isStraight = handIsStraight(hand);

  if (isFlush && isStraight) {
    return HAND_TYPE_STRAIGHT_FLUSH;
  }

  if (isStraight) {
    return HAND_TYPE_STRAIGHT;
  }

  if (isFlush) {
    return HAND_TYPE_FLUSH;
  }

  const longestNumber = handLongestNumber(hand);

  if (longestNumber === 4) {
    return HAND_TYPE_FOUR_OF_A_KIND;
  }

  if (handIsFullHouse(hand)) {
    return HAND_TYPE_FULL_HOUSE;
  }

  if (longestNumber === 3) {
    return HAND_TYPE_THREE_OF_A_KIND;
  }

  if (handIsTwoPairs(hand)) {
    return HAND_TYPE_TWO_PAIR;
  }

  if (longestNumber === 2) {
    return HAND_TYPE_PAIR;
  }

  return HAND_TYPE_HIGH_CARD;
};

// sort the hands - note we cannot have two hands of the same type
export const sortHands = (handsParam) => {
  // simple copy of hands param (just to get around eslint complaint about assigning to function params)
  const hands = [handsParam[0], handsParam[1], handsParam[2], handsParam[3]];

  const handTypes = [calcHandType(hands[0]), calcHandType(hands[1]), calcHandType(hands[2]), calcHandType(hands[3])];

  // do bubble sort the hand types, moving hands at the same type
  for (let length = 4; length > 1; length -= 1) {
    // move the smallest card from first entry to length
    for (let i = 0; i < length - 1; i += 1) {
      const thisHandType = handTypes[i];
      const nextHandType = handTypes[i + 1];

      if (thisHandType < nextHandType) {
        // this is smaller, so move to the right
        const handType = handTypes[i + 1];
        handTypes[i + 1] = handTypes[i];
        handTypes[i] = handType;

        // doing the same move on the hand
        const hand = hands[i + 1];
        hands[i + 1] = hands[i];
        hands[i] = hand;
      }

      if (thisHandType === nextHandType) {
        console.error(`sortHands found two hands of the hand type ${nextHandType}`);
      }
    }
  }

  logIfDevEnv(`sortHands hard types in order ${handTypes}`);

  return hands;
};

// generate hand of named hand type from cards in deck
// NOTE: The deck is NOT updated here with the cards used
export const generateHandOfHandType = (handType, deck) => {
  logIfDevEnv(`generateHandOfHandType handType=${handType}`);

  return sortHand([
    deck[0],
    deck[1],
    deck[2],
    deck[3],
    deck[4],
  ]);
};

// create the hands of a solution
// the approach here makes sures each hand is of a different hand type
export const createSolutionHands = () => {
  // create a deck of cards
  let deck = [];
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push(createCard(suit, number))));

  // and shuffle them
  deck = shuffle(deck);

  // the hand types
  let handTypes = [
    HAND_TYPE_STRAIGHT_FLUSH,
    HAND_TYPE_FOUR_OF_A_KIND,
    HAND_TYPE_FULL_HOUSE,
    HAND_TYPE_FLUSH,
    HAND_TYPE_STRAIGHT,
    HAND_TYPE_THREE_OF_A_KIND,
    HAND_TYPE_TWO_PAIR,
    HAND_TYPE_PAIR,
    HAND_TYPE_HIGH_CARD,
  ];

  // and shuffle them
  handTypes = shuffle(handTypes);

  // logIfDevEnv(`handTypes = ${handTypes}`);

  const hand1 = generateHandOfHandType(handTypes[0], deck);
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();

  const hand2 = generateHandOfHandType(handTypes[1], deck);
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();

  const hand3 = generateHandOfHandType(handTypes[2], deck);
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();

  const hand4 = generateHandOfHandType(handTypes[3], deck);
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();
  deck.shift();

  return sortHands([hand1, hand2, hand3, hand4]);
};