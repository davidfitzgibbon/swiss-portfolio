import React from "react";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
};

export default function Heading({ as: Comp = "h1", children }: Props) {
  return (
    <Comp className="mb-6 border-b pb-2 font-ultraLightWide text-5xl">
      {children}
    </Comp>
  );
}
