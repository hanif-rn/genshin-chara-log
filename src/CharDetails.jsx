import React from "react";

const CharDetails = (detailData) => {
  const detailedData = detailData.detailData;
  return (
    <div>
      {console.log(detailedData)}

      {console.log(detailedData.name)}
      <table>
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

export default CharDetails;
