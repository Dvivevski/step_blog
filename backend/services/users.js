const UserModel = require("../models/users");

const registerUser = async (postData) => await new UserModel(postData).save();

const getUserByEmail = async (email) => await UserModel.findOne({ email });

const getActiveUserByEmail = async (email) =>
  await UserModel.findOne({ email, isActive: true });

const getUserByID = async (userID) => await UserModel.findOne({ _id: userID });

const getUsers = async () =>
  await UserModel.find(
    {},
    { userName: 1, email: 1, createdAt: 1, lastVisit: 1 }
  );

const UserService = {
  registerUser,
  getUserByEmail,
  getUserByID,
  getActiveUserByEmail,
  getUsers,
};

module.exports = UserService;
