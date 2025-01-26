import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next';
import React from 'react'

type Props = {}

export async function Header({}: Props) {

  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <nav aria-label='main' className="homeMenu mt-4 text-red">
      <ul className='flex content-center justify-center list-none'>
        {settings.data.navigation.map((item)=>(
          <li key={item.link.text} className='flex after:content-["•"] after:px-1 last:after:content-[]'>
            <PrismicNextLink className='uppercase font-light' field={item.link} />
          </li>
        ))}
      </ul>
    </nav>
  )
}