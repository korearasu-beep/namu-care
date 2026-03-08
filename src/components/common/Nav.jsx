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
        className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid #DDE5E0' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="mx-auto max-w-[1120px] flex items-center justify-between h-[68px]">
          {/* 로고 */}
          <Link to="/" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="나무재가 방문요양센터"
              className="h-[38px] object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline' }}
            />
            <span className="hidden text-deep-green font-bold text-lg tracking-tight">
              나무재가 방문요양센터
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[15px] font-medium text-[#2C3E36] hover:text-deep-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 bg-deep-green text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-[0_4px_16px_rgba(45,90,61,0.3)] hover:bg-deep-green/90 hover:shadow-[0_6px_24px_rgba(45,90,61,0.35)] transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5A1.5 1.5 0 014.5 3h2.42a1 1 0 01.95.68l.86 2.58a1 1 0 01-.3 1.05l-1.17.97a10.05 10.05 0 004.46 4.46l.97-1.17a1 1 0 011.05-.3l2.58.86a1 1 0 01.68.95v2.42a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" fill="currentColor"/></svg>
              <span>무료 상담</span>
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
          >
            <span className="block w-5 h-[2px] bg-gray-800 rounded-full" />
            <span className="block w-5 h-[2px] bg-gray-800 rounded-full" />
            <span className="block w-5 h-[2px] bg-gray-800 rounded-full" />
          </button>
        </div>
      </nav>

      {/* 모바일 드로어 오버레이 */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* 모바일 사이드 드로어 */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <span className="text-deep-green font-bold text-lg">메뉴</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-800"
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-5 gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive ? 'text-deep-green bg-mint-pale' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={`tel:${phone}`}
            className="mt-4 flex items-center justify-center gap-2 py-3.5 bg-deep-green text-white text-[15px] font-semibold rounded-xl hover:bg-deep-green/90 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5A1.5 1.5 0 014.5 3h2.42a1 1 0 01.95.68l.86 2.58a1 1 0 01-.3 1.05l-1.17.97a10.05 10.05 0 004.46 4.46l.97-1.17a1 1 0 011.05-.3l2.58.86a1 1 0 01.68.95v2.42a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" fill="currentColor"/></svg>
            무료 상담 {phone}
          </a>
        </div>
      </aside>
    </>
  )
}
