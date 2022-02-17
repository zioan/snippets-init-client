import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "./Home.scss";
import codeImg from "../assets/code10.png";

function Home() {
  const [userForm, setUserForm] = useState(true);
  return (
    <div className="home">
      <div className="intro">
        <h1>Snippets Manager</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor vel ut
          nostrum aperiam, nesciunt nobis illum tenetur dolores sint earum.
        </p>
        <img className="code-img" src={codeImg} alt="code img" />
      </div>
      <div className="user-forms">
        {userForm ? <Login /> : <Register />}
        {userForm === true ? (
          <p>
            No account?{" "}
            <button onClick={() => setUserForm(!userForm)}>
              Register Here
            </button>
          </p>
        ) : (
          <p className="form-toggler">
            Already have an account?{" "}
            <button onClick={() => setUserForm(!userForm)}>
              Login instead
            </button>
          </p>
        )}
      </div>
      {/* <Login />
      <br />
      <Register /> */}
    </div>
  );
}

export default Home;
