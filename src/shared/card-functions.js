// useful card functions

import shuffle from 'lodash.shuffle';

import CardSuitSpadesImage from '../images/cards/spades.png';
import CardSuitHeartsImage from '../images/cards/hearts.png';
import CardSuitDiamondsImage from '../images/cards/diamonds.png';
import CardSuitClubsImage from '../images/cards/clubs.png';

import {
  CARD_WIDTH,
  CARD_HEIGHT,
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
  NUMBER_A,
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

export const cardSuitIndexToSuit = (suitIndex) => {
  if (suitIndex === 3) return SUIT_CLUBS;
  if (suitIndex === 2) return SUIT_DIAMONDS;
  if (suitIndex === 1) return SUIT_HEARTS;
  return SUIT_SPADES;
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
export const sortSuit = (cardsParam) => {
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
        throw new Error(`sortHands found two hands of the hand type ${nextHandType}`);
      }
    }
  }

  // logIfDevEnv(`sortHands hard types in order ${handTypes}`);

  return hands;
};

// return an array of the cards of the given suit in order
const getSortedSuitFromCards = (suit, cards) => {
  const suitCards = cards.filter((card) => card.suit === suit);

  return sortSuit(suitCards);
};

// return an array of the cards of the given suit not in order (relies on the cards not being in order)
const getUnsortedSuitFromCards = (suit, cards) => cards.filter((card) => card.suit === suit);

// return an array of the cards of the given number not in order (relies on the cards not being in order)
const getUnsortedNumbersFromCards = (number, cards) => {
  const numberCards = cards.filter((card) => card.number === number);

  return numberCards;
};

// helper function
export const cardsEqual = (card1, card2) => card1.number === card2.number && card1.suit === card2.suit;

// helper function
const numberUniqueCards = (cards) => {
  const cardIds = new Set();

  for (let i = 0; i < cards.length; i += 1) {
    cardIds.add(cards[i].id);
  }

  return cardIds.size;
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
    const numberCards = getUnsortedNumbersFromCards(numbers[i], cards);

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
    const numberCards = getUnsortedNumbersFromCards(numbers[i], cards);
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

// generate a flush, making sure it is not a straight flush, from the given shuffled cards
// NOTE: The given cards are NOT updated here
const generateFlush = (cards) => {
  // randomly order the suits
  const suits = shuffle([SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS]);

  // work through each suit
  for (let i = 0; i < suits.length; i += 1) {
    const suitCards = getUnsortedSuitFromCards(suits[i], cards);

    // we need at least 5 cards before we are even interested in this suit
    if (suitCards.length >= 5) {
      // if there are exactly 5 cards and it is not a straight flush, then we can use this
      if (suitCards.length === 5) {
        const possibleHand1 = sortHand(suitCards);
        if (calcHandType(possibleHand1) !== HAND_TYPE_STRAIGHT_FLUSH) {
          return possibleHand1;
        }
      } else {
        // there must be 6 or more cards
        // so it must be possible to select 5 that are not a straight flush
        // keep shuffling them, and taking the first 5 until a non straight flush is found
        // one got stuck here - so generating log if get to 1000 iterations
        let count = 0;
        for (;;) {
          const shuffledCards = shuffle(suitCards);
          const possibleHand1 = sortHand([shuffledCards[0], shuffledCards[1], shuffledCards[2], shuffledCards[3], shuffledCards[4]]);
          if (calcHandType(possibleHand1) !== HAND_TYPE_STRAIGHT_FLUSH) {
            return possibleHand1;
          }

          count += 1;
          if (count === 1000) {
            logIfDevEnv(`generateFlush at iteration 1000 the cards are ${JSON.stringify(suitCards)}`);
          }
        }
      }
    }
  }

  logIfDevEnv(`generateFlush couldn't find flush from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate a straight from the given shuffled cards, checking it is not a straight flush
// NOTE: The given cards are NOT updated here
const generateStraight = (cards) => {
  // here are the possible numbers that can start a 5 card straight, shuffled
  const numbers = shuffle([NUMBER_A, NUMBER_K, NUMBER_Q, NUMBER_J, NUMBER_10, NUMBER_9, NUMBER_8, NUMBER_7, NUMBER_6, NUMBER_5]);

  // work through each number
  for (let i = 0; i < numbers.length; i += 1) {
    // special code to work out the 5 numbers, to cope with AKQJ10
    const number1 = numbers[i];
    let number2 = number1 - 1;
    let number3 = number1 - 2;
    let number4 = number1 - 3;
    let number5 = number1 - 4;
    if (number1 === NUMBER_A) {
      number2 = NUMBER_K;
      number3 = NUMBER_Q;
      number4 = NUMBER_J;
      number5 = NUMBER_10;
    }

    // get all the cards for each of these numbers - each are in a random suit order
    const number1Cards = getUnsortedNumbersFromCards(number1, cards);
    const number2Cards = getUnsortedNumbersFromCards(number2, cards);
    const number3Cards = getUnsortedNumbersFromCards(number3, cards);
    const number4Cards = getUnsortedNumbersFromCards(number4, cards);
    const number5Cards = getUnsortedNumbersFromCards(number5, cards);

    // we need at least 1 card for each number
    if (number1Cards.length > 0 && number2Cards.length > 0 && number3Cards.length > 0 && number4Cards.length > 0 && number5Cards.length > 0) {
      // go through all combinations, returning first (if any) that is not a straight flush
      for (let i1 = 0; i1 < number1Cards.length; i1 += 1) {
        const number1Card = number1Cards[i1];
        for (let i2 = 0; i2 < number2Cards.length; i2 += 1) {
          const number2Card = number2Cards[i2];
          for (let i3 = 0; i3 < number3Cards.length; i3 += 1) {
            const number3Card = number3Cards[i3];
            for (let i4 = 0; i4 < number4Cards.length; i4 += 1) {
              const number4Card = number4Cards[i4];
              for (let i5 = 0; i5 < number5Cards.length; i5 += 1) {
                const number5Card = number5Cards[i5];
                const possibleHand = sortHand([number1Card, number2Card, number3Card, number4Card, number5Card]);
                const handType = calcHandType(possibleHand);
                if (handType === HAND_TYPE_STRAIGHT && handType !== HAND_TYPE_STRAIGHT_FLUSH) {
                  return possibleHand;
                }

                // console.log(`discarding ${JSON.stringify(possibleHand)}`);
              }
            }
          }
        }
      }
    }
  }

  logIfDevEnv(`generateStraight couldn't find straight from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate three of a kind from the given shuffled cards, make sure it is not 4 of a kind or a full house
// NOTE: The given cards are NOT updated here
const generateThreeOfAKind = (cards) => {
  // randomly order the numbers
  const numbers = shuffle(NUMBERS);

  // work through each number
  for (let i = 0; i < numbers.length; i += 1) {
    const numberCards = getUnsortedNumbersFromCards(numbers[i], cards);

    // if there are at least of them then we have found our three of a kind
    if (numberCards.length >= 3) {
      // take the first three of these
      const hand = [numberCards[0], numberCards[1], numberCards[2]];

      // add in two further cards, of different numbers, which are not of this number
      // Note: we assume here that cards has at least two other possible cards
      const number1 = hand[0].number;
      let number2 = null;

      for (let j = 0; j < cards.length; j += 1) {
        const card = cards[j];
        if (card.number !== number1) {
          // now decide if we are looking for the first or these or the second
          if (number2 === null) {
            // we want this one
            hand.push(card);

            // and remember its number
            number2 = card.number;
          } else if (card.number !== number2) {
            // okay - we have the second fill card
            hand.push(card);
            return sortHand(hand);
          }
        }
      }
    }
  }

  logIfDevEnv(`generateThreeOfAKind couldn't find three of a kind from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate two pair from the given shuffled cards, make sure it is not 3 of a kind or more
// NOTE: The given cards are NOT updated here
const generateTwoPair = (cards) => {
  // randomly order the numbers
  const numbers = shuffle(NUMBERS);

  const hand = [];
  let number1 = null;
  let number2 = null;

  // work through each number
  for (let i = 0; i < numbers.length; i += 1) {
    const numberCards = getUnsortedNumbersFromCards(numbers[i], cards);

    // if there are at least of two then we have found a pair
    if (numberCards.length >= 2) {
      // take the first two of these
      hand.push(numberCards[0]);
      hand.push(numberCards[1]);

      if (number1 === null) {
        // this is the first pair - remember its number then continue to look for the second pair
        number1 = numberCards[0].number;
      } else {
        // this is the second pair
        // remember its number
        number2 = numberCards[0].number;

        // find the 5th card, which is not number1 or number2
        // NOTE: this assumes there is one
        for (let j = 0; j < cards.length; j += 1) {
          const card = cards[j];
          if (card.number !== number1 && card.number !== number2) {
            // found it
            hand.push(card);
            return sortHand(hand);
          }
        }
      }
    }
  }

  logIfDevEnv(`generateTwoPair couldn't find two pairs from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate a pair from the given shuffled cards, make sure it is not 3 of a kind or more
// NOTE: The given cards are NOT updated here
const generatePair = (cards) => {
  // randomly order the numbers
  const numbers = shuffle(NUMBERS);

  // work through each number
  for (let i = 0; i < numbers.length; i += 1) {
    const numberCards = getUnsortedNumbersFromCards(numbers[i], cards);

    // if there are at least of two then we have found a pair
    if (numberCards.length >= 2) {
      // take the first two of these
      const hand = [numberCards[0], numberCards[1]];

      // there will be 4 different numbers
      const number1 = numberCards[0].number;
      let number2 = null;
      let number3 = null;
      let number4 = null;

      // find 3 different numbers to add to the hand
      // NOTE: this assumes they exist
      for (let j = 0; j < cards.length; j += 1) {
        const card = cards[j];
        if (card.number !== number1 && card.number !== number2 && card.number !== number3 && card.number !== number4) {
          // found it
          hand.push(card);

          // decide where we are up to
          if (number2 === null) {
            number2 = card.number;
          } else if (number3 === null) {
            number3 = card.number;
          } else if (number4 === null) {
            number4 = card.number;
          } else {
            return sortHand(hand);
          }
        }
      }
    }
  }

  logIfDevEnv(`generatePair couldn't find two pairs from the cards ${JSON.stringify(cards)}`);

  return null;
};

// generate high card the given shuffled cards, make sure it is not another type of hand
// NOTE: The given cards are NOT updated here
const generateHighCard = (cards) => {
  // first some checks
  if (cards.length < 5) {
    logIfDevEnv(`generateHighCard was given less than 5 cards ${JSON.stringify(cards)}`);

    return null;
  }

  if (cards.length === 5) {
    const hand = sortHand(cards);
    if (calcHandType(hand) === HAND_TYPE_HIGH_CARD) {
      return hand;
    }

    logIfDevEnv(`generateHighCard was given 5 cards which are not a high card hand ${JSON.stringify(cards)}`);

    return null;
  }

  // The approach is to keep shuffling the cards, taking the first 5, until a high card hand is found
  // NOTE: We do this a fix number of times - otherwise this will loop for ever

  // loop until we find a good hand
  for (let i = 0; i < 1000; i += 1) {
    const shuffledCards = shuffle(cards);

    // take the first 5 cards and sort
    const hand = sortHand([shuffledCards[0], shuffledCards[1], shuffledCards[2], shuffledCards[3], shuffledCards[4]]);

    if (calcHandType(hand) === HAND_TYPE_HIGH_CARD) {
      // found one
      return hand;
    }
  }

  logIfDevEnv(`generateHighCard couldn't find a high card hand from the cards ${JSON.stringify(cards)}`);

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

  if (handType === HAND_TYPE_FLUSH) {
    return generateFlush(cards);
  }

  if (handType === HAND_TYPE_STRAIGHT) {
    return generateStraight(cards);
  }

  if (handType === HAND_TYPE_THREE_OF_A_KIND) {
    return generateThreeOfAKind(cards);
  }

  if (handType === HAND_TYPE_TWO_PAIR) {
    return generateTwoPair(cards);
  }

  if (handType === HAND_TYPE_PAIR) {
    return generatePair(cards);
  }

  if (handType === HAND_TYPE_HIGH_CARD) {
    return generateHighCard(cards);
  }

  throw new Error(`generateHandOfHandType did not understand handType ${handType}`);
};

// create a new deck of shuffled cards, excluding the given missing number
export const createNewDeck = (missingNumber) => {
  // create a deck of cards - ignoring the missing number
  const deck = [];
  SUITS.forEach((suit) =>
    NUMBERS.forEach((number) => {
      if (number !== missingNumber) {
        deck.push(createCard(suit, number));
      }
    }));

  // and shuffle them
  return (shuffle(deck));
};

// support function to reorder the cards in a hand so important cards of the hand type are to the left
export const reorderCardsInHandByImportance = (solutionHand) => {
  // first look to reorder A5432 to 5432A
  if (solutionHand[0].number === NUMBER_A
    && solutionHand[1].number === NUMBER_5
    && solutionHand[2].number === NUMBER_4
    && solutionHand[3].number === NUMBER_3
    && solutionHand[4].number === NUMBER_2) {
    return [
      solutionHand[1],
      solutionHand[2],
      solutionHand[3],
      solutionHand[4],
      solutionHand[0],
    ];
  }

  const handType = calcHandType(solutionHand);

  // otherwise if straight flush or straight, then nothing more to do
  if (handType === HAND_TYPE_STRAIGHT_FLUSH || handType === HAND_TYPE_STRAIGHT) {
    return solutionHand;
  }

  // four of a kind
  if (handType === HAND_TYPE_FOUR_OF_A_KIND) {
    // if the first and second numbers are different then the first number is higher and needs to be moved to the end
    if (solutionHand[0].number !== solutionHand[1].number) {
      return [
        solutionHand[1],
        solutionHand[2],
        solutionHand[3],
        solutionHand[4],
        solutionHand[0],
      ];
    }

    // don't need to change it
    return solutionHand;
  }

  // full house
  if (handType === HAND_TYPE_FULL_HOUSE) {
    // if the second and third numbers are different then the pair is higher than the three of a kind and the pair needs moving after the three of a kind
    if (solutionHand[1].number !== solutionHand[2].number) {
      return [
        solutionHand[2],
        solutionHand[3],
        solutionHand[4],
        solutionHand[0],
        solutionHand[1],
      ];
    }

    // don't need to change it
    return solutionHand;
  }

  // flush
  if (handType === HAND_TYPE_FLUSH) {
    // no change
    return solutionHand;
  }

  // three of a kind
  if (handType === HAND_TYPE_THREE_OF_A_KIND) {
    // if the third and fourth numbers are different then the first three cards are already the three of a kind
    if (solutionHand[2].number !== solutionHand[3].number) {
      return solutionHand;
    }

    // if the fourth and fifth numbers are different then the middle cards are the three of a kind
    if (solutionHand[3].number !== solutionHand[4].number) {
      return [
        solutionHand[1],
        solutionHand[2],
        solutionHand[3],
        solutionHand[0],
        solutionHand[4],
      ];
    }

    // otherwise the last three cards are the three of a kind
    return [
      solutionHand[2],
      solutionHand[3],
      solutionHand[4],
      solutionHand[0],
      solutionHand[1],
    ];
  }

  // two pair
  if (handType === HAND_TYPE_TWO_PAIR) {
    // if the fourth and fifth numbers are different then two pairs are already at the left
    if (solutionHand[3].number !== solutionHand[4].number) {
      return solutionHand;
    }

    // if the second and third numbers are different then the middle cards is the single
    if (solutionHand[1].number !== solutionHand[2].number) {
      return [
        solutionHand[0],
        solutionHand[1],
        solutionHand[3],
        solutionHand[4],
        solutionHand[2],
      ];
    }

    // otherwise the first is the single
    return [
      solutionHand[1],
      solutionHand[2],
      solutionHand[3],
      solutionHand[4],
      solutionHand[0],
    ];
  }

  // pair
  if (handType === HAND_TYPE_PAIR) {
    // if the first two numbers are the pair then already in order
    if (solutionHand[0].number === solutionHand[1].number) {
      return solutionHand;
    }

    // if the second and third numbers are the pair then move them
    if (solutionHand[1].number === solutionHand[2].number) {
      return [
        solutionHand[1],
        solutionHand[2],
        solutionHand[0],
        solutionHand[3],
        solutionHand[4],
      ];
    }

    // if the third and fourth numbers are the pair then move them
    if (solutionHand[2].number === solutionHand[3].number) {
      return [
        solutionHand[2],
        solutionHand[3],
        solutionHand[0],
        solutionHand[1],
        solutionHand[4],
      ];
    }

    // otherwise the last two numbers are the pair
    return [
      solutionHand[3],
      solutionHand[4],
      solutionHand[0],
      solutionHand[1],
      solutionHand[2],
    ];
  }

  // high card
  if (handType === HAND_TYPE_HIGH_CARD) {
    // no change
    return solutionHand;
  }

  // should never get here
  console.error(`reorderCardsInHandByImportance could not cope with the hand given ${JSON.stringify(solutionHand)}`);
  return null;
};

// support function to reorder the cards in the solutionHands so important cards of the hand type are to the left
const reorderCardsInHandsByImportance = (solutionHands) => [
  reorderCardsInHandByImportance(solutionHands[0]),
  reorderCardsInHandByImportance(solutionHands[1]),
  reorderCardsInHandByImportance(solutionHands[2]),
  reorderCardsInHandByImportance(solutionHands[3]),
];

// create a solution, with its hands and missingNumber
// the approach here makes sures each hand is of a different hand type
export const createSolution = () => {
  // select a random missing number for this new deck
  const missingNumber = shuffle(NUMBERS)[0];

  // logIfDevEnv(`createSolution missing number is ${missingNumber}`);

  let cards = createNewDeck(missingNumber);

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

  // generate the hands - we now work through all the possible hand types, as I found sometimes a certain hand type could not be generated with the cards left
  const hands = [];
  for (let i = 0; i < handTypes.length && hands.length < 4; i += 1) {
    const nextHand = generateHandOfHandType(handTypes[i], cards);

    // check we got something
    if (!nextHand) {
      logIfDevEnv(`createSolutionHands could not generate the hand type ${handTypes[i]} from cards ${JSON.stringify(cards)}`);
    } else {
      // remember this hand
      hands.push(nextHand);

      // remove the cards of nextHand from the cards we can select from now
      cards = cards.filter((card) => !cardsEqual(card, nextHand[0])
        && !cardsEqual(card, nextHand[1])
        && !cardsEqual(card, nextHand[2])
        && !cardsEqual(card, nextHand[3])
        && !cardsEqual(card, nextHand[4]));
    }
  }

  // check we have 4 hands
  if (hands.length !== 4) {
    // TODO - try again here???
    throw new Error('createSolutionHands could not generate 4 hands - this should never happen!!!');
  }

  // cards used in solution
  const handsCards = [...hands[0], ...hands[1], ...hands[2], ...hands[3]];
  const nUnique = numberUniqueCards(handsCards);

  if (nUnique !== 20) {
    // TODO - try again here???
    throw new Error(`createSolutionHands should have 20 unique cards, but it has ${nUnique} - this should never happen!!!`);
  }

  const sortedHands = sortHands(hands);

  // now reorder cards so important cards of a hand are on the left
  const handsOrderedByImportance = reorderCardsInHandsByImportance(sortedHands);

  return { solutionHands: handsOrderedByImportance, missingNumber };
};

// return true if the sorted cards (A K down to 2) - which are known to all be of the same suit - contain a straight
export const sortedSuitCardsContainStraight = (suitCardsAvailable) => {
  // we take 5 cards at a time, returning true if one of them is a straight

  // if we don't have 5 cards, then we can't be a straight
  if (suitCardsAvailable.length < 5) {
    return false;
  }

  for (let i = 0; i <= suitCardsAvailable.length - 5; i += 1) {
    const hand = [
      suitCardsAvailable[i],
      suitCardsAvailable[i + 1],
      suitCardsAvailable[i + 2],
      suitCardsAvailable[i + 3],
      suitCardsAvailable[i + 4],
    ];

    if (handIsStraight(hand)) {
      return true;
    }
  }

  // and look for the special case of A2345 - A will be first, then 5 4 3 2 the last 4
  if (handIsStraight([
    suitCardsAvailable[0],
    suitCardsAvailable[suitCardsAvailable.length - 4],
    suitCardsAvailable[suitCardsAvailable.length - 3],
    suitCardsAvailable[suitCardsAvailable.length - 2],
    suitCardsAvailable[suitCardsAvailable.length - 1],
  ])) {
    return true;
  }

  // we didn't find one
  return false;
};

// return true if the first card number is greater or equal to the second card number, remembering A is greatest
export const cardNumberGE = (n1, n2) => {
  // easiest approach is to convert NUMBER_A to 14 then use straight >=
  const n1Converted = n1 === NUMBER_A ? 14 : n1;
  const n2Converted = n2 === NUMBER_A ? 14 : n2;
  return n1Converted >= n2Converted;
};

// return true if the first card number is less or equal to the second card number, remembering A is greatest
export const cardNumberLE = (n1, n2) => {
  // easiest approach is to convert NUMBER_A to 14 then use straight <=
  const n1Converted = n1 === NUMBER_A ? 14 : n1;
  const n2Converted = n2 === NUMBER_A ? 14 : n2;
  return n1Converted <= n2Converted;
};
