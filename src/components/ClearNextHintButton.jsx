import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const Button = styled.button`
  background: grey;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid black;
  border-radius: 8px;
`;

const ClearNextHintButton = () => {
  const { nextHint, setNextHint, showSolution } = useContext(GameStateContext);

  // don't show if the solution is showing, as the solution uses the same space
  if (showSolution) {
    return null;
  }

  // don't show if there are no hints to show
  if (nextHint === undefined) {
    return null;
  }

  const left = colToLeft(6) + 26;
  const top = rowToTop(6) - 4;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const clearNextHint = () => {
    setNextHint(undefined);
  };

  return (
    <div style={divstyle}>
      <Button onClick={clearNextHint}>Clear Next Hint</Button>
    </div>
  );
};

export default ClearNextHintButton;
