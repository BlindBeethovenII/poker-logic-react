import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(8.2);
const top = rowToTop(2.2);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '200px',
  height: '40px',
  textAlign: 'centre',
  pointerEvents: 'none',
  zIndex: 0,
};

const WhiteLabel = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0.2em 1em 0.2em 0.2em;
  pointer-events: none;
`;

const BlackLabel = styled.h2`
  background: rgb(85,107,47);
  color: black;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0em 1em 0em 1em;
  pointer-events: none;
`;

const ShowHandOrdering = () => {
  const { showSolution } = useContext(GameStateContext);

  if (showSolution) {
    return null;
  }

  return (
    <div style={divstyle}>
      <WhiteLabel>Hand Ordering</WhiteLabel>
      <BlackLabel>Straight Flush</BlackLabel>
      <BlackLabel>Four of a Kind</BlackLabel>
      <BlackLabel>Full House</BlackLabel>
      <BlackLabel>Flush</BlackLabel>
      <BlackLabel>Straight</BlackLabel>
      <BlackLabel>Three of a Kind</BlackLabel>
      <BlackLabel>Two Pair</BlackLabel>
      <BlackLabel>Pair</BlackLabel>
      <BlackLabel>High Card</BlackLabel>
    </div>
  );
};

export default ShowHandOrdering;
