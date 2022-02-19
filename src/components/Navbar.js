import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import server from "../util/server";
import "./Navbar.scss";
import UserContext from "../util/UserContext";

function Navbar() {
  const [username, setUserName] = useState([]);
  const { user, getUser } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  async function logOut() {
    await axios.get(`${server}/api/users/logOut`);
    await getUser();
    history.push("./");
  }

  useEffect(() => {
    getUser();
    getUserName();
  });

  async function getUserName() {
    const userName = await axios.get(`${server}/api/users/loggedIn`);
    setUserName(await userName.data);
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet manager</h1>
      </Link>
      <div>
        <>
          {user && (
            <>
              {<p className="user">Welcome {username}</p>}
              {window.location.pathname !== "/snippets" && (
                <button
                  className="btn-logout"
                  onClick={() => history.push("./snippets")}
                >
                  Back to Snippets
                </button>
              )}

              <button className="btn-logout" onClick={logOut}>
                Log out
              </button>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Navbar;
