import React, { useState } from "react";

export default function Setup() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loadingAuthURL, setLoadingAuthURL] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [loadingToken, setLoadingToken] = useState(false);
  const [token, setToken] = useState("");
  const [scope, setScope] = useState("");
  const [parentFolder, setParentFolder] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getAuthURL = async () => {
    setLoadingAuthURL(true);
    const params = new URLSearchParams({
      clientId,
      clientSecret
    });
    const res = await fetch(`/api/getAuthURL?${params}`).then((res) => res.json());
    if (!res.error) window.open(res.authURL);
    setLoadingAuthURL(false);
  };

  const getAuthToken = async () => {
    setLoadingToken(true);
    const params = new URLSearchParams({
      clientId,
      clientSecret,
      authCode
    });
    const res = await fetch(`/api/getAuthToken?${params}`).then((res) => res.json());
    if (!res.error) setToken(JSON.stringify(res.token));
    setLoadingToken(false);
  };

  return (
    <section>
      <h1 style={{ marginBottom: 12 }}>Setup</h1>
      <h3>Drive</h3>
      <input type="text" name="clientId" value={clientId} placeholder="Client Id" onChange={(e) => setClientId(e.target.value)} />
      <input
        type="text"
        name="clientSecret"
        value={clientSecret}
        placeholder="Client Secret"
        onChange={(e) => setClientSecret(e.target.value)}
      />
      <button className="btn" onClick={getAuthURL} disabled={loadingAuthURL}>
        Get auth code
      </button>
      <input
        type="text"
        name="authCode"
        value={authCode}
        placeholder="Paste the auth code here"
        onChange={(e) => setAuthCode(e.target.value)}
      />
      <button className="btn" onClick={getAuthToken} disabled={!authCode || loadingToken}>
        Generate token
      </button>
      <input type="text" name="token" value={token} placeholder="Token value will show here" readOnly />
      <input
        type="text"
        name="parentFolder"
        value={parentFolder}
        placeholder={`Parent folder id (OPTIONAL) eg. 0ABZHZpfYfdVCUk9PVA`}
        onChange={(e) => setParentFolder(e.target.value)}
      />
      <input
        type="text"
        name="scope"
        value={scope}
        placeholder={`Scope (OPTIONAL) ["https://www.googleapis.com/auth/drive"]`}
        onChange={(e) => setScope(e.target.value)}
      />
      <h3>Auth</h3>
      <input type="text" name="username" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <h3>Enviorment variables:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CLIENT_ID</td>
            <td>{`${clientId}`}</td>
          </tr>
          <tr>
            <td>CLIENT_SECRET</td>
            <td>{`${clientSecret}`}</td>
          </tr>
          <tr>
            <td>TOKEN</td>
            <td>{`${token}`}</td>
          </tr>
          {parentFolder && (
            <tr>
              <td>PARENT_FOLDER</td>
              <td>{`${parentFolder}`}</td>
            </tr>
          )}
          {scope && (
            <tr>
              <td>SCOPE</td>
              <td>{`${scope}`}</td>
            </tr>
          )}
          {username && (
            <tr>
              <td>AUTH</td>
              <td>{`${username}:${password}`}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
