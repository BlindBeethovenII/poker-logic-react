import React from 'react';

const HelpPageCardOptions = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Card Options Help</h3>
      <p>
        The top left of the play area shows all the remaining options for each card of each poker hand.
        By a process of deduction, using the clues and the cards available, you select or remove card options until the final puzzle solution is arrived at.
      </p>
      <p>A left click will select a card&apos;s suit or number.  A right click will remove that option for a card&apos;s suit or number.</p>
      <p>A right click is actually a toggle operation, so you can restore a suit or number option that way.</p>
      <p>If you make a wrong selection or removal then the play area will turn red and the word &quot;OK&quot; will turn to &quot;INVALID&quot;. Just use the Undo button and try again.</p>
      <p>Holding the shift or control key while making a left or right click on a card option will apply that action to all cards in the poker hand that do not already have the corresponding suit or card already set.</p>
      <p>For example: if you know a hand does not have a Heart in any of its cards, then hold the shift or control key while right clicking on a Heart in that hand and all the Hearts will toggle off.</p>
      <p>
        Also, for example: if you know the hand is a Three of a Kind, and the first three cards are set to Jacks,
        then shift or control while right clicking on the Jack of the fourth card will also remove the Jack from the fifth card, but it will not remove the Jacks already set in the first three cards.
      </p>
      <p>While the right button is down you can move around the number options and the right click action will be applied to each number encountered. This is simply a shortcut for making multiple right clicks.</p>
    </div>
  );
};

export default HelpPageCardOptions;
