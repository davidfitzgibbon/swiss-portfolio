import { Fragment } from "react";
import { createClient } from "@/prismicio";
import { HeaderNavLink } from "./HeaderNavLink";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="py-4 text-red">
      <nav aria-label="main">
        <ul className="flex items-center justify-center gap-4">
          {settings.data.navigation.map((item) => (
            <Fragment key={item.link.text}>
              <li>
                <HeaderNavLink field={item.link} />
              </li>
              <li
                aria-hidden
                className="size-1 rounded-full bg-current last:hidden"
              />
            </Fragment>
          ))}
        </ul>
      </nav>
    </header>
  );
}
