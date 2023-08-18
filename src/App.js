import { useEffect } from "react";

const API_URL = "https://genshin-db-api.vercel.app/api/characters?query=";

const App = () => {
  const searchCharacters = async (name) => {
    const response = await fetch(`${API_URL}${name}`);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    searchCharacters("Lyney");
  }, []);

  return <h1>Genshin Impact Character Catalog</h1>;
};

export default App;
