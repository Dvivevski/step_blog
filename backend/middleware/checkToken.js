const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiError = require("../handlers/apiError");

module.exports.checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) throw new ApiError(401, "token not found", 401);

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new ApiError(401, "token not found", 401);

    const user = await jwt.verify(token, config.server.accessTokenSecret);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
