import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'

const ICONS = [
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
]

const FALLBACK_VALUES = [
  { title: '진심 어린 돌봄', desc: '어르신을 가족처럼 대하며, 진심을 담은 돌봄 서비스를 제공합니다.' },
  { title: '신뢰와 전문성', desc: '체계적인 교육과 관리를 통해 전문적이고 신뢰할 수 있는 서비스를 보장합니다.' },
  { title: '소통과 협력', desc: '보호자와의 긴밀한 소통으로 어르신에게 최적의 돌봄 환경을 만듭니다.' },
  { title: '빠른 대응', desc: '긴급 상황 발생 시 즉각 대응하여 어르신의 안전을 최우선으로 합니다.' },
]

export default function CoreValuesSection() {
  const { data } = useNotion('about')

  let values = FALLBACK_VALUES
  if (data) {
    const valueItems = data.filter(d => d['구분'] === 'value').sort((a, b) => (a['순서'] || 0) - (b['순서'] || 0))
    if (valueItems.length > 0) {
      values = valueItems.map(v => ({ title: v['이름'], desc: v['내용'] }))
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-mint tracking-wide">CORE VALUES</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">핵심 가치</h2>
            <p className="mt-4 text-gray-500">나무재가가 소중히 여기는 네 가지 가치입니다.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-7 text-center hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 h-full">
                <div className="w-14 h-14 mx-auto bg-mint-pale rounded-2xl flex items-center justify-center text-deep-green">
                  {ICONS[i] || ICONS[0]}
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{value.title}</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
