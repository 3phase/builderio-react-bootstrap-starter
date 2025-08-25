import { builder, BuilderComponent } from "@builder.io/react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const API_KEY = import.meta.env.VITE_BUILDER_PUBLIC_API_KEY;
if (API_KEY) builder.init(API_KEY);

const BuilderPage: React.FC = () => {
  const { pathname, search } = useLocation();
  const urlPath = useMemo(() => `${pathname}${search}`, [pathname, search]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    setContent(null);
    if (!API_KEY) return;

    builder
      .get("page", {
        userAttributes: { urlPath }, // key bit: resolve content by URL
        options: { includeRefs: true },
      })
      .toPromise()
      .then((res) => {
        if (!res) setNotFound(true);
        setContent(res ?? null);
      })
      .catch(() => setNotFound(true));
  }, [urlPath]);

  if (!API_KEY) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          <strong>Missing API key.</strong> Set{" "}
          <code>VITE_BUILDER_PUBLIC_API_KEY</code> in your <code>.env</code>.
        </div>
      </div>
    );
  }

  return (
    <div className="builder-container">
      <BuilderComponent model="page" content={content} data={{}} />
      {notFound && (
        <div className="container py-5">
          <div className="alert alert-info" role="alert">
            No Builder page found for <code>{urlPath}</code>. Create one (model:{" "}
            <code>page</code>) and publish.
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderPage;
