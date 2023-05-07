import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { getAllBlogs } from "../../api/blogs";
import { useNavigate } from "react-router-dom";

const Blogs = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const openBlog = (blogID) => navigate(`/blog/${blogID}`);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const resp = await getAllBlogs();
      setBlogs(resp.data.data);
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
        <h1 className="blogWrapper_title">Blogs {new Date().getFullYear()}</h1>
        <div className="blogWrapper_listing">
          {blogs?.length ? (
            blogs.map((e, i) => (
              <div key={e?._id} className="blogWrapper_listing-block">
                <div className="list">
                  <h1 className="title">{e?.title}</h1>
                  <h1 className="date">
                    {new Date(e?.createdAt).toDateString()}
                  </h1>
                </div>
                <div className="list">
                  <p className="description">{e?.createdBy?.userName}</p>
                </div>
                <div className="list">
                  <p className="description">{displayValue(e?.description)}</p>
                </div>

                <div className="openBtn">
                  <button
                    className="btn btn-primary"
                    onClick={() => openBlog(e?._id)}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="not_found"> Record not found </h1>
          )}
        </div>
      </div>
    </div>
  );
};

Blogs.propTypes = {};

export default Blogs;
