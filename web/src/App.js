import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const Folder = React.lazy(() => import("./pages/Folder"));
const File = React.lazy(() => import("./pages/File"));
const Share = React.lazy(() => import("./pages/Share"));
const Setup = React.lazy(() => import("./pages/Setup"));
const Login = React.lazy(() => import("./pages/Login"));

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Suspense fallback={<div className="loading-div" />}>
          <Switch>
            <Route exact path="/" component={Folder} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/:folderId" component={Folder} />
            <Route exact path="/file/:fileId" component={File} />
            <Route exact path="/share/:folderId" component={Share} />
            <Route exact path="/setup" component={Setup} />
            <Route component={() => <h2 style={{ textAlign: "center" }}>404 - Are you lost babygirl?</h2>} />
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
}
