import React from 'react';

import PropTypes from 'prop-types';

import CardOptions from './CardOptions';

const HandOptions = (props) => {
  const { solutionOptionsIndex } = props;

  return (
    <>
      <CardOptions solutionOptionsIndex={solutionOptionsIndex} handOptionsIndex={0} />
      <CardOptions solutionOptionsIndex={solutionOptionsIndex} handOptionsIndex={1} />
      <CardOptions solutionOptionsIndex={solutionOptionsIndex} handOptionsIndex={2} />
      <CardOptions solutionOptionsIndex={solutionOptionsIndex} handOptionsIndex={3} />
      <CardOptions solutionOptionsIndex={solutionOptionsIndex} handOptionsIndex={4} />
    </>
  );
};

HandOptions.propTypes = {
  solutionOptionsIndex: PropTypes.number.isRequired,
};

export default HandOptions;
