import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import NewSnippet from "../components/NewSnippet";
import NewTag from "../components/NewTag";
import SnippetTemplate from "../components/SnippetTemplate";
import server from "../util/server";
import UserContext from "../util/UserContext";
import "./Snippets.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [filteredTag, setFilteredTag] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchTerm, setSearchTerm] = useState("title");

  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useContext(UserContext);

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
  const deleteTagMessage = () => toast("Tag deleted!", defaultParams);

  // getUser();
  useEffect(() => {
    getSnippets();
    getTags();
  }, [filteredTag]);

  useEffect(() => {
    getTags();
  }, [modalOpen]);

  useEffect(() => {}, [filteredTag]);

  async function getTags() {
    const tagsRes = await axios.get(`${server}/api/snippetTags`);
    setUserTags(tagsRes.data);
  }

  async function getSnippets() {
    const snippetsRes = await axios.get(
      `${server}/api/snippets/${filteredTag}`
    );
    setSnippets(snippetsRes.data);
    getTags();
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    //search filter implementation
    let filterdSnippets = [...sortedSnippets];
    if (searchKey === "") {
      filterdSnippets = sortedSnippets;
    } else if (searchTerm === "title") {
      filterdSnippets = filterdSnippets.filter((snippet) =>
        snippet.title.toLowerCase().includes(searchKey)
      );
    } else if (searchTerm === "description") {
      filterdSnippets = filterdSnippets.filter((snippet) =>
        snippet.description.toLowerCase().includes(searchKey)
      );
    } else if (searchTerm === "code") {
      filterdSnippets = filterdSnippets.filter((snippet) =>
        snippet.code.toLowerCase().includes(searchKey)
      );
    }

    return filterdSnippets.map((snippet) => {
      return (
        <SnippetTemplate
          key={snippet.id}
          snippet={snippet}
          getSnippets={getSnippets}
        />
      );
    });
  }

  function editTags() {
    async function removeTag(id) {
      if (window.confirm("Do you want to delete this tag?")) {
        await axios.delete(`${server}/api/snippetTags/${id}`);
        getTags();
        deleteTagMessage();
      }
    }

    return (
      <>
        <ToastContainer />
        <div className="tags-editor">
          <div className="add-tag">
            <h2>Add a new tag</h2>
            <NewTag getTags={getTags} />
          </div>
          <div className="remove-tags">
            <h2>Click to delete tags</h2>
            {userTags.map((tag) => {
              if (tag.title !== "Select tag...")
                return (
                  <button
                    className="tag"
                    title="Click to delete"
                    key={tag._id}
                    onClick={() => removeTag(tag.id)}
                  >
                    {tag.title}
                  </button>
                );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="page-container">
      {user && (
        <>
          {modalOpen && (
            <Modal setOpenModal={setModalOpen} title="Edit Tags">
              {editTags()}
            </Modal>
          )}

          {/* search section */}
          <div className="content">
            <div className="search-bar form">
              <div>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search snippet..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>
              <div className="search-buttons">
                <div>
                  <span>Search by:</span>{" "}
                  <button onClick={() => setSearchTerm("title")}>Title</button>
                  <button onClick={() => setSearchTerm("description")}>
                    Description
                  </button>
                  <button onClick={() => setSearchTerm("code")}>Code</button>
                  <p>
                    View tag:{" "}
                    <span>{filteredTag === "" ? "All" : filteredTag}</span>
                    {" / "}
                    Search by: <span>{searchTerm}</span>
                  </p>
                </div>
                <div>
                  <button
                    className="clear-search"
                    onClick={() => {
                      setSearchKey("");
                    }}
                  >
                    Clear search
                  </button>
                  <button
                    className="openModalBtn"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Edit Tags
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Snippet */}
          <NewSnippet getSnippets={getSnippets} />

          {/* snippets section */}
          <div className="snippets-container">
            <div className="snippets">
              {snippets.length > 0
                ? renderSnippets()
                : user && (
                    <p className="no-snippets">
                      No snippets have been added yet!
                    </p>
                  )}
            </div>
            <div className="tags-selector">
              <ul>
                <p>Sort by tags</p>
                <hr />
                <div className="separator">
                  <li onClick={() => setFilteredTag("")}>
                    All tags
                    <hr />{" "}
                  </li>
                  {userTags.map((tag) => {
                    if (tag.title === "Select tag...")
                      return (
                        <li
                          key={tag._id}
                          onClick={() => setFilteredTag("No tag")}
                        >
                          {"No tag"}
                          <hr />
                        </li>
                      );
                    else
                      return (
                        <li
                          key={tag._id}
                          onClick={() => setFilteredTag(tag.title)}
                        >
                          {tag.title}
                          <hr />
                        </li>
                      );
                  })}
                </div>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Snippets;
