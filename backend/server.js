const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Tile = require("./models/tile");

main().catch(err => console.log(err));

 async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/tiles",{useNewUrlParser:true});
  
 
   // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
 }

const app = express();

app.use(bodyParser.json());

// GET /api/tiles
// Retrieves the list of tiles from the database.
app.get("/api/tiles", async (req, res) => {
  const tiles = await Tile.find();
  res.json(tiles);
});

// POST /api/tiles
// Creates a new tile in the database.
app.post("/api/tiles", async (req, res) => {
  const tile = new Tile({
    title: req.body.title,
    position: req.body.position,
  });
  await tile.save();
  res.json(tile);
});

// PUT /api/tiles/:id
// Updates the position of a tile in the database.
app.put("/api/tiles/:id", async (req, res) => {
  const tile = await Tile.findById(req.params.id);
  tile.position = req.body.position;
  await tile.save();
  res.json(tile);
});

// DELETE /api/tiles/:id
// Deletes a tile from the database.
app.delete("/api/tiles/:id", async (req, res) => {
  await Tile.findByIdAndDelete(req.params.id);
  res.json({ message: "Tile deleted" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});