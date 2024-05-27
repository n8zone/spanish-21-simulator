document.addEventListener('DOMContentLoaded', (event) => {
  const gameElement = document.getElementById('game');

  const dealerCardArea = document.getElementById('dealer-cards');
  const playerCardArea = document.getElementById('player-cards');

  const playerHitBtn = document.getElementById('player-hit-btn');
  const playerStandBtn = document.getElementById('player-stand-btn');
  const playerTotalValue = document.getElementById('player-total-value');
  
  
  let deck = createDeck()
  let { playerHand, dealerHand } = initialDeal(deck)

  console.log("Player : ", playerHand);
  console.log("Dealer Up: ", dealerHand[0]);

  console.log("Player : ", playerHand, calculateHandValue(playerHand));

  //let testHand = [{ value: 5, suit: 'test' }, { value: 3, suit: 'test' }, {value: 'A', suit: 'test' }, { value: 4, suit: 'test' }]

  //console.log("Test : ", testHand, calculateHandValue(testHand));


  dealerCardArea.appendChild(constructCard(dealerHand[0]));

  function constructCard(card) {
    let cardElement = document.createElement('p') // for now... should probably change
    cardElement.classList.add('card');
    
    cardElement.innerText = `${card.value} of ${card.suit}`;

    return cardElement;
  }

  function revealDealerCard() {
    
  }

  function refreshDealerCards() {
    dealerCardArea.innerHTML = '';
    let dealerHandElement = document.createElement('p');
    dealerHandElement.innerText = `${dealerHand[0].value} of ${dealerHand[0].suit}`;
    dealerCardArea.appendChild(dealerHandElement);
  }

  function refreshPlayerCards() {
    playerCardArea.innerHTML = '';
  
    for (const card of playerHand) {
      playerCardArea.appendChild(constructCard(card));
    }
    playerTotalValue.innerText = `Total Value: ${calculateHandValue(playerHand)}`;
  }


  playerHitBtn.addEventListener('click', (e) => {
    hit(deck, playerHand);
    
    refreshPlayerCards(); // this is jank, change later

  })

  playerStandBtn.addEventListener('click', (e) => {
    dealerPlay(deck, dealerHand);
  })

  refreshPlayerCards();
})