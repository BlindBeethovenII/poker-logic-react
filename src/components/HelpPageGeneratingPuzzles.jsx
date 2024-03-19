import React from 'react';

const HelpPageGeneratingPuzzles = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Generating Puzzles</h3>
      <p>There are a number of hard-coded puzzles. These have been selected to demonstrate different types of clues. You may wish to start by solving these hard-coded puzzles first.</p>
      <p>
        You may also want to use the Show Solution button when you attempt your first few puzzles.
        This will allow you to peek at the solution as you attempt to work out the deductions required to solve the puzzle.
        A peek may increase your confidence that you are on the right lines.
        Of course, when the play area turns red you know that you made a mistake. When you are more familiar with the puzzle, it is more fun to work out your mistake than to peek at the solution.
      </p>
      <p>Once you have solved all the hard-coded puzzles, you can generate a new random puzzle by using the New Random Puzzle button.</p>
      <p>There is no save feature (yet) nor does the application remember which hard-coded puzzles you have already solved (yet).</p>
      <p>Currently there is no difficulty setting, so some random puzzles are much harder to solve than others.</p>
      <p>
        Note that these random puzzles are really random and not related to a &quot;seed&quot;. This means that I have no way of generating the same puzzle myself.
        If you wish to discuss a particular random puzzle with me (for example, if you think you have found a bug)
        select the Show Solution button, and send me a screenshot, making sure all clues are visible as well.
        I should then be able to code the same puzzle myself locally, and continue the discussion with you.
      </p>
    </div>
  );
};

export default HelpPageGeneratingPuzzles;
