import React from 'react';

const HelpPageHandSorting = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Sorting of a Hand&apos;s Cards</h3>
      <p>There are also built-in rules as to how the cards in each hand are sorted.</p>
      <p>The first rule is that the cards that make up the hand type appear on the left and the remaining cards to the right.</p>
      <p>
        For example: if you know that a hand is a Three of a Kind, then the first three cards to the left will be three cards of the same number. The two cards to the right will be different cards.
        Of course, these two cards cannot be the same number as each other, because then this hand would be a Full House and not Three of a Kind.
      </p>
      <p>The second rule is that higher cards are to the left and lower cards are to the right, after the first rule has been applied.</p>
      <p>For example: if you know the five cards of a Three of a Kind are a Queen, a Jack, and 3 Fours, then these are ordered Four, Four, Four, Queen, Jack.</p>
      <p>An Ace is high, except in the Straight Flush or Straight made up of the cards 5 down to A; in which case these cards are ordered 5, 4, 3, 2, 1.</p>
      <p>These build-in sorting rules are fundamental to solving each puzzle. You will not be able to solve a puzzle without considering them regularly.</p>
    </div>
  );
};

export default HelpPageHandSorting;
