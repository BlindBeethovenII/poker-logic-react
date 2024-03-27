import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

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

const ReduceCluesButton = (props) => {
  const { keepHandTypes } = props;

  const { reduceClues, setShowSpinKitCircle, showSolution } = useContext(GameStateContext);

  // don't show if the solution is showing, as the solution uses the same space
  if (showSolution) {
    return null;
  }

  // don't show if in production - this button is only used when I'm developing
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  let row = 7;
  let leftOffset = 4;
  let topOffset = 4;
  let label = 'Reduce Clues';
  if (keepHandTypes) {
    row = 6;
    leftOffset = -30;
    topOffset = -4;
    label = 'Reduce Clues not HandType';
  }

  const left = colToLeft(8) + leftOffset;
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
