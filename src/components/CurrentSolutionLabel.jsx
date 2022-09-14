import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(11.7);
const top = rowToTop(6);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '100px',
  height: '40px',
  textAlign: 'centre',
  pointerEvents: 'none',
  zIndex: 0,
};

const Label = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0.2em 1em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
  pointer-events: none;
`;

const CurrentSolutionLabel = () => {
  const { currentSolutionLabel } = useContext(GameStateContext);

  return (
    <div style={divstyle}>
      <Label>{currentSolutionLabel}</Label>
    </div>
  );
};

export default CurrentSolutionLabel;
