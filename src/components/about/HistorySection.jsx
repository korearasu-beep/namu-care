import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'

const FALLBACK_HISTORY = [
  { year: '2025', events: ['나무재가방문요양센터 개소', '장기요양기관 지정'] },
  { year: '2024', events: ['방문요양 서비스 기획 및 준비', '요양보호사 팀 구성'] },
]

export default function HistorySection() {
  const { data } = useNotion('about')

  let history = FALLBACK_HISTORY
  if (data) {
    const historyItems = data.filter(d => d['구분'] === 'history').sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))
    if (historyItems.length > 0) {
      const grouped = {}
      for (const item of historyItems) {
        const year = String(item['연도'] || '')
        if (!grouped[year]) grouped[year] = []
        const events = (item['내용'] || '').split(',').map(s => s.trim()).filter(Boolean)
        grouped[year].push(...events)
      }
      history = Object.entries(grouped)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, events]) => ({ year, events }))
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-5">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-mint tracking-wide">HISTORY</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">연혁</h2>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-mint-light lg:-translate-x-px" />

          <div className="flex flex-col gap-10">
            {history.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.15}>
                <div className="relative flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-0">
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-deep-green rounded-full -translate-x-1.5 mt-1.5 ring-4 ring-mint-pale" />
                  <div className="lg:w-1/2 lg:text-right lg:pr-10 pl-10 lg:pl-0">
                    <span className="text-2xl font-bold text-deep-green">{item.year}</span>
                  </div>
                  <div className="lg:w-1/2 lg:pl-10 pl-10">
                    <ul className="flex flex-col gap-2">
                      {item.events.map((event) => (
                        <li key={event} className="text-gray-600 text-sm leading-relaxed">{event}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
