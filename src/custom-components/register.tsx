import React from "react";
import { Builder } from "@builder.io/react";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  bg?: string;
}

/** Simple Bootstrap Hero component to use inside Builder */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaHref,
  bg,
}) => {
  return (
    <section className="py-5" style={{ background: bg || "#111827" }}>
      <div className="container text-center text-white">
        <h1 className="display-4 fw-bold mb-3">{title}</h1>
        {subtitle && <p className="lead mb-4">{subtitle}</p>}
        {ctaText && (
          <a href={ctaHref || "#"} className="btn btn-primary btn-lg">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

// Register with Builder so it appears in the editor's Insert tab
Builder.registerComponent(Hero, {
  name: "Hero",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
      defaultValue: "Welcome to Builder",
    },
    { name: "subtitle", type: "string" },
    { name: "ctaText", type: "string", friendlyName: "CTA Text" },
    {
      name: "ctaHref",
      type: "url",
      friendlyName: "CTA Link",
      defaultValue: "#",
    },
    { name: "bg", type: "color", friendlyName: "Background" },
  ],
  canHaveChildren: true,
});
