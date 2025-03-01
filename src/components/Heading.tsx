import React from 'react'

type Props = {
  as?: "h1"|"h2"|"h3"|"h4";
  children: React.ReactNode;
}

export default function Heading({as:Comp = "h1", children}: Props) {
  return (
    <div className="border-b pb-2 mb-6">
      <Comp className='font-ultraLightWide text-5xl'>{children}</Comp>
    </div>
  )
}