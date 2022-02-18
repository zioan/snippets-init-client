import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import server from "../../util/server";
import UserContext from "../../util/UserContext";
import "./AuthForm.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");

  const { getUser } = useContext(UserContext);
  const history = useHistory();

  // Notifications
  const defaultParams = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnClick: false,
    draggable: true,
    progress: undefined,
  };
  const emptyNameErrorMessage = () =>
    toast("Please enter your name!", defaultParams);
  const emptyEmailErrorMessage = () =>
    toast("Please enter your email!", defaultParams);
  const emptyPasswordErrorMessage = () =>
    toast("Please enter a password", defaultParams);
  const emptyPasswordVerifyErrorMessage = () =>
    toast("Please retype your password", defaultParams);
  const passwordVerificationErrorMessage = () =>
    toast("Wrong password verification", defaultParams);
  const existingUserErrorMessage = () =>
    toast("An account with this email already exists!", defaultParams);

  async function register(e) {
    e.preventDefault();

    if (formName === "") {
      emptyNameErrorMessage();
      return;
    }
    if (formEmail === "") {
      emptyEmailErrorMessage();
      return;
    }
    if (formPassword === "") {
      emptyPasswordErrorMessage();
      return;
    }
    if (formPasswordVerify === "") {
      emptyPasswordVerifyErrorMessage();
      return;
    }
    if (formPassword !== formPasswordVerify) {
      passwordVerificationErrorMessage();
      return;
    }

    const registerData = {
      name: formName,
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post(`${server}/api/users/register`, registerData);
    } catch (err) {
      existingUserErrorMessage();
      return;
    }

    const initializeTags = {
      title: "Select tag...",
    };
    await getUser();
    await axios.post(`${server}/api/snippetTags`, initializeTags);
    history.push("/snippets");
  }

  return (
    <div className="auth-form">
      <ToastContainer />
      <div className="form-container">
        <div className="divider">
          <p>
            <span className="action">Register</span>
          </p>
        </div>
        <form onSubmit={register}>
          <label htmlFor="form-name">Name</label>
          <input
            id="form-name"
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <label htmlFor="form-email2">Email</label>
          <input
            id="form-email2"
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
          <label htmlFor="form-password2">Password</label>
          <input
            id="form-password2"
            type="password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
          />
          <label htmlFor="form-passwordVerify">Confirm password</label>
          <input
            id="form-passwordVerify"
            type="password"
            value={formPasswordVerify}
            onChange={(e) => setFormPasswordVerify(e.target.value)}
          />

          <button className="btn-submit" type="submit">
            Register
          </button>
        </form>
      </div>
      <div className="form-footer">
        <p>
          By signing up, you agree to our
          <span> Terms </span> and
          <span> Cookies Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Register;
