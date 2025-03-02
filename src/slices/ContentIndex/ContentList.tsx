import { Content } from '@prismicio/client'
import Link from 'next/link';
import React from 'react'

type Props = {
  items: Content.BlogPostDocument[] | Content.ProjectPostDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
}

export default function ContentList({items, contentType, viewMoreText="Read More"}: Props) {
  const urlPrefix = contentType === "Project" ? "projects" : "blog";
  return (
    <>
      <ul className='mt-8'>
        {items.map((item, index)=>(
          <li key={index} className='mt-4'>
            <Link href={`${urlPrefix}/${item.uid}`} className='flex justify-between items-center transition-border border-transparent duration-200 border-t border-b hover:border-red py-4 group overflow-hidden'>
              <svg viewBox="0 0 70 100" className='transition-transform duration-200 w-8 h-[1.5em] w-[min-content] block translate-x-[-50%]  group-hover:translate-x-[0%]'>
                <path className='fill-black group-hover:fill-red' d="M0,0 L70,50 L0,100" />
              </svg>
              <div className="flex justify-between flex-1 px-3 w-[max-content]">
                <h2 className='font-black text-l'>{item.data.meta_title}</h2>
                <span>{viewMoreText}</span>
              </div>
              <svg viewBox="0 0 70 100" className='transition-transform duration-200 w-8 h-[1.5em] w-[min-content] block translate-x-[50%]  group-hover:translate-x-[0%]'>
                <path className='fill-black group-hover:fill-red' d="M70,0 L0,50 L70,100" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}