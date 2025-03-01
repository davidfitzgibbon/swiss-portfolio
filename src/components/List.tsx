import Heading from "./Heading";

type Props = {
  title: string;
  children: React.ReactNode;
}

export default function List({title,children}: Props) {
  
  return (
    <div className="layout">
      <a href={"#" + title.toLowerCase()}  className="text-red block mt-10 underline-offset-[.25em] decoration-1 underline" >
        <Heading>
          {title}
        </Heading>
      </a>
      <div className="list grid gap-4 sm:grid-cols-[3fr_1fr] sm:grid-rows-[repeat(2_min-content]">
        {children}
      </div>
    </div>
  )
}