import PageHeader from '../components/common/PageHeader'
import GreetingSection from '../components/about/GreetingSection'
import CoreValuesSection from '../components/about/CoreValuesSection'
import HistorySection from '../components/about/HistorySection'
import TeamSection from '../components/about/TeamSection'
import { useMainContent } from '../contexts/MainContentContext'

export default function AboutPage() {
  const { data: headerData } = useMainContent('page-about')
  const h = headerData[0] || {}

  return (
    <>
      <PageHeader
        tag={h['내용'] || 'ABOUT US'}
        title={h['이름'] || '나무처럼 깊은 뿌리로,'}
        highlight={h['값'] || '따뜻한 돌봄을 전합니다'}
      />
      <GreetingSection />
      <CoreValuesSection />
      <HistorySection />
      <TeamSection />
    </>
  )
}
