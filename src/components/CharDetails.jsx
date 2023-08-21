import React from "react";
import PropTypes from "prop-types";

const CharDetails = (detailData) => {
  const detailedData = detailData.detailData;
  return (
    <div>
      <table className="bg-over-table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{detailedData.name}</td>
          </tr>

          <tr>
            <td>Title:</td>
            <td>{detailedData.title}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{detailedData.description}</td>
          </tr>
          <tr>
            <td>Rarity:</td>
            <td>
              {Array.from({ length: detailedData.rarity }, () => "✯").join("")}
            </td>
          </tr>
          <tr>
            <td>Element:</td>
            <td>{detailedData.element}</td>
          </tr>
          <tr>
            <td>Weapon Type:</td>
            <td>{detailedData.weapontype}</td>
          </tr>

          <tr>
            <td>Gender:</td>
            <td>{detailedData.gender}</td>
          </tr>
          <tr>
            <td>Birthday:</td>
            <td>{detailedData.birthday}</td>
          </tr>
          <tr>
            <td>Constellation:</td>
            <td>{detailedData.constellation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

CharDetails.propTypes = {
  detailData: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    rarity: PropTypes.string,
    element: PropTypes.string,
    weapontype: PropTypes.string,
    gender: PropTypes.string,
    birthday: PropTypes.string,
    constellation: PropTypes.string,
  }),
};

export default CharDetails;
