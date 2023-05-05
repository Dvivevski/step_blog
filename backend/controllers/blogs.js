const BlogService = require("../services/blogs");
const { catchAsync } = require("../utils/catchAsync");

const createBlog = async (req, res) => {
  const resp = await BlogService.createBlog(req.body);
  return res
    .status(201)
    .json({ data: resp, message: "Record created successfully" });
};

const getAllBlogs = async (req, res) => {
  const resp = await BlogService.getAllBlogs();
  return res.status(200).json({ data: resp, message: "Record found" });
};

const getBlogByID = async (req, res) => {
  const { blogID } = req.params;

  const resp = await BlogService.getBlogByID(blogID);
  return res.status(200).json({ data: resp, message: "Record found" });
};

const updateBlogByID = async (req, res) => {
  const { blogID } = req.params;
  const postData = req.body;

  const resp = await BlogService.updateBlogByID(blogID, postData);
  return res.status(200).json({ data: resp, message: "Record updated" });
};

const deleteBlogByID = async (req, res) => {
  const { blogID } = req.params;
  const postData = req.body;

  const resp = await BlogService.deleteBlogByID(blogID, postData);
  return res.status(200).json({ data: resp, message: "Record updated" });
};

const BlogController = {
  createBlog: catchAsync(createBlog),
  getAllBlogs: catchAsync(getAllBlogs),
  getBlogByID: catchAsync(getBlogByID),
  updateBlogByID: catchAsync(updateBlogByID),
  deleteBlogByID: catchAsync(deleteBlogByID),
};

module.exports = BlogController;
