const asyncHandeler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandeler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("User is not authorised")
            }
            req.user = decoded.user;
            next()
        })
        if (!token) {
            res.status(401)
            throw new Error("User is not Authorized ot token Expired")
        }
    }
})

module.exports = validateToken;