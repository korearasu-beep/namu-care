import FadeIn from '../common/FadeIn'

const TEAM_STATS = [
  { num: '전원', label: '요양보호사 자격증 보유' },
  { num: '정기', label: '전문 교육 및 역량 강화' },
  { num: '맞춤', label: '어르신별 담당 배정' },
]

export default function TeamSection() {
  return (
    <section className="py-24 px-6 bg-[#F2FBF6]">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3">OUR TEAM</span>
            <h2 className="text-[clamp(26px,4vw,36px)] font-extrabold text-gray-900 leading-[1.35]">
              함께하는 <span className="text-deep-green">전문가들</span>
            </h2>
          </div>
        </FadeIn>

        {/* Team photo placeholder */}
        <FadeIn delay={0.1}>
          <div className="max-w-[800px] mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-mint-pale to-[#B8E8D0] aspect-[16/8] flex flex-col items-center justify-center gap-3 border border-gray-200 relative">
            <img
              src="/images/team.jpg"
              alt="나무재가 전문 요양보호사 팀"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="text-[56px]">👩‍⚕️👨‍⚕️👩‍⚕️👨‍⚕️👩‍⚕️</div>
            <span className="text-[15px] text-deep-green font-semibold">나무재가 전문 요양보호사 팀</span>
            <span className="text-xs text-gray-400">실제 팀 사진 또는 AI 생성 이미지 삽입 예정</span>
          </div>
        </FadeIn>

        {/* Team stats */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-[800px] mx-auto">
            {TEAM_STATS.map((s, i) => (
              <div key={i} className="text-center p-7 bg-white rounded-2xl border border-[#F0F4F2]">
                <div className="text-[22px] font-extrabold text-deep-green mb-1.5">{s.num}</div>
                <div className="text-[13px] text-gray-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
