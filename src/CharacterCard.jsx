import React from "react";
import PropTypes from "prop-types";

const CharacterCard = ({ characterDetails, navigateToTalents }) => {
  return (
    <>
      {characterDetails.map((item) => {
        let elementColorClass = "";
        if (item.rarity.toLowerCase() === "5") {
          elementColorClass = "fivestar-background";
        } else {
          elementColorClass = "fourstar-background";
        }

        return (
          <div className={`card ${elementColorClass}`} key={item.name}>
            <div>
              <p>Element: {item.element}</p>
              <p>Weapon: {item.weapontype}</p>
              <p>
                Rarity:{" "}
                {Array.from({ length: item.rarity }, () => "✯").join("")}
              </p>
              <p>
                Region: {item.region} ~ {item.affiliation}
              </p>
            </div>
            <div>
              <img src={item.images?.icon} alt={item.name} />
            </div>
            <div onClick={() => navigateToTalents(item.name)}>
              <span>{item.constellation}</span>
              <h3>{item.name}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
};

CharacterCard.propTypes = {
  characterDetails: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  navigateToTalents: PropTypes.func,
};

export default CharacterCard;
