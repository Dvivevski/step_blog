import { request } from "./request";

export const getAllBlogs = async () => await request.get("/blog");

export const getBlogByID = async (blogID) =>
  await request.get(`/blog/${blogID}`);

export const createBlog = async (postData) =>
  await request.post("/blog", postData);

export const updateBlogByID = async (blogID, postData) =>
  await request.put(`/blog/${blogID}`, postData);

export const deleteBlog = async (blogID, postData) =>
  await request.put(`/blog/status/${blogID}`, postData);
