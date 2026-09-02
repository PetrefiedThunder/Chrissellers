import Nav from '@/src/components/Nav'
import Hero from '@/src/components/Hero'
import Work from '@/src/components/Work'
import Career from '@/src/components/Career'
import Contact from '@/src/components/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Career />
      </main>
      <Contact />
    </>
  )
}
