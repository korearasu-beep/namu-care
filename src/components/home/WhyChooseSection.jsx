import FadeIn from '../common/FadeIn'

const REASONS = [
  {
    num: '01',
    title: '검증된 전문 요양보호사',
    desc: '엄격한 선발과 정기 교육을 통해 최고 수준의 돌봄 서비스를 보장합니다.',
  },
  {
    num: '02',
    title: '체계적인 케어 플랜',
    desc: '어르신 개인별 상태를 분석하여 맞춤형 돌봄 계획을 수립하고 실행합니다.',
  },
  {
    num: '03',
    title: '투명한 소통',
    desc: '매일 돌봄 일지를 공유하고, 정기 상담으로 보호자와 긴밀하게 소통합니다.',
  },
  {
    num: '04',
    title: '365일 안심 케어',
    desc: '평일·주말 포함 07:00~21:00 운영, 긴급 시 즉각 대응 체계를 갖추고 있습니다.',
  },
]

export default function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-mint tracking-wide">WHY US</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
              나무재가를 선택하는 이유
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REASONS.map((reason, i) => (
            <FadeIn key={reason.num} delay={i * 0.1}>
              <div className="flex gap-5 p-7 lg:p-8 rounded-2xl border border-gray-100 hover:border-mint/50 hover:shadow-lg hover:shadow-mint/5 transition-all duration-300">
                <span className="text-3xl lg:text-4xl font-black text-mint/40 shrink-0 leading-none">
                  {reason.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
