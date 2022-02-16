import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import server from "../util/server";
import "./AuthForm.scss";

function Login() {
  const [formEmail, setFormEmail] = useState("JohnDoe@gmail.com");
  const [formPassword, setFormPassword] = useState("password121212");

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post(`${server}/api/users/login`, loginData);
    } catch (err) {
      console.log(err);
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
      <div className="form-container">
        <div className="divider">
          <p>
            <span className="action">Log in</span>
          </p>
        </div>
        <form className="form" onSubmit={login}>
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
