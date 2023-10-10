import React from 'react'
import NewBlogForm from './NewBlogForm'
import { getCategories } from '@/app/actions/getCategories'

type Props = {}

const page = async (props: Props) => {
  const categories = await getCategories();

  return (
    <div>
      <NewBlogForm blogCategories={categories} />
    </div>
  )
}

export default page