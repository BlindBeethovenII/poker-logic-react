// useful card functions

import shuffle from 'lodash.shuffle';

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
} from './constants';

import CardSuitSpadesImage from '../images/cards/spades.png';
import CardSuitHeartsImage from '../images/cards/hearts.png';
import CardSuitDiamondsImage from '../images/cards/diamonds.png';
import CardSuitClubsImage from '../images/cards/clubs.png';

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

// return the type of the given hand
export const calcHandType = (hand) => {
  const result = hand[0].number;
  return result;
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
  return hands;
};

// create the hands of a solution
export const createSolutionHands = () => {
  // create a deck of cards
  let deck = [];
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push(createCard(suit, number))));

  // and shuffle them
  deck = shuffle(deck);

  // put them in the hands

  const hand1 = sortHand([
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ]);

  const hand2 = sortHand([
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ]);

  const hand3 = sortHand([
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ]);

  const hand4 = sortHand([
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ]);

  return sortHands([hand1, hand2, hand3, hand4]);
};
