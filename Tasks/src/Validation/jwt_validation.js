require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = {
    generateToken: function async(userData) {
        console.log(userData)

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            email: userData.email, username: userData.username
        }
        console.log("fin data", data, process.env.JWT_SECRET_KEY)

        const token = jwt.sign(data, jwtSecretKey, {
            expiresIn: "2h",
        });
        console.log("token is", token)
        return token;
    },
    verifyToken: async function (token) {
        if (token) {
            try {
                const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
                return !!jwtResponse;
            } catch (e) {
                console.log("e:", e);
                return false;
            }
        } else {
            return false;
        }
    }
}