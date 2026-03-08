import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'

const SERVICE_ICONS = {
  home: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M5 16l11-10 11 10" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14v11a2 2 0 002 2h12a2 2 0 002-2V14" stroke="#2D5A3D" strokeWidth="2" />
      <rect x="13" y="20" width="6" height="7" rx="1" fill="#B8E8D0" />
    </svg>
  ),
  bath: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 16h20v2a6 6 0 01-6 6h-8a6 6 0 01-6-6v-2z" fill="#B8E8D0" stroke="#2D5A3D" strokeWidth="1.5" />
      <path d="M10 16V8a4 4 0 018 0" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" fill="#8FD5B7" /><circle cx="16" cy="11" r="1" fill="#8FD5B7" />
    </svg>
  ),
  wheelchair: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="14" cy="22" r="6" fill="#B8E8D0" stroke="#2D5A3D" strokeWidth="1.5" />
      <path d="M14 10v8h8l2 6" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="8" r="2.5" fill="#8FD5B7" stroke="#2D5A3D" strokeWidth="1" />
    </svg>
  ),
  brain: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 6c-3 0-6 2-6 5 0 1.5.5 2.5 1.5 3.5C9.5 16 8 18 8 20c0 3 3 6 8 6s8-3 8-6c0-2-1.5-4-3.5-5.5 1-1 1.5-2 1.5-3.5 0-3-3-5-6-5z" fill="#B8E8D0" stroke="#2D5A3D" strokeWidth="1.5" />
      <path d="M16 8v16M12 14h8M13 19h6" stroke="#2D5A3D" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
}

const FALLBACK_SERVICES = [
  { icon: 'home', title: '방문요양', desc: '전문 요양보호사가 어르신 가정을 방문하여 신체활동 지원, 가사활동 지원, 일상생활 돌봄 서비스를 제공합니다.', tags: ['신체활동 지원', '가사활동', '식사 보조'] },
  { icon: 'bath', title: '방문목욕', desc: '목욕 전문 장비를 갖추고 가정을 직접 방문하여 안전하고 편안한 목욕 서비스를 제공합니다.', tags: ['전문 장비', '가정 방문', '안전 목욕'] },
  { icon: 'wheelchair', title: '복지용구', desc: '어르신의 일상생활과 신체활동을 돕는 복지용구의 구매·대여를 지원합니다.', tags: ['구매 지원', '대여 서비스', '맞춤 추천'] },
  { icon: 'brain', title: '치매예방활동지원', badge: '특화 서비스', desc: '어르신 맞춤 치매예방 프로그램으로 인지 기능 유지와 활력 있는 일상을 돕습니다.', tags: ['인지활동', '맞춤 프로그램', '전문 케어'] },
]

const ICON_KEY_MAP = { '방문요양': 'home', '방문목욕': 'bath', '복지용구': 'wheelchair', '치매예방활동지원': 'brain', '치매예방': 'brain' }

export default function ServiceSection() {
  const { data } = useNotion('service')

  let services = FALLBACK_SERVICES
  if (data && data.length > 0) {
    services = data
      .sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))
      .map(item => ({
        icon: ICON_KEY_MAP[item['태그']?.[0]] || ICON_KEY_MAP[item['이름']] || 'home',
        title: item['이름'] || '',
        desc: item['설명'] || '',
        tags: item['태그'] || [],
        badge: item['이름']?.includes('치매') ? '특화 서비스' : null,
      }))
  }

  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-[1120px]">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3">OUR SERVICES</span>
            <h2 className="text-[clamp(26px,4vw,38px)] font-extrabold text-gray-900 leading-[1.35] tracking-tight">
              어르신의 일상을 지키는<br /><span className="text-deep-green">4가지 전문 서비스</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <FadeIn key={s.title || i} delay={i * 0.1}>
              <div className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:-translate-y-[4px] hover:shadow-[0_16px_48px_rgba(45,90,61,0.1)] hover:border-[#B8E8D0] transition-all duration-300 cursor-pointer h-full overflow-hidden group">
                {s.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-deep-green to-[#478A5F] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {s.badge}
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mint-pale to-[#B8E8D080] flex items-center justify-center mb-5 group-hover:shadow-[0_4px_16px_rgba(143,213,183,0.3)] transition-shadow duration-300">
                  {SERVICE_ICONS[s.icon] || SERVICE_ICONS.home}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2.5">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-[1.65] mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs text-deep-green font-medium bg-deep-green/[0.05] px-3 py-1 rounded-full">
                      {t}
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
