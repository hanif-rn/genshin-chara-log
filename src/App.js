import React, { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
//import "./App.css";
import "./dist/mystyles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import TalentsPage from "./TalentsPage";

function App() {
  const [characterDetails, setCharacterDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function fetchAll() {
    const characterNamesUrl =
      "https://genshin-db-api.vercel.app/api/characters?query=names&matchCategories=true";
    fetch(characterNamesUrl)
      .then((response) => response.json())
      .then((data) => {
        const characterDetailsPromises = [];
        console.log(data);

        // Filter and fetch details for characters with required fields
        data.forEach((character) => {
          const characterDetailUrl = `https://genshin-db-api.vercel.app/api/characters?query=${character}`;
          characterDetailsPromises.push(fetch(characterDetailUrl));
        });

        // Execute promises for character details retrieval
        Promise.all(characterDetailsPromises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((details) => {
            // Set character details in state
            setCharacterDetails(details);
          })
          .catch((error) => {
            console.error("Error fetching character details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching character names:", error);
      });
  }

  const searchCharacters = async (name) => {
    if (name === "") {
      fetchAll();
      return;
    }

    const characterNamesUrl =
      "https://genshin-db-api.vercel.app/api/characters?query=names&matchCategories=true";
    fetch(characterNamesUrl)
      .then((response) => response.json())
      .then((data) => {
        const characterDetailsPromises = [];
        console.log(data);

        // Filter and fetch details for characters with required fields
        data.forEach((character) => {
          if (character.toLowerCase().startsWith(name.toLowerCase())) {
            const characterDetailUrl = `https://genshin-db-api.vercel.app/api/characters?query=${character}`;
            characterDetailsPromises.push(fetch(characterDetailUrl));
          }
        });

        Promise.all(characterDetailsPromises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((details) => {
            setCharacterDetails(details);
          })
          .catch((error) => {
            console.error("Error fetching character details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching character names:", error);
      });
  };

  useEffect(() => {
    // Fetch character names along with their details
    const characterNamesUrl =
      "https://genshin-db-api.vercel.app/api/characters?query=names&matchCategories=true";
    fetch(characterNamesUrl)
      .then((response) => response.json())
      .then((data) => {
        const characterDetailsPromises = [];
        console.log(data);

        // Filter and fetch details for characters with required fields
        data.forEach((character) => {
          const characterDetailUrl = `https://genshin-db-api.vercel.app/api/characters?query=${character}`;
          characterDetailsPromises.push(fetch(characterDetailUrl));
        });

        // Execute promises for character details retrieval
        Promise.all(characterDetailsPromises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((details) => {
            // Set character details in state
            setCharacterDetails(details);
          })
          .catch((error) => {
            console.error("Error fetching character details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching character names:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs once

  let searchTimeout;

  const handleSearch = (value) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      searchCharacters(value);
    }, 0); // 1 second delay
  };

  return (
    <div>
      <div className="app">
        <h1>Genshin Impact Character Catalog</h1>

        <div className="container">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="search">
                      <input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          handleSearch(e.target.value);
                        }}
                      />
                      <img
                        src={SearchIcon}
                        alt="search"
                        onClick={() => searchCharacters(searchTerm)}
                      />
                    </div>
                    <div className="container flexible">
                      <CharacterCard characterDetails={characterDetails} />
                    </div>
                  </>
                }
              />
              <Route path="/talents.html" element={<TalentsPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
