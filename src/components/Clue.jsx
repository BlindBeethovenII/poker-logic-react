import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

const Label = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.6em;
  margin: 0.4em;
  padding: 0.2em 1em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
  pointer-events: none;
`;

const Clue = (props) => {
  const { clueText, clueIndex } = props;

  const left = colToLeft(0) + 30;
  const top = rowToTop(5 + clueIndex * 0.2);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    height: '16px',
    textAlign: 'left',
    pointerEvents: 'none',
    zIndex: 0,
  };

  return (
    <div style={divstyle}>
      <Label>{clueText}</Label>
    </div>
  );
};

Clue.propTypes = {
  clueText: PropTypes.string.isRequired,
  clueIndex: PropTypes.number.isRequired,
};

export default Clue;
