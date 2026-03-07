import FadeIn from '../common/FadeIn'

const SERVICES = [
  {
    icon: '🏠',
    title: '방문요양 서비스',
    desc: '일상생활 지원, 신체활동 보조, 정서 지원 등 어르신의 가정에서 전문 요양보호사가 1:1 맞춤 돌봄을 제공합니다.',
    tags: ['신체활동 지원', '가사 지원', '정서 지원'],
  },
  {
    icon: '🛁',
    title: '방문목욕 서비스',
    desc: '목욕 차량을 이용한 전문 방문목욕 서비스로 거동이 불편한 어르신의 위생관리를 도와드립니다.',
    tags: ['차량 목욕', '가정 내 목욕', '위생 관리'],
  },
  {
    icon: '🧠',
    title: '인지활동 프로그램',
    desc: '치매 예방 및 인지기능 향상을 위한 체계적인 프로그램을 운영합니다.',
    tags: ['치매 예방', '인지 훈련', '사회 활동'],
  },
  {
    icon: '💊',
    title: '건강관리 지원',
    desc: '투약 관리, 병원 동행, 건강 상태 체크 등 어르신의 건강한 일상을 지원합니다.',
    tags: ['투약 관리', '병원 동행', '건강 체크'],
  },
]

export default function ServiceSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-mint tracking-wide">SERVICES</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
              어떤 서비스를 제공하나요?
            </h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">
              국민건강보험공단 장기요양등급을 받으신 어르신께 다양한 재가요양 서비스를 제공합니다.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="group p-7 lg:p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 h-full">
                <span className="text-3xl">{service.icon}</span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-mint-pale text-deep-green text-xs font-medium rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
