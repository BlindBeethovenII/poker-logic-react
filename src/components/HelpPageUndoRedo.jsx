import React from 'react';

const HelpPageUndoRedo = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Undo and Redo</h3>
      <p>Once you have interacted with a new puzzle the Undo button will appear, indicating how many Undo actions can be performed.</p>
      <p>Once you have performed an Undo action, then a Redo button will appear, allowing you to redo an undo action. This is useful is you undid too many actions by mistake.</p>
      <p>The Restart this Puzzle button is a short hand for applying all the undo actions.</p>
    </div>
  );
};

export default HelpPageUndoRedo;
