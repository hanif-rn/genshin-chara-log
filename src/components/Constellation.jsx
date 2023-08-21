import React from "react";
import PropTypes from "prop-types";

const Constellation = ({ constellation, conno }) => {
  const connoCaps = conno.toUpperCase();

  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const constellationData = constellation[conno];

  if (!constellationData) {
    return null;
  }

  return (
    <>
      <div className="concard talcard" key={conno}>
        <div className="talent-img">
          <img
            className="talent-icon"
            src={constellation.images[conno]}
            alt={constellationData.name}
          />
        </div>
        <div className="context">
          <h3>
            {connoCaps}. {constellationData.name}
          </h3>
          <p
            dangerouslySetInnerHTML={{
              __html: formatBoldText(constellationData.effect),
            }}
          />
        </div>
      </div>
    </>
  );
};

Constellation.propTypes = {
  constellation: PropTypes.arrayOf(PropTypes.string),
  conno: PropTypes.string,
};

export default Constellation;
