import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createSolution } from '../shared/card-functions';
import { createSolutionOptions, getHint } from '../shared/solution-functions';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // show a win
  const [showWin] = useState(false);

  // a solution - which is an object with {solutionHands, missingNumber}
  // TODO - include people in the solution
  const [solution] = useState(() => createSolution());

  // solution options, being an array of 4 hand options
  // hand options, being an array of 5 card options
  // each card options is on object of
  //   suitOptions: array of 4 bools - S, H, D, C - true means visible - if only one true then that is the selected number
  //   numberOptions: array of 13 bools - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number (ignoring the missingNumber entry, which is always true)
  const [solutionOptions, setSolutionOptions] = useState(() => createSolutionOptions());

  // setting functions for the card options

  // set the given suit options index as the only selected suit option
  const setSuitOptionOnly = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const handOptions = solutionOptions[solutionOptionsIndex];
    const { numberOptions } = handOptions[handOptionsIndex];
    const newSuitOptions = [false, false, false, false];
    newSuitOptions[suitOptionsIndex] = true;
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionsIndex] = newCardOptions;
    const newSolutionOptions = [...solutionOptions];
    newSolutionOptions[solutionOptionsIndex] = newHandOptions;
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // toggle the given suit option index
  const toggleSuitOption = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const handOptions = solutionOptions[solutionOptionsIndex];
    const { suitOptions, numberOptions } = handOptions[handOptionsIndex];
    const newSuitOptions = [...suitOptions];
    newSuitOptions[suitOptionsIndex] = !suitOptions[suitOptionsIndex];
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionsIndex] = newCardOptions;
    const newSolutionOptions = [...solutionOptions];
    newSolutionOptions[solutionOptionsIndex] = newHandOptions;
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // reset all the suit options
  const resetSuitOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const handOptions = solutionOptions[solutionOptionsIndex];
    const { numberOptions } = handOptions[handOptionsIndex];
    const newSuitOptions = [true, true, true, true];
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionsIndex] = newCardOptions;
    const newSolutionOptions = [...solutionOptions];
    newSolutionOptions[solutionOptionsIndex] = newHandOptions;
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // set the given number options index as the only selected number option
  const setNumberOptionOnly = useCallback((numberOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const handOptions = solutionOptions[solutionOptionsIndex];
    const { suitOptions } = handOptions[handOptionsIndex];
    const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    newNumberOptions[numberOptionsIndex] = true;
    // and the missing number entry is always true as well (which we assume in 'only one number selected' count)
    newNumberOptions[solution.missingNumber - 1] = true;
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionsIndex] = newCardOptions;
    const newSolutionOptions = [...solutionOptions];
    newSolutionOptions[solutionOptionsIndex] = newHandOptions;
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions, solution]);

  // toggle the given number option index
  const toggleNumberOption = useCallback((numberOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const handOptions = solutionOptions[solutionOptionsIndex];
    const { suitOptions, numberOptions } = handOptions[handOptionsIndex];
    const newNumberOptions = [...numberOptions];
    newNumberOptions[numberOptionsIndex] = !numberOptions[numberOptionsIndex];
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionsIndex] = newCardOptions;
    const newSolutionOptions = [...solutionOptions];
    newSolutionOptions[solutionOptionsIndex] = newHandOptions;
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // reset all the number options
  const resetNumberOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const handOptions = solutionOptions[solutionOptionsIndex];
    const { suitOptions } = handOptions[handOptionsIndex];
    const newNumberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionsIndex] = newCardOptions;
    const newSolutionOptions = [...solutionOptions];
    newSolutionOptions[solutionOptionsIndex] = newHandOptions;
    setSolutionOptions(newSolutionOptions);
  }, [solutionOptions]);

  // find and apply the next hint
  const findAndApplyNextHint = useCallback(() => {
    console.log(`getHint returns ${JSON.stringify(getHint(solutionOptions, solution))}`);
  }, [solutionOptions, solution]);

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

    // reset the solution options
    resetSolutionOptions: () => setSolutionOptions(createSolutionOptions()),

    // hint stuff
    findAndApplyNextHint,
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
    findAndApplyNextHint,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
