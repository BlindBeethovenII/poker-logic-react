import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(6) + 18;
const top = rowToTop(3);

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

const ReduceCluesButton = () => {
  const { reduceClues } = useContext(GameStateContext);

  return (
    <div style={divstyle}>
      <Button onClick={reduceClues}>Reduce Clues</Button>
    </div>
  );
};

export default ReduceCluesButton;
