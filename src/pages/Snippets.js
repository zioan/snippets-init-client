import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SnippetEditor from "../components/SnippetEditor";
import server from "../util/server";
import UserContext from "../util/UserContext";

function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    getSnippets();
  }, []);

  async function getSnippets() {
    const snippetsRes = await axios.get(`${server}/api/snippets`);
    // const snippetsRes = await axios.get(`${server}/api/snippets`);
    setSnippets(snippetsRes.data);
  }
  return (
    <div className="class">
      {user && (
        <>
          <h2>Snippets Page</h2>
          <h3>Add snippet</h3>
          <SnippetEditor />
          <h3>View snippets</h3>
          {snippets.map((snippet, index) => {
            return (
              <p key={index}>
                {snippet.code}
                {snippet.title}
                {snippet.tag}
              </p>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Snippets;
