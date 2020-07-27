const { google } = require("googleapis");
const logger = require("../utils/logger");

const dev = process.env.NODE_ENV !== "production";
const { CLIENT_ID, CLIENT_SECRET, TOKEN, AUTH_CODE, PARENT_FOLDER, SCOPE = '["https://www.googleapis.com/auth/drive"]' } = dev
  ? require("../config.json")
  : process.env;
const SCOPES = JSON.parse(SCOPE);

class Drive {
  constructor() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      logger("CLIENT_ID, CLIENT_SECRET enviorment variables not found");
      return;
    }
    this.auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, "urn:ietf:wg:oauth:2.0:oob");
    this.authorize()
      .then(() => (this.drive = google.drive({ version: "v3", auth: this.auth })))
      .catch((e) => logger(`Auth error: ${e.message}`));
  }

  logger(...args) {
    console.log(...args);
  }

  async authorize() {
    if (TOKEN) {
      const token = JSON.parse(TOKEN);
      this.auth.setCredentials(token);
    } else if (AUTH_CODE && !TOKEN) {
      const token = await this.getAuthToken(CLIENT_ID, CLIENT_SECRET, AUTH_CODE);
      console.log("Set this as your TOKEN env:", JSON.stringify(token));
      this.auth.setCredentials(token);
    } else if (!AUTH_CODE) {
      const authUrl = this.getAuthURL(CLIENT_ID, CLIENT_SECRET);
      logger(`Get AUTH_CODE enviorment variable by visiting this url: \n${authUrl}\n`);
    }
  }

  getAuthURL(clientId, clientSecret) {
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, "urn:ietf:wg:oauth:2.0:oob");
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES
    });
    return authUrl;
  }

  getAuthToken(clientId, clientSecret, authCode) {
    return new Promise((resolve, reject) => {
      const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, "urn:ietf:wg:oauth:2.0:oob");
      oAuth2Client.getToken(authCode, (err, token) => {
        err ? reject(err) : resolve(token);
      });
    });
  }

  getToken(authCode) {
    return new Promise((resolve, reject) => {
      oAuth2Client.getToken(authCode, (err, token) => {
        err ? reject(err) : resolve(token);
      });
    });
  }

  createFolder(name, parentId = PARENT_FOLDER) {
    return new Promise((resolve, reject) => {
      var fileMetadata = {
        name, mimeType: "application/vnd.google-apps.folder" , parents: parentId ? [parentId] : null
      }; // prettier-ignore
      this.drive.files.create(
        { supportsTeamDrives: true, resource: fileMetadata, fields: "id" },
        (err, file) => (err ? reject(err) : resolve(file))
      ); // prettier-ignore
    });
  }

  getFiles(folderId) {
    let query;
    const parent = folderId || PARENT_FOLDER;
    if (parent) query = `'${parent}' in parents and trashed = false`;
    else query = "trashed = false";
    return new Promise((resolve, reject) => {
      this.drive.files.list(
        {
          q: query,
          pageSize: 1000,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
          fields: "nextPageToken, files(id, name, modifiedTime, iconLink, mimeType, size)"
        },
        (err, res) => (err ? reject(err) : resolve({ nextPageToken: res.data.nextPageToken, files: res.data.files }))
      );
    });
  }

  getFileData(fileId) {
    return new Promise((resolve, reject) => {
      this.drive.files.get(
        { fileId,
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
          fields: "id, name, modifiedTime, iconLink, mimeType, size, hasThumbnail, thumbnailLink, capabilities"
        }, (err, res) => (err ? reject(err) : resolve(res.data))
      ); // prettier-ignore
    });
  }

  getFileStream(fileId, opts = {}) {
    return new Promise((resolve, reject) => {
      this.drive.files.get(
        { fileId, alt: "media" }, { responseType: "stream", ...opts },
        (err, res) => (err ? reject(err) : resolve(res))
      ); // prettier-ignore
    });
  }
}

module.exports = Drive;
