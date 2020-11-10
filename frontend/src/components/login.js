import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core'
import axios from 'axios'


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    width: {
        width: '30%'
    },
    button: {
        background: '#35578f',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px #33435e',
        color: 'white',
        marginTop: 30,
        height: '50px',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            background: '#33435e'
        }
    },
    textfield: {
        marginTop: 20
    },
    header: {
        marginTop: 60,
        fontWeight: "bold",
        color: "#7d2022"
    },
    errormessage: {
        color: "red"
    },
    options: {
        display: "flex"
    },
    optionButton: {
        padding: 5,
        border: 2
    },
    selectedButton: {
        backgroundColor: "gray"
    }
})
)
function Login() {
    const classes = useStyles()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [selected, setSelected] = useState('signup')
    useEffect(() => {
    }, [])
    function handleClick(e) {
        if (!validateForm())
            e.preventDefault();
        const usernameLower = username.toLowerCase()
        if (selected == 'signup') signup(usernameLower, password, e)
        else {
            login(usernameLower, password, e)
        }
    }
    const login = (username, password, e) => {
        axios.post("http://localhost:5000/api/login", {
            username,
            password
        }).then((res) => {
            const token = res.data.token;
            localStorage.setItem('token', token);
            console.log(res)
        }).catch((err) => {
            e.preventDefault()
            if (err.response.status == 404) {
                setUsernameError(err.response.data)
                setPasswordError('')
            }
            else {
                setUsernameError('')
                setPasswordError(err.response.data)
            }
        })
    }
    const signup = (username, password, e) => {
        axios.post("http://localhost:5000/api/signup", {
            username,
            password
        }).then((res) => {
            const token = res.data.token;
            localStorage.setItem('token', token);
            console.log(res)
        }).catch((err) => {
            e.preventDefault()
            if (err.response.status == 404) {
                setUsernameError(err.response.data)
                setPasswordError('')
            }
            else {
                setUsernameError('')
                setPasswordError(err.response.data)
            }
        })
    }
    function validateForm() {
        let validPW = validatePassword()
        if (username.length === 0) {
            setUsernameError("Username is empty");
            return false;
        }
        else if (password.length === 0) {
            setUsernameError("");
            setPasswordError("password is empty");
            return false;
        } else if (!validPW) {
            setUsernameError("");
            setPasswordError("password must have at least one uppercase and one digit")
            return false;
        }
        return true;
    }
    function updateUsername(event) {
        setUsername(event.target.value);
    }
    function updatePassword(event) {
        setPassword(event.target.value);
    }
    function validatePassword() {
        let upperCase = 0;
        let digit = 0;
        for (var i = 0; i < password.length; i++) {
            let currentChar = password.charAt(i)
            if (currentChar === currentChar.toUpperCase()) upperCase++;
            const pattern = new RegExp(/^[\d]$/);
            if (pattern.test(currentChar)) digit++;
        }
        if (digit > 0 && digit < password.length && upperCase > 0 && upperCase < password.length) return true
        return false;
    }
    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="h4">
                Let's play WAR!
            </Typography>
            <div className={classes.options}>
                <Button onClick={() => setSelected('signup')} className={[classes.optionButton, selected == 'signup' ? classes.selectedButton : null]}>
                    Signup
                </Button>
                <Button onClick={() => setSelected('login')} className={[classes.optionButton, selected == 'login' ? classes.selectedButton : null]}>
                    Login
                </Button>
            </div>

            <div className={classes.width}>
                <div className="spaceForInput">
                    {usernameError.length > 0 && <div className={classes.errormessage}>{usernameError}</div>}
                    <TextField
                        placeholder="Enter Username*"
                        name="username"
                        type="text"
                        variant="outlined"
                        fullWidth
                        className={classes.textfield}
                        onChange={updateUsername}
                    />
                </div>
                <div className="spaceForInput">
                    <TextField
                        placeholder="Enter Password*"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        onChange={updatePassword}
                        className={classes.textfield}
                        onKeyPress={event => event.key === 'Enter' ? handleClick(event) : null}
                    />
                    {passwordError.length > 0 && <div className={classes.errormessage}>{passwordError}</div>}
                </div>
                <NavLink to={{
                    pathname: '/',
                    state: { username }
                }} style={{ textDecoration: 'none' }} onClick={handleClick}>
                    <Button fullWidth className={classes.button}>
                        {selected == 'signup' ? 'signup' : 'login'}
                    </Button>
                </NavLink>
            </div>
        </div>

    );
}
export default Login;  