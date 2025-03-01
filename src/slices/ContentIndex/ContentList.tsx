import { Content } from '@prismicio/client'
import Link from 'next/link';
import React from 'react'

type Props = {
  items: Content.BlogPostDocument[] | Content.ProjectPostDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
}

export default function ContentList({items, contentType, fallbackItemImage, viewMoreText="Read More"}: Props) {
  const urlPrefix = contentType === "Project" ? "projects" : "blog";
  return (
    <>
      <ul className='mt-8'>
        {items.map((item, index)=>(
          <li key={index} className='mt-4'>
            <Link href={`${urlPrefix}/${item.uid}`}>
              <div>
                <span>{item.data.title}</span>
              </div>
              <span>{viewMoreText}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}