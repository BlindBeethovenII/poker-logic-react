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

const HintButton = (props) => {
  const { getHint, applyOne, applyAll } = props;

  const { findNextHint, findAndApplyNextHint, findAndApplyAllHints } = useContext(GameStateContext);

  let row = 0;
  let label = '';
  let clickFunction = () => {};
  if (getHint) {
    row = 3.95;
    label = 'Get Next Hint';
    clickFunction = findNextHint;
  }
  if (applyOne) {
    row = 5;
    label = 'Apply Next Hint';
    clickFunction = findAndApplyNextHint;
  }
  if (applyAll) {
    row = 6;
    label = 'Apply All Hints';
    clickFunction = findAndApplyAllHints;
  }

  const left = colToLeft(6) + 24 + (getHint ? 2 : 0);
  const top = rowToTop(row) - (getHint ? 0 : 4);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  return (
    <div style={divstyle}>
      <Button onClick={clickFunction}>{label}</Button>
    </div>
  );
};

HintButton.propTypes = {
  getHint: PropTypes.bool,
  applyOne: PropTypes.bool,
  applyAll: PropTypes.bool,
};

HintButton.defaultProps = {
  getHint: false,
  applyOne: false,
  applyAll: false,
};

export default HintButton;
