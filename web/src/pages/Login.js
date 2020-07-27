import React, { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkAuth = async () => {
    if (loading) return;
    setLoading(true);
    const user = btoa(`${username}:${password}`);
    const host = window.location.host === "localhost:3000" ? "http://localhost:3001" : "";
    const req = await fetch(`${host}/checkAuth?basicauth=${user}`).then((res) => res.json());
    if (req["auth"]) {
      document.cookie = `basicauth=${user}`;
      setLoggedIn(true);
    } else {
      setError("Wrong username or password");
      setLoading(false);
    }
  };

  if (loggedIn) {
    window.location = "/";
    return null;
  }

  return (
    <div className="login-div">
      <h2 style={{ textAlign: "center" }}>Log in</h2>
      <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={checkAuth} disabled={loading}>
        Login
      </button>
      {error && <h4 style={{ color: "red" }}>{error}</h4>}
    </div>
  );
}
