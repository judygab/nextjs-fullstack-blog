import React from 'react'
import type { Category } from '@prisma/client'

export type CategorySelectorProps = {
  categories: Category[]
}

type CategorySelectorPropsWithState = CategorySelectorProps & {
  selectCategory: (id: number | null) => void,
  selectedCategoryId: number | null
}

export const CategorySelector = (props: CategorySelectorPropsWithState) => {
  const bgClasses = [
    'bg-pink-500',
    'bg-blue-500',
    'bg-yellow-500',
  ]

  return (
    <div className='flex  flex-col justify-center my-4'>
      <div className='flex justify-center flex-wrap'>
        {
          props.categories.map((category, index) => (
            <button key={category.id}
              onClick={() => props.selectCategory(category.id)}
              className={`inline-block rounded-full text-xl px-4 py-2 text-white mr-4 mb-4 ${bgClasses[index]} ${props.selectedCategoryId === category.id ? "neo-shadow" : ""}`}>{category.name}</button>
          ))
        }
      </div>
      {props.selectedCategoryId ? <button className="cursor-pointer underline" key="remove selection" onClick={() => props.selectCategory(null)}>
        Remove Selection
      </button> : null}
    </div>
  )
}