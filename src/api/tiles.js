const express = require("express");
const router = express.Router();

let nextId = 1;
const tiles = [];

router.get("/", (req, res) => {
  res.json(tiles);
});

router.post("/", (req, res) => {
  const { position } = req.body;
  const newTile = {
    id: nextId++,
    title: "New Tile",
    position: position,
  };
  tiles.push(newTile);
  res.json(newTile);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { position, title } = req.body;
  const tile = tiles.find((t) => t.id === id);
  if (tile) {
    if (position) {
      tile.position = position;
    }
    if (title) {
      tile.title = title;
    }
    res.json(tile);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tiles.findIndex((t) => t.id === id);
  if (index !== -1) {
    tiles.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;