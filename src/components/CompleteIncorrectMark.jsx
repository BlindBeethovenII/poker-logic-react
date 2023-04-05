import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(6) - 8;
const top = rowToTop(0);

const divStyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  height: '16px',
  textAlign: 'left',
  zIndex: 0,
  pointerEvents: 'none',
};

const Label = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0.2em 0.4em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
  pointer-events: none;
`;

const CompleteIncorrectMark = () => {
  const { solutionOptionsState } = useContext(GameStateContext);

  return (
    <div style={divStyle}>
      <Label>{solutionOptionsState}</Label>
    </div>
  );
};

export default CompleteIncorrectMark;
