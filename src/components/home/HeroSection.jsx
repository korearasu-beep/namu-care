import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'
import { useMainContent } from '../../contexts/MainContentContext'

function renderHeading(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const parts = []
    let remaining = line
    let key = 0
    while (remaining.includes('{')) {
      const start = remaining.indexOf('{')
      const end = remaining.indexOf('}', start)
      if (end === -1) break
      if (start > 0) parts.push(<span key={key++}>{remaining.slice(0, start)}</span>)
      parts.push(<span key={key++} className="text-deep-green">{remaining.slice(start + 1, end)}</span>)
      remaining = remaining.slice(end + 1)
    }
    if (remaining) parts.push(<span key={key++}>{remaining}</span>)
    return <span key={i}>{parts}{i < lines.length - 1 && <br />}</span>
  })
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const { settings } = useSiteSettings()
  const { data: heroData } = useMainContent('hero')

  const hero = heroData[0] || {}
  const phone = settings['전화번호'] || '041-555-9991'
  const heading = hero['이름'] || '익숙한 우리 집에서,\n{뿌리 깊은 돌봄}을\n시작합니다'
  const description = hero['내용'] || '어르신이 오래 살아온 집에서 편안하게 돌봄받으실 수 있도록, 전문 요양보호사가 직접 방문합니다.'
  const boldLine = hero['값'] || '장기요양 등급 신청부터 서비스까지 한 번에.'
  const badgeText = hero['값2'] || '제주도 포함 전국 재가방문요양 전문기관'
  const btn1 = settings['히어로버튼1'] || '무료 상담 신청하기'
  const btn2 = settings['히어로버튼2'] || '등급 신청 대행 안내'
  const credentials = (settings['자격뱃지'] || '장기요양기관 지정, 전문 요양보호사, 치매예방 특화').split(',').map(s => s.trim())

  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FAFDF8] via-mint-pale to-[#F2FBF6] flex items-center overflow-hidden pt-16">
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_#B8E8D030,_transparent_70%)] blur-[40px]" />
      <div className="absolute bottom-[5%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_#8FD5B720,_transparent_70%)] blur-[50px]" />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.12]"
          style={{
            top: `${15 + i * 18}%`,
            right: `${5 + i * 12}%`,
            transform: `rotate(${i * 45}deg)`,
            animation: `float ${4 + i}s ease-in-out infinite alternate`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" stroke="#2D5A3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
          </svg>
        </div>
      ))}

      <div className="mx-auto max-w-6xl px-6 py-16 pb-20 w-full relative z-[2]">
        <div className="max-w-[640px]">
          <div
            className="inline-flex items-center gap-2 bg-deep-green/[0.06] border border-deep-green/[0.12] rounded-full px-4 py-[7px] mb-7 transition-all duration-600"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '0.2s' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#478A5F] shadow-[0_0_8px_#478A5F]" />
            <span className="text-[13px] font-semibold text-deep-green">{badgeText}</span>
          </div>

          <h1
            className="text-[clamp(32px,5vw,52px)] font-extrabold text-gray-900 leading-[1.3] tracking-tight mb-5 transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '0.3s' }}
          >
            {renderHeading(heading)}
          </h1>

          <p
            className="text-[clamp(16px,2vw,19px)] text-gray-500 leading-[1.7] mb-10 max-w-[480px] transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '0.45s' }}
          >
            {description}
            <br /><strong className="text-gray-700">{boldLine}</strong>
          </p>

          <div
            className="flex flex-wrap gap-3.5 transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '0.55s' }}
          >
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 bg-deep-green text-white rounded-[14px] px-8 py-4 text-base font-bold shadow-[0_4px_24px_rgba(45,90,61,0.2)] hover:bg-deep-green/90 transition-colors"
            >
              {btn1}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <Link
              to="/about"
              className="bg-white text-deep-green border-[1.5px] border-gray-200 rounded-[14px] px-7 py-4 text-base font-semibold hover:border-deep-green hover:bg-mint-pale transition-all"
            >
              {btn2}
            </Link>
          </div>

          <div
            className="flex flex-wrap gap-6 mt-12 transition-all duration-700"
            style={{ opacity: loaded ? 1 : 0, transitionDelay: '0.7s' }}
          >
            {credentials.map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <div className="w-[22px] h-[22px] rounded-full bg-deep-green/[0.07] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-8" stroke="#2D5A3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="text-sm text-gray-500 font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-1000"
        style={{ opacity: loaded ? 0.5 : 0, transitionDelay: '1.2s' }}
      >
        <span className="text-xs text-gray-400 tracking-[0.05em]">아래로 스크롤</span>
        <div className="w-6 h-[38px] rounded-xl border-2 border-gray-400 relative">
          <div className="w-1 h-2 rounded-sm bg-gray-400 absolute left-1/2 top-1.5 -translate-x-1/2 animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes float { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-12px) rotate(5deg); } }
        @keyframes scrollPulse { 0%,100% { opacity:1; top:6px; } 50% { opacity:0.3; top:16px; } }
      `}</style>
    </section>
  )
}
