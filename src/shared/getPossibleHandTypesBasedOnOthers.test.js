import { getPossibleHandTypesBasedOnOthers } from './clue-functions';

import {
  HAND_TYPE_STRAIGHT_FLUSH,
  HAND_TYPE_FOUR_OF_A_KIND,
  HAND_TYPE_FULL_HOUSE,
  HAND_TYPE_FLUSH,
  HAND_TYPE_STRAIGHT,
  HAND_TYPE_HIGH_CARD,
  HAND_TYPE_THREE_OF_A_KIND,
  HAND_TYPE_TWO_PAIR,
  HAND_TYPE_PAIR,
} from './constants';

describe('getPossibleHandTypesBasedOnOthers', () => {
  it('will return array with just HAND_TYPE_STRAIGHT_FLUSH for solutionHandsIndex 0 when solutionHandsIndex 1 hand type is HAND_TYPE_FOUR_OF_A_KIND', () => {
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, HAND_TYPE_FOUR_OF_A_KIND, undefined, undefined])).toEqual([HAND_TYPE_STRAIGHT_FLUSH]);
  });

  it('will return array with just HAND_TYPE_STRAIGHT_FLUSH for solutionHandsIndex 0 when solutionHandsIndex 2 hand type is HAND_TYPE_FULL_HOUSE', () => {
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, undefined, HAND_TYPE_FULL_HOUSE, undefined])).toEqual([HAND_TYPE_STRAIGHT_FLUSH]);
  });

  it('will return array with just HAND_TYPE_STRAIGHT_FLUSH for solutionHandsIndex 0 when solutionHandsIndex 3 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, undefined, undefined, HAND_TYPE_FLUSH])).toEqual([HAND_TYPE_STRAIGHT_FLUSH]);
  });

  it('will return array with HAND_TYPE_STRAIGHT_FLUSH and HAND_TYPE_FOUR_OF_A_KIND for solutionHandsIndex 0 when solutionHandsIndex 1 hand type is HAND_TYPE_FULL_HOUSE', () => {
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, HAND_TYPE_FULL_HOUSE, undefined, undefined])).toEqual([HAND_TYPE_STRAIGHT_FLUSH, HAND_TYPE_FOUR_OF_A_KIND]);
  });

  it('will return array with HAND_TYPE_STRAIGHT_FLUSH and HAND_TYPE_FOUR_OF_A_KIND for solutionHandsIndex 0 when solutionHandsIndex 2 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, undefined, HAND_TYPE_FLUSH, undefined])).toEqual([HAND_TYPE_STRAIGHT_FLUSH, HAND_TYPE_FOUR_OF_A_KIND]);
  });

  it('will return array with HAND_TYPE_STRAIGHT_FLUSH and HAND_TYPE_FOUR_OF_A_KIND for solutionHandsIndex 0 when solutionHandsIndex 3 hand type is HAND_STRAIGHT', () => {
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, undefined, undefined, HAND_TYPE_STRAIGHT])).toEqual([HAND_TYPE_STRAIGHT_FLUSH, HAND_TYPE_FOUR_OF_A_KIND]);
  });

  it('will return array with HAND_TYPE_STRAIGHT_FLUSH down to HAND_TYPE_THREE_OF_A_KIND for solutionHandsIndex 0 when solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, undefined, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_STRAIGHT_FLUSH, HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND]);
  });

  it('will return array with HAND_TYPE_STRAIGHT_FLUSH down to HAND_TYPE_THREE_OF_A_KIND for solutionHandsIndex 0 when no hand types are known', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(0, [undefined, undefined, undefined, undefined])).toEqual([HAND_TYPE_STRAIGHT_FLUSH, HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND]);
  });

  it('will return array with just HAND_TYPE_FOUR_OF_A_KIND for solutionHandsIndex 1 when solutionHandsIndex 2 hand type is HAND_TYPE_FULL_HOUSE', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [undefined, undefined, HAND_TYPE_FULL_HOUSE, undefined])).toEqual([HAND_TYPE_FOUR_OF_A_KIND]);
  });

  it('will return array with just HAND_TYPE_FOUR_OF_A_KIND for solutionHandsIndex 1 when solutionHandsIndex 3 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [undefined, undefined, undefined, HAND_TYPE_FLUSH])).toEqual([HAND_TYPE_FOUR_OF_A_KIND]);
  });

  it('will return array with HAND_TYPE_FOUR_OF_A_KIND and HAND_TYPE_FULL_HOUSE for solutionHandsIndex 1 when solutionHandsIndex 2 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [undefined, undefined, HAND_TYPE_FLUSH, undefined])).toEqual([HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE]);
  });

  it('will return array with HAND_TYPE_FOUR_OF_A_KIND and HAND_TYPE_FULL_HOUSE for solutionHandsIndex 1 when solutionHandsIndex 2 hand type is HAND_TYPE_STRAIGHT', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [undefined, undefined, undefined, HAND_TYPE_STRAIGHT])).toEqual([HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE]);
  });

  it('will return array with HAND_TYPE_FOUR_OF_A_KIND down to HAND_TYPE_TWO_PAIR for solutionHandsIndex 1 when solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(1, [undefined, undefined, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR]);
  });

  it('will return array with HAND_TYPE_FOUR_OF_A_KIND down to HAND_TYPE_TWO_PAIR for solutionHandsIndex 1 when no hand types are known', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(1, [undefined, undefined, undefined, undefined])).toEqual([HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR]);
  });

  it('will return array with just HAND_TYPE_FULL_HOUSE for solutionHandsIndex 2 when solutionHandsIndex 3 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, undefined, undefined, HAND_TYPE_FLUSH])).toEqual([HAND_TYPE_FULL_HOUSE]);
  });

  it('will return array with HAND_TYPE_FULL_HOUSE and HAND_TYPE_FLUSH for solutionHandsIndex 2 when solutionHandsIndex 3 hand type is HAND_TYPE_STRAIGHT', () => {
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, undefined, undefined, HAND_TYPE_STRAIGHT])).toEqual([HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH]);
  });

  it('will return array with HAND_TYPE_FULL_HOUSE down to HAND_TYPE_PAIR for solutionHandsIndex 2 when solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, undefined, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR]);
  });

  it('will return array with HAND_TYPE_FULL_HOUSE down to HAND_TYPE_PAIR for solutionHandsIndex 2 when no hand types are known', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, undefined, undefined, undefined])).toEqual([HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR]);
  });

  it('will return array with just HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 2 hand type is HAND_TYPE_PAIR', () => {
    expect(getPossibleHandTypesBasedOnOthers(3, [undefined, undefined, HAND_TYPE_PAIR, undefined])).toEqual([HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with just HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 1 hand type is HAND_TYPE_TWO_PAIR', () => {
    expect(getPossibleHandTypesBasedOnOthers(3, [undefined, HAND_TYPE_TWO_PAIR, undefined, undefined])).toEqual([HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with just HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 0 hand type is HAND_TYPE_TWO_PAIR', () => {
    expect(getPossibleHandTypesBasedOnOthers(3, [HAND_TYPE_THREE_OF_A_KIND, undefined, undefined, undefined])).toEqual([HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with HAND_TYPE_PAIR and HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 2 hand type is HAND_TYPE_TWO_PAIR', () => {
    expect(getPossibleHandTypesBasedOnOthers(3, [undefined, undefined, HAND_TYPE_TWO_PAIR, undefined])).toEqual([HAND_TYPE_PAIR, HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with HAND_TYPE_PAIR and HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 1 hand type is HAND_TYPE_THREE_OF_A_KIND', () => {
    expect(getPossibleHandTypesBasedOnOthers(3, [undefined, HAND_TYPE_THREE_OF_A_KIND, undefined, undefined])).toEqual([HAND_TYPE_PAIR, HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with HAND_TYPE_PAIR and HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 0 hand type is HAND_TYPE_STRAIGHT', () => {
    expect(getPossibleHandTypesBasedOnOthers(3, [HAND_TYPE_STRAIGHT, undefined, undefined, undefined])).toEqual([HAND_TYPE_PAIR, HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with HAND_TYPE_FLUSH down to HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when solutionHandsIndex 0 hand type is HAND_TYPE_STRAIGHT_FLUSH', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(3, [HAND_TYPE_STRAIGHT_FLUSH, undefined, undefined, undefined])).toEqual([HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR, HAND_TYPE_HIGH_CARD]);
  });

  it('will return array with HAND_TYPE_FLUSH down to HAND_TYPE_HIGH_CARD for solutionHandsIndex 3 when no hand types are known', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(3, [undefined, undefined, undefined, undefined])).toEqual([HAND_TYPE_FLUSH, HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR, HAND_TYPE_HIGH_CARD]);
  });

  // now when solutionHandsIndex is defined on both sides

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_FOUR_OF_A_KIND for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_STRAIGHT_FLUSH and solutionHandsIndex 2 hand type is HAND_TYPE_FULL_HOUSE', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_STRAIGHT_FLUSH, undefined, HAND_TYPE_FULL_HOUSE, undefined])).toEqual([HAND_TYPE_FOUR_OF_A_KIND]);
  });

  // eslint-disable-next-line max-len
  it('will return array with HAND_TYPE_FOUR_OF_A_KIND and HAND_TYPE_FULL_HOUSE for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_STRAIGHT_FLUSH and solutionHandsIndex 2 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_STRAIGHT_FLUSH, undefined, HAND_TYPE_FLUSH, undefined])).toEqual([HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_FULL_HOUSE for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_FOUR_OF_A_KIND and solutionHandsIndex 2 hand type is HAND_TYPE_FLUSH', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_FOUR_OF_A_KIND, undefined, HAND_TYPE_FLUSH, undefined])).toEqual([HAND_TYPE_FULL_HOUSE]);
  });

  // eslint-disable-next-line max-len
  it('will return array with HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE and HAND_TYPE_FLUSH for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_STRAIGHT_FLUSH and solutionHandsIndex 2 hand type is HAND_TYPE_STRAIGHT', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_STRAIGHT_FLUSH, undefined, HAND_TYPE_STRAIGHT, undefined])).toEqual([HAND_TYPE_FOUR_OF_A_KIND, HAND_TYPE_FULL_HOUSE, HAND_TYPE_FLUSH]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_FLUSH for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_FULL_HOUSE and solutionHandsIndex 2 hand type is HAND_TYPE_STRAIGHT', () => {
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_FULL_HOUSE, undefined, HAND_TYPE_STRAIGHT, undefined])).toEqual([HAND_TYPE_FLUSH]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_FLUSH for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_FULL_HOUSE and solutionHandsIndex 3 hand type is HAND_TYPE_THREE_OF_A_KIND', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_FULL_HOUSE, undefined, undefined, HAND_TYPE_THREE_OF_A_KIND])).toEqual([HAND_TYPE_FLUSH]);
  });

  // eslint-disable-next-line max-len
  it('will return array with HAND_TYPE_STRAIGHT down to HAND_TYPE_TWO_PAIR for solutionHandsIndex 1 when solutionHandsIndex 0 hand type is HAND_TYPE_FLUSH and solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(1, [HAND_TYPE_FLUSH, undefined, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_STRAIGHT, HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_PAIR for solutionHandsIndex 2 when solutionHandsIndex 1 hand type is HAND_TYPE_TWO_PAIR and solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, HAND_TYPE_TWO_PAIR, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_PAIR]);
  });

  // eslint-disable-next-line max-len
  it('will return array with HAND_TYPE_TWO_PAIR and HAND_TYPE_PAIR for solutionHandsIndex 2 when solutionHandsIndex 1 hand type is HAND_TYPE_THREE_OF_A_KIND and solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, HAND_TYPE_THREE_OF_A_KIND, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_TWO_PAIR for solutionHandsIndex 2 when solutionHandsIndex 1 hand type is HAND_TYPE_THREE_OF_A_KIND and solutionHandsIndex 3 hand type is HAND_TYPE_PAIR', () => {
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, HAND_TYPE_THREE_OF_A_KIND, undefined, HAND_TYPE_PAIR])).toEqual([HAND_TYPE_TWO_PAIR]);
  });

  // eslint-disable-next-line max-len
  it('will return array with HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR and HAND_TYPE_PAIR for solutionHandsIndex 2 when solutionHandsIndex 1 hand type is HAND_TYPE_STRAIGHT and solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, HAND_TYPE_STRAIGHT, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_FLUSH for solutionHandsIndex 2 when solutionHandsIndex 01hand type is HAND_TYPE_FULL_HOUSE and solutionHandsIndex 3 hand type is HAND_TYPE_STRAIGHT', () => {
    expect(getPossibleHandTypesBasedOnOthers(2, [undefined, HAND_TYPE_FULL_HOUSE, undefined, HAND_TYPE_STRAIGHT])).toEqual([HAND_TYPE_FLUSH]);
  });

  // eslint-disable-next-line max-len
  it('will return array with just HAND_TYPE_STRAIGHT for solutionHandsIndex 2 when solutionHandsIndex 0 hand type is HAND_TYPE_FULL_HOUSE and solutionHandsIndex 3 hand type is HAND_TYPE_THREE_OF_A_KIND', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(2, [HAND_TYPE_FULL_HOUSE, undefined, undefined, HAND_TYPE_THREE_OF_A_KIND])).toEqual([HAND_TYPE_STRAIGHT]);
  });

  // eslint-disable-next-line max-len
  it('will return array with HAND_TYPE_THREE_OF_A_KIND down to HAND_TYPE_PAIR for solutionHandsIndex 2 when solutionHandsIndex 0 hand type is HAND_TYPE_FLUSH and solutionHandsIndex 3 hand type is HAND_TYPE_HIGH_CARD', () => {
    // eslint-disable-next-line max-len
    expect(getPossibleHandTypesBasedOnOthers(2, [HAND_TYPE_FLUSH, undefined, undefined, HAND_TYPE_HIGH_CARD])).toEqual([HAND_TYPE_THREE_OF_A_KIND, HAND_TYPE_TWO_PAIR, HAND_TYPE_PAIR]);
  });
});
