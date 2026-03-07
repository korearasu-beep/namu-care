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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 페이지 이동 시 드로어 닫기
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  // 드로어 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
            : 'bg-white/0'
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-16 lg:h-[72px]">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/images/logo.png"
              alt="나무재가 방문요양센터"
              className="h-9 lg:h-10"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
            />
            <span
              className="hidden items-center gap-1 text-deep-green font-bold text-lg tracking-tight"
              style={{ display: 'none' }}
            >
              나무재가 방문요양센터
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'text-deep-green bg-mint-pale'
                      : 'text-gray-600 hover:text-deep-green hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={`tel:${phone}`}
              className="ml-3 px-5 py-2.5 bg-deep-green text-white text-sm font-semibold rounded-xl hover:bg-deep-green/90 transition-colors"
            >
              무료 상담
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
                  isActive
                    ? 'text-deep-green bg-mint-pale'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          <a
            href={`tel:${phone}`}
            className="mt-4 flex items-center justify-center py-3.5 bg-deep-green text-white text-[15px] font-semibold rounded-xl hover:bg-deep-green/90 transition-colors"
          >
            무료 상담 {phone}
          </a>
        </div>
      </aside>

      {/* 네비게이션 높이만큼 spacer */}
      <div className="h-16 lg:h-[72px]" />
    </>
  )
}
