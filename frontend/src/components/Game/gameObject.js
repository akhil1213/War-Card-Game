function Card(suite, denomination) {
    this.suite = suite;
    this.denomination = denomination
}
const cardMap = { 'Ace': 14, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 'Jack': 11, 'Queen': 12, 'King': 13 }
Card.prototype.biggerCard = function (card2) {
    if (cardMap[this.denomination] == cardMap[card2.denomination]) return 0;
    if (cardMap[this.denomination] > cardMap[card2.denomination]) return 1
    return -1;
}
function shuffleDeck(deck) {
    let m = deck.length, i;
    while (m) {
        i = Math.floor(Math.random() * m--);

        [deck[m], deck[i]] = [deck[i], deck[m]];
    }
    return deck;
}
function createDeck() {
    const deck = [];
    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    for (let suit in suits) {
        for (let value in values) {
            deck.push(new Card(suits[suit], values[value]));
        }
    }
    return shuffleDeck(deck);
}

export default createDeck;