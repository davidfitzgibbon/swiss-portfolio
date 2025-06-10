import { JSXMapSerializer } from "@prismicio/react";

export const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="mb-4 max-w-[70ch] text-lg/8 last:mb-0">{children}</p>
  ),
  list: ({ children }) => <ul className="list-disc pl-[1em]">{children}</ul>,
};
