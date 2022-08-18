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

const NewSolutionButton = (props) => {
  const { newSolutionIndex } = props;

  const left = colToLeft(4 + (newSolutionIndex * 1.5));
  const top = rowToTop(6);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const { newSolution } = useContext(GameStateContext);

  const buttonText = newSolutionIndex === 1 ? 'New Solution 1' : 'New Random Solution';

  return (
    <div style={divstyle}>
      <Button onClick={() => newSolution(newSolutionIndex)}>{buttonText}</Button>
    </div>
  );
};

NewSolutionButton.propTypes = {
  newSolutionIndex: PropTypes.number.isRequired,
};

export default NewSolutionButton;
