import React from "react";

const CharacterCard = ({characters}) => {
    return(
        <>
        {characters.map((item,index) => (
            <div className="movie">
          <div>
            <p>{item.element}</p>
          </div>
          <div>
            <img src={item.images.icon} alt={item.name} />
          </div>
          <div>
            <span>{item.title}</span>
            <h3>{item.name}</h3>
          </div>
        </div>
        ))}
        </>
    )    
}

export default CharacterCard;