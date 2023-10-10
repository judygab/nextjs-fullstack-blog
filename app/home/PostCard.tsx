import React from 'react'
import type { Post } from '@prisma/client';
import Link from 'next/link';

type Props = {
  post: Post,
  className?: string,
}

const PostCard = ({ post, className }: Props) => {
  return (
    <Link href={`/blog/${post.id}`} className={`${className} p-4 rounded border-2 line-clamp-7 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]`}><h3 className='text-2xl lg:text-3xl mb-3'>{post.title}</h3>
      <p className='line-clamp-6'>{post.content}</p>
    </Link>
  )
}

export default PostCard