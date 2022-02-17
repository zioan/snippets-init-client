import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import NewSnippet from "../components/NewSnippet";
import SnippetTemplate from "../components/SnippetTemplate";
import server from "../util/server";
import UserContext from "../util/UserContext";
import "./Snippets.scss";

function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [filteredTag, setFilteredTag] = useState("");

  const { user, getUser } = useContext(UserContext);

  // getUser();
  useEffect(() => {
    getSnippets();
    getTags();
  }, [filteredTag]);

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
    console.log(filteredTag);
    getTags();
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return sortedSnippets.map((snippet) => {
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
      }
    }

    return (
      <div className="tags-editor-overlay">
        <div className="tags-editor">
          <ul>
            {userTags.map((tag) => {
              if (tag.title !== "Select tag...")
                return (
                  <li key={tag._id} onClick={() => removeTag(tag.id)}>
                    {tag.title}
                    <hr />
                  </li>
                );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div>
        {user && (
          <>
            <h2>Snippets Page</h2>
            <h3>Add snippet</h3>
            <div className="snippets-container">
              <div className="snippets">
                <NewSnippet getSnippets={getSnippets} />

                {snippets.length > 0
                  ? renderSnippets()
                  : user && (
                      <p className="no-snippets">
                        No snippets have been added yet!
                      </p>
                    )}
              </div>
              <div className="tags-selector">
                <li onClick={() => setFilteredTag("")}>
                  All tags
                  <hr />{" "}
                </li>
                <ul>
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
                </ul>
                {/* popup hereeeeeeeeeeeeeeeeeeeee */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Snippets;

// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import NewSnippet from "../components/NewSnippet";
// import SnippetTemplate from "../components/SnippetTemplate";
// import TagsMenuSelector from "../components/TagsMenuSelector";
// import server from "../util/server";
// import UserContext from "../util/UserContext";
// import "./Snippets.scss";

// function Snippets() {
//   const [snippets, setSnippets] = useState([]);
//   const [snippetsToDisplay, setSnippetsToDisplay] = useState([]);
//   const [tagFilteredSnippets, setTagFilteredSnippets] = useState([]);
//   const [chosenFilterTag, setChosenFilterTag] = useState("");
//   const { user, getUser } = useContext(UserContext);

//   // getUser();
//   useEffect(() => {
//     getSnippets();
//   }, []);

//   async function getSnippets() {
//     const snippetsRes = await axios.get(`${server}/api/snippets/`);
//     setSnippets(snippetsRes.data);
//     // if (tagFilteredSnippets) {
//     //   //get user tag filtered snippets
//     //   const snippetsRes = await axios.get(
//     //     `${server}/api/snippets/${chosenFilterTag}`
//     //   );
//     //   setSnippets(snippetsRes.data);
//     // } else {
//     //   //get all user snippets
//     //   const snippetsRes = await axios.get(`${server}/api/snippets`);
//     //   setSnippets(snippetsRes.data);
//     // }
//   }

//   function renderSnippets() {
//     let sortedSnippets = [...snippets];
//     sortedSnippets = sortedSnippets.sort((a, b) => {
//       return new Date(b.updatedAt) - new Date(a.updatedAt);
//     });

//     return sortedSnippets.map((snippet) => {
//       return (
//         <SnippetTemplate
//           key={snippet.id}
//           snippet={snippet}
//           getSnippets={getSnippets}
//         />
//       );
//     });
//   }

//   function filterByTag(filteredSnippets) {
//     // setChosenFilterTag(filteredTag);
//     // console.log(chosenFilterTag);
//   }

//   return (
//     <div className="snippets-container">
//       <TagsMenuSelector filterByTag={filterByTag} />
//       <div>
//         {user && (
//           <>
//             <h2>Snippets Page</h2>
//             <h3>Add snippet</h3>
//             <NewSnippet getSnippets={getSnippets} />

//             {snippets.length > 0
//               ? renderSnippets()
//               : user && (
//                   <p className="no-snippets">
//                     No snippets have been added yet!
//                   </p>
//                 )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Snippets;
