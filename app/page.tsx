import Hero from '@/components/Hero'
import Services from '@/components/Services'
import FeaturedProducts from '@/components/FeaturedProducts'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Contact />
    </div>
  )
}

