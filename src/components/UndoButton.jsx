import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(-0.2);
const top = rowToTop(6);

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

const UndoButton = () => {
  const { userActionsIndex, undoUserAction } = useContext(GameStateContext);

  // this button is only needed if there is at least one action we can undo
  if (userActionsIndex < 0) {
    // we are not needed
    return false;
  }

  return (
    <div style={divstyle}>
      <Button onClick={undoUserAction}>Undo</Button>
    </div>
  );
};

export default UndoButton;
