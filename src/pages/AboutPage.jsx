import PageHeader from '../components/common/PageHeader'
import GreetingSection from '../components/about/GreetingSection'
import CoreValuesSection from '../components/about/CoreValuesSection'
import HistorySection from '../components/about/HistorySection'
import TeamSection from '../components/about/TeamSection'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tag="ABOUT US"
        title="나무처럼 깊은 뿌리로,"
        highlight="따뜻한 돌봄을 전합니다"
      />
      <GreetingSection />
      <CoreValuesSection />
      <HistorySection />
      <TeamSection />
    </>
  )
}
