import {
  calcHandType,
  createSolution,
} from './card-functions';

// how many times to iterate in tests
const iterateN = 1000;

describe('createSolutionHands', () => {
  it(`will return 4 hands for a consistent solution ${iterateN} times`, () => {
    for (let i = 0; i < iterateN; i += 1) {
      // get the hands of a solution
      const { solutionHands } = createSolution();

      // there should be 4 of them
      expect(solutionHands.length).toEqual(4);

      // note that createSolution() checks there are 20 unique cards in the solution

      // check the hands are sorted by hand type, hightest first
      const hand1Type = calcHandType(solutionHands[0]);
      const hand2Type = calcHandType(solutionHands[1]);
      const hand3Type = calcHandType(solutionHands[2]);
      const hand4Type = calcHandType(solutionHands[3]);

      expect(hand1Type > hand2Type
        && hand1Type > hand3Type
        && hand1Type > hand4Type
        && hand2Type > hand3Type
        && hand2Type > hand4Type
        && hand3Type > hand4Type).toBeTruthy();
    }
  });
});
