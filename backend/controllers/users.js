const UserService = require("../services/users");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const { catchAsync } = require("../utils/catchAsync");

const registerUser = async (req, res) => {
  await UserService.registerUser(req.body);
  return res.status(200).json({ message: "User created successfully" });
};

const loginUser = async (req, res) => {
  console.log("======== Login User =============");

  const userExist = await UserService.getActiveUserByEmail(req.body.email);

  if (!userExist) throw new Error("User not found");

  const isValid = await bcrypt.compare(req.body.password, userExist.password);

  if (!isValid) throw new Error("Invalid password");

  const { password: pass, ...rest } = userExist;
  const { password, ...data } = rest["_doc"];

  const accessToken = await createToken.generateAccessToken(data);

  const resp = { user: data, accessToken };

  return res.status(200).json({ data: resp, message: "login successfully" });
};

const getUsers = async (req, res) => {
  const resp = await UserService.getUsers();
  return res.status(200).json({ data: resp, message: "Record found" });
};

const UsersController = {
  registerUser: catchAsync(registerUser),
  loginUser: catchAsync(loginUser),
  getUsers: catchAsync(getUsers),
};

module.exports = UsersController;
