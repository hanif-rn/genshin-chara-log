import React from "react";

const Talent = ({ characterTalents, talent }) => {
  console.log(characterTalents);

  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

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
            <h3>{talentData.name}</h3>
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

export default Talent;
