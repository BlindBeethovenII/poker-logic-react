import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(-0.2);
const top = rowToTop(6.4);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
};

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 0.9em;
  margin: 0.8em;
  padding: 0.2em 0.8em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const RedoButton = () => {
  const { toggleShowHiddenClues, showHiddenClues, showClues } = useContext(GameStateContext);

  // this button is only needed when at least one clue is in the other clues
  let lookingFor = false;
  if (showHiddenClues) {
    lookingFor = true;
  }
  if (!showClues.includes(lookingFor)) {
    // we are not needed
    return false;
  }

  return (
    <div style={divstyle}>
      <Button onClick={toggleShowHiddenClues}>Redo</Button>
    </div>
  );
};

export default RedoButton;
