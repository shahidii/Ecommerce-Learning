import CategoryShowcase from '@/components/home/CategoryShowcase'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import GrowthChart from '@/components/home/GrowthChart'
import Hero from '@/components/home/Hero'
import Promises from '@/components/home/Promises'

export default function HomePage() {
  return (
    <>
      <Hero />
      <GrowthChart />
      <CategoryShowcase />
      <Promises />
      <FeaturedProducts />
    </>
  )
}
