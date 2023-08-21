import React, { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import "./dist/mystyles.css";
import CharacterCard from "./components/CharacterCard";
import TalentsPage from "./TalentsPage";

function App() {
  const [characterDetails, setCharacterDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const navigateToTalents = (characterName) => {
    setSelectedCharacter(characterName);
    setCurrentPage("talents");
  };

  const navigateToHomePage = () => {
    setSelectedCharacter(null);
    setCurrentPage("home");
  };

  function fetchAll() {
    const characterNamesUrl =
      "https://genshin-db-api.vercel.app/api/characters?query=names&matchCategories=true";
    fetch(characterNamesUrl)
      .then((response) => response.json())
      .then((data) => {
        const characterDetailsPromises = [];

        data.forEach((character) => {
          const characterDetailUrl = `https://genshin-db-api.vercel.app/api/characters?query=${character}`;
          characterDetailsPromises.push(fetch(characterDetailUrl));
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
          {currentPage === "home" && (
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
              <div className="ccc">
                {characterDetails.map((characterDetail) => (
                  <CharacterCard
                    key={characterDetail.name}
                    characterDetail={characterDetail}
                    navigateToTalents={navigateToTalents}
                  />
                ))}
              </div>
            </>
          )}

          {currentPage === "talents" && (
            <TalentsPage
              characterName={selectedCharacter}
              navigateToHome={navigateToHomePage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
