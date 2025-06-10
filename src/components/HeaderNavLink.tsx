"use client";

import clsx from "clsx";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { asLink, LinkField } from "@prismicio/client";

type HeaderNavLinkProps = {
  field: LinkField;
  children?: ReactNode;
};

export function HeaderNavLink({ field, children }: HeaderNavLinkProps) {
  const pathname = usePathname();
  const href = asLink(field) ?? "/";
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={clsx("uppercase", isActive && "font-black")}>
      {children ?? field.text}
    </Link>
  );
}
