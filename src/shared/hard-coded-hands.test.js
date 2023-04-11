import {
  createSolutionOptions,
  getCardsAvailable,
  isSolutionOptionsComplete,
} from './solution-functions';

import {
  applyAllHintsToSolutionOptions,
} from './apply-hints-functions';

import {
  solution1,
  clues1,
  solution2,
  clues2,
  solution3,
  clues3,
  solution4,
  clues4,
  solution5,
  clues5,
  solution6,
  clues6,
  solution7,
  clues7,
  solution8,
  clues8,
  solution9,
  clues9,
  solution10,
  clues10,
  solution11,
  clues11,
  solution12,
  clues12,
  solution13,
  clues13,
} from './hard-coded-hands';

describe('hard-coded-hands solvable and non-reducable', () => {
  it('solution1 and clues1', () => {
    const theCardsAvailable = getCardsAvailable(solution1.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution1.missingNumber), solution1, clues1, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution2 and clues2', () => {
    const theCardsAvailable = getCardsAvailable(solution2.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution2.missingNumber), solution2, clues2, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution1 and clues3', () => {
    const theCardsAvailable = getCardsAvailable(solution3.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution3.missingNumber), solution3, clues3, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution4 and clues4', () => {
    const theCardsAvailable = getCardsAvailable(solution4.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution4.missingNumber), solution4, clues4, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution5 and clues5', () => {
    const theCardsAvailable = getCardsAvailable(solution5.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution5.missingNumber), solution5, clues5, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution6 and clues6', () => {
    const theCardsAvailable = getCardsAvailable(solution6.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution6.missingNumber), solution6, clues6, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution7 and clues7', () => {
    const theCardsAvailable = getCardsAvailable(solution7.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution7.missingNumber), solution7, clues7, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution8 and clues8', () => {
    const theCardsAvailable = getCardsAvailable(solution8.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution8.missingNumber), solution8, clues8, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution9 and clues9', () => {
    const theCardsAvailable = getCardsAvailable(solution9.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution9.missingNumber), solution9, clues9, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution10 and clues10', () => {
    const theCardsAvailable = getCardsAvailable(solution10.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution10.missingNumber), solution10, clues10, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution11 and clues11', () => {
    const theCardsAvailable = getCardsAvailable(solution11.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution11.missingNumber), solution11, clues11, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution12 and clues12', () => {
    const theCardsAvailable = getCardsAvailable(solution12.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution12.missingNumber), solution12, clues12, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });

  it('solution13 and clues13', () => {
    const theCardsAvailable = getCardsAvailable(solution13.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution13.missingNumber), solution13, clues13, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);
  });
});
