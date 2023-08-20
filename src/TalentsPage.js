import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Talent from "./Talent";
import Constellation from "./Constellation";

function TalentsPage({ characterName, navigateToHome }) {
  const [sideIcon, setSideIcon] = useState(null);
  const [talentData, setTalentData] = useState([]);
  const [consData, setConsData] = useState([]);

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

  function fetchTalent(characterName) {
    const dataUrl = `https://genshin-db-api.vercel.app/api/talents?query=${characterName}`;

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setTalentData(data);
      })
      .catch((error) => {
        console.error("Error fetching character side icon:", error);
      });
  }

  function fetchCons(characterName) {
    const dataUrl = `https://genshin-db-api.vercel.app/api/constellations?query=${characterName}`;

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setConsData(data);
      })
      .catch((error) => {
        console.error("Error fetching character side icon:", error);
      });
  }

  useEffect(() => {
    fetchIcon(characterName);
    fetchTalent(characterName);
    fetchCons(characterName);
  }, [characterName]);

  const combatTalents = ["combat1", "combat2", "combat3"];
  const passiveTalents = [
    "passive1",
    "passive2",
    "passive3",
    "passive4",
    "combatsp",
  ];
  const constellations = ["c1", "c2", "c3", "c4", "c5", "c6"];

  return (
    <div>
      <button onClick={navigateToHome}>Back to Home</button>
      <div className="talent-head">
        <img src={sideIcon} alt={characterName} className="char-icon" />
        <h1>{characterName}</h1>
      </div>
      <div className="tcc">
        <h2>COMBAT</h2>
        <div className="tcc-in">
          {combatTalents.map((talent) => (
            <Talent characterTalents={talentData} talent={talent} />
          ))}
        </div>
      </div>
      <div className="tcc">
        <h2>PASSIVE</h2>
        <div className="tcc-in">
          {passiveTalents.map((talent) => (
            <Talent characterTalents={talentData} talent={talent} />
          ))}
        </div>
      </div>
      <div className="tcc">
        <h2>CONSTELLATIONS</h2>
        <div className="tcc-in concardcon">
          {constellations.map((constellations) => (
            <Constellation constellation={consData} conno={constellations} />
          ))}
        </div>
      </div>
      <button onClick={navigateToHome}>Back to Home</button>
      {/* Display the talents for the character */}
    </div>
  );
}

export default TalentsPage;
