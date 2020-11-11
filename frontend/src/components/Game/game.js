import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import {connect} from 'react-redux'
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
    const [userTally,setUserTally] = useState(null)
    const token = localStorage.getItem('token')
    const config = {
        headers:{
            "Content-type":"application/json",
            'x-auth-token':`${token}`
        }
    }
    useEffect(() => {
        const fullDeck = createDeck()
        setUsersDeck(fullDeck.slice(0,26))
        setCompDeck(fullDeck.slice(26,52))
        if(props.username == '' || token == null || token == undefined || token == "")props.history.push('/')
        axios.get(`http://localhost:5000/api/score/${props.username}`,config)
            .then((res)=>{
                setUserTally(res.data.score["games_won"])
            }).catch((err)=>{
                localStorage.setItem("token","")//token has expired
            })
    }, [])
    const updateUserTally = async function(){
        axios.put("http://localhost:5000/api/score",{username:props.username},config)
            .then((res)=>{
                setUserTally(userTally+1)
                console.log("hi it works")
            }).catch((err)=>{
                localStorage.setItem("token","")//token has expired
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
        if (userWon == 1) {
            setUsersWonDeck([...usersWonDeck, compCard, usersCard])
            setTie('')
        } else if (userWon == -1) {
            setCompWonDeck([...compWonDeck, compCard, usersCard])
            setTie('')
        } 
        else {
            setTie("THERE WAS A TIE!!!!!!!")
            setPlayDisabled(true)
            setTimeout(()=>{
                tied(usersCard)
                setPlayDisabled(false)
            },1000)
        }
        setTimeout(() => {
            checkStateOfGame()
        }, 500)

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
                setUsersDeck(usersDeck.concat(usersWonDeck))
                setUsersWonDeck([])
            }
        }
        if (compDeck.length < 4) {
            if (compWonDeck.length < 4) {
                reset()
                setWinner('You won!')
                updateUserTally()
                return
            } else {
                setCompDeck(compDeck.concat(compWonDeck))
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
        if(usersCard == undefined){
            setWinner("comp won")
            reset()
            return
        }if(compCard == undefined){
            setWinner("user won")
            reset()
            updateUserTally()
            return
        }
        const winner = usersCard.biggerCard(compCard)
        setTie(`There was ${winnings.length / 10} ties. Your 4th card was a ${usersCard.denomination} of ${usersCard.suite}
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
            setTie(`theres another tie and winnings length is ${winnings.length}`)
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
        if (usersDeck.length <= 0 && usersWonDeck.length <= 0) {
            reset()
            setWinner("comp won")
            return
        }
        if (compDeck.length <= 0 && compWonDeck.length <= 0) {
            reset()
            setWinner("user won")
            updateUserTally()
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
        const fullDeck = createDeck()
        setUsersDeck(fullDeck.slice(0,26))
        setCompDeck(fullDeck.slice(26,52))
        setUsersWonDeck([])
        setCompWonDeck([])
        setWinningArr([])
        setWinner("")
        setTie("")
    }
    return (
        <div>
            <Typography>
                {props.username}'s win tally is {userTally}
            </Typography>
            <Button disabled={playDisabled} onClick={() => deckPop()}>
                Play
            </Button>
            <Typography variant={'h3'}>
                {winner}
                {winner != "" ? <Button onClick={()=>reset()}>Play again</Button> : null}
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

const mapStateToProps = state =>(
    console.log(state),
    {
      username:state.username
    }
  )
export default connect(
    mapStateToProps,
    null
)(Game);