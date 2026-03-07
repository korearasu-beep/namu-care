import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'
  const email = settings['이메일'] || 'namuhelp25@naver.com'
  const address = settings['주소'] || '충청남도 천안시 서북구 불당25로 174, 1021호'
  const hours = settings['운영시간'] || '평일·주말 포함 07:00 ~ 21:00'

  return (
    <footer className="bg-[#1A2B23] text-[#9BA8A0]" style={{ padding: '64px 24px 40px' }}>
      <div className="mx-auto max-w-[1120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <img
                src="/images/logo.png"
                alt="나무재가 방문요양센터"
                className="h-8 object-contain rounded-md brightness-130"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline' }}
              />
              <span className="hidden text-white font-bold text-lg">나무재가 방문요양센터</span>
            </div>
            <p className="text-[13px] leading-[1.7] text-[#9BA8A0]">
              어르신과 보호자 모두 만족하는<br />편안한 도움 서비스를 제공하겠습니다.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">서비스</h4>
            {['방문요양', '방문목욕', '복지용구', '치매예방활동지원'].map((l, i) => (
              <Link key={i} to="/" className="block text-[13px] text-[#9BA8A0] mb-2.5 hover:text-[#B8E8D0] transition-colors">
                {l}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">연락처</h4>
            <p className="text-[13px] leading-[2.2] text-[#9BA8A0]">
              📞 {phone}<br />
              📧 {email}<br />
              📍 {address}<br />
              🕐 {hours}
            </p>
          </div>
        </div>

        <div className="border-t border-[#2C3E36] pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="text-xs text-[#9BA8A080]">&copy; {new Date().getFullYear()} 나무재가방문요양. All rights reserved.</p>
          <div className="flex gap-4">
            {['개인정보처리방침', '이용약관'].map((l, i) => (
              <Link key={i} to="#" className="text-xs text-[#9BA8A080] hover:text-[#9BA8A0] transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
