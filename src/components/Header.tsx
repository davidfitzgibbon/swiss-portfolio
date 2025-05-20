import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import React from "react";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header>
      <nav aria-label="main" className="homeMenu mt-4 text-red">
        <ul className="flex content-center justify-center list-none">
          <li className='flex after:content-["•"] after:px-1 last:after:content-[]'>
            <Link className="uppercase font-light" href={`/`}>
              Home
            </Link>
          </li>
          {settings.data.navigation.map((item) => (
            <li
              key={item.link.text}
              className='flex after:content-["•"] after:px-1 last:after:content-[]'
            >
              <PrismicNextLink field={item.link} className="uppercase" />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
