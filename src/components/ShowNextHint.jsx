import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop, cardNumberToString } from '../shared/card-functions';

import { clueToString } from '../shared/to-text-functions';

import {
  HINT_CLUE_NOT_NUMBER,
} from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(8.2);
const top = rowToTop(2.2);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '340px',
  height: '260px',
  textAlign: 'centre',
  zIndex: 0,
  overflow: 'auto',
};

const WhiteLabel = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0.2em 1em 0.2em 0.2em;
  pointer-events: none;
`;

const BlackLabel = styled.h2`
  background: rgb(85,107,47);
  color: black;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0em 1em 0em 1em;
  pointer-events: none;
`;

const ShowNextHint = () => {
  const { nextHint, showSolution } = useContext(GameStateContext);

  // don't show if the solution is showing, as the solution uses the same space
  if (showSolution) {
    return null;
  }

  // don't show if there are no hints to show
  if (nextHint === undefined) {
    return null;
  }

  // if the puzzle is solved, then there will be no hints available
  if (nextHint.length === 0) {
    return (
      <div style={divstyle}>
        <WhiteLabel>No Hints Available</WhiteLabel>
      </div>
    );
  }

  // I'm assuming that the array of hints contains hints all of the same hintType
  // This is a check - by this point there is at least one hint in the array
  const firstHintType = nextHint[0].hintType;
  const headingText = `Next Hint: ${firstHintType}`;
  for (let i = 1; i < nextHint.length; i += 1) {
    const nextHintType = nextHint[i].hintType;
    if (nextHintType !== firstHintType) {
      const errorMsg = `ERROR: nextHint array contains different hint types ${firstHintType} and ${nextHintType}`;
      return (
        <div style={divstyle}>
          <WhiteLabel>{errorMsg}</WhiteLabel>
        </div>
      );
    }
  }

  const blackLabels = [];

  if (firstHintType === HINT_CLUE_NOT_NUMBER) {
    // convert each hint to a black label
    for (let i = 0; i < nextHint.length; i += 1) {
      const {
        number,
        solutionOptionsIndex,
        handOptionsIndex,
        clue,
      } = nextHint[i];
      const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${number}`;
      const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not the ${cardNumberToString(number)} (Clue: ${clueToString(clue)})`;
      blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
    }
  } else {
    blackLabels.push(<BlackLabel key="hint-todo">TODO</BlackLabel>);
  }

  return (
    <div style={divstyle}>
      <WhiteLabel>{headingText}</WhiteLabel>
      {blackLabels}
    </div>
  );
};

export default ShowNextHint;
