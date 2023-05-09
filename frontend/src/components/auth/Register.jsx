import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../api/request";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const toggleIsShow = () => setIsShow((prev) => !prev);

  const changeHandler = (setState) => (e) => setState(e.target.value);

  const submit = async (e) => {
    e.preventDefault();

    const toastID = toast.loading("Registering, Please wait ...");

    try {
      const postData = {
        userName,
        email,
        password,
      };

      const resp = await request.post("/user", postData);

      toast.update(toastID, {
        render: resp.data.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      navigate("/admin");
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

  return (
    <main className="register">
      <form className="register_form" onSubmit={submit}>
        <h1 className="register_form-title">Please sign in</h1>

        <div className="register_form-field">
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={userName}
            onChange={changeHandler(setUserName)}
            required
          />
        </div>
        <div className="register_form-field">
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={changeHandler(setEmail)}
            required
          />
        </div>
        <div className="register_form-field">
          <input
            type={isShow ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={changeHandler(setPassword)}
            required
          />
        </div>
        <div className="register_form-field show">
          <input type="checkbox" onChange={toggleIsShow} />
          <label htmlFor="">Show password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary submitBtn"
          type="submit"
        >
          Register Now
        </button>

        <Link className="create_account" to={"/admin"}>
          You have a account, PLease login;
        </Link>
      </form>
    </main>
  );
};

Register.propTypes = {};

export default Register;
