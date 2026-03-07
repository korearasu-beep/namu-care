import FadeIn from '../common/FadeIn'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'
import { useMainContent } from '../../contexts/MainContentContext'

const FALLBACK_ITEMS = [
  { label: '서비스 지역', other: '일부 지역 한정', ours: '제주도 포함 전국 서비스' },
  { label: '등급 신청 대행', other: '미지원 또는 별도 비용', ours: '무료 원스톱 대행' },
  { label: '치매예방 프로그램', other: '일반 요양만 제공', ours: '치매예방활동지원 특화' },
  { label: '상담 가능 시간', other: '평일 09:00~18:00', ours: '주말 포함 07:00~21:00' },
  { label: '맞춤 케어 플랜', other: '표준 서비스 제공', ours: '어르신별 개인 맞춤 설계' },
  { label: '보호자 소통', other: '월 1회 서면 보고', ours: '수시 소통 + 활동 사진 공유' },
]

const XMark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="#D97373" strokeWidth="2.2" strokeLinecap="round" /></svg>
)
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="#E8F7EF" stroke="#2D5A3D" strokeWidth="1.2" /><path d="M5.5 9l2.5 2.5 4.5-5" stroke="#2D5A3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

export default function ComparisonTable() {
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'
  const { data: compData } = useMainContent('comparison')
  const ITEMS = compData.length > 0
    ? compData.map(c => ({ label: c['이름'], other: c['값'] || '', ours: c['값2'] || '' }))
    : FALLBACK_ITEMS

  return (
    <section className="py-[100px] px-6 bg-gradient-to-b from-[#F2FBF6] to-white">
      <div className="mx-auto max-w-[900px]">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3">WHY DIFFERENT</span>
            <h2 className="text-[clamp(26px,4vw,38px)] font-extrabold text-gray-900 leading-[1.35] tracking-tight">
              일반 요양센터와<br /><span className="text-deep-green">나무재가</span>는 다릅니다
            </h2>
            <p className="text-base text-gray-500 mt-3 leading-relaxed">같은 방문요양이지만, 차이는 분명합니다.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-[0_4px_24px_rgba(45,90,61,0.05)]">
            {/* Header */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b-2 border-gray-200">
              <div className="p-[18px_24px] text-sm font-bold text-gray-500 bg-[#F8FAF9]">비교 항목</div>
              <div className="p-[18px_24px] text-sm font-bold text-gray-400 bg-[#F8FAF9] text-center">일반 요양센터</div>
              <div className="p-[18px_24px] text-sm font-bold text-deep-green bg-deep-green/[0.05] text-center flex items-center justify-center gap-2">
                <img src="/images/logo.png" alt="" className="h-[22px] object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                나무재가
              </div>
            </div>

            {/* Rows */}
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1.2fr_1fr_1fr] hover:bg-[#F2FBF6] transition-colors ${i < ITEMS.length - 1 ? 'border-b border-[#F0F4F2]' : ''}`}
              >
                <div className="p-4 px-6 text-sm font-semibold text-gray-700 flex items-center">{item.label}</div>
                <div className="p-4 px-6 text-[13px] text-gray-400 flex items-center justify-center gap-2 text-center">
                  <span className="shrink-0"><XMark /></span><span>{item.other}</span>
                </div>
                <div className="p-4 px-6 text-[13px] font-semibold text-deep-green bg-deep-green/[0.02] flex items-center justify-center gap-2 text-center">
                  <span className="shrink-0"><CheckCircle /></span><span>{item.ours}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 bg-deep-green text-white rounded-[14px] px-8 py-3.5 text-[15px] font-bold shadow-[0_4px_20px_rgba(45,90,61,0.2)] hover:bg-deep-green/90 transition-colors"
            >
              나무재가 무료 상담 받기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
