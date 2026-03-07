import FadeIn from '../common/FadeIn'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

const ICONS = {
  전화: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  이메일: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  주소: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  운영시간: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function ContactInfo() {
  const { settings } = useSiteSettings()

  const INFO = [
    { label: '전화', value: settings['전화번호'] || '041-555-9991', href: `tel:${settings['전화번호'] || '041-555-9991'}` },
    { label: '이메일', value: settings['이메일'] || 'namuhelp25@naver.com', href: `mailto:${settings['이메일'] || 'namuhelp25@naver.com'}` },
    { label: '주소', value: settings['주소'] || '충청남도 천안시 서북구 불당25로 174, 1021호' },
    { label: '운영시간', value: settings['운영시간'] || '평일·주말 포함 07:00~21:00' },
  ]

  return (
    <div className="flex flex-col gap-4">
      {INFO.map((item, i) => (
        <FadeIn key={item.label} delay={i * 0.08}>
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
            <div className="w-11 h-11 shrink-0 bg-mint-pale rounded-xl flex items-center justify-center text-deep-green">
              {ICONS[item.label] || ICONS['전화']}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-sm font-medium text-gray-800 hover:text-deep-green transition-colors mt-0.5 block">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
              )}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
