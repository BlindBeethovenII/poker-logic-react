import React, { useContext } from 'react';

import PropTypes from 'prop-types';

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

const ReduceCluesButton = (props) => {
  const { keepHandTypes } = props;

  const { reduceClues, setShowSpinKitCircle } = useContext(GameStateContext);

  let row = 5;
  let leftOffset = -20;
  let topOffset = 4;
  let label = 'Reduce Clues';
  if (keepHandTypes) {
    row = 6;
    leftOffset = -30;
    topOffset = -4;
    label = 'Reduce Clues not HandType';
  }

  const left = colToLeft(5) + leftOffset;
  const top = rowToTop(row) + topOffset;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const reduceCluesWithSpinner2 = () => {
    reduceClues(keepHandTypes);
    setShowSpinKitCircle(false);
  };

  const reduceCluesWithSpinner = () => {
    setShowSpinKitCircle(true);
    setTimeout(reduceCluesWithSpinner2, 500);
  };

  return (
    <div style={divstyle}>
      <Button onClick={reduceCluesWithSpinner}>{label}</Button>
    </div>
  );
};

ReduceCluesButton.propTypes = {
  keepHandTypes: PropTypes.bool,
};

ReduceCluesButton.defaultProps = {
  keepHandTypes: false,
};

export default ReduceCluesButton;
