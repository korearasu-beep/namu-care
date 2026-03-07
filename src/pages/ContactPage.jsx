import PageHeader from '../components/common/PageHeader'
import FadeIn from '../components/common/FadeIn'
import ConsultForm from '../components/contact/ConsultForm'
import MapSection from '../components/contact/MapSection'
import { useSiteSettings } from '../contexts/SiteSettingsContext'
import { useMainContent } from '../contexts/MainContentContext'

const CONTACT_CARDS = [
  { icon: '📞', title: '전화 상담', valueKey: '전화번호', defaultValue: '041-555-9991', sub: '평일·주말 포함 07:00 ~ 21:00', actionPrefix: 'tel:', btnText: '바로 전화하기' },
  { icon: '📧', title: '이메일 문의', valueKey: '이메일', defaultValue: 'namuhelp25@naver.com', sub: '24시간 접수, 영업시간 내 답변', actionPrefix: 'mailto:', btnText: '이메일 보내기' },
  { icon: '📍', title: '센터 위치', valueKey: '주소', defaultValue: '충청남도 천안시 서북구', sub: '불당25로 174, 1021호', actionPrefix: null, btnText: '↓ 아래 지도 참고' },
]

export default function ContactPage() {
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'
  const { data: headerData } = useMainContent('page-contact')
  const h = headerData[0] || {}

  return (
    <>
      <PageHeader
        tag={h['내용'] || 'CONTACT US'}
        title={h['이름'] || '편하게'}
        highlight={h['값'] || '상담 신청하세요'}
        description={h['값2'] || '전화 한 통이면 충분합니다. 등급 신청부터 서비스까지 친절하게 안내드립니다.'}
      />

      {/* Contact Cards */}
      <section className="pt-[60px] pb-0 px-6 bg-white">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTACT_CARDS.map((c, i) => {
              const value = settings[c.valueKey] || c.defaultValue
              const href = c.actionPrefix ? `${c.actionPrefix}${value}` : null
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="p-8 rounded-[20px] border border-gray-200 bg-[#F8FAF9] hover:border-[#B8E8D0] hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(45,90,61,0.06)] transition-all duration-300 h-full flex flex-col">
                    <div className="text-[32px] mb-4">{c.icon}</div>
                    <div className="text-[13px] font-semibold text-gray-400 mb-1.5">{c.title}</div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{value}</div>
                    <div className="text-[13px] text-gray-500 mb-5">{c.sub}</div>
                    <div className="mt-auto">
                      {href ? (
                        <a href={href} className="inline-block bg-deep-green/[0.08] text-deep-green px-5 py-2.5 rounded-[10px] text-sm font-semibold hover:bg-deep-green/[0.15] transition-colors">
                          {c.btnText}
                        </a>
                      ) : (
                        <span className="inline-block bg-deep-green/[0.08] text-deep-green px-5 py-2.5 rounded-[10px] text-sm font-semibold">
                          {c.btnText}
                        </span>
                      )}
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 px-6 bg-white" style={{ padding: '80px 24px' }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ConsultForm />
            <div>
              <FadeIn delay={0.1}>
                <MapSection />
              </FadeIn>

              {/* Quick info */}
              <FadeIn delay={0.2}>
                <div className="mt-6 p-7 rounded-[20px] bg-mint-pale border border-[#B8E8D0]">
                  <h3 className="text-[17px] font-bold text-deep-green mb-5">빠른 연락처</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: '📞', label: '전화', value: settings['전화번호'] || '041-555-9991' },
                      { icon: '📧', label: '이메일', value: settings['이메일'] || 'namuhelp25@naver.com' },
                      { icon: '🕐', label: '상담시간', value: settings['운영시간'] || '평일·주말 포함 07:00 ~ 21:00' },
                      { icon: '📍', label: '주소', value: settings['주소'] || '충청남도 천안시 서북구 불당25로 174, 1021호' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <div>
                          <div className="text-xs text-gray-400 font-semibold mb-0.5">{item.label}</div>
                          <div className="text-sm text-gray-700 font-medium">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Quick call CTA */}
              <FadeIn delay={0.3}>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2.5 mt-5 p-[18px] bg-deep-green text-white rounded-2xl text-lg font-extrabold shadow-[0_4px_20px_rgba(45,90,61,0.2)] hover:-translate-y-0.5 transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4.5A1.5 1.5 0 014.5 3h2.42a1 1 0 01.95.68l.86 2.58a1 1 0 01-.3 1.05l-1.17.97a10.05 10.05 0 004.46 4.46l.97-1.17a1 1 0 011.05-.3l2.58.86a1 1 0 01.68.95v2.42a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" fill="currentColor" /></svg>
                  {phone} 전화 상담
                </a>
                <p className="text-center text-[13px] text-gray-400 mt-2">전화 상담이 가장 빠릅니다</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
