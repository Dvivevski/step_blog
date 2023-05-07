const express = require("express");
const UsersController = require("../controllers/users");
const { checkToken } = require("../middleware/checkToken");
const validateRequest = require("../middleware/validateRequest");
const { catchAsync } = require("../utils/catchAsync");
const { registerUserSchema, loginUserSchema } = require("../validators/users");

const UserRoutes = express.Router();

UserRoutes.post(
  "/user",
  validateRequest(registerUserSchema),
  UsersController.registerUser
);

UserRoutes.post(
  "/user/login",
  validateRequest(loginUserSchema),
  UsersController.loginUser
);

UserRoutes.get("/user", checkToken, UsersController.getUsers);

module.exports = UserRoutes;
