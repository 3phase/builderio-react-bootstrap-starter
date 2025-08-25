import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import BuilderPage from "./BuilderPage";

const Home: React.FC = () => (
  <div className="container py-4">
    <h1 className="display-5 fw-bold">React × Builder.io × Bootstrap (TS)</h1>
    <p className="lead">
      This is the local fallback Home route. If you create a Builder page at{" "}
      <code>/</code>, it will override this automatically.
    </p>
    <div className="row g-3">
      <div className="col-md-6">
        <div className="card bg-dark border-secondary">
          <div className="card-body">
            <h5 className="card-title">Start in Builder</h5>
            <ol className="mb-0">
              <li>
                Create a <strong>page</strong> model entry
              </li>
              <li>
                Target URL: <code>/</code> (or any path)
              </li>
              <li>Publish, then visit that path here</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card bg-dark border-secondary">
          <div className="card-body">
            <h5 className="card-title">Custom Components</h5>
            <p className="mb-0">
              This template registers a <em>Hero</em> component you can drag
              into Builder.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const About: React.FC = () => (
  <div className="container py-4">
    <h2>About</h2>
    <p>
      Update this route or build it entirely in Builder by publishing a page at{" "}
      <code>/about</code>.
    </p>
  </div>
);

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div className="container py-5">Loading…</div>}>
        <Routes>
          {/* Catch-all: render Builder content for any unmatched path */}
          <Route path="*" element={<BuilderPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
