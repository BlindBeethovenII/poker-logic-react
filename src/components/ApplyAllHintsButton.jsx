import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const ApplyAllHintsButton = () => {
  const { findAndApplyAllHints } = useContext(GameStateContext);

  // don't show in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const left = colToLeft(6) + 24;
  const top = rowToTop(6) - 4;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  return (
    <div style={divstyle}>
      <Button onClick={findAndApplyAllHints}>Apply All Hints</Button>
    </div>
  );
};

export default ApplyAllHintsButton;
