import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import server from "../util/server";
import UserContext from "../util/UserContext";
import "./SnippetTag.scss";

function SnippetTag({ selectedUserTag }) {
  const [userTags, setUserTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("No tag");
  const [newTag, setNewTag] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    getTags();
  }, [user]);

  useEffect(() => {
    selectedUserTag(selectedTag);
  }, [selectedTag]);

  async function getTags() {
    const tagsRes = await axios.get(`${server}/api/snippetTags`);
    setUserTags(tagsRes.data);
  }

  async function addTag(e) {
    e.preventDefault();

    const tagData = {
      title: newTag,
    };

    try {
      await axios.post(`${server}/api/snippetTags`, tagData);
    } catch (err) {
      if (err) {
        console.log(err);
      }
      return;
    }
    getTags();
  }

  return (
    <div className="tag-editor">
      <form className="form" onSubmit={addTag}>
        {/* <label>{editorTag === "" ? "Select Tag:" : "Tag selected:"}</label> */}
        <input
          type="text"
          placeholder="Add new tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button type="submit">Add tag</button>
      </form>
      <select
        className="select-options"
        onChange={(e) => setSelectedTag(e.target.value)}
        value={selectedTag}
      >
        {userTags.map((tag) => (
          <option key={tag.title} value={tag.title}>
            {tag.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SnippetTag;
