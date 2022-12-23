

const jwt = require("jsonwebtoken");

const tokenPassword = require("../config/app_back.config.js")


exports.generate_token = (user) => {
  const token = jwt.sign(
    {
      Username: user.Username,
      UserId: user.UserId,
    },
    tokenPassword.TOKEN_SECRET,
    {
      expiresIn: "4h",
    }
  );
  return token;
};