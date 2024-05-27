function createDeck(numDecks = 6) {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

  let deck = [];
  
  for (let i = 0; i < numDecks; i++) {
    for (let suit of suits) {
      for (let value of values) {
        deck.push( { value, suit } );
      }
    }
  }

  deck.sort(() => Math.random() - 0.5);
  return deck;
}

function dealCard(deck) {
  return deck.pop();
}

function initialDeal(deck) {
  const playerHand = [dealCard(deck), dealCard(deck)];
  const dealerHand = [dealCard(deck), dealCard(deck)];
  return { playerHand, dealerHand };
}

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  for (let card of hand) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10;
    } else if (card.value === 'A') {
      value += 11;
      aces += 1;
    } else {
      value += parseInt(card.value);
    }
  }

  while (value > 21 && aces) { // 0 is a falsy value so if we have no aces, this doesn't run.
    value -= 10;
    aces -= 1;
  }

  return value;
}

// PLAYER ACTIONS //

function hit(deck, hand) {
  hand.push(dealCard(deck));
}

function stand(hand) {
  return calculateHandValue(hand);
}

function doubleDown(deck, hand) {
  hit(deck, hand);
  // double bet
  return calculateHandValue(hand);
}

function surrender() {
  return 'Surrender';
}

// DEALER //

function dealerPlay(deck, dealerHand) {

  while (calculateHandValue(dealerHand) < 17) { // dealer should hit on soft 17s
    hit(deck, dealerHand);
  }

  let dealerFinalValue = calculateHandValue(dealerHand);
  // check for uncollapsed ace
  if (dealerFinalValue === 17) {
    for (const card in dealerHand) {
      if (card.value === 'A') {
        hit(deck, dealerHand);
      }
    }
  }

  return dealerHand;
}

function determineWinner(playerHand, dealerHand) {
  let playerHandValue = calculateHandValue(playerHand);
  let dealerHandValue = calculateHandValue(dealerHand);

  if (playerHandValue > 21) {
    return 'Dealer wins :(';
  } else if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
    return 'Player wins!! :D';
  } else if (dealerHandValue === playerHandValue) {
    return 'Push.'
  } else {
    return 'Dealer wins :^(';
  }
}

function playGame(numDecks = 6) {
  let deck = createDeck(numDecks);
  let { playerHand, dealerHand } = initialDeal(deck);


  // while (calculateHandValue(playerHand) < 21) {
  //   hit(deck, playerHand);
  // }

  dealerHand = dealerPlay(deck, dealerHand);

  const winner = determineWinner(playerHand, dealerHand);

  console.log(`Player hand : `, playerHand);
  console.log(`Dealer hand : `, dealerHand);
  console.log(winner);

}