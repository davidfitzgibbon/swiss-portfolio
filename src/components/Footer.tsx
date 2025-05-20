import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="layout">
      <div className="inset">
        <nav
          aria-label="footer"
          className="homeMenu mt-4 mb-4 text-red border-t border-black"
        >
          <ul className="flex content-center justify-center items-center mt-2 list-none">
            {settings.data.footerlinks.map((item) => (
              <li
                key={item.link.text}
                className='flex after:content-["•"] after:px-1 last:after:content-[]'
              >
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage field={item.icon} className="w-[2em]" />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
