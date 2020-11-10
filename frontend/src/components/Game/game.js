import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'

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
export default function Game() {
    const [usersDeck, setUsersDeck] = useState(createDeck())
    const [compDeck, setCompDeck] = useState(createDeck())
    const [usersWonDeck, setUsersWonDeck] = useState([])
    const [compWonDeck, setCompWonDeck] = useState([])
    const [tie, setTie] = useState(false)
    const [winner, setWinner] = useState('')
    const [userChoice, setUserChoice] = useState('')
    const [compChoice, setCompChoice] = useState('')
    const [winningArr, setWinningArr] = useState([])
    const [playDisabled, setPlayDisabled] = useState(false)
    useEffect(() => {
        // const usersDeck = createDeck()
        // const compDeck = createDeck()
    }, [])
    const deckPop = () => {
        if (winningArr.length > 0) {
            tied(null)
            return
        }
        const usersCard = usersDeck.pop();
        const compCard = compDeck.pop();
        setCompChoice(compCard)
        setUserChoice(usersCard)
        const userWon = usersCard.biggerCard(compCard)
        if (userWon == 1) {
            setUsersWonDeck([...usersWonDeck, compCard, usersCard])
        } else if (userWon == -1) {
            setCompWonDeck([...compWonDeck, compCard, usersCard])
        } else {
            setTie(`There was a tie ${usersCard.denomination} of ${usersCard.suite} so the comp won!`)
            setCompWonDeck([...compWonDeck, compCard, usersCard])
            setPlayDisabled(true)
            setTimeout(() => {
                setTie('')
                setPlayDisabled(false)
            }, 2000)
        }
        // else {
        //     setTie(true)
        //     tied(usersCard)
        // }
        setTimeout(() => {
            checkStateOfGame()
        }, 200)

    }

    const tied = (tiedCard) => {
        let iterations = 0
        let usersCard;
        let winnings = winningArr
        if (tiedCard != null) {
            winnings.push(tiedCard)
            winnings.push(tiedCard)
        }
        if (usersDeck.length < 4) {
            if (usersWonDeck.length < 4) {
                reset()
                setWinner('The comp won')
                return
            } else {
                setUsersDeck(usersWonDeck)
                setUsersWonDeck([])
            }
        }
        if (compDeck.length < 4) {
            if (compDeck.length < 4) {
                reset()
                setWinner('You won!')
                return
            } else {
                setCompDeck(usersWonDeck)
                setCompWonDeck([])
            }
        }
        let deckLen = usersDeck.length
        for (let i = deckLen - 1; i >= deckLen - 4; i--) {
            const currentCard = usersDeck[i]
            winnings.push(currentCard)
            usersDeck.pop()
            iterations++
            if (iterations % 4 == 0) {
                usersCard = currentCard
            }
        }
        deckLen = compDeck.length;
        let compCard;
        for (let i = deckLen - 1; i >= deckLen - 4; i--) {
            const currentCard = compDeck[i]
            winnings.push(currentCard)
            compDeck.pop()
            iterations++
            if (iterations % 4 == 0) {
                compCard = currentCard
            }
        }
        const winner = usersCard.biggerCard(compCard)
        setTie(`There was ${winnings.length / 10} ties. Your final card was a ${usersCard.denomination} of ${usersCard.suite}
            and the computers 4th card was a ${compCard.denomination} of ${compCard.suite}
            hence ${winner == 1 ? 'you' : 'comp'} won
        `)
        if (winner == 1) {
            setUsersWonDeck(usersWonDeck.concat(winnings))
            setWinningArr([])
        } else if (winner == -1) {
            setCompWonDeck(compWonDeck.concat(winnings))
            setWinningArr([])
        } else {
            setWinningArr(winnings)
        }
        // winnings.concat([usersDeck.slice(usersDeck.length - 4), compDeck.slice(compDeck.length - 4)])
        // console.log(winnings)
        // for (i; i >= 0; i -= 3) {
        // console.log(usersDeck[i], compDeck[j])
        // }
        // while (true) {
        //     console.log(winnings)
        //     if (iterations % 4 == 0) {
        //         if (usersDeck[i].biggerCard(compDeck[j]) == 1) {
        //             setUsersDeck(usersDeck.concat(winnings))
        //             break
        //         } else if (usersDeck[i].biggerCard(compDeck[j]) == -1) {
        //             setCompDeck(compDeck.concat(winnings))
        //             break
        //         }
        //     }
        //     if (iterations == 40) break;
        //     if (i == 0 && j != 0 && usersWonDeck.length == 0) return "user lost"
        //     if (i != 0 && j == 0 && compWonDeck.length == 0) return "comp lost"
        //     if (i == 0 && j != 0) {
        //         i = usersWonDeck.length - 1;
        //         setUsersDeck(usersWonDeck)
        //         setUsersWonDeck([])
        //     } if (i != 0 && j == 0) {
        //         j = compWonDeck.length - 1;
        //         setCompDeck(compWonDeck)
        //         setCompWonDeck([])
        //     }
        //     winnings.push(usersDeck[i--])
        //     winnings.push(compDeck[j--])
        //     iterations++;
        // }
    }

    const checkStateOfGame = () => {
        console.log(usersDeck.length, usersWonDeck.length)
        if (usersDeck.length <= 0 && usersWonDeck.length <= 0) {
            reset()
            setWinner("comp won")
            return
        }
        if (compDeck.length <= 0 && compWonDeck.length <= 0) {
            reset()
            setWinner("user won")
            return
        }
        if (usersDeck.length <= 0 && usersWonDeck.length > 0) {
            setUsersDeck(usersWonDeck)
            setUsersWonDeck([])
        }
        if (compDeck.length <= 0 && compWonDeck.length > 0) {
            setCompDeck(compWonDeck)
            setCompWonDeck([])
        }
    }
    const reset = () => {
        setUsersDeck(createDeck())
        setCompDeck(createDeck())
        setUsersWonDeck([])
        setCompWonDeck([])
    }
    return (
        <div>
            <Button disabled={playDisabled} onClick={() => deckPop()}>
                Play
            </Button>
            <Typography variant={'h3'}>
                {winner}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <div>
                    <Typography>Users regular deck size{usersDeck.length}</Typography>
                    <Typography>Users won deck size:{usersWonDeck.length}</Typography>
                    {/* {usersWonDeck.map((card, i) =>
                        <div key={i}>
                            <Typography variant={'h6'}>
                                {card.denomination} {card.suite}
                            </Typography>
                        </div>
                    )} */}
                </div>
                <div>
                    <Typography>You chose a {userChoice.denomination}</Typography>
                    <Typography>Computer chose a {compChoice.denomination}</Typography>
                    {tie}
                </div>
                <div>
                    <Typography>Comps regular deck size{compDeck.length}</Typography>
                    <Typography>Comps won deck size:{compWonDeck.length}</Typography>
                    {/* {compWonDeck.map((card, i) =>
                        <div key={i}>
                            <Typography variant={'h6'}>
                                {card.denomination} {card.suite}
                            </Typography>
                        </div>
                    )} */}
                </div>
            </div>


        </div>
    )
}