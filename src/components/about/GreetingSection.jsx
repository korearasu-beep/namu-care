import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { useSiteSettings } from '../../contexts/SiteSettingsContext'

const FALLBACK_GREETING = '안녕하세요, 나무재가방문요양센터 센터장입니다.\n\n어르신 한 분 한 분을 가족처럼 생각하며, 따뜻하고 전문적인 돌봄 서비스를 제공하기 위해 최선을 다하고 있습니다.\n\n나무처럼 든든하게, 어르신의 편안한 일상을 함께 만들어 가겠습니다.'

export default function GreetingSection() {
  const { data } = useNotion('about')
  const { settings } = useSiteSettings()
  const centerName = settings['센터명'] || '나무재가방문요양센터'

  let greeting = FALLBACK_GREETING
  if (data) {
    const item = data.find(d => d['구분'] === 'greeting')
    if (item?.['내용']) greeting = item['내용']
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <span className="text-sm font-semibold text-mint tracking-wide">GREETING</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">센터장 인사말</h2>
        </FadeIn>

        <div className="mt-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <FadeIn className="shrink-0">
            <div className="w-56 h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden bg-mint-pale">
              <img
                src="/images/director.jpg"
                alt="센터장"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="w-full h-full flex items-center justify-center text-deep-green/30">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <p className="text-xs font-medium">센터장 사진</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="flex-1">
            <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              "{greeting}"
            </blockquote>
            <div className="mt-6">
              <p className="font-bold text-gray-900">{centerName}</p>
              <p className="text-sm text-gray-400 mt-1">센터장 올림</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
