const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Tile = require("./models/tile");

main().catch(err => console.log(err));

 async function main() {
  //  await mongoose.connect("mongodb://127.0.0.1:27017/tiles",{useNewUrlParser:true});
  
  await mongoose.connect('mongodb+srv://admin-krishnanjali:Maaku1234@cluster0.faxbf7r.mongodb.net/tiles?retryWrites=true&w=majority');
 }

const app = express();

app.use(bodyParser.json());

app.get("/api/tiles", async (req, res) => {
  const tiles = await Tile.find();
  res.json(tiles);
});


app.post("/api/tiles", async (req, res) => {
  const tile = new Tile({
    title: req.body.title,
    position: req.body.position,
  });
  await tile.save();
  res.json(tile);
});


app.put("/api/tiles/:id", async (req, res) => {
console.log("Updating tile with id:", req.params.id);
console.log("Request body:", req.body);
  const tile = await Tile.findById(req.params.id);
  console.log("Tile found:", tile);
  tile.position = req.body.position;
  tile.title=req.body.title;
  await tile.save();
  console.log("Updated tile:", tile);
  res.json(tile);
});


app.delete("/api/tiles/:id", async (req, res) => {
  await Tile.findByIdAndDelete(req.params.id);
  res.json({ message: "Tile deleted" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});