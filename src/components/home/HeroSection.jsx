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
      parts.push(<span key={key++} style={{ color: '#2D5A3D' }}>{remaining.slice(start + 1, end)}</span>)
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
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(168deg, #FAFDF8 0%, #E8F7EF 50%, #F2FBF6 100%)',
        paddingTop: 68,
      }}
    >
      {/* Decorative blurs */}
      <div className="hero-blur-1" style={{ position: 'absolute', top: '5%', right: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,232,208,0.25), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div className="hero-blur-2" style={{ position: 'absolute', bottom: '0%', left: '-12%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,213,183,0.19), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Floating leaves */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            opacity: 0.12,
            top: `${15 + i * 18}%`,
            right: `${5 + i * 12}%`,
            transform: `rotate(${i * 45}deg)`,
            animation: `float ${4 + i}s ease-in-out infinite alternate`,
            pointerEvents: 'none',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" stroke="#2D5A3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <div
        className="hero-container"
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '60px 1.5rem 80px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="hero-content" style={{ maxWidth: 640 }}>
          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(45,90,61,0.06)',
              border: '1px solid rgba(45,90,61,0.12)',
              borderRadius: 9999,
              padding: '7px 16px',
              marginBottom: 28,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease',
              transitionDelay: '0.2s',
            }}
          >
            <div
              className="hero-badge-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#478A5F',
                boxShadow: '0 0 8px #478A5F',
              }}
            />
            <span className="hero-badge-text" style={{ fontSize: 13, fontWeight: 600, color: '#2D5A3D' }}>
              {badgeText}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-heading"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              fontWeight: 800,
              color: '#1A2B23',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              marginBottom: 24,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease',
              transitionDelay: '0.3s',
            }}
          >
            {renderHeading(heading)}
          </h1>

          {/* Description */}
          <p
            className="hero-desc"
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: '#5F706A',
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 480,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease',
              transitionDelay: '0.45s',
            }}
          >
            {description}
            <br /><strong style={{ color: '#2C3E36' }}>{boldLine}</strong>
          </p>

          {/* Buttons */}
          <div
            className="hero-buttons"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease',
              transitionDelay: '0.55s',
            }}
          >
            <a
              href={`tel:${phone}`}
              className="hero-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#2D5A3D',
                color: 'white',
                borderRadius: 12,
                padding: '16px 32px',
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(45,90,61,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              {btn1}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <Link
              to="/about"
              className="hero-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'white',
                color: '#2D5A3D',
                border: '1.5px solid #e5e7eb',
                borderRadius: 12,
                padding: '16px 28px',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {btn2}
            </Link>
          </div>

          {/* Credentials */}
          <div
            className="hero-credentials"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              marginTop: 48,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.7s ease',
              transitionDelay: '0.7s',
            }}
          >
            {credentials.map((t) => (
              <div key={t} className="hero-credential" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  className="hero-credential-icon"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(45,90,61,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4 6-8" stroke="#2D5A3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="hero-credential-text" style={{ fontSize: 14, color: '#5F706A', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: loaded ? 0.5 : 0,
          transition: 'opacity 1s ease',
          transitionDelay: '1.2s',
        }}
      >
        <span className="hero-scroll-text" style={{ fontSize: 12, color: '#9BA8A0', letterSpacing: '0.05em' }}>아래로 스크롤</span>
        <div className="hero-scroll-mouse" style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid #9BA8A0', position: 'relative' }}>
          <div className="hero-scroll-dot" style={{ width: 4, height: 8, borderRadius: 2, background: '#9BA8A0', position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes float { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-12px) rotate(5deg); } }
        @keyframes scrollPulse { 0%,100% { opacity:1; top:6px; } 50% { opacity:0.3; top:16px; } }
        @media (max-width: 639px) {
          .hero-buttons { flex-direction: column !important; }
          .hero-btn-primary, .hero-btn-secondary { width: 100% !important; justify-content: center !important; text-align: center; }
        }
      `}</style>
    </section>
  )
}
