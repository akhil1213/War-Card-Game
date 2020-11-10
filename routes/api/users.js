const express = require("express");
const uuid = require("uuid")
const router = express.Router();
const { findUser, checkPassword, createToken, createUser, hashPassword } = require('../../userauth/middleware/authenticationLogic')
router.post(
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

router.post(
    "/login",
    async (req, res) => {
        const {
            username,
            password,
        } = req.body;
        try {
            const user = await findUser(username)
            if (!user) return new Error('No user found')
            await checkPassword(password, user.password_digest)
            const token = await createToken(user.id)
            // await updateUserToken(token,user)
            res.status(200).json({ message: "Logged in", token })
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);
module.exports = router 