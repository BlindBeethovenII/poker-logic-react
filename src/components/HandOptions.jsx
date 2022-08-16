import React from 'react';

import PropTypes from 'prop-types';

import CardOptions from './CardOptions';

const HandOptions = (props) => {
  const { solutionOptionIndex } = props;

  return (
    <>
      <CardOptions solutionOptionIndex={solutionOptionIndex} handOptionIndex={0} />
      <CardOptions solutionOptionIndex={solutionOptionIndex} handOptionIndex={1} />
      <CardOptions solutionOptionIndex={solutionOptionIndex} handOptionIndex={2} />
      <CardOptions solutionOptionIndex={solutionOptionIndex} handOptionIndex={3} />
      <CardOptions solutionOptionIndex={solutionOptionIndex} handOptionIndex={4} />
    </>
  );
};

HandOptions.propTypes = {
  solutionOptionIndex: PropTypes.number.isRequired,
};

export default HandOptions;
