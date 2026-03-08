import { Link } from 'react-router-dom'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'
  const email = settings['이메일'] || 'namuhelp25@naver.com'
  const address = settings['주소'] || '충청남도 천안시 서북구 불당25로 174, 1021호'
  const hours = settings['운영시간'] || '평일·주말 포함 07:00 ~ 21:00'

  return (
    <footer style={{ backgroundColor: '#1A2B23', color: '#9BA8A0', padding: '64px 24px 40px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <img
                src="/images/logo.png"
                alt="나무재가 방문요양센터"
                style={{ height: 32, objectFit: 'contain', borderRadius: 6, filter: 'brightness(1.3)' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'inline' }}
              />
              <span style={{ display: 'none', color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>나무재가 방문요양센터</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#9BA8A0' }}>
              어르신과 보호자 모두 만족하는<br />편안한 도움 서비스를 제공하겠습니다.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 16 }}>서비스</h4>
            {['방문요양', '방문목욕', '복지용구', '치매예방활동지원'].map((l, i) => (
              <Link key={i} to="/" style={{ display: 'block', fontSize: 13, color: '#9BA8A0', marginBottom: 10, textDecoration: 'none' }}>
                {l}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 16 }}>연락처</h4>
            <p style={{ fontSize: 13, lineHeight: 2.2, color: '#9BA8A0' }}>
              📞 {phone}<br />
              📧 {email}<br />
              📍 {address}<br />
              🕐 {hours}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #374151', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(155,168,160,0.5)' }}>&copy; {new Date().getFullYear()} 나무재가방문요양. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['개인정보처리방침', '이용약관'].map((l, i) => (
              <Link key={i} to="#" style={{ fontSize: 12, color: 'rgba(155,168,160,0.5)', textDecoration: 'none' }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
