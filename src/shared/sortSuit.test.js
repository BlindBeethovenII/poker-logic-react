import { sortSuit, createCard } from './card-functions';

import {
  NUMBER_3,
  NUMBER_6,
  NUMBER_A,
  NUMBER_Q,
  SUIT_CLUBS,
} from './constants';

describe('sortSuit', () => {
  it('will return sorted for already sorted', () => {
    const sorted = [createCard(SUIT_CLUBS, NUMBER_Q), createCard(SUIT_CLUBS, NUMBER_6), createCard(SUIT_CLUBS, NUMBER_3)];
    expect(sortSuit(sorted)).toEqual(sorted);
  });

  it('will return sorted for unsorted', () => {
    const unsorted = [createCard(SUIT_CLUBS, NUMBER_3), createCard(SUIT_CLUBS, NUMBER_Q), createCard(SUIT_CLUBS, NUMBER_6)];
    const sorted = [createCard(SUIT_CLUBS, NUMBER_Q), createCard(SUIT_CLUBS, NUMBER_6), createCard(SUIT_CLUBS, NUMBER_3)];
    expect(sortSuit(unsorted)).toEqual(sorted);
  });

  it('will place A correctly', () => {
    const unsorted = [createCard(SUIT_CLUBS, NUMBER_3), createCard(SUIT_CLUBS, NUMBER_Q), createCard(SUIT_CLUBS, NUMBER_A), createCard(SUIT_CLUBS, NUMBER_6)];
    const sorted = [createCard(SUIT_CLUBS, NUMBER_A), createCard(SUIT_CLUBS, NUMBER_Q), createCard(SUIT_CLUBS, NUMBER_6), createCard(SUIT_CLUBS, NUMBER_3)];
    expect(sortSuit(unsorted)).toEqual(sorted);
  });
});
