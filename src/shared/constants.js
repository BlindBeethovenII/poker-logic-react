export const CARD_WIDTH = 68;
export const CARD_HEIGHT = 86;

export const SUIT_SPADES = 'S';
export const SUIT_HEARTS = 'H';
export const SUIT_DIAMONDS = 'D';
export const SUIT_CLUBS = 'C';
export const SUITS = [SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS, SUIT_CLUBS];
export const SUIT_NONE = 'NONE';

export const INDEX_SUIT_SPADES = 0;
export const INDEX_SUIT_HEARTS = 1;
export const INDEX_SUIT_DIAMONDS = 2;
export const INDEX_SUIT_CLUBS = 3;

export const NUMBER_A = 1;
export const NUMBER_2 = 2;
export const NUMBER_3 = 3;
export const NUMBER_4 = 4;
export const NUMBER_5 = 5;
export const NUMBER_6 = 6;
export const NUMBER_7 = 7;
export const NUMBER_8 = 8;
export const NUMBER_9 = 9;
export const NUMBER_10 = 10;
export const NUMBER_J = 11;
export const NUMBER_Q = 12;
export const NUMBER_K = 13;
export const NUMBERS = [
  NUMBER_A,
  NUMBER_2,
  NUMBER_3,
  NUMBER_4,
  NUMBER_5,
  NUMBER_6,
  NUMBER_7,
  NUMBER_8,
  NUMBER_9,
  NUMBER_10,
  NUMBER_J,
  NUMBER_Q,
  NUMBER_K,
];
export const NUMBERS_SORTED = [
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
];
export const NUMBER_NONE = -1;

export const CARD_NONE = { suit: SUIT_NONE, number: NUMBER_NONE };

export const PERSON_1 = 'PERSON 1';
export const PERSON_2 = 'PERSON 2';
export const PERSON_3 = 'PERSON 3';
export const PERSON_4 = 'PERSON 4';

export const HAND_TYPE_STRAIGHT_FLUSH = 9;
export const HAND_TYPE_FOUR_OF_A_KIND = 8;
export const HAND_TYPE_FULL_HOUSE = 7;
export const HAND_TYPE_FLUSH = 6;
export const HAND_TYPE_STRAIGHT = 5;
export const HAND_TYPE_THREE_OF_A_KIND = 4;
export const HAND_TYPE_TWO_PAIR = 3;
export const HAND_TYPE_PAIR = 2;
export const HAND_TYPE_HIGH_CARD = 1;

export const HINT_NUMBER_NOT_USED = 'NUMBER NOT USED';
export const HINT_NO_STRAIGHT_FLUSH_IN_SUIT = 'NO STRAIGHT FLUSH IN SUIT';
export const HINT_SAME_NUMBER_LEFT_SUIT = 'HINT SAME NUMBER LEFT SUIT';
export const HINT_FOUR_OF_A_KIND_SUIT = 'FOUR OF A KIND SUIT';
export const HINT_FOUR_OF_A_KIND_NUMBERS = 'FOUR OF A KIND NUMBERS';
export const HINT_PLACED_CARD_REMOVE_SUIT = 'PLACED CARD REMOVE SUIT';
export const HINT_PLACED_CARD_REMOVE_NUMBER = 'PLACED CARD REMOVE NUMBER';
export const HINT_NUMBER_USED_UP = 'NUMBER USED UP';
export const HINT_ALL_OF_SUIT_PLACED = 'ALL OF SUIT PLACED';
export const HINT_ALL_OF_NUMBER_PLACED = 'ALL OF NUMBER PLACED';
export const HINT_FULL_HOUSE_THREE_OF_A_KIND_NUMBERS = 'FULL HOUSE/THREE OF A KIND NUMBERS';
export const HINT_FULL_HOUSE_THREE_OF_A_KIND_SUITS = 'FULL HOUSE/THREE OF A KIND SUITS';
export const HINT_PAIR_OF_A_FULL_HOUSE_NUMBERS = 'PAIR OF A FULL HOUSE NUMBERS';

export const CLUE_HAND_OF_TYPE = 'HAND OF TYPE';
