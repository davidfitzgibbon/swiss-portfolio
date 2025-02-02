import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import { createClient } from '@/prismicio';
import { Content } from '@prismicio/client';
import React from 'react'

type Props = {
  id: string;
}

export async function Article({id}: Props) {
  const client = createClient();
  const article = await client.getByID<Content.ArticleDocument>(id)
  return (
    <a href="#articles" className='article grid first:row-span-2 project border-solid border-black border-2 grid grid-rows-[min-content_1fr]'>
      <h3 className='p-4 leading-5 border-b-2'>{article.data.title}</h3>
      <div className="p-4 self-center grid place-items-center">
        <ArticleTeaser />
      </div>
    </a>
  )
}