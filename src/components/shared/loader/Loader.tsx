import React from "react";

type LoaderProps = {
  animeType: "pulse" | "fade";
  children: React.ReactNode;
};

export const Loader = ({ animeType, children }: LoaderProps) => (
  <div className={`loader ${animeType}`}>{children}</div>
);
