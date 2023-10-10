"use client";
import React, { useState } from 'react'

type Props = {}

const NewsletterSubscribe = (props: Props) => {
  const [subscribed, setSubscribed] = useState<boolean>(false);

  async function create(formData: FormData) {
    const email = formData.get('email');
    await fetch('/api/beehiiv', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          setSubscribed(true);
        }
      }).catch(err => console.log(err));
  }

  if (subscribed) return (
    <div className='flex flex-col mt-4 text-white'><h2 className='text-2xl'>Thank you for subscribing!</h2><p>You&apos;ll receive the latest tech news and announcements in your inbox.</p></div>
  )

  return (
    <form action={create}>
      <div>
        <input type="email" name="email" id="email" placeholder='Enter your email' className='border-2 rounded-full rounded-r-none py-3 px-4 bg-gray-200 text-gray-800 outline-none placeholder-gray-500 focus:bg-gray-100 flex-1 p-2' />
        <button className=' border-2 rounded-full rounded-l-none py-3 px-4 bg-gray-900 text-gray-100 font-semibold uppercase hover:bg-gray-800'>Subscribe</button>
      </div>
    </form>
  )
}

export default NewsletterSubscribe