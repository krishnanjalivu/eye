const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const tilesRouter = require("./src/api/tiles");

app.use(express.json());
app.use(express.static("client/build"));

app.use("/api/tiles", tilesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});