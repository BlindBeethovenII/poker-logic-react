import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import { createUserActionApplyNextHint } from '../shared/user-action-functions';

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

const ApplyNextHintButton = () => {
  const { findAndApplyNextHint, nextHint, addUserAction } = useContext(GameStateContext);

  // only show the nextHint is defined
  if (nextHint === undefined) {
    return null;
  }

  const left = colToLeft(6) + 24;
  const top = rowToTop(5) - 4;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const applyNextHint = () => {
    findAndApplyNextHint();

    // remember the user action just done
    addUserAction(createUserActionApplyNextHint());
  };

  return (
    <div style={divstyle}>
      <Button onClick={applyNextHint}>Apply Next Hint</Button>
    </div>
  );
};

export default ApplyNextHintButton;
