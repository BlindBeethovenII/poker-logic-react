import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createSolution } from '../shared/card-functions';

import {
  createSolutionOptions,
  setSuitOptionOnlyInSolutionOptions,
  toggleSuitOptionInSolutionOptions,
  resetSuitOptionsInSolutionOptions,
  setNumberOptionOnlyInSolutionOptions,
  toggleNumberOptionInSolutionOptions,
  resetNumberOptionsInSolutionOptions,
  getCardsAvailable,
  countCardsStillAvailable,
} from '../shared/solution-functions';

import { applyNextHintsToSolutionOptions, applyAllHintsToSolutionOptions } from '../shared/applyHint';

import {
  createCluesForSolutionHands,
  addInDeducedClues,
  clueToText,
} from '../shared/clue-functions';

import {
  solution1,
  clues1,
  solution2,
  clues2,
} from '../shared/test-hands';

import logIfDevEnv from '../shared/logIfDevEnv';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // show a win
  const [showWin] = useState(false);

  // a solution - which is an object with {solutionHands, missingNumber}
  // TODO - include people in the solution
  const [solution, setSolution] = useState(solution1);

  // solution options, being an array of 4 hand options
  // hand options, being an array of 5 card options
  // each card options is on object of
  //   suitOptions: array of 4 bools - S, H, D, C - true means visible - if only one true then that is the selected number
  //   numberOptions: array of 13 bools - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number (missingNumber is always set to false)
  const [solutionOptions, setSolutionOptions] = useState(() => createSolutionOptions(solution.missingNumber));

  // cards available are suit sorted cards from the generated solution
  const [cardsAvailable, setCardsAvailable] = useState(() => getCardsAvailable(solution.solutionHands));

  // clues
  const [clues, setClues] = useState(() => addInDeducedClues(clues1));

  // -------------------- //
  // card options setters //
  // -------------------- //

  // set the given suit options index as the only selected suit option
  const setSuitOptionOnly = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // toggle the given suit option index
  const toggleSuitOption = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // reset all the suit options
  const resetSuitOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = resetSuitOptionsInSolutionOptions(solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // set the given number options index as the only selected number option
  const setNumberOptionOnly = useCallback((number, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // toggle the given number option index
  const toggleNumberOption = useCallback((number, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // reset all the number options
  const resetNumberOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = resetNumberOptionsInSolutionOptions(solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // ------------------------------------- //
  // solution and solution options setters //
  // ------------------------------------- //

  // reset solution options
  const resetSolutionOptions = () => setSolutionOptions(createSolutionOptions());

  // get a new solution
  const newSolution = useCallback((newSolutionIndex) => {
    // a new solution
    let nextNewSolution = null;
    let nextClues = null;
    if (newSolutionIndex === 1) {
      nextNewSolution = solution1;
      nextClues = clues1;
    } else if (newSolutionIndex === 2) {
      nextNewSolution = solution2;
      nextClues = clues2;
    } else {
      nextNewSolution = createSolution();
      nextClues = createCluesForSolutionHands(nextNewSolution.solutionHands);
    }
    setSolution(nextNewSolution);
    setClues(addInDeducedClues(nextClues));

    // need to reset the solution options as well
    resetSolutionOptions();

    // and find the cards available for this solution
    setCardsAvailable(getCardsAvailable(nextNewSolution.solutionHands));
  }, []);

  // ----------- //
  // hint system //
  // ----------- //

  // find and apply the next hint
  const findAndApplyNextHint = useCallback(() => {
    const newSolutionOptions = applyNextHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
    if (newSolutionOptions) {
      setSolutionOptions(newSolutionOptions);
    }
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // find and apply all hints
  const findAndApplyAllHints = useCallback(() => {
    const newSolutionOptions = applyAllHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
    if (newSolutionOptions) {
      setSolutionOptions(newSolutionOptions);
    }
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // ------------ //
  // reduce clues //
  // ------------ //

  // see if any clues can be removed and the puzzle can still be solved
  const reduceClues = useCallback(() => {
    // first check that the puzzle can be solved with the current clues
    const newSolutionOptions = applyAllHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
    if (countCardsStillAvailable(cardsAvailable, newSolutionOptions) !== 0) {
      console.error('reduceClues: initial clues do not solve the puzzle');
      return;
    }

    // now order the clues, bringing the those to the front that we prefer to lose if possible
    // TODO - hand 1's clues are already in order

    // need to remember if we remove any clues
    let removedAnyClues = false;

    // and the final clues
    let finalClues = clues;

    // keep removing while possible
    let lookForMore = true;
    while (lookForMore) {
      let indexToRemove = -1;
      for (let i = 0; i < finalClues.length && indexToRemove === -1; i += 1) {
        const clue = finalClues[i];

        // the new clues without that one
        const newClues = [...finalClues.slice(0, i), ...finalClues.slice(i + 1)];
        const newSolutionOptions1 = applyAllHintsToSolutionOptions(solutionOptions, solution, newClues, cardsAvailable);
        if (countCardsStillAvailable(cardsAvailable, newSolutionOptions1) === 0) {
          logIfDevEnv(`reduceClues: can remove clue ${clueToText(clue, i)}`);
          indexToRemove = i;
        }
      }
      if (indexToRemove === -1) {
        // didn't find any to remove, so give up here
        lookForMore = false;
      } else {
        // found one to remove
        finalClues = [...finalClues.slice(0, indexToRemove), ...finalClues.slice(indexToRemove + 1)];
        removedAnyClues = true;
      }
    }

    if (removedAnyClues) {
      // save the new clues
      setClues(finalClues);
    } else {
      logIfDevEnv('reduceClues: could not find a clue to remove');
    }
  }, [cardsAvailable, clues, solution, solutionOptions]);

  // ----------- //
  // the context //
  // ----------- //

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // have we just won
    showWin,

    // the missing number
    missingNumber: solution.missingNumber,

    // the hands of the solution
    solutionHands: solution.solutionHands,

    // the solution options and setting functions
    solutionOptions,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    resetNumberOptions,
    resetSolutionOptions,

    // cards available
    cardsAvailable,

    // solution context functions
    newSolution,

    // hint stuff
    findAndApplyNextHint,
    findAndApplyAllHints,

    // clues stuff
    clues,
    reduceClues,
  }), [
    showWin,
    solution,
    solutionOptions,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    resetNumberOptions,
    cardsAvailable,
    newSolution,
    findAndApplyNextHint,
    findAndApplyAllHints,
    clues,
    reduceClues,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
