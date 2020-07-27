const express = require("express");
const Drive = require("../lib/drive");

const router = express.Router();
const drive = new Drive();

router.get("/folder", async (req, res) => {
  try {
    const files = await drive.getFiles();
    res.send(files);
  } catch (e) {
    console.log(e);
    const code = e.message.indexOf("Folder not found") !== -1 ? 400 : 500;
    res.status(code).send(e.message);
  }
});

router.get("/folder/:id", async (req, res) => {
  try {
    const folderId = req.params.id;
    const files = await drive.getFiles(folderId);
    res.send(files);
  } catch (e) {
    console.log(e);
    const code = e.message.indexOf("Folder not found") !== -1 ? 400 : 500;
    res.status(code).send(e.message);
  }
});

router.get("/file/:id", async (req, res) => {
  try {
    const fileId = req.query.id || req.params.id;
    if (!fileId) res.status(400).send("File id not specified");
    const data = await drive.getFileData(fileId);
    res.send(data);
  } catch (e) {
    console.log(e);
    const code = e.message.indexOf("File not found") !== -1 ? 400 : 500;
    res.status(code).send(e.message);
  }
});

router.get("/file/download/:id", async (req, res) => {
  try {
    const fileId = req.query.id || req.params.id;
    if (!fileId) res.status(400).send("File id not specified");
    const stream = await drive.getFileStream(fileId, req.headers);
    Object.keys(stream.headers).forEach((val) => {
      res.setHeader(val, stream.headers[val]);
    });
    stream.data
      .on("end", () => {})
      .on("error", () => {})
      .pipe(res);
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occured");
  }
});

router.use("/getAuthURL", (req, res) => {
  const CLIENT_ID = req.query.clientId;
  const CLIENT_SECRET = req.query.clientSecret;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    res.send(JSON.stringify({ error: "Client Id and secret are required" }));
  } else {
    const authURL = drive.getAuthURL(CLIENT_ID, CLIENT_SECRET);
    res.send(JSON.stringify({ error: "", authURL }));
  }
});

router.use("/getAuthToken", async (req, res) => {
  const CLIENT_ID = req.query.clientId;
  const CLIENT_SECRET = req.query.clientSecret;
  const AUTH_CODE = req.query.authCode;

  if (!CLIENT_ID || !CLIENT_SECRET || !AUTH_CODE) {
    res.send(JSON.stringify({ error: "Client Id and secret and auth code are required" }));
  } else {
    const token = await drive.getAuthToken(CLIENT_ID, CLIENT_SECRET, AUTH_CODE);
    res.send(JSON.stringify({ token, error: "" }));
  }
});

module.exports = router;
