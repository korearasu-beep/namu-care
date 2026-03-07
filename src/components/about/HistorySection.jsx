import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'

const FALLBACK_HISTORY = [
  { year: '2025', events: ['나무재가방문요양센터 설립', '장기요양기관 지정', '치매예방활동지원 프로그램 도입'] },
  { year: '2026', events: ['제주도 포함 전국 서비스 확대', '전문 요양보호사 팀 확충', '온라인 상담 시스템 구축'] },
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
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([year, events]) => ({ year, events }))
    }
  }

  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-[700px]">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3">HISTORY</span>
            <h2 className="text-[clamp(26px,4vw,36px)] font-extrabold text-gray-900 leading-[1.35]">
              나무재가의 <span className="text-deep-green">발자취</span>
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[60px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B8E8D0] to-[rgba(45,90,61,0.25)] rounded-full" />

          {history.map((t, ti) => (
            <FadeIn key={ti} delay={ti * 0.15}>
              <div className={`flex gap-8 ${ti < history.length - 1 ? 'mb-12' : ''}`}>
                {/* Year badge */}
                <div className="w-[120px] shrink-0 text-center">
                  <div className="inline-flex items-center justify-center bg-gradient-to-br from-deep-green to-[#478A5F] text-white text-lg font-extrabold px-5 py-2 rounded-full shadow-[0_4px_16px_rgba(45,90,61,0.2)] relative z-[1]">
                    {t.year}
                  </div>
                </div>

                {/* Events */}
                <div className="pt-1">
                  {t.events.map((e, ei) => (
                    <div key={ei} className={`flex items-center gap-2.5 ${ei < t.events.length - 1 ? 'mb-3.5' : ''}`}>
                      <div className="w-2 h-2 rounded-full bg-mint shrink-0" />
                      <span className="text-[15px] text-gray-700 font-medium">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 p-4 rounded-xl bg-deep-green/[0.04] border border-dashed border-deep-green/[0.12] text-center">
            <p className="text-[13px] text-gray-400">
              💡 실제 연혁 데이터를 제공해 주시면 업데이트하겠습니다.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
