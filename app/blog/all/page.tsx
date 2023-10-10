import React from 'react'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import AllPosts from './AllPosts'

type Props = {}

const page = async (props: Props) => {

  type PostWithCategories = Prisma.PostGetPayload<{
    include: { categories: true }
  }>

  const posts: PostWithCategories[] = await prisma.post.findMany({
    include: {
      categories: true
    }
  })

  const categories = await prisma.category.findMany();

  return (
    <div className='my-24 container'>
      <h2 className='text-4xl text-center my-6'>All Articles</h2>
      <AllPosts categories={categories} posts={posts} /></div>
  )
}

export default page