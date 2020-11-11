import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import createDeck from './gameObject'
function Game(props) {
    const [usersDeck, setUsersDeck] = useState([])
    const [compDeck, setCompDeck] = useState([])
    const [usersWonDeck, setUsersWonDeck] = useState([])
    const [compWonDeck, setCompWonDeck] = useState([])
    const [tie, setTie] = useState(false)
    const [winner, setWinner] = useState('')
    const [userChoice, setUserChoice] = useState('')
    const [compChoice, setCompChoice] = useState('')
    const [winningArr, setWinningArr] = useState([])
    const [playDisabled, setPlayDisabled] = useState(false)
    const [userTally, setUserTally] = useState(null)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Content-type": "application/json",
            'x-auth-token': `${token}`
        }
    }
    useEffect(() => {
        const fullDeck = createDeck()
        setUsersDeck(fullDeck.slice(0, 26))
        setCompDeck(fullDeck.slice(26, 52))
        if (props.username == '' || token == null || token == undefined || token == "") props.history.push('/')
        axios.get(`http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000/api/score/${props.username}`, config)
            .then((res) => {
                setUserTally(res.data.score["games_won"])
            }).catch((err) => {
                localStorage.setItem("token", "")
            })
    }, [])
    const updateUserTally = async function () {
        axios.put("http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000/api/score", { username: props.username }, config)
            .then((res) => {
                setUserTally(userTally + 1)
            }).catch((err) => {
                localStorage.setItem("token", "")//token has expired
                console.log(err)
            })
    }
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
        let tempUsersWonDeck, tempCompWonDeck;
        if (userWon == 1) {
            tempUsersWonDeck = [...usersWonDeck, compCard, usersCard]
            tempCompWonDeck = compWonDeck
            setUsersWonDeck(tempUsersWonDeck)
            setTie('')
        } else if (userWon == -1) {
            tempCompWonDeck = [...compWonDeck, compCard, usersCard]
            tempUsersWonDeck = usersWonDeck
            setCompWonDeck(tempCompWonDeck)
            setTie('')
        }
        else {
            setTie("Let's begin the WAR")
            setPlayDisabled(true)
            setTimeout(() => {
                tied(usersCard)
                setPlayDisabled(false)
            }, 1500)
        }
        if (usersWonDeck != undefined && tempCompWonDeck != undefined) checkStateOfGame(usersWonDeck, tempCompWonDeck)
    }

    const tied = (tiedCard) => {
        let winnings = winningArr
        let tempUsersDeck = usersDeck
        let tempCompDeck = compDeck
        if (tiedCard != null) {
            winnings.push(tiedCard)
            winnings.push(tiedCard)
        }
        if (tempUsersDeck.length < 4) {
            tempUsersDeck = tempUsersDeck.concat(usersWonDeck)
            if (tempUsersDeck.length < 4) {
                // reset()
                setWinner('The comp won, you doesnt have enough cards to finish WAR')
                return
            }
            setUsersDeck(tempUsersDeck)
            setUsersWonDeck([])
        }
        if (tempCompDeck.length < 4) {
            tempCompDeck = tempCompDeck.concat(compWonDeck)
            if (tempUsersDeck.length < 4) {
                // reset()
                setWinner('The user won, opponent doesnt have enough cards to finish WAR')
                return
            }
            setCompDeck(tempCompDeck)
            setCompWonDeck([])
        }
        for (let i = 0; i < 3; i++) {
            winnings.push(tempUsersDeck.pop())
            winnings.push(tempCompDeck.pop())
            // winnings.push(...[tempUsersDeck.pop(),tempCompDeck.pop()])
        }
        const usersFinalDraw = tempUsersDeck.pop()
        const compFinalDraw = tempCompDeck.pop()
        const winner = usersFinalDraw.biggerCard(compFinalDraw)
        winnings.push(usersFinalDraw)
        winnings.push(compFinalDraw)
        setTie(`The tie has been resolved and ${winner == 1 ? 'you' : 'the comp'} takes home all ${winnings.length} cards`)
        if (winner == 1) {
            setUsersWonDeck(usersWonDeck.concat(winnings))
            winnings = []
            setWinningArr([])
        } else if (winner == -1) {
            setCompWonDeck(compWonDeck.concat(winnings))
            winnings = []
            setWinningArr([])
        } else {
            setTie("There is another tie!")
            setWinningArr(winnings)
        }
    }

    const checkStateOfGame = (usersWinnings, compsWinnings) => {
        if (usersDeck.length <= 0 && usersWonDeck.length <= 0) {
            // reset()
            setWinner("comp won")
            return
        }
        if (compDeck.length <= 0 && compWonDeck.length <= 0) {
            // reset()
            setWinner("user won")
            updateUserTally()
            return
        }
        if (usersDeck.length <= 0 && usersWinnings.length > 0) {
            setUsersDeck(usersWinnings)
            setUsersWonDeck([])
        }
        if (compDeck.length <= 0 && compsWinnings.length > 0) {
            setCompDeck(compsWinnings)
            setCompWonDeck([])
        }
    }
    const reset = () => {
        const fullDeck = createDeck()
        setUsersDeck(fullDeck.slice(0, 26))
        setCompDeck(fullDeck.slice(26, 52))
        setUsersWonDeck([])
        setCompWonDeck([])
        setWinningArr([])
        setWinner("")
        setTie("")
    }
    const logOut = () => {
        props.setUsername("");
        localStorage.setItem("token", "");
        props.history.push('/')
    }
    if (props.username) {
        return (
            <div>
                <Button onClick={() => logOut()}>LOGOUT</Button>
                <Typography >
                    {props.username}'s win tally is {userTally}
                </Typography>
                {
                    winner == "" ?
                        <Button data-testid="playButton" disabled={playDisabled} onClick={() => deckPop()}>
                            Play
                    </Button>
                        :
                        null
                }
                <Typography variant={'h3'}>
                    {winner}
                    {winner != "" ? <Button onClick={() => reset()}>Play again</Button> : null}
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
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

const mapStateToProps = state => (
    {
        username: state.username
    }
)
const mapDispatchToProps = dispatch => {
    return {
        setUsername: (username) => {
            dispatch({ type: 'SET_USERNAME', payload: username })
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);