import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(-0.2);
const top = rowToTop(6.3);

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

const HelpButton = () => {
  const { showHelp, toggleShowHelp } = useContext(GameStateContext);

  const helpLabel = showHelp ? 'Close Help' : 'Open Help';

  return (
    <div style={divstyle}>
      <Button onClick={toggleShowHelp}>{helpLabel}</Button>
    </div>
  );
};

export default HelpButton;
