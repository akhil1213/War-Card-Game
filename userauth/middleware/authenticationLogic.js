const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../../database/db");
const { __esModule } = require("uuid/dist/v1");

const createUser = (id, username, password_digest) => {
    return database.raw(
        "INSERT INTO users (id,username, password_digest) VALUES (?,?, ?) returning username",
        [id, username, password_digest]
    ).then((data) => data.rows[0])
}
const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
}
const createToken = async (userId) => {
    const payload = {
        id: userId
    }
    var token = ''
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            "akhil_loves_react",
            {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) reject(err)
                if (token) resolve(token)
            }
        )
    })
}
const findUser = (username) => {
    return new Promise((resolve, reject) => {
        database.raw(
            "SELECT id,password_digest FROM users where username = ?",
            [username]
        )
            .then((data) => resolve(data.rows[0]))
            .catch((err) => { reject(new Error('user not found')) })
    }
    )
}
const checkPassword = (passwordAttempt, actualPassword) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(passwordAttempt, actualPassword, (err, response) => {
            if (err) {
                reject(err)
            }
            else if (response) {
                resolve(response)
            } else {
                reject(new Error('Passwords do not match.'))
            }
        })
    )
}

module.exports = { findUser, checkPassword, createToken, createUser, hashPassword }