import { addInDeducedClues, createClueHandOfType } from './clue-functions';

import {
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_PAIR,
  HAND_TYPE_HIGH_CARD,
  HAND_TYPE_TWO_PAIR,
} from './constants';

describe('addInDeducedClues', () => {
  it('will add in straight flush for first hand if second is four of a kind, if that clue is not already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will not add in straight flush for first hand if second is four of a kind, if that clue is already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
    ];
    expect(addInDeducedClues(clues)).toEqual(clues);
  });

  it('will add in straight flush for first hand, and four of a kind for second, if third is full house, if those clues not already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2)),
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will add four of a kind for second, if third is full house, and first hand straight flush is already there', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
      createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
      createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will add in straight flush for first hand, four of a kind for second, and full house for third, if fourth is flush, if those clues not already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FLUSH, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FLUSH, 3),
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0, createClueHandOfType(HAND_TYPE_FLUSH, 3)),
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, createClueHandOfType(HAND_TYPE_FLUSH, 3)),
      createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2, createClueHandOfType(HAND_TYPE_FLUSH, 3)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will add in four of a kind for second, and full house for third, if fourth is flush, and first hand straight flush is already there', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
      createClueHandOfType(HAND_TYPE_FLUSH, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
      createClueHandOfType(HAND_TYPE_FLUSH, 3),
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1, createClueHandOfType(HAND_TYPE_FLUSH, 3)),
      createClueHandOfType(HAND_TYPE_FULL_HOUSE, 2, createClueHandOfType(HAND_TYPE_FLUSH, 3)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will add in high card for fourth hand, if third hand is pair, if that clue is not already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 1),
      createClueHandOfType(HAND_TYPE_PAIR, 2),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 1),
      createClueHandOfType(HAND_TYPE_PAIR, 2),
      createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, createClueHandOfType(HAND_TYPE_PAIR, 2)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will not add in high card for fourth hand, if third hand is pair, if that clue is already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 1),
      createClueHandOfType(HAND_TYPE_PAIR, 2),
      createClueHandOfType(HAND_TYPE_HIGH_CARD, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 1),
      createClueHandOfType(HAND_TYPE_PAIR, 2),
      createClueHandOfType(HAND_TYPE_HIGH_CARD, 3),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will add in high card for fourth hand, and third hand pair, if second hand is two pair, if those clues are not already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_TWO_PAIR, 1),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_TWO_PAIR, 1),
      createClueHandOfType(HAND_TYPE_PAIR, 2, createClueHandOfType(HAND_TYPE_TWO_PAIR, 1)),
      createClueHandOfType(HAND_TYPE_HIGH_CARD, 3, createClueHandOfType(HAND_TYPE_TWO_PAIR, 1)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });

  it('will add third hand pair, if second hand is two pair, if those clues are not already in but not fourth hand high card if there', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_TWO_PAIR, 1),
      createClueHandOfType(HAND_TYPE_HIGH_CARD, 3),
    ];
    const expectedResult = [
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 0),
      createClueHandOfType(HAND_TYPE_TWO_PAIR, 1),
      createClueHandOfType(HAND_TYPE_HIGH_CARD, 3),
      createClueHandOfType(HAND_TYPE_PAIR, 2, createClueHandOfType(HAND_TYPE_TWO_PAIR, 1)),
    ];
    expect(addInDeducedClues(clues)).toEqual(expectedResult);
  });
});
