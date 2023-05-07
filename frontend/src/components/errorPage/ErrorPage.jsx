import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ErrorPage = (props) => {
  const { isAuth } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const goBack = () => navigate(isAuth ? "/admin/dashboard" : "/admin");

  useEffect(() => {
    if (isAuth) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="error_page">
      <h1>404</h1>
      <h3>Page not found</h3>
      <button className="btn btn-success mt-3 ps-5 pe-5" onClick={goBack}>
        {" "}
        Go back{" "}
      </button>
    </div>
  );
};

ErrorPage.propTypes = {};

export default ErrorPage;
