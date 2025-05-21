import { Fragment } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="text-red mx-auto w-full max-w-5xl py-4 md:py-6">
      <nav aria-label="footer">
        <ul className="flex items-center justify-center gap-4">
          {settings.data.footerlinks.map((item) => (
            <Fragment key={item.link.text}>
              <li>
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage
                    field={item.icon}
                    className="size-8 md:size-12"
                  />
                </PrismicNextLink>
              </li>
              <li
                aria-hidden
                className="size-1 rounded-full bg-current last:hidden"
              />
            </Fragment>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
