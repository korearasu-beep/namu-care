import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'

const FALLBACK_GREETING = `안녕하세요, 나무재가방문요양센터 센터장입니다.

나무가 깊은 뿌리를 내려 흔들리지 않듯이, 저희 나무재가방문요양은 어르신 한 분 한 분의 삶에 깊이 뿌리내리는 돌봄을 실천하고자 합니다.

어르신이 오랜 시간 살아온 익숙한 공간에서, 가족의 따뜻함을 느끼실 수 있는 서비스를 제공하는 것이 저희의 소명입니다. 전문 요양보호사 한 분 한 분이 정성과 책임감을 가지고 어르신을 모십니다.

어르신과 보호자 모두 만족하는 편안한 도움 서비스, 나무재가방문요양이 함께하겠습니다.`

export default function GreetingSection() {
  const { data } = useNotion('about')

  let greeting = FALLBACK_GREETING
  if (data) {
    const item = data.find(d => d['구분'] === 'greeting')
    if (item?.['내용']) greeting = item['내용']
  }

  const paragraphs = greeting.split('\n\n').filter(Boolean)

  return (
    <section className="py-[100px] px-6 bg-white">
      <div className="mx-auto max-w-[900px]">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Director photo placeholder */}
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-mint-pale to-[#B8E8D0] aspect-[3/4] flex flex-col items-center justify-center gap-3 relative">
              <img
                src="/images/director.jpg"
                alt="센터장"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="text-[64px] opacity-60">👩‍💼</div>
              <span className="text-[13px] text-deep-green font-semibold opacity-70">센터장 사진</span>
            </div>

            {/* Greeting text */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-[3px] rounded-sm bg-gradient-to-r from-deep-green to-mint" />
                <span className="text-[13px] font-bold text-deep-green tracking-[0.06em]">센터장 인사말</span>
              </div>

              <h2 className="text-[28px] font-extrabold text-gray-900 leading-[1.4] mb-6">
                "어르신의 미소가<br />저희의 보람입니다"
              </h2>

              <div className="text-[15px] text-gray-500 leading-[1.9]">
                {paragraphs.map((p, i) => (
                  <p key={i} className={i < paragraphs.length - 1 ? 'mb-4' : ''}>{p}</p>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-mint-pale border-l-4 border-deep-green">
                <p className="text-sm font-bold text-deep-green mb-0.5">나무재가방문요양센터 센터장</p>
                <p className="text-[13px] text-gray-500">(센터장 성함을 입력해 주세요)</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
