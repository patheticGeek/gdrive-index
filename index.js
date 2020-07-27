const compression = require("compression");
const express = require("express");
const logger = require("./utils/logger");
const parseCookies = require("./utils/parseCookies");
const api = require("./routes/api");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const PORT = parseInt(process.env.PORT, 10) || 3000;
const { AUTH } = dev ? require("./config.json") : process.env;
const basicauth = Buffer.from(AUTH).toString("base64");

logger(`Dev: ${dev}\nAuth: ${!!AUTH}`);

const server = express();

function checkAuth(req) {
  if (!AUTH) return true;
  if (!req.headers.cookie) return false;

  const cookies = parseCookies(req.headers.cookie);
  return cookies.basicauth === basicauth;
}

server.use(compression());
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

server.get("/ping", (req, res) => res.send("pong"));
server.use("/logs", (req, res) => res.sendFile("logs.txt", { root: __dirname }));

server.use("/api", api);

server.use("/static", express.static("web/build/static"));

server.get("/checkAuth", (req, res) => {
  res.send({ auth: req.query.basicauth === basicauth });
});

server.get("/", (req, res) => {
  res.sendFile("web/build/index.html", { root: __dirname });
});

server.all("*", (req, res) => res.sendFile("web/build/index.html", { root: __dirname }));

server.listen(PORT, () => logger(`> Listining on http://localhost:${PORT}`));
