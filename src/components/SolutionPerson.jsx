import React from 'react';

import PropTypes from 'prop-types';

import { colToLeft, rowToTop } from '../shared/card-functions';
import { personToPositionImage } from '../shared/people-functions';

const SolutionPerson = (props) => {
  const {
    solutionPersonIndex,
  } = props;

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
      <img src={personToPositionImage(solutionPersonIndex)} alt="solutionperson" />
    </div>
  );
};

SolutionPerson.propTypes = {
  solutionPersonIndex: PropTypes.number.isRequired,
};

export default SolutionPerson;
