const jwt = require('jsonwebtoken')
const database = require("../database")
function auth(token) {
    console.log(token)
    try {
        const decoded = jwt.verify(token, "akhil_loves_react");
        return new Promise((resolve, reject) => {
            database.raw(
                "SELECT * FROM users where id = ?",
                [decoded.id]
            )
                .then((data) => {
                    let user = data.rows[0]
                    delete user.password_digest
                    resolve(user)
                })
                .catch((err) => reject(new Error('user not found')))
        }
        )
    }
    catch (error) {
        return error
    }

}

module.exports = auth;