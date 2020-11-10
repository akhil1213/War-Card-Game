const express = require("express");
const uuid = require("uuid")
const userRoutes = express.Router();
const { findUser, checkPassword, createToken, createUser, hashPassword, createScoreForUser } = require('../../userauth/middleware/authenticationLogic')
userRoutes.post(
    "/signup",
    async (req, res) => {
        const {
            username,
            password,
        } = req.body;
        try {
            console.log(password)
            const hashedpw = await hashPassword(password)
            const id = uuid.v4()
            const user = await createUser(id, username, hashedpw)
            if (!user) return new Error("username taken");
            const score = await createScoreForUser(username);
            const token = createToken(id)
            res.status(200).json({
                message: 'User created successfully!',
                token
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

userRoutes.post(
    "/login",
    async (req, res) => {
        const {
            username,
            password,
        } = req.body;
        try {
            const user = await findUser(username)
            if (!user) {
                res.status(404).send("no user found")
                return
            }
            const correct = await checkPassword(password, user.password_digest)
            if (correct == undefined) res.status(401).send("Invalid credentials")
            const token = await createToken(user.id)
            res.status(200).json({ message: "Logged in", token })
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
);
module.exports = userRoutes 