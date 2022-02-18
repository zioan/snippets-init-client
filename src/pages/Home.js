import React, { useContext, useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "./Home.scss";
import codeImg from "../assets/code10.png";
import UserContext from "../util/UserContext";

function Home() {
  const [userForm, setUserForm] = useState(true);
  const { user } = useContext(UserContext);

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
          <p className="dropcaps">
            Snippets Manager is a web application that allows managing and
            securely storing your coding snippets.
          </p>
          <p>
            I have prepared a demo account. Click Log in to try Snippets Manager
            now!
          </p>
          <img className="code-img" src={codeImg} alt="code img" />
        </div>
        <div className="user-forms">{userForm ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
}

export default Home;
