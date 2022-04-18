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

  const hand1 = [
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ];

  const hand2 = [
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ];

  const hand3 = [
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ];

  const hand4 = [
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
    deck.shift(),
  ];

  return [hand1, hand2, hand3, hand4];
};
