import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'

const FALLBACK_VALUES = [
  { icon: '🌱', title: '정성', desc: '어르신 한 분 한 분께 가족처럼 정성을 다합니다.' },
  { icon: '🤝', title: '신뢰', desc: '투명한 서비스와 꾸준한 소통으로 믿음을 쌓습니다.' },
  { icon: '💡', title: '전문성', desc: '체계적 교육과 치매예방 특화 프로그램을 운영합니다.' },
  { icon: '🏡', title: '편안함', desc: '익숙한 집에서 편안하게 돌봄받는 환경을 만듭니다.' },
]

const EMOJI_MAP = { '정성': '🌱', '신뢰': '🤝', '전문성': '💡', '편안함': '🏡' }

export default function CoreValuesSection() {
  const { data } = useNotion('about')

  let values = FALLBACK_VALUES
  if (data) {
    const valueItems = data.filter(d => d['구분'] === 'value').sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))
    if (valueItems.length > 0) {
      values = valueItems.map((v, i) => ({
        icon: EMOJI_MAP[v['이름']] || FALLBACK_VALUES[i]?.icon || '🌱',
        title: v['이름'],
        desc: v['내용'],
      }))
    }
  }

  return (
    <section className="py-24 px-6 bg-[#F8FAF9]">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3">OUR VISION</span>
            <h2 className="text-[clamp(26px,4vw,36px)] font-extrabold text-gray-900 leading-[1.35]">
              나무재가의 <span className="text-deep-green">핵심 가치</span>
            </h2>
            <p className="text-base text-gray-500 mt-3 leading-relaxed max-w-[520px] mx-auto">
              네 가지 핵심 가치를 바탕으로 어르신의 존엄한 삶을 지킵니다.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.08}>
              <div className="bg-white rounded-[20px] p-9 text-center border border-[#F0F4F2] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,90,61,0.06)] transition-all duration-300 h-full">
                <div className="text-[40px] mb-4">{v.icon}</div>
                <h3 className="text-[19px] font-bold text-gray-900 mb-2.5">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-[1.65]">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
