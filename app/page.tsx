import Image from 'next/image'
import HeroSection from './home/HeroSection'
import Posts from './home/Posts'
import CalloutSection from './home/CalloutSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className='container'>
        <Posts />
      </div>
      <CalloutSection />
    </>
  )
}
