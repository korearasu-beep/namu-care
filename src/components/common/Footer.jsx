import { Link } from 'react-router-dom'

const SERVICE_LINKS = [
  { to: '/', label: '서비스 안내' },
  { to: '/about', label: '회사소개' },
  { to: '/board', label: '소식/활동' },
  { to: '/contact', label: '상담신청' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A2B23] text-gray-300">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:py-16">
        {/* 3컬럼 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* 로고 + 태그라인 */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="나무재가 방문요양센터"
                className="h-8 brightness-0 invert opacity-90"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline' }}
              />
              <span className="hidden text-white font-bold text-lg">나무재가 방문요양센터</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              어르신과 보호자 모두 만족하는
              <br />
              편안한 도움 서비스를 제공하겠습니다.
            </p>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">서비스</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-mint transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">연락처</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <PhoneIcon />
                <a href="tel:041-555-9991" className="hover:text-mint transition-colors">
                  041-555-9991
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MailIcon />
                <a href="mailto:namuhelp25@naver.com" className="hover:text-mint transition-colors">
                  namuhelp25@naver.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapIcon />
                <span>충청남도 천안시 서북구 불당25로 174, 1021호</span>
              </li>
              <li className="flex items-start gap-2">
                <ClockIcon />
                <span>평일·주말 포함 07:00~21:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} 나무재가방문요양. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">
              개인정보처리방침
            </Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
