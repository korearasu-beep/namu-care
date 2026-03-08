import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

const NAV_LINKS = [
  { to: '/', label: '서비스 안내' },
  { to: '/about', label: '회사소개' },
  { to: '/board', label: '소식/활동' },
  { to: '/contact', label: '상담신청' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setDrawerOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <nav
        className="nav-fixed"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 1.5rem',
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid #DDE5E0' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div
          className="nav-inner"
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 68,
          }}
        >
          {/* 로고 */}
          <Link to="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
            <img
              src="/images/logo.png"
              alt="나무재가 방문요양센터"
              style={{ height: 38, objectFit: 'contain', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline' }}
            />
            <span style={{ display: 'none', color: '#2D5A3D', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
              나무재가 방문요양센터
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#2C3E36',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#2D5A3D'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2C3E36'}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${phone}`}
              className="nav-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: '#2D5A3D',
                color: 'white',
                borderRadius: 9999,
                padding: '0.625rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(45,90,61,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5A1.5 1.5 0 014.5 3h2.42a1 1 0 01.95.68l.86 2.58a1 1 0 01-.3 1.05l-1.17.97a10.05 10.05 0 004.46 4.46l.97-1.17a1 1 0 011.05-.3l2.58.86a1 1 0 01.68.95v2.42a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" fill="currentColor"/></svg>
              <span>무료 상담</span>
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'block', width: 20, height: 2, backgroundColor: '#1f2937', borderRadius: 9999 }} />
            <span style={{ display: 'block', width: 20, height: 2, backgroundColor: '#1f2937', borderRadius: 9999 }} />
            <span style={{ display: 'block', width: 20, height: 2, backgroundColor: '#1f2937', borderRadius: 9999 }} />
          </button>

          {/* CSS로 모바일 햄버거 표시 제어 */}
          <style>{`
            @media (max-width: 1023px) {
              .nav-links { display: none !important; }
              .lg\\:hidden { display: flex !important; }
            }
          `}</style>
        </div>
      </nav>

      {/* 모바일 드로어 오버레이 */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* 모바일 사이드 드로어 */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 70,
          height: '100%',
          width: 288,
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', height: 64, borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ color: '#2D5A3D', fontWeight: 700, fontSize: '1.125rem' }}>메뉴</span>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', gap: 4 }}>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 500,
                  color: isActive ? '#2D5A3D' : '#374151',
                  backgroundColor: isActive ? '#E8F7EF' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={`tel:${phone}`}
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '0.875rem 0',
              backgroundColor: '#2D5A3D',
              color: 'white',
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5A1.5 1.5 0 014.5 3h2.42a1 1 0 01.95.68l.86 2.58a1 1 0 01-.3 1.05l-1.17.97a10.05 10.05 0 004.46 4.46l.97-1.17a1 1 0 011.05-.3l2.58.86a1 1 0 01.68.95v2.42a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" fill="currentColor"/></svg>
            무료 상담 {phone}
          </a>
        </div>
      </aside>
    </>
  )
}
