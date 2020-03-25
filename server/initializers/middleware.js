const app = require('../app.js')
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const verifyToken = async (req, res, next) => {
    if (req.headers["x-access-token"] || req.headers['authorization']) {
        try {
            let accessToken = req.headers["x-access-token"] || req.headers['authorization'];
            if (accessToken.startsWith('Bearer ')) {
                accessToken = accessToken.slice(7, accessToken.length);
                accessToken = accessToken.trim();
            }
            const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
            // If token has expired
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).json({
                    error: "JWT token has expired, please login to obtain a new one"
                });
            }
            res.locals.loggedInUser = await Users.findById(userId);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
}
const pageNotFound = (req, res, next) => {
    res.status(404).send({ title: "Sorry, page not found" });
}
const internalServerError = (req, res, next) => {
    res.status(500).send({ title: "Please check internet connection" });
}
const requestTimeOut = (req, res, next) => {
    res.setTimeout(1000, function () {
        res.status(408).send("Request time out..");
    });
}
module.exports = {
    verifyToken: verifyToken,
    pageNotFound: pageNotFound,
    internalServerError: internalServerError,
    requestTimeOut: requestTimeOut
};