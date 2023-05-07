import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../api/request";
import { saveValueInLocalStorage } from "../../helper/token";
import { useDispatch } from "react-redux";
import {
  updateIsAuthAction,
  updateUserAction,
} from "../../reducers/users/actions";
import { toast } from "react-toastify";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const toggleIsShow = () => setIsShow((prev) => !prev);

  const changeHandler = (setState) => (e) => setState(e.target.value);

  const submit = async (e) => {
    e.preventDefault();

    const toastID = toast.loading("logging, Please wait ...");
    try {
      const postData = {
        email,
        password,
      };

      const resp = await request.post("/user/login", postData);

      const { user, accessToken } = resp.data.data;

      saveValueInLocalStorage("accessToken", accessToken);

      dispatch(updateUserAction(user));
      dispatch(updateIsAuthAction(true));

      toast.update(toastID, {
        render: resp.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1500
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.update(toastID, {
        render: error?.response?.data?.message || error?.message || error,
        type: "error",
        isLoading: false,
        autoClose: 1500
      });
    }

    e.target.reset();
  };

  return (
    <main className="login">
      <form className="login_form" onSubmit={submit}>
        <h1 className="login_form-title">Please sign in</h1>

        <div className="login_form-field">
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={changeHandler(setEmail)}
          />
        </div>
        <div className="login_form-field">
          <input
            type={isShow ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={changeHandler(setPassword)}
          />
        </div>
        <div className="login_form-field show">
          <input type="checkbox" onChange={toggleIsShow} />
          <label htmlFor="">Show password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary submitBtn"
          type="submit"
        >
          Sign in
        </button>

        <Link className="create_account" to={"/register"}>
          Create account ?
        </Link>
      </form>
    </main>
  );
};

Login.propTypes = {};

export default Login;
