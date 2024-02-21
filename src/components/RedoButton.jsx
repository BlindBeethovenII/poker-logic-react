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
  const { userActionsIndex, userActions, toggleShowHiddenClues } = useContext(GameStateContext);

  // this button is only needed the length of the userActions array is greater than one more than userActionsIndex
  if (userActions.length - userActionsIndex < 2) {
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
