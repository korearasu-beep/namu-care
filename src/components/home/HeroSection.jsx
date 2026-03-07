import { Link } from 'react-router-dom'
import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

const FALLBACK_HERO = {
  title: '어르신의 일상에\n따뜻한 돌봄을 더합니다',
  desc: '전문 요양보호사가 가정을 방문하여 어르신께 맞춤형 케어 서비스를 제공합니다.',
  badge: '충남 천안 방문요양 전문',
}
const FALLBACK_STATS = [
  { num: '500+', label: '누적 이용자' },
  { num: '10년+', label: '돌봄 경험' },
  { num: '98%', label: '만족도' },
]

function formatStat(value, label) {
  if (label.includes('만족도')) return `${value}%`
  if (label.includes('경험')) return `${value}년+`
  return `${value}+`
}

export default function HeroSection() {
  const { data } = useNotion('main')
  const { settings } = useSiteSettings()
  const phone = settings['전화번호'] || '041-555-9991'

  let hero = FALLBACK_HERO
  let stats = FALLBACK_STATS

  if (data) {
    const heroItems = data.filter(d => d['구분'] === 'hero').sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))
    const statItems = data.filter(d => d['구분'] === 'stat').sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))

    if (heroItems.length >= 2) {
      hero = {
        title: heroItems[0]['내용'] || FALLBACK_HERO.title,
        desc: heroItems[1]['내용'] || FALLBACK_HERO.desc,
        badge: FALLBACK_HERO.badge,
      }
    }
    if (statItems.length > 0) {
      stats = statItems.map(s => ({
        num: formatStat(s['숫자값'], s['내용']),
        label: s['내용'],
      }))
    }
  }

  const titleParts = hero.title.split('\n')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mint-pale via-white to-white">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-mint/20 text-deep-green text-sm font-medium rounded-full mb-6">
              {hero.badge}
            </span>
            <h1 className="text-4xl lg:text-[52px] font-bold text-gray-900 leading-[1.2] tracking-tight">
              {titleParts.map((part, i) => (
                <span key={i}>
                  {i === 0 ? part : <><br /><span className="text-deep-green">{part}</span></>}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
              {hero.desc}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={`tel:${phone}`}
                className="px-7 py-4 bg-deep-green text-white font-semibold rounded-2xl hover:bg-deep-green/90 transition-all shadow-lg shadow-deep-green/20 text-center"
              >
                무료 상담 신청하기
              </a>
              <Link
                to="/about"
                className="px-7 py-4 bg-white text-deep-green font-semibold rounded-2xl border border-gray-200 hover:border-deep-green/30 hover:bg-mint-pale/50 transition-all text-center"
              >
                센터 알아보기
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex gap-8 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-bold text-deep-green">{stat.num}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-mint-light/50">
            <img
              src="/images/hero.jpg"
              alt="방문요양 서비스"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-deep-green/40">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm font-medium">히어로 이미지</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="absolute top-20 right-0 w-72 h-72 bg-mint/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint-pale/50 rounded-full blur-3xl -z-10" />
    </section>
  )
}
