import { KeyTextField, PrismicDocument } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type ItemProps = {
  document: PrismicDocument;
  title: KeyTextField;
  viewMoreText?: KeyTextField;
};

export function Item({
  document,
  title,
  viewMoreText = "Read More",
}: ItemProps) {
  return (
    <PrismicNextLink
      document={document}
      className="transition-border group hover:border-red flex items-center justify-between overflow-hidden border-y border-transparent py-4 duration-200 md:border-y-2"
    >
      <svg
        viewBox="0 0 70 100"
        className="block h-[1.5em] w-[1em] translate-x-[-50%] transition-transform duration-200 group-hover:-translate-x-[0%]"
      >
        <path
          className="group-hover:fill-red fill-black"
          d="M0,0 L70,50 L0,100"
        />
      </svg>
      <div className="flex flex-1 justify-between px-3">
        <span className="text-l font-black">{title}</span>
        <span>{viewMoreText}</span>
      </div>
      <svg
        viewBox="0 0 70 100"
        className="block h-[1.5em] w-[1em] translate-x-[50%] transition-transform duration-200 group-hover:-translate-x-[0%]"
      >
        <path
          className="group-hover:fill-red fill-black"
          d="M70,0 L0,50 L70,100"
        />
      </svg>
    </PrismicNextLink>
  );
}
