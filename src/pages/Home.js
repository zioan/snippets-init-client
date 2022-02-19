import React, { useContext, useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "./Home.scss";
import codeImg from "../assets/snippet3.jpg";
import UserContext from "../util/UserContext";
import server from "../util/server";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
  const [userForm, setUserForm] = useState(true);
  const { user, getUser } = useContext(UserContext);

  const history = useHistory();

  async function domoLogin() {
    const loginData = {
      email: "JohnDoe@gmail.com",
      password: "password121212",
    };

    try {
      await axios.post(`${server}/api/users/login`, loginData);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
      return;
    }

    await getUser();
    history.push("/snippets");
  }

  return (
    <div className="home-page">
      {!user && (
        <div className="form-action">
          {userForm === true ? (
            <p className="form-toggler">
              No account?{" "}
              <button onClick={() => setUserForm(!userForm)}>Register</button>
            </p>
          ) : (
            <p className="form-toggler">
              Already have an account?{" "}
              <button onClick={() => setUserForm(!userForm)}>Login</button>
            </p>
          )}
        </div>
      )}
      <div className="home">
        <div className="intro">
          <img className="code-img" src={codeImg} alt="code img" />
          <p className="dropcaps">
            Snippets Manager is a web application that allows managing and
            securely storing your coding snippets.
          </p>
          <p>I have prepared a demo account.</p>
          <p>
            Click <button onClick={domoLogin}>Log in</button> to try Snippets
            Manager now! Feel free to open your own account!
          </p>
        </div>
        <div className="user-forms">{userForm ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
}

export default Home;
