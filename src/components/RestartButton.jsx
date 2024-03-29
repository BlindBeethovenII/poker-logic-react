import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(6.25);
const top = rowToTop(2.9);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
};

const Button = styled.button`
  background: grey;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid black;
  border-radius: 8px;
`;

const RestartButton = () => {
  const {
    resetSolutionOptions,
    solution,
    cardsAvailable,
    clues,
  } = useContext(GameStateContext);

  return (
    <div style={divstyle}>
      <Button onClick={() => resetSolutionOptions(solution, cardsAvailable, clues)}>Restart this Puzzle</Button>
    </div>
  );
};

export default RestartButton;
