import shuffle from 'lodash.shuffle';

import {
  createSolutionOptions,
  getCardsAvailable,
  isSolutionOptionsComplete,
} from './solution-functions';

import {
  applyAllHintsToSolutionOptions,
} from './apply-hints-functions';

import {
  showDeducedClue,
} from './clue-functions';

import {
  addInDeducedClues,
} from './get-deduced-clues-functions';

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
  solution14,
  clues14,
} from './hard-coded-hands';

// support function that duplicates reduction code that is embedded in GameStateContext
const isReducable = (theSolution, theClues) => {
  const theCardsAvailable = getCardsAvailable(theSolution.solutionHands);

  const clues = shuffle(theClues);

  // work through the clues, removing one at a time, to see if still can solve without that clue - if we can it is reducable
  let nextIndex = 0;
  while (nextIndex < clues.length) {
    const clue = clues[nextIndex];

    // only consider clues that are shown to the user
    if (showDeducedClue(clue, clues)) {
      // the new clues without that one
      const newClues = [...clues.slice(0, nextIndex), ...clues.slice(nextIndex + 1)];
      // remember to add in the deduced clues (which applies if we've removed a HAND_TYPE clue that can now be deduced)
      const newSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(theSolution.missingNumber), theSolution, addInDeducedClues(newClues), theCardsAvailable);
      if (isSolutionOptionsComplete(theCardsAvailable, newSolutionOptions)) {
        // can remove a clue and the solution is still solvable - so it is reducable
        return true;
      }
    }

    // current clue could not be removed, so move to the next one
    nextIndex += 1;
  }

  // couldn't reduce the clues and still be solvable
  return false;
};

describe('hard-coded-hands solvable and non-reducable', () => {
  it('solution1 and clues1', () => {
    const theCardsAvailable = getCardsAvailable(solution1.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution1.missingNumber), solution1, clues1, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution1, clues1)).toEqual(false);
  });

  it('solution2 and clues2', () => {
    const theCardsAvailable = getCardsAvailable(solution2.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution2.missingNumber), solution2, clues2, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution2, clues2)).toEqual(false);
  });

  it('solution1 and clues3', () => {
    const theCardsAvailable = getCardsAvailable(solution3.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution3.missingNumber), solution3, clues3, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution3, clues3)).toEqual(false);
  });

  it('solution4 and clues4', () => {
    const theCardsAvailable = getCardsAvailable(solution4.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution4.missingNumber), solution4, clues4, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution4, clues4)).toEqual(false);
  });

  it('solution5 and clues5', () => {
    const theCardsAvailable = getCardsAvailable(solution5.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution5.missingNumber), solution5, clues5, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution5, clues5)).toEqual(false);
  });

  it('solution6 and clues6', () => {
    const theCardsAvailable = getCardsAvailable(solution6.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution6.missingNumber), solution6, clues6, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution6, clues6)).toEqual(false);
  });

  it('solution7 and clues7', () => {
    const theCardsAvailable = getCardsAvailable(solution7.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution7.missingNumber), solution7, clues7, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution7, clues7)).toEqual(false);
  });

  it('solution8 and clues8', () => {
    const theCardsAvailable = getCardsAvailable(solution8.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution8.missingNumber), solution8, clues8, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution8, clues8)).toEqual(false);
  });

  it('solution9 and clues9', () => {
    const theCardsAvailable = getCardsAvailable(solution9.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution9.missingNumber), solution9, clues9, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution9, clues9)).toEqual(false);
  });

  it('solution10 and clues10', () => {
    const theCardsAvailable = getCardsAvailable(solution10.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution10.missingNumber), solution10, clues10, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution10, clues10)).toEqual(false);
  });

  it('solution11 and clues11', () => {
    const theCardsAvailable = getCardsAvailable(solution11.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution11.missingNumber), solution11, clues11, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution11, clues11)).toEqual(false);
  });

  it('solution12 and clues12', () => {
    const theCardsAvailable = getCardsAvailable(solution12.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution12.missingNumber), solution12, clues12, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution12, clues12)).toEqual(false);
  });

  it('solution13 and clues13', () => {
    const theCardsAvailable = getCardsAvailable(solution13.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution13.missingNumber), solution13, clues13, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution13, clues13)).toEqual(false);
  });

  it('solution14 and clues14', () => {
    const theCardsAvailable = getCardsAvailable(solution14.solutionHands);

    const applyAllHintsSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution14.missingNumber), solution14, clues14, theCardsAvailable);

    expect(isSolutionOptionsComplete(theCardsAvailable, applyAllHintsSolutionOptions)).toEqual(true);

    expect(isReducable(solution14, clues14)).toEqual(false);
  });
});
