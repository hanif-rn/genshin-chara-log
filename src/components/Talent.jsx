import React from "react";
import PropTypes from "prop-types";
import AttributeTable from "./AttributeTable";
import { useState } from "react";

const Talent = ({ characterTalents, talent }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  let skillType = "";
  const lowercaseTalent = talent.toLowerCase();

  if (lowercaseTalent === "combat2") {
    skillType = "(E) Skill: ";
  } else if (lowercaseTalent === "combat3") {
    skillType = "(Q) Burst: ";
  }

  const talentData = characterTalents[talent];

  if (!talentData) {
    return null;
  }

  const talentImageUrl = `https://api.ambr.top/assets/UI/${characterTalents.images[talent]}.png`;

  return (
    <>
      <div className="talcard" key={talent}>
        <div
          className="talent-img"
          onClick={talentData.attributes ? togglePopup : null}
        >
          <img
            className="talent-icon"
            src={talentImageUrl}
            alt={talentData.name}
          />
        </div>
        <div className="taltext">
          <div className="taldeets">
            <h3>
              {skillType}
              {talentData.name}
            </h3>
          </div>
          <div className="taldeets">
            <p
              dangerouslySetInnerHTML={{
                __html: formatBoldText(talentData.info),
              }}
            />
            {talentData.description && <p>{talentData.description}</p>}
          </div>
        </div>
      </div>
      {popupVisible && (
        <div className="popup">
          <h3>
            {skillType}
            {talentData.name} Talent Scaling
          </h3>

          {talentData.attributes && (
            <AttributeTable attributes={talentData.attributes} />
          )}
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
      {/* {talentData.attributes && (
        <AttributeTable attributes={talentData.attributes}></AttributeTable>
      )} */}
    </>
  );
};

Talent.propTypes = {
  characterTalents: PropTypes.shape({
    images: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  talent: PropTypes.string.isRequired,
};

export default Talent;
