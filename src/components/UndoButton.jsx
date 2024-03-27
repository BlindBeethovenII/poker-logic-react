import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(-0.2);
const top = rowToTop(4.8);

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

const UndoButton = () => {
  const { userActionsIndex, undoRedoUserAction } = useContext(GameStateContext);

  // this button is only needed if there is at least one action we can undo
  if (userActionsIndex < 0) {
    // we are not needed
    return false;
  }

  const callUndoRedoUserAction = () => {
    // we are an undo userAction
    undoRedoUserAction(true);
  };

  const undoLabel = `Undo (${userActionsIndex + 1})`;

  return (
    <div style={divstyle}>
      <Button onClick={callUndoRedoUserAction}>{undoLabel}</Button>
    </div>
  );
};

export default UndoButton;
