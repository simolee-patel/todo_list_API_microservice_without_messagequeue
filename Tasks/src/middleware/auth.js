const httpStatus = require("http-status");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require("../Validation/response/response");
const responseMessage = require("../Validation/response/response-message");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = { authenticateJWT }