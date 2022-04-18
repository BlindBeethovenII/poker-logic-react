// useful card functions

import {
  CARD_WIDTH,
  CARD_HEIGHT,
  NUMBER_A,
  NUMBER_K,
  NUMBER_Q,
  NUMBER_J,
  NUMBER_10,
  NUMBER_9,
  NUMBER_8,
  NUMBER_7,
  NUMBER_6,
  NUMBER_5,
  NUMBER_4,
  NUMBER_3,
  NUMBER_2,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
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
  const hand1 = [
    createCard(SUIT_HEARTS, NUMBER_A),
    createCard(SUIT_HEARTS, NUMBER_K),
    createCard(SUIT_HEARTS, NUMBER_Q),
    createCard(SUIT_HEARTS, NUMBER_J),
    createCard(SUIT_HEARTS, NUMBER_10),
  ];

  const hand2 = [
    createCard(SUIT_DIAMONDS, NUMBER_3),
    createCard(SUIT_HEARTS, NUMBER_3),
    createCard(SUIT_CLUBS, NUMBER_3),
    createCard(SUIT_DIAMONDS, NUMBER_2),
    createCard(SUIT_SPADES, NUMBER_2),
  ];

  const hand3 = [
    createCard(SUIT_DIAMONDS, NUMBER_6),
    createCard(SUIT_CLUBS, NUMBER_6),
    createCard(SUIT_SPADES, NUMBER_4),
    createCard(SUIT_DIAMONDS, NUMBER_4),
    createCard(SUIT_HEARTS, NUMBER_9),
  ];

  const hand4 = [
    createCard(SUIT_SPADES, NUMBER_8),
    createCard(SUIT_HEARTS, NUMBER_8),
    createCard(SUIT_DIAMONDS, NUMBER_K),
    createCard(SUIT_HEARTS, NUMBER_7),
    createCard(SUIT_SPADES, NUMBER_5),
  ];

  return [hand1, hand2, hand3, hand4];
};
