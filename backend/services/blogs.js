const BlogModel = require("../models/blogs");

const createBlog = async (postData) => await new BlogModel(postData).save();

const getAllBlogs = async () =>
  await BlogModel.find({ isActive: true }).populate([
    {
      path: "createdBy",
      select: "_id userName email",
    },
  ]);

const getBlogByID = async (blogID) =>
  await BlogModel.findOne({ _id: blogID }).populate([
    {
      path: "createdBy",
      select: "_id userName email",
    },
  ]);

const updateBlogByID = async (blogID, postData) =>
  await BlogModel.findByIdAndUpdate(blogID, { ...postData }, { new: true });

const deleteBlogByID = async (blogID, postData) =>
  await BlogModel.findByIdAndUpdate(blogID, { ...postData }, { new: true });

const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogByID,
  updateBlogByID,
  deleteBlogByID,
};

module.exports = BlogService;
