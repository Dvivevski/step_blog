import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getBlogByID } from "../../api/blogs";
import { useNavigate, useParams } from "react-router-dom";

const BlogView = (props) => {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [blog, setBlog] = useState({});

  const goHome = () => navigate("/");

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const resp = await getBlogByID(blogID);
      setBlog(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const displayValue = (editorValue) => {
    const editor = document.createElement("div");
    editor.innerHTML = editorValue;
    return editor.textContent || editor.innerText || "";
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="blog">
      <div className="blogWrapper">
        <h1 className="blogWrapper_title">View Blog "{blog?.title}"</h1>
        <div className="blogWrapper_listing">
          <div key={blog?._id} className="blogWrapper_listing-block">
            <div className="list">
              <h1 className="title">{blog?.title}</h1>
              <h1 className="date">
                {new Date(blog?.createdAt).toDateString()}
              </h1>
            </div>
            <div className="list">
              <p className="title">{blog?.createdBy?.userName}</p>
            </div>
            <div className="list">
              <p className="description">{displayValue(blog?.description)}</p>
            </div>
          </div>
        </div>
        <button className="btn btn-success" onClick={goHome}>
          Go to home
        </button>
      </div>
    </div>
  );
};

BlogView.propTypes = {};

export default BlogView;
