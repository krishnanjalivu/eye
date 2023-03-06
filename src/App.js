import { useState, useEffect } from "react";
import axios from "axios";
import Tile from "./components/Tile.js";
import "./Index.css";

function App() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    axios.get("/api/tiles").then((response) => {
      setTiles(response.data);
    });
  }, []);

  const handleAddTile = () => {
    axios
      .post("/api/tiles", {
        title: "New Tile",
        position: { x: 0, y: 0 },
      })
      .then((response) => {
        setTiles([...tiles, response.data]);
      });
  };

  const handleTileUpdate = (id, position) => {
    axios
      .put(`/api/tiles/${id}`, { position })
      .then((response) => {
        setTiles(
          tiles.map((tile) =>
            tile._id === response.data._id ? response.data : tile
          )
        );
      });
  };

  const handleTileDelete = (id) => {
    axios.delete(`/api/tiles/${id}`).then(() => {
      setTiles(tiles.filter((tile) => tile._id !== id));
    });
  };

  return (
    <div className="App">
      <button onClick={handleAddTile}>Add Tile</button>
      {tiles.map((tile) => (
        <Tile
          key={tile._id}
          id={tile._id}
          title={tile.title}
          position={tile.position}
          onUpdate={handleTileUpdate}
onDelete={handleTileDelete}
/>
))}
</div>
);
}

export default App;