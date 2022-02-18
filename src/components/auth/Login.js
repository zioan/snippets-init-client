import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import server from "../../util/server";
import "./AuthForm.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formEmail, setFormEmail] = useState("JohnDoe@gmail.com");
  const [formPassword, setFormPassword] = useState("password121212");

  const history = useHistory();

  // Notifications
  const defaultParams = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnClick: false,
    draggable: true,
    progress: undefined,
  };
  const emptyEmailErrorMessage = () =>
    toast("You can't log in without your Email!", defaultParams);
  const emptyPasswordErrorMessage = () =>
    toast("You can't log in without your Password!", defaultParams);
  const wrongCredentialErrorMessage = () =>
    toast("Email or Password invalid!", defaultParams);

  async function login(e) {
    e.preventDefault();

    if (formEmail === "") {
      emptyEmailErrorMessage();
      return;
    } else if (formPassword === "") {
      emptyPasswordErrorMessage();
      return;
    }

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post(`${server}/api/users/login`, loginData);
    } catch (err) {
      wrongCredentialErrorMessage();
      return;
    }

    history.push("/snippets");
  }

  function reloadDemoAccount() {
    setFormEmail("JohnDoe@gmail.com");
    setFormPassword("password121212");
  }

  return (
    <div className="auth-form">
      <ToastContainer />
      <div className="form-container">
        <div className="divider">
          <p>
            <span className="action">Log in</span>
          </p>
        </div>
        <form onSubmit={login}>
          <label htmlFor="form-email">Email</label>
          <input
            id="form-email"
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            onClick={() => setFormEmail("")}
          />
          <label htmlFor="form-password">Password</label>
          <input
            id="form-password"
            type="password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            onClick={() => setFormPassword("")}
          />

          <button className="btn-submit" type="submit">
            Log in
          </button>
        </form>
      </div>
      <div className="form-footer">
        <p className="reload-demo-accout" onClick={reloadDemoAccount}>
          Click to reload demo account details.
        </p>
        <p>
          By signing up, you agree to our
          <span> Terms </span> and
          <span> Cookies Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Login;
