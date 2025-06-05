import React from "react";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
};

export default function Heading({ as: Comp = "h1", children }: Props) {
  return (
    <Comp className="font-ultra-light-wide mb-6 border-b pb-4 text-5xl md:mb-8 md:border-b-2 md:pb-6 md:text-7xl">
      {children}
    </Comp>
  );
}
