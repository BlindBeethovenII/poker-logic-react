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
  const { allHints } = props;

  const { findAndApplyNextHint, findAndApplyAllHints } = useContext(GameStateContext);

  const left = colToLeft(6) + 24;
  const top = rowToTop(allHints ? 5 : 4);

  const label = allHints ? 'Apply All Hints' : 'Apply Next Hint';

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  return (
    <div style={divstyle}>
      <Button onClick={allHints ? findAndApplyAllHints : findAndApplyNextHint}>{label}</Button>
    </div>
  );
};

HintButton.propTypes = {
  allHints: PropTypes.bool,
};

HintButton.defaultProps = {
  allHints: false,
};

export default HintButton;
