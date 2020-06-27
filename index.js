const compression = require("compression");
const express = require("express");
const api = require("./routes/api");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const PORT = parseInt(process.env.PORT, 10) || 3000;

console.log(`Dev: ${dev}`);

const server = express();

server.use(compression());
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

server.get("/ping", (req, res) => res.send("pong"));

server.use("/api", api);

server.listen(PORT, () => console.log(`> Listining on http://localhost:${PORT}`));
