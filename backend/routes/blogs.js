const express = require("express");
const { checkToken } = require("../middleware/checkToken");
const validateRequest = require("../middleware/validateRequest");
const { createBlogSchema, updateBlogSchema, updateStatusBlogSchema } = require("../validators/blogs");
const BlogController = require("../controllers/blogs");

const BlogRoutes = express.Router();

BlogRoutes.post(
  "/blog",
  checkToken,
  validateRequest(createBlogSchema),
  BlogController.createBlog
);

BlogRoutes.get("/blog", BlogController.getAllBlogs);

BlogRoutes.get("/blog/:blogID", BlogController.getBlogByID);

BlogRoutes.put(
  "/blog/:blogID",
  checkToken,
  validateRequest(updateBlogSchema),
  BlogController.updateBlogByID
);

BlogRoutes.put(
  "/blog/status/:blogID",
  checkToken,
  validateRequest(updateStatusBlogSchema),
  BlogController.deleteBlogByID
);

module.exports = BlogRoutes;
