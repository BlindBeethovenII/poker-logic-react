import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 0.25em;
  border: 2px solid #761d38;
  border-radius: 3px;
  pointer-events: none;
`;

const left = colToLeft(6) - 16;
const top = rowToTop(0);

const CompleteIncorrectMark = () => {
  const { solutionOptionsState } = useContext(GameStateContext);

  const buttonDivStyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    height: '16px',
    textAlign: 'left',
    zIndex: 0,
    pointerEvents: 'none',
  };

  return (
    <div style={buttonDivStyle}>
      <Button>{solutionOptionsState}</Button>
    </div>
  );
};

export default CompleteIncorrectMark;
