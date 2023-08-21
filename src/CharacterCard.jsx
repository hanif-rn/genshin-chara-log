import React from "react";
import PropTypes from "prop-types";

const CharacterCard = ({ characterDetail, navigateToTalents }) => {
  let elementColorClass = "";
  if (characterDetail.rarity.toLowerCase() === "5") {
    elementColorClass = "fivestar-background";
  } else {
    elementColorClass = "fourstar-background";
  }

  return (
    <div className={`card ${elementColorClass}`} key={characterDetail.name}>
      <div>
        <p>Element: {characterDetail.element}</p>
        <p>Weapon: {characterDetail.weapontype}</p>
        <p>
          Rarity:{" "}
          {Array.from({ length: characterDetail.rarity }, () => "✯").join("")}
        </p>
        <p>
          Region: {characterDetail.region} ~ {characterDetail.affiliation}
        </p>
      </div>
      <div>
        <img src={characterDetail.images?.icon} alt={characterDetail.name} />
      </div>
      <div onClick={() => navigateToTalents(characterDetail.name)}>
        <span>{characterDetail.constellation}</span>
        <h3>{characterDetail.name}</h3>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  characterDetail: PropTypes.shape({
    name: PropTypes.string,
    rarity: PropTypes.string,
    element: PropTypes.string,
    weapontype: PropTypes.string,
    region: PropTypes.string,
    affiliation: PropTypes.string,
    images: PropTypes.shape({
      icon: PropTypes.string,
    }),
    constellation: PropTypes.string,
  }),
  navigateToTalents: PropTypes.func,
};

export default CharacterCard;
