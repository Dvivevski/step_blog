const Joi = require("joi");

const createBlogSchema = Joi.object({
  createdBy: Joi.string().required().trim(),
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().trim().allow(null, ""),
  description: Joi.string().trim().allow(null, ""),
});

const updateStatusBlogSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

module.exports = { createBlogSchema, updateBlogSchema, updateStatusBlogSchema };
