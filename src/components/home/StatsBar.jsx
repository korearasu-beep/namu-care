import { useEffect, useRef, useState } from 'react'
import { useMainContent } from '../../contexts/MainContentContext'

const FALLBACK_STATS = [
  { number: '1,051만', label: '65세 이상 고령 인구', sub: '2025년 기준' },
  { number: '20.3%', label: '초고령사회 공식 진입', sub: '전체 인구 대비' },
  { number: '116.5만', label: '장기요양 수급자', sub: '매년 증가 추세' },
]

export default function StatsBar() {
  const { data: statsData } = useMainContent('stats')
  const STATS = statsData.length > 0
    ? statsData.map(s => ({ number: s['이름'], label: s['내용'], sub: s['값'] || '' }))
    : FALLBACK_STATS
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E4A30 0%, #2D5A3D 40%, #2A6B3F 100%)' }}
    >
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #8FD5B7 1px, transparent 1px), radial-gradient(circle at 80% 20%, #8FD5B7 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute -top-[60px] -right-[60px] w-[250px] h-[250px] rounded-full bg-[#8FD5B715]" />
      <div className="absolute -bottom-[40px] -left-[40px] w-[180px] h-[180px] rounded-full bg-[#B8E8D010]" />
      <div className="mx-auto max-w-[1120px] px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-[1]">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="text-center transition-all duration-600"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.15}s`,
            }}
          >
            <div className="text-[40px] font-extrabold text-[#B8E8D0] tracking-tight leading-none">{s.number}</div>
            <div className="text-[15px] font-semibold text-white mt-2">{s.label}</div>
            {s.sub && <div className="text-xs text-[#B8E8D0] opacity-60 mt-1">{s.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
