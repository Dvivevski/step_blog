const Joi = require("joi");

const registerUserSchema = Joi.object({
  userName: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required().trim(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required().trim(),
});

module.exports = { registerUserSchema, loginUserSchema };
