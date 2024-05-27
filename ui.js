// to be frank, I don't like this too much and I need to improve it.

document.addEventListener('DOMContentLoaded', (event) => {

	const dealerCardArea = document.getElementById('dealer-cards');
	const dealerTotalValue = document.getElementById('dealer-total-value');

	const playerCardArea = document.getElementById('player-cards');
	const playerHitBtn = document.getElementById('player-hit-btn');
	const playerStandBtn = document.getElementById('player-stand-btn');
	const playerTotalValue = document.getElementById('player-total-value');
	
	
	let deck = createDeck()
	let { playerHand, dealerHand } = initialDeal(deck)

	let bRevealDealer = false;


	dealerCardArea.appendChild(constructCard(dealerHand[0]));

	function constructCard(card) {
		let cardElement = document.createElement('p') // for now... should probably change
		cardElement.classList.add('card');
		
		cardElement.innerText = `${card.value} of ${card.suit}`;

		return cardElement;
	}

	function refreshCardArea(cardArea, hand) {
		cardArea.innerHTML = '';

		for (const card of hand) {
			cardArea.appendChild(constructCard(card));
		}

		playerTotalValue.innerText = `Total Value: ${calculateHandValue(playerHand)}`;

		if (bRevealDealer) {
			dealerTotalValue.innerText = `Total Value: ${calculateHandValue(dealerHand)}`;
		}
		
	}

	playerHitBtn.addEventListener('click', (e) => {
		hit(deck, playerHand);

		refreshCardArea(playerCardArea, playerHand);

	})

	playerStandBtn.addEventListener('click', (e) => {
		// When player stands, reveal dealer's down card and then:
		// if dealer's hand is < 17, dealer hit, otherwise determine winner.

		bRevealDealer = true;
		refreshCardArea(dealerCardArea, dealerHand);
		
		dealerPlay(deck, dealerHand);
		refreshCardArea(dealerCardArea, dealerHand);
		

		setTimeout(() => {
			alert(determineWinner(playerHand, dealerHand))
		}, 100);
	})

	refreshCardArea(playerCardArea, playerHand);
})