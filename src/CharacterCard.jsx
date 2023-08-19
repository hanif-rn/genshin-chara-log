import React from "react";
import { Link } from "react-router-dom";

const CharacterCard = ({ characterDetails }) => {
  return (
    <>
      {characterDetails.map((item) => (
        <Link
          to={`/talents.html?character=${encodeURIComponent(item.name)}`}
          key={item.name}
        >
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
        </Link>
      ))}
    </>
  );
};

export default CharacterCard;
