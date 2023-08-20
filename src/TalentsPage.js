import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Talent from "./Talent";
import Constellation from "./Constellation";
import CharDetails from "./CharDetails";

function TalentsPage({ characterName, navigateToHome }) {
  const [sideIcon, setSideIcon] = useState(null);
  const [splash, setSplash] = useState(null);
  const [talentData, setTalentData] = useState([]);
  const [consData, setConsData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  function fetchIcon(characterName) {
    const dataUrl = `https://genshin-db-api.vercel.app/api/characters?query=${characterName}`;

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setSideIcon(data.images.sideicon);
        setSplash(
          "https://api.ambr.top/assets/UI/" +
            data.images.namegachasplash +
            ".png"
        );
        setDetailData(data);
      })
      .catch((error) => {
        console.error("Error fetching character side icon:", error);
      });
  }

  function fetchTalent(characterName) {
    let modifiedCharacterName = characterName.toLowerCase();

    if (
      modifiedCharacterName === "aether" ||
      modifiedCharacterName === "lumine"
    ) {
      modifiedCharacterName = "travelerhydro";
    }

    const dataUrl = `https://genshin-db-api.vercel.app/api/talents?query=${modifiedCharacterName}`;

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
      <div
        className="tcc splash-art"
        style={{ backgroundImage: `url(${splash})` }}
      >
        <div className="talent-head">
          <img src={sideIcon} alt={characterName} className="char-icon" />
          <h1>{characterName}</h1>
        </div>
        <CharDetails detailData={detailData} />
      </div>
      <div className="tcc" id="top-tcc">
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
