const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        res.status(401).json({ msg: "unauthorized" });
        console.log(token)
    } else {
        try {
            const decoded = jwt.verify(token, "akhil_loves_coding!");
            req.user = decoded
            next()
        } catch (error) {
            res.status(400).json({ msg: "token is not valid" })
        }
    }
}

module.exports = auth;