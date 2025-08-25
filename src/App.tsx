// src/App.tsx
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import BuilderPage from "./BuilderPage";

const App: React.FC = () => (
  <>
    <Suspense fallback={<div className="container py-5">Loading…</div>}>
      <Routes>
        {/* Catch-all to Builder */}
        <Route path="*" element={<BuilderPage />} />
      </Routes>
    </Suspense>
  </>
);

export default App;
