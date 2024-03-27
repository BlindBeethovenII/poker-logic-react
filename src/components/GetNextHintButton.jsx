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

const GetNextHintButton = () => {
  const { findNextHint, nextHint } = useContext(GameStateContext);

  // don't show if we already have a next hint
  if (nextHint) {
    return null;
  }

  const left = colToLeft(6) + 26;
  const top = rowToTop(3.95);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  return (
    <div style={divstyle}>
      <Button onClick={findNextHint}>Get Next Hint</Button>
    </div>
  );
};

export default GetNextHintButton;
