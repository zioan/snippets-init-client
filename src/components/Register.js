import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import server from "../util/server";

import "./AuthForm.scss";

function Register() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      name: formName,
      email: formEmail,
      password: formPassword,
      // passwordVerify: formPasswordVerify,
    };

    try {
      await axios.post(`${server}/api/users/register`, registerData);
    } catch (err) {
      console.log(err);
      return;
    }

    history.push("/snippets");
  }

  return (
    <div className="auth-form">
      <div className="form-container">
        <div className="divider">
          <p>
            <span className="action">Register</span>
          </p>
        </div>
        <form className="form" onSubmit={register}>
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
          {/* <label htmlFor="form-passwordVerify">Confirm password</label>
          <input
            id="form-passwordVerify"
            type="password"
            value={formPasswordVerify}
            onChange={(e) => setFormPasswordVerify(e.target.value)}
          /> */}

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
