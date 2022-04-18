import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { personToImage } from '../shared/people-functions';

import GameStateContext from '../contexts/GameStateContext';

const SolutionPerson = (props) => {
  const {
    solutionPersonIndex,
  } = props;

  const { solutionPeople } = useContext(GameStateContext);

  // get our solution hand
  const solutionPerson = solutionPeople[solutionPersonIndex];

  if (!solutionPerson) {
    // if there is no person then nothing to show
    return null;
  }

  // convert the cols and rows into left/top
  const left = colToLeft(0);
  const top = rowToTop(solutionPersonIndex) + 8;

  const inPlaceDivStyle = {
    position: 'absolute',
    zIndex: 0,
    left,
    top,
  };

  return (
    <div
      style={inPlaceDivStyle}
    >
      <img src={personToImage(solutionPerson)} alt="cardsuit" />
    </div>
  );
};

SolutionPerson.propTypes = {
  solutionPersonIndex: PropTypes.number.isRequired,
};

export default SolutionPerson;
