import { useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import CharacterCard from "./CharacterCard";
import { useState } from "react";

const API_URL = "https://genshin-db-api.vercel.app/api/characters?query=";

const character1 = {
  name: "Chongyun",
  title: "Frozen Ardor",
  rarity: "4",
  element: "Cryo",
  images: {
    icon: "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Chongyun.png",
  },
};

const character2 = {
  name: "Xingqiu",
  title: "Juvenile Galant",
  element: "Hydro",
  images: {
    icon: "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Xingqiu.png",
  },
};

const character3 = {
  name: "Xiangling",
  title: "Exquisite Delicacy",
  element: "Pyro",
  images: {
    icon: "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Xiangling.png",
  },
};

const character4 = {
  name: "Bennett",
  title: "Trial by Fire",
  element: "Pyro",
  images: {
    icon: "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Bennett.png",
  },
};

const charactersz = [character1, character2, character3, character4];

const App = () => {
  const [characters, setCharacters] = useState([]);

  const searchCharacters = async (name) => {
    const response = await fetch(`${API_URL}${name}`);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    searchCharacters("Bennett");
  }, []);

  return (
    <div className="app">
      <h1>Genshin Impact Character Catalog</h1>

      <div className="search">
        <input
          placeholder="Search for a character"
          value="Traveler"
          onChange={() => {}}
        />
        <img src={SearchIcon} alt="search" onClick={() => {}} />
      </div>

      <div className="container">
        <CharacterCard characters={charactersz} />
      </div>
    </div>
  );
};

export default App;
