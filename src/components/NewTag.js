import axios from "axios";
import React, { useState } from "react";
import server from "../util/server";
import "./NewTag.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewTag({ getTags }) {
  const [newTag, setNewTag] = useState("");

  // Notifications
  const defaultParams = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnClick: false,
    draggable: true,
    progress: undefined,
  };

  const tagSavedMessage = () => toast("Tag saved!", defaultParams);
  const tagEmptyMessage = () =>
    toast("Tag name cannot be empty!", defaultParams);

  async function addTag(e) {
    e.preventDefault();

    if (newTag === "") {
      tagEmptyMessage();
      return;
    }

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
    setNewTag("");
    getTags();
    tagSavedMessage();
  }

  return (
    <div className="tag-editor">
      <ToastContainer />
      <form className="form" onSubmit={addTag}>
        <input
          type="text"
          placeholder="Add new tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button type="submit">Add tag</button>
      </form>
    </div>
  );
}

export default NewTag;
