import { addInDeducedClues, createClueHandOfType } from './clue-functions';

import {
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_THREE_OF_A_KIND,
} from './constants';

describe('addInDeducedClues', () => {
  it('will add in straight flush for hand first hand if second is four of a kind, if that clue is not already in', () => {
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

  it('will not add in straight flush for hand first hand if second is four of a kind, if that clue is already in', () => {
    const clues = [
      createClueHandOfType(HAND_TYPE_STRAIGHT_FLUSH, 0),
      createClueHandOfType(HAND_TYPE_FOUR_OF_A_KIND, 1),
      createClueHandOfType(HAND_TYPE_STRAIGHT, 2),
      createClueHandOfType(HAND_TYPE_THREE_OF_A_KIND, 3),
    ];
    expect(addInDeducedClues(clues)).toEqual(clues);
  });
});
