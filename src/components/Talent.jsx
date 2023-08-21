import React from "react";
import PropTypes from "prop-types";

const Talent = ({ characterTalents, talent }) => {
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
    return null; // Return null to render nothing
  }

  const talentImageUrl = `https://api.ambr.top/assets/UI/${characterTalents.images[talent]}.png`;

  return (
    <>
      <div className="talcard" key={talent}>
        <div className="talent-img">
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
