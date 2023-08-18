import React from "react";

const CharacterCard = ({ characterDetails }) => {
  return (
    <>
      {characterDetails.map((item) => (
        <div className="card" key={item.name}>
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
          <div>
            <span>{item.constellation}</span>
            <h3>{item.name}</h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default CharacterCard;
