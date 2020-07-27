import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import parseCookies from "./utils/parseCookies";
import Navbar from "./components/Navbar";

const Folder = React.lazy(() => import("./pages/Folder"));
const File = React.lazy(() => import("./pages/File"));
const Share = React.lazy(() => import("./pages/Share"));
const Setup = React.lazy(() => import("./pages/Setup"));
const Login = React.lazy(() => import("./pages/Login"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const cookies = parseCookies(document.cookie);
      if (!cookies.basicauth) {
        setLoading(false);
        setLoggedIn(false);
        return;
      }
      setLoading(true);
      const host = window.location.host === "localhost:3000" ? "http://localhost:3001" : "";
      const req = await fetch(`${host}/checkAuth?basicauth=${cookies.basicauth}`).then((res) => res.json());
      if (req["auth"]) {
        setLoggedIn(true);
      } else {
        document.cookie = `basicauth=`;
        setLoggedIn(false);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Router>
        <Navbar />
        <main>
          <div className="loading-div" />
        </main>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar />
      <main>
        <Suspense fallback={<div className="loading-div" />}>
          <Switch>
            {loggedIn ? (
              <>
                <Route exact path="/" component={Folder} />
                <Route exact path="/:folderId" component={Folder} />
                <Route exact path="/file/:fileId" component={File} />
                <Route exact path="/share/:folderId" component={Share} />
                <Route exact path="/setup" component={Setup} />
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/share/:folderId" component={Share} />
                <Route exact path="/setup" component={Setup} />
              </>
            )}
            <Route component={() => <h2 style={{ textAlign: "center" }}>404 - Are you lost babygirl?</h2>} />
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
}
