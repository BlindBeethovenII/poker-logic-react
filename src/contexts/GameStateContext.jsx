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
  createCardsAvailable,
} from '../shared/solution-functions';

import {
  getHint,
  applyHint,
} from '../shared/hint-functions';

import { createCluesForSolutionHands } from '../shared/clue-functions';

import { solution1, clues1 } from '../shared/test-hands';

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
  const [cardsAvailable, setCardsAvailable] = useState(() => createCardsAvailable(solution.solutionHands));

  // clues
  const [clues, setClues] = useState(clues1);

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
  const setNumberOptionOnly = useCallback((numberOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = setNumberOptionOnlyInSolutionOptions(numberOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // toggle the given number option index
  const toggleNumberOption = useCallback((numberOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleNumberOptionInSolutionOptions(numberOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
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
    } else {
      nextNewSolution = createSolution();
      nextClues = createCluesForSolutionHands(nextNewSolution.solutionHands);
    }
    setSolution(nextNewSolution);
    setClues(nextClues);

    // need to reset the solution options as well
    resetSolutionOptions();

    // and find the cards available for this solution
    setCardsAvailable(createCardsAvailable(nextNewSolution.solutionHands));
  }, []);

  // ----------- //
  // hint system //
  // ----------- //

  // find and apply the next hint
  const findAndApplyNextHint = useCallback(() => {
    const hints = getHint(solutionOptions, solution, clues, cardsAvailable);
    console.log(`getHint returns ${JSON.stringify(hints)}`);
    if (hints?.length) {
      // apply all the hints
      let newSolutionOptions = solutionOptions;
      hints.forEach((hint) => {
        newSolutionOptions = applyHint(newSolutionOptions, hint);
      });
      setSolutionOptions(newSolutionOptions);
    }
  }, [solutionOptions, solution, clues, cardsAvailable]);

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

    // clues stuff
    clues,
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
    clues,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
