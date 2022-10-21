import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(6) + 24;
const top = rowToTop(3) - 4;

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
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const ApplyBasicCluesButton = () => {
  const { applyBasicClues } = useContext(GameStateContext);

  return (
    <div style={divstyle}>
      <Button onClick={applyBasicClues}>Apply Basic Clues</Button>
    </div>
  );
};

export default ApplyBasicCluesButton;
