import { Link } from 'react-router-dom'
import FadeIn from '../common/FadeIn'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'
import { useMainContent } from '../../contexts/MainContentContext'

export default function CTASection() {
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'
  const hours = settings['운영시간'] || '평일·주말 포함 07:00~21:00'
  const { data: ctaData } = useMainContent('cta')
  const cta = ctaData[0] || {}
  const heading = cta['이름'] || '어르신의 편안한 일상, 저희가 함께합니다'
  const description = cta['내용'] || '궁금한 점이 있으시면 언제든 전화 주세요.\n장기요양 등급 신청부터 서비스 이용까지 친절하게 안내해 드립니다.'
  const badgeText = cta['값'] || '지금 바로 상담 받으세요'
  const secondaryBtn = cta['값2'] || '온라인 상담 신청하기'

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E4A30 0%, #2D5A3D 40%, #2A6B3F 100%)' }}>
      <div className="absolute -top-[120px] -right-[120px] w-[500px] h-[500px] rounded-full bg-[#8FD5B715]" />
      <div className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] rounded-full bg-[#B8E8D010]" />
      <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] rounded-full bg-[#8FD5B708]" />

      <div className="mx-auto max-w-[700px] text-center relative z-[1]">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-5 py-2 mb-7 border border-white/[0.06]">
            <span className="text-[13px] font-semibold text-[#B8E8D0]">{badgeText}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.35] tracking-tight mb-4">
            {heading.split('\n').map((line, i) => <span key={i}>{line}{i < heading.split('\n').length - 1 && <br />}</span>)}
          </h2>

          <p className="text-[17px] text-[#B8E8D0cc] leading-[1.7] mb-10">
            {description.split('\n').map((line, i) => <span key={i}>{line}{i < description.split('\n').length - 1 && <br />}</span>)}
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2.5 bg-white text-deep-green rounded-2xl px-10 py-5 text-xl font-extrabold shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-mint-pale hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M3 4.5A1.5 1.5 0 014.5 3h2.42a1 1 0 01.95.68l.86 2.58a1 1 0 01-.3 1.05l-1.17.97a10.05 10.05 0 004.46 4.46l.97-1.17a1 1 0 011.05-.3l2.58.86a1 1 0 01.68.95v2.42a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 013 4.5z" fill="currentColor" /></svg>
              {phone}
            </a>
            <Link
              to="/contact"
              className="bg-white/[0.15] text-white border-[1.5px] border-white/[0.3] rounded-xl px-8 py-3.5 text-[15px] font-semibold hover:bg-white/[0.2] hover:-translate-y-0.5 transition-all duration-300"
            >
              {secondaryBtn}
            </Link>
          </div>

          <p className="text-[13px] text-[#B8E8D080] mt-6">{hours} 상담 가능</p>
        </FadeIn>
      </div>
    </section>
  )
}
