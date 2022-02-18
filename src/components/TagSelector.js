import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import server from "../util/server";
import UserContext from "../util/UserContext";
import NewTag from "./NewTag";
import "./TagSelector.scss";

function TagSelector(props) {
  const [userTags, setUserTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("No tag");

  const { user } = useContext(UserContext);

  useEffect(() => {
    getTags();
  }, [user]);

  useEffect(() => {
    props.selectedUserTag(selectedTag);
  }, [selectedTag]);

  async function getTags() {
    const tagsRes = await axios.get(`${server}/api/snippetTags`);
    setUserTags(tagsRes.data);
  }

  return (
    <div className="tag-editor">
      <NewTag getTags={getTags} />

      <select
        className="select-options"
        onChange={(e) => setSelectedTag(e.target.value)}
        value={selectedTag}
      >
        {userTags.map((tag) => (
          <option key={tag._id} value={tag.title}>
            {tag.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TagSelector;
