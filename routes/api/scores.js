const express = require("express");
const db = require('../../database/db')
const auth = require('../../userauth/middleware/auth');
const { update } = require("../../database/db");
const scoreRoutes = express.Router();

const updateScore = async (username) => {
    return new Promise((resolve, reject) => {
        db.raw("update scores set score = ISNULL(score, 0) + 1 where username = ?", [username])
            .then((data) => resolve(data.rows[0]))
            .catch((err) => { reject(new Error("could not update score")) })

    })
}

scoreRoutes.get("/score/:username", auth, async (req, res) => {
    const { username } = req.params
    console.log(username)
    let score = -1;
    async function perfectUseOfClosures() {
        return db.raw("select games_won from scores where username = ?", [username])
            .then((data) => score = data.rows[0])
            .catch((err) => new Error("could not retreive score"))
    }
    await perfectUseOfClosures()
    res.status(200).json({ score })
})

scoreRoutes.put("/score", auth, async (req, res) => {
    const { username } = req.body
    async function updateScore() {
        return db.raw("update scores set games_won = games_won + 1 where username = ?", [username])
            .then(() => { })
            .catch((err) => new Error("could not update score"))
    }
    await updateScore()
    res.status(200).json({ message: "score updated" })
})

module.exports = scoreRoutes