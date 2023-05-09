import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { request } from "../../api/request";
import { NavLink, useNavigate } from "react-router-dom";
import {
  updateIsAuthAction,
  updateUserAction,
} from "../../reducers/users/actions";
import { removeValueFromLocalStorage } from "../../helper/token";
import { useDispatch, useSelector } from "react-redux";
import { blogTableData, formatDate, tabs } from "../../helper/objects";
import { deleteBlog, getAllBlogs } from "../../api/blogs";
import { toast } from "react-toastify";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const { user } = useSelector((state) => state.users);

  const editBlog = (blogID) => {
    navigate(`/admin/blog/edit/${blogID}`);
  };

  const viewBlog = (blogID) => {
    navigate(`/admin/blog/view/${blogID}`);
  };

  const changeBlogStatus = async (blogID, isActive) => {
    const toastID = toast.loading("Saving, Please wait ...");

    try {
      const resp = await deleteBlog(blogID, { isActive });

      toast.update(toastID, {
        render: resp.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      setBlogs((prev) => {
        const [...rest] = prev;
        return rest.map((e) => {
          if (e?._id !== blogID) return e;

          e.isActive = isActive;

          return e;
        });
      });
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

      const resp = await getAllBlogs();
      setBlogs(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // await request.get("/logout");

      removeValueFromLocalStorage("accessToken");
      // removeValueFromLocalStorage("refreshToken");
      dispatch(updateUserAction(null));
      dispatch(updateIsAuthAction(false));
      navigate("/admin");
    } catch (error) {
      console.log(error);
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
    <div className="dashboard">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="dashboard_tabs">
            {tabs.map((e, i) =>
              tabs?.length - 1 !== i ? (
                <div key={"tabs" + i} className="col-md-3">
                  <NavLink to={e.to} className="btn btn-primary w-100">
                    {e.label}
                  </NavLink>
                </div>
              ) : (
                <div key={"tabs" + i} className="col-md-3">
                  <button onClick={logout} className="btn btn-primary w-100">
                    Logout
                  </button>
                </div>
              )
            )}
          </div>

          <div className="dashboard_table">
            {blogs?.length ? (
              <table>
                <thead>
                  <tr>
                    {blogTableData.map((e, i) => (
                      <th className={e.key} key={"table-" + i}>
                        {e.colName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((e, i) => (
                    <tr key={e?._id}>
                      {blogTableData.map((x, index) =>
                        blogTableData.length - 1 !== index ? (
                          <td key={e?._id + index + i}>
                            <p
                              className={
                                x.key === "isActive" ? String(e[x.key]) : x.key
                              }
                            >
                              {x.key === "description"
                                ? displayValue(String(e[x.key]))
                                : ["createdAt", "updatedAt"].includes(x.key)
                                ? formatDate(new Date(e[x.key]))
                                : String(e[x.key])}
                            </p>
                          </td>
                        ) : (
                          <td key={e?._id + index + i}>
                            <div className="actions">
                              <button
                                className="btn btn-success"
                                onClick={() => editBlog(e?._id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => viewBlog(e?._id)}
                              >
                                View
                              </button>

                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  changeBlogStatus(e?._id, !e?.isActive)
                                }
                              >
                                Change Status
                              </button>
                            </div>
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1 className="not_found">Record not found</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
