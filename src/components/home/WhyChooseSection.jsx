import FadeIn from '../common/FadeIn'
import { useMainContent } from '../../contexts/MainContentContext'

const FALLBACK_REASONS = [
  { emoji: '🌳', title: '뿌리 깊은 신뢰', desc: '해당지역에 뿌리내린 전문 재가요양기관으로서, 어르신 한 분 한 분께 정성을 다합니다.' },
  { emoji: '👩‍⚕️', title: '전문 요양보호사', desc: '체계적으로 교육받은 요양보호사가 어르신의 상태에 맞는 맞춤 돌봄을 제공합니다.' },
  { emoji: '🧠', title: '치매예방 특화 프로그램', desc: '일반 요양 서비스를 넘어, 어르신의 인지 기능 유지를 위한 전문 프로그램을 운영합니다.' },
  { emoji: '📋', title: '등급 신청 원스톱 대행', desc: '복잡한 장기요양 등급 신청 절차를 처음부터 끝까지 대행해 드려 보호자의 부담을 줄입니다.' },
]

export default function WhyChooseSection() {
  const { data: whyData } = useMainContent('whychoose')
  const REASONS = whyData.length > 0
    ? whyData.map(w => ({ emoji: w['아이콘'] || '🌱', title: w['이름'], desc: w['내용'] }))
    : FALLBACK_REASONS
  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3">WHY US</span>
            <h2 className="text-[clamp(26px,4vw,38px)] font-extrabold text-gray-900 leading-[1.35] tracking-tight">
              나무재가방문요양을<br /><span className="text-deep-green">선택하는 이유</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {REASONS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-9 rounded-[20px] border border-[#F0F4F2] bg-[#FEFDFB] hover:border-mint hover:-translate-y-[3px] transition-all duration-300 h-full">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-[19px] font-bold text-gray-900 mb-2.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-[1.7]">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
