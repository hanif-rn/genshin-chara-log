import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const TalentsPage = () => {
  const [sideIcon, setSideIcon] = useState(null);

  const location = useLocation();
  const characterName = new URLSearchParams(location.search).get("character");
  function fetchIcon(characterName) {
    const dataUrl = `https://genshin-db-api.vercel.app/api/characters?query=${characterName}`;

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setSideIcon(data.images.sideicon);
      })
      .catch((error) => {
        console.error("Error fetching character side icon:", error);
      });
  }

  useEffect(() => {
    fetchIcon(characterName);
  }, [characterName]);

  return (
    <div>
      <div className="talent-head">
        <img src={sideIcon} alt={characterName} />
        <h1>{characterName}</h1>
      </div>

      {/* Display the talents for the character */}
    </div>
  );
};

export default TalentsPage;
