const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateAccessToken = async (data) => {
  try {
    const token = await jwt.sign(data, config.server.accessTokenSecret, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw error;
  }
};

const generateRefreshToken = async (data) => {
  try {
    const token = await jwt.sign(data, config.server.refreshTokenSecret);
    return token;
  } catch (error) {
    throw error;
  }
};

const createToken = { generateAccessToken, generateRefreshToken };

module.exports = createToken;
