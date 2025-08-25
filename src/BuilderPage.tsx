import React, { useEffect, useMemo, useState } from "react";
import { builder, BuilderComponent } from "@builder.io/react";

// Initialize Builder with the public API key from env
const API_KEY = import.meta.env.VITE_BUILDER_PUBLIC_API_KEY;
if (API_KEY) builder.init(API_KEY);

// Auto-register our custom components
import "./custom-components/register";

const BuilderPage: React.FC = () => {
  const { pathname, search } = useLocation();
  const urlPath = useMemo(() => `${pathname}${search}`, [pathname, search]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => setNotFound(false), [urlPath]);

  if (!API_KEY) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          <strong>Missing API key.</strong> Set{" "}
          <code>VITE_BUILDER_PUBLIC_API_KEY</code> in your <code>.env</code>{" "}
          file.
        </div>
      </div>
    );
  }

  return (
    <div className="builder-container">
      <BuilderComponent
        model="page"
        options={{ includeRefs: true }}
        data={{}}
        locale={undefined}
        urlPath={urlPath}
        contentLoaded={(content: unknown) => {
          if (!content) setNotFound(true);
        }}
      />

      {notFound && (
        <div className="container py-5">
          <div className="alert alert-info" role="alert">
            No Builder page found for <code>{urlPath}</code>. Create one in
            Builder (model: <code>page</code>) and publish.
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderPage;
