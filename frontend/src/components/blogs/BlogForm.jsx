import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { createBlog, getBlogByID, updateBlogByID } from "../../api/blogs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogForm = ({ isView, isEdit }) => {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const { user } = useSelector((state) => state.users);

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [sBlog, setSBlog] = useState(null);

  // const toggleIsEdit = () => setIsEdit((prev) => !prev);

  const goHome = () => navigate("/admin/dashboard");

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const _submit = async (e) => {
    e.preventDefault();

    const toastID = toast.loading("Saving, Please wait ...");

    const postData = {
      title: blog?.title,
      description: blog?.description,
      createdBy: user?._id,
    };

    try {
      if (isEdit) delete postData.createdBy;

      let resp = null;

      if (isEdit) resp = await updateBlogByID(blogID, postData);
      else resp = await createBlog(postData);

      toast.update(toastID, {
        render: resp.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.update(toastID, {
        render: error?.response?.data?.message || error?.message || error,
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const resp = await getBlogByID(blogID);
      setBlog(resp.data.data);
      setSBlog(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!blogID) return;

    fetchInitialData();
  }, []);

  return (
    <div className="blog">
      <div className="blogWrapper">
        <h1 className="blogWrapper_title">
          {isEdit ? "Edit Blog" : isView ? "View Blog" : "Create New Blog"}
        </h1>
        <form onSubmit={_submit}>
          <div className="blogWrapper_listing">
            <div key={blog?._id} className="blogWrapper_listing-block">
              <div className="list">
                <input
                  type="text"
                  className="mt-3"
                  name="title"
                  placeholder="Enter post title"
                  value={blog?.title}
                  onChange={onChangeHandler}
                  disabled={isView}
                />
              </div>

              <ReactQuill
                theme="snow"
                value={blog?.description}
                onChange={(e) => {
                  setBlog((prev) => ({ ...prev, [`description`]: e }));
                }}
              />

              {!isView && (
                <div className="openBtn">
                  <button className="btn btn-success ms-2" onClick={() => {}}>
                    {isEdit ? "Update" : "Create"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
        <button className="btn btn-warning" onClick={goHome}>
          Go to dashboard
        </button>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  isView: PropTypes.bool.isRequired,
};

export default BlogForm;
