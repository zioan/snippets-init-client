import React, { useState } from "react";
import axios from "axios";
import "./NewSnippet.scss";
import CodeEditor from "@uiw/react-textarea-code-editor";
import server from "../util/server";
import SnippetTag from "./TagSelector";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewSnippet({ getSnippets }) {
  const [editorToggler, setEditorToggler] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [editorTag, setEditorTag] = useState("no tag");

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
  const snippetSavedMessage = () => toast("Snippet saved!", defaultParams);
  const snippetSavedErrorMessage = () =>
    toast("Title and Code cannot be empty!", defaultParams);

  async function saveSnippet(e) {
    e.preventDefault();

    if (editorTitle === "" || editorCode === "") {
      snippetSavedErrorMessage();
      return;
    }

    const snippetData = {
      title: editorTitle,
      description: editorDescription,
      code: editorCode,
      tag: editorTag,
    };

    try {
      await axios.post(`${server}/api/snippets`, snippetData);
    } catch (err) {
      if (err) {
        console.log(err);
      }
      return;
    }

    getSnippets();
    closeEditor();
    snippetSavedMessage();
  }

  function selectedUserTag(selectedTag) {
    setEditorTag(selectedTag);
  }

  function closeEditor() {
    setEditorTitle("");
    setEditorDescription("");
    setEditorCode("");
    setEditorToggler(false);
    getSnippets();
  }

  return (
    <div>
      {!editorToggler && (
        <button
          className="btn-new"
          onClick={() => setEditorToggler(!editorToggler)}
        >
          Add New Snippet
        </button>
      )}
      {editorToggler && (
        <div className="snippet-editor">
          <ToastContainer />

          <SnippetTag selectedUserTag={selectedUserTag} />
          <form className="form" onSubmit={saveSnippet}>
            <label htmlFor="editor-title">Title</label>
            <input
              id="editor-title"
              type="text"
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
            />
            <label htmlFor="editor-description">Description</label>
            <input
              id="editor-description"
              type="text"
              value={editorDescription}
              onChange={(e) => setEditorDescription(e.target.value)}
            />
            <label htmlFor="editor-code">Code</label>
            <div className="code">
              <CodeEditor
                className="code-editor"
                value={editorCode}
                language="jsx"
                placeholder="Please enter JS code."
                padding={15}
                style={{
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
                onChange={(e) => setEditorCode(e.target.value)}
              />
            </div>
            <button className="btn-save" type="submit">
              Save
            </button>
            <button className="btn-cancel" type="button" onClick={closeEditor}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewSnippet;
