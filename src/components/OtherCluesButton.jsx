import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(-0.2);
const top = rowToTop(3.9);

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
  font-size: 0.9em;
  margin: 0.8em;
  padding: 0.2em 0.8em;
  border: 3px solid black;
  border-radius: 8px;
`;

const OtherCluesButton = () => {
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
      <Button onClick={toggleShowHiddenClues}>Other Clues</Button>
    </div>
  );
};

export default OtherCluesButton;
