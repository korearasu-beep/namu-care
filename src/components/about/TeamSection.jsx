import FadeIn from '../common/FadeIn'

const TEAM = [
  { name: '센터장', role: '총괄 관리', img: '/images/team-1.jpg' },
  { name: '사회복지사', role: '케어 플랜 수립', img: '/images/team-2.jpg' },
  { name: '요양보호사팀', role: '방문요양 서비스', img: '/images/team-3.jpg' },
]

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-mint tracking-wide">TEAM</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">함께하는 사람들</h2>
            <p className="mt-4 text-gray-500">전문성과 따뜻한 마음을 겸비한 나무재가 팀입니다.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
                <div className="aspect-[4/3] bg-mint-pale/50 relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-deep-green/25">
                    <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{member.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
