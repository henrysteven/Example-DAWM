

const jwt = require("jsonwebtoken");

require('dotenv').config('../.env')


exports.generate_token = (user) => {
    const TOKEN_SECRET = process.env.TOKEN_PASS;
    const token = jwt.sign(
        {
            username: user.username,
            user_id: user.user_id,
        },
        TOKEN_SECRET,
        {
            expiresIn: "4h",
        }
    );
    return token;
};