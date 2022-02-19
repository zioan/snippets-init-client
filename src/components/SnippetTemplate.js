import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
import server from "../util/server";
import "./SnippetTemplate.scss";
import TagSelector from "./TagSelector";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SnippetTemplate({ snippet, getSnippets }) {
  const [updateSnippet, setUpdateSnippet] = useState(false);
  const [showSnippet, setShowSnippet] = useState(true);
  const [editorTitle, setEditorTitle] = useState(snippet.title);
  const [editorDescription, setEditorDescription] = useState(
    snippet.description
  );
  const [editorCode, setEditorCode] = useState(snippet.code);
  const [editorTag, setEditorTag] = useState(snippet.tag);

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
  const copyToClipboardMessage = () =>
    toast("Copied to clipboard!", defaultParams);
  const deleteSnippetMessage = () => toast("Snippet deleted!", defaultParams);
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
      await axios.put(`${server}/api/snippets/${snippet._id}`, snippetData);
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

  const saveToClipboard = () => navigator.clipboard.writeText(snippet.code);

  function selectedUserTag(selectedTag) {
    setEditorTag(selectedTag !== "No tag" ? selectedTag : snippet.tag);
  }

  function closeEditor() {
    setUpdateSnippet(false);
    setShowSnippet(true);
    setEditorTitle(snippet.title);
    setEditorDescription(snippet.description);
    setEditorCode(snippet.code);
    setEditorTag(snippet.tag);
    getSnippets();
  }

  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?")) {
      await axios.delete(`${server}/api/snippets/${snippet._id}`);

      getSnippets();
      deleteSnippetMessage();
    }
  }

  function editSnippet() {
    setUpdateSnippet(true);
    setShowSnippet(false);
  }

  return (
    <div className="snippet">
      <ToastContainer />
      {/* Snippet editing Mode. Rendering section is disabled */}
      {updateSnippet && (
        <>
          <h2 className="edit-title">Editing - {snippet.title}</h2>
          <TagSelector selectedUserTag={selectedUserTag} />

          <form className="form" onSubmit={saveSnippet}>
            <button className="btn-save" type="submit">
              Save snippet
            </button>
            <label>Snippet tag: {editorTag}</label>
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
                placeholder="Please enter your code."
                padding={15}
                style={{
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
                onChange={(e) => setEditorCode(e.target.value)}
              />
            </div>
            <button className="btn-save" type="submit">
              Save snippet
            </button>
            <button className="btn-cancel" type="button" onClick={closeEditor}>
              Cancel
            </button>
          </form>
        </>
      )}

      {/* Render snippet if not in editing mode*/}
      {showSnippet && (
        <>
          {" "}
          <div className="snippet-header">
            <h2 className="title">{snippet.title}</h2>
            <div className="group">
              {snippet.tag && <span className="tag">{snippet.tag}</span>}

              <button
                className="btn-copy"
                onClick={() => {
                  saveToClipboard();
                  copyToClipboardMessage();
                }}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <h4 className="description">{snippet.description}</h4>
          <div className="code">
            <CodeEditor
              className="code-editor"
              disabled={true}
              value={snippet.code}
              language="js"
              placeholder="Please enter your code."
              padding={15}
              style={{
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>
          <button
            className="btn-copy"
            onClick={() => {
              saveToClipboard();
              copyToClipboardMessage();
            }}
          >
            Copy
          </button>
          <button className="btn-edit" onClick={editSnippet}>
            Edit
          </button>
          <button className="btn-delete" onClick={deleteSnippet}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default SnippetTemplate;
