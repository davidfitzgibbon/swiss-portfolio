import React from "react";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
};

export default function Heading({ as: Comp = "h1", children }: Props) {
  return (
    <Comp className="font-ultra-light-wide mb-6 border-b-2 pb-2 text-5xl">
      {children}
    </Comp>
  );
}
