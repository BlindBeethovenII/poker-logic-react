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
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
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

// sort a suit - this assumes all cards are in the same suit with no repeated cards
const sortSuit = (cardsParam) => {
  // copy of the given cards to get around eslint complaint about assigning to function params
  const cards = [];
  for (let len = 0; len < cardsParam.length; len += 1) {
    cards[len] = cardsParam[len];
  }

  // do bubble sort to order the cards
  for (let len = cards.length; len > 1; len -= 1) {
    // move the smallest card from first entry to length
    for (let i = 0; i < len - 1; i += 1) {
      const thisHandNumber = cards[i].number;
      const nextHandNumber = cards[i + 1].number;
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
      if (swap) {
        // this is smaller, so move to the right
        const card = cards[i + 1];
        cards[i + 1] = cards[i];
        cards[i] = card;
      }
    }
  }

  return cards;
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
    sortedHand[0].number === sortedHand[1].number + 1
    && sortedHand[1].number === sortedHand[2].number + 1
    && sortedHand[2].number === sortedHand[3].number + 1
    && sortedHand[3].number === sortedHand[4].number + 1
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

  // don't forget A 5 4 3 2
  if (
    sortedHand[0].number === NUMBER_A
    && sortedHand[1].number === NUMBER_5
    && sortedHand[2].number === NUMBER_4
    && sortedHand[3].number === NUMBER_3
    && sortedHand[4].number === NUMBER_2
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

// return an array of the cards of the given suit in order
const getSortedSuitFromCards = (suit, cards) => {
  const suitCards = cards.filter((card) => card.suit === suit);

  return sortSuit(suitCards);
};

// return an array of the cards of the given number (not in order)
const getNumbersFromCards = (number, cards) => {
  const numberCards = cards.filter((card) => card.number === number);

  return numberCards;
};

// generate a straight flush from the given shuffled cards
// NOTE: The given cards are NOT updated here
const generateStraightFlush = (cards) => {
  // randomly order the suits
  const suits = shuffle([SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS]);

  // work through each suit
  for (let i = 0; i < suits.length; i += 1) {
    const suitCards = getSortedSuitFromCards(suits[i], cards);

    // we need at least 5 cards before we are even interested in this suit
    if (suitCards.length >= 5) {
      // build up a list of possible straight flushes
      let possibleStraightFlushes = [];

      for (let j = 0; j < suitCards.length - 4; j += 1) {
        // check this sequence of 5 cards
        const number1 = suitCards[j].number;
        const number2 = suitCards[j + 1].number;
        const number3 = suitCards[j + 2].number;
        const number4 = suitCards[j + 3].number;
        const number5 = suitCards[j + 4].number;

        if (number1 === NUMBER_A && number2 === NUMBER_K && number3 === NUMBER_Q && number4 === NUMBER_J && number5 === NUMBER_10) {
          // special check for AKQJ10
          possibleStraightFlushes.push([suitCards[j], suitCards[j + 1], suitCards[j + 2], suitCards[j + 3], suitCards[j + 4]]);
        } else if (suitCards[0].number === NUMBER_A && number2 === NUMBER_5 && number3 === NUMBER_4 && number4 === NUMBER_3 && number5 === NUMBER_2) {
          // special check for 5432A
          possibleStraightFlushes.push([suitCards[0], suitCards[j + 1], suitCards[j + 2], suitCards[j + 3], suitCards[j + 4]]);
        } else if (number1 === number2 + 1 && number2 === number3 + 1 && number3 === number4 + 1 && number4 === number5 + 1) {
          possibleStraightFlushes.push([suitCards[j], suitCards[j + 1], suitCards[j + 2], suitCards[j + 3], suitCards[j + 4]]);
        }
      }

      // if we've found any
      if (possibleStraightFlushes.length > 0) {
        // select a random one and return it
        possibleStraightFlushes = shuffle(possibleStraightFlushes);

        // logIfDevEnv(`generateStraightFlush first possibleStraightFlushes is ${JSON.stringify(possibleStraightFlushes[0])}`);

        // it will already be sorted - but calling sortHand anyway
        return sortHand(possibleStraightFlushes[0]);
      }
    }
  }

  logIfDevEnv(`generateStraightFlush couldn't find straight flush from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate four of a kind from the given shuffled cards
// NOTE: The given cards are NOT updated here
const generateFourOfAKind = (cards) => {
  // randomly order the numbers
  const numbers = shuffle(NUMBERS);

  // work through each number
  for (let i = 0; i < numbers.length; i += 1) {
    const numberCards = getNumbersFromCards(numbers[i], cards);

    // if there are 4 of them then we have found our four of a kind
    if (numberCards.length === 4) {
      // add in the first card that is not of this number
      // Note: we assume here that cards has at least one other possible card
      const numberCard = numberCards[0];

      for (let j = 0; j < cards.length; j += 1) {
        const card = cards[j];
        if (card.number !== numberCard.number) {
          // okay - we have it
          numberCards.push(card);
          return sortHand(numberCards);
        }
      }
    }
  }

  logIfDevEnv(`generateFourOfAKind couldn't find four of a kind from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate a full house from the given shuffled cards
// NOTE: The given cards are NOT updated here
const generateFullHouse = (cards) => {
  // randomly order the numbers
  const numbers = shuffle(NUMBERS);

  // sort the cards into numbers for which there are 3/4 and numbers for which there are 2 - remember the numbers themselves are in a random order
  const numberCards3or4 = [];
  const numberCards2 = [];
  for (let i = 0; i < numbers.length; i += 1) {
    const numberCards = getNumbersFromCards(numbers[i], cards);
    if (numberCards.length >= 3) {
      numberCards3or4.push(numberCards);
    } else if (numberCards.length === 2) {
      numberCards2.push(numberCards);
    }
  }

  // logIfDevEnv(`generateFullHouse numberCards3or4 ${JSON.stringify(numberCards3or4)}`);

  // now componse a full house
  // first check we can do it - for that we need either one n3/n3 and at least one n2, or at least two n3/n4
  if ((numberCards3or4.length === 1 && numberCards2.length >= 1) || numberCards3or4.length >= 2) {
    // first deal with case where there is only one of size 3/4
    if (numberCards3or4.length === 1) {
      // put that in the hand, followed by the first pair
      const the3CardsCard1 = numberCards3or4[0][0];
      const the3CardsCard2 = numberCards3or4[0][1];
      const the3CardsCard3 = numberCards3or4[0][2];
      const the2CardsCard1 = numberCards2[0][0];
      const the2CardsCard2 = numberCards2[0][1];
      return sortHand([the3CardsCard1, the3CardsCard2, the3CardsCard3, the2CardsCard1, the2CardsCard2]);
    }

    // now we have more than one of size 3/4
    // take the first 3/4
    const first3or4Cards = numberCards3or4.shift();
    const the3CardsCard1 = first3or4Cards[0];
    const the3CardsCard2 = first3or4Cards[1];
    const the3CardsCard3 = first3or4Cards[2];

    // combine the 3/4 and 2 arrays into one, shuffle again, and take the first
    const first2orMoreCards = shuffle([...numberCards3or4, ...numberCards2]).shift();
    const the2CardsCard1 = first2orMoreCards[0];
    const the2CardsCard2 = first2orMoreCards[1];
    return sortHand([the3CardsCard1, the3CardsCard2, the3CardsCard3, the2CardsCard1, the2CardsCard2]);
  }

  logIfDevEnv(`generateFullHouse couldn't find a full house from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate hand of named hand type from given shuffled cards
// NOTE: The given cards are is NOT updated
export const generateHandOfHandType = (handType, cards) => {
  // logIfDevEnv(`generateHandOfHandType handType=${handType}`);

  if (handType === HAND_TYPE_STRAIGHT_FLUSH) {
    return generateStraightFlush(cards);
  }

  if (handType === HAND_TYPE_FOUR_OF_A_KIND) {
    return generateFourOfAKind(cards);
  }

  if (handType === HAND_TYPE_FULL_HOUSE) {
    return generateFullHouse(cards);
  }

  return sortHand([
    cards[0],
    cards[1],
    cards[2],
    cards[3],
    cards[4],
  ]);
};

// create a new deck of shuffled cards
export const createNewDeck = () => {
  // create a deck of cards
  const deck = [];
  SUITS.map((suit) =>
    NUMBERS.map((number) =>
      deck.push(createCard(suit, number))));

  // and shuffle them
  return (shuffle(deck));
};

// create the hands of a solution
// the approach here makes sures each hand is of a different hand type
export const createSolutionHands = () => {
  const cards = createNewDeck();

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

  // generate the hands
  const hands = [];
  for (let i = 0; i < 4; i += 1) {
    const nextHand = generateHandOfHandType(handTypes[i], cards);

    // check we got something
    if (!nextHand) {
      console.error(`createSolutionHands could not generate the hand type handTypes[i] from cards ${JSON.stringify(cards)}`);

      // TODO - try again here???
      return null;
    }

    // remember this hand
    hands.push(nextHand);

    // remove nextHand cards
    cards.shift();
    cards.shift();
    cards.shift();
    cards.shift();
    cards.shift();
  }

  return sortHands(hands);
};
