"use client";
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { createPost } from "@/app/actions/publishPost";
import Link from 'next/link';
import type { Category } from '@prisma/client';
import CategoryDropdown from './CategoryDropdown';
import { Prisma } from '@prisma/client';

type Props = {
  blogCategories: Category[]
}

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "../../utils/uploadthing";


const NewBlogForm = (props: Props) => {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [postID, setPostID] = useState<number | null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!session && status !== "loading") return (
    <div>You must be signed in to post</div>
  )

  console.log(props.blogCategories)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = session?.user as any;
    const userId = user?.id;

    if (!userId) return;
    try {
      let newPost: Prisma.PostUncheckedCreateInput = { title, content, authorId: userId, imgURL: thumbnail }

      if (categoryId) {
        newPost.categories = {
          connect: [{ id: categoryId }]
        }
      }
      const post = await createPost(newPost);
      setPostID(post.id);
      setSubmitted(true);
    } catch (error) {
      console.log(error)
    }
  }

  if (submitted) return (
    <div className='py-2 container flex flex-col mt-12'>
      <div className='flex flex-col flex-1 items-stretch justify-center h-full text-left border p-8'><h1 className='text-4xl'>Your post has been published:</h1>
        <Link href={`/blog/${postID}`} className='text-indigo-500 text-xl mt-4'>Click here to view</Link>
      </div>
    </div>
  )

  return (
    <div className='min-h-[calc(100vh-130px)] py-2 container flex flex-col mt-12'><form className='flex flex-col flex-1 items-stretch justify-center h-full text-left' onSubmit={handleSubmit}>
      <input type="text" className='text-6xl focus-visible:outline-none' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} name="title" />
      <textarea name="content" className='flex-1 focus-visible:outline-none text-4xl mt-2' value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="self-start">
        {
          thumbnail && <img src={thumbnail} alt="Thumbnail" className='w-20 h-20 object-cover rounded-full' />
        }
        <label className='text-slate-600 mb-3'>{thumbnail ? "Change Image" : "Add thumbnail image(optional)"}</label>
        <UploadButton
          className='items-start'
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            if (res) {
              setThumbnail(res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <CategoryDropdown list={props.blogCategories} selected={categoryId} setSelected={(selected: number) => setCategoryId(selected)} />
      </div>
      <button type="submit" className='w-fit-content text-white bg-indigo-400 px-4 py-2 sm:px-6 sm:py-4 mt-6 border-2 rounded shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]'>Create</button>
    </form></div>
  )
}

export default NewBlogForm