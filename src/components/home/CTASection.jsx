import { Link } from 'react-router-dom'
import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

export default function CTASection() {
  const { data } = useNotion('main')
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'
  const hours = settings['운영시간'] || '평일·주말 포함 07:00~21:00'

  let ctaTitle = '어르신을 위한 첫 걸음,\n무료 상담으로 시작하세요'
  if (data) {
    const ctaItem = data.find(d => d['구분'] === 'cta')
    if (ctaItem?.['내용']) ctaTitle = ctaItem['내용']
  }
  const titleParts = ctaTitle.split('\n')

  return (
    <section className="py-20 lg:py-28 bg-deep-green relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-snug">
            {titleParts.map((part, i) => (
              <span key={i}>{i > 0 && <br />}{part}</span>
            ))}
          </h2>
          <p className="mt-5 text-mint-light text-lg">
            장기요양등급 신청부터 서비스 이용까지 친절하게 안내해 드립니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone}`}
              className="px-8 py-4 bg-white text-deep-green font-bold rounded-2xl hover:bg-mint-pale transition-colors text-center shadow-lg"
            >
              전화 상담 {phone}
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-center"
            >
              온라인 상담 신청
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="mt-6 text-sm text-mint-light/60">
            {hours} 상담 가능
          </p>
        </FadeIn>
      </div>

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />
    </section>
  )
}
