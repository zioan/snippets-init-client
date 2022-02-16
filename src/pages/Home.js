import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Home() {
  return (
    <div className="home">
      <div className="intro">
        <h1>Snippets Manager</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor vel ut
          nostrum aperiam, nesciunt nobis illum tenetur dolores sint earum.
        </p>
      </div>
      <Login />
      <br />
      <Register />
    </div>
  );
}

export default Home;
