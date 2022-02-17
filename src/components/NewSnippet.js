import React, { useState } from "react";
import axios from "axios";
import "./NewSnippet.scss";
import CodeEditor from "@uiw/react-textarea-code-editor";
import server from "../util/server";
import SnippetTag from "./SnippetTag";

function NewSnippet({ getSnippets }) {
  const [editorToggler, setEditorToggler] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [editorTag, setEditorTag] = useState("no tag");

  async function saveSnippet(e) {
    e.preventDefault();

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
        <button onClick={() => setEditorToggler(!editorToggler)}>
          Add Snippet
        </button>
      )}
      {editorToggler && (
        <div className="snippet-editor">
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
