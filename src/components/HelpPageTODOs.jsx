import React from 'react';

const HelpPageTODOs = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>TODOs</h3>
      <p>There are a lot of entries on my TODO list for this puzzle. Here are some of them:</p>
      <ul>
        <li>Introduce levels of difficulty.</li>
        <li>Improve the hint system.</li>
        <li>Improve the representation of clues.</li>
        <li>Add more deductions, some to catch those that we humans do well, and others to make puzzles harder to solve.</li>
        <li>Add the ability to save and load puzzles.</li>
        <li>Add an export/import feature.</li>
        <li>Add player names and introduce clues to define where players ranked.</li>
        <li>Add sound.</li>
        <li>Better graphics!</li>
        <li>Allow more than one type of poker hand in a puzzle.</li>
        <li>User options, for example: auto remove a number if no cards are available for that number.</li>
        <li>User option to indicate which types of clues they prefer when generating random puzzles.</li>
        <li>Add a warning if a clue is being moved to the other list, but it is still needed to solve the puzzle.</li>
        <li>Add a tutorial.</li>
        <li>Improve the interactions on a tablet.</li>
      </ul>
    </div>
  );
};

export default HelpPageTODOs;
