const mongoose = require("mongoose");

const tileSchema = new mongoose.Schema({
  title: String,
  position: {
    x: Number,
    y: Number,
  },
});

const Tile = mongoose.model("Tile", tileSchema);

module.exports = Tile;