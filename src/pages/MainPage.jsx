import HeroSection from '../components/home/HeroSection'
import StatsBar from '../components/home/StatsBar'
import ServiceSection from '../components/home/ServiceSection'
import ComparisonTable from '../components/home/ComparisonTable'
import WhyChooseSection from '../components/home/WhyChooseSection'
import CTASection from '../components/home/CTASection'

export default function MainPage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServiceSection />
      <ComparisonTable />
      <WhyChooseSection />
      <CTASection />
    </>
  )
}
