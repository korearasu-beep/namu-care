import FadeIn from '../common/FadeIn'

const ROWS = [
  { label: '서비스 방식', us: '1:1 맞춤 돌봄', them: '그룹 케어 중심' },
  { label: '요양보호사', us: '경력 3년 이상 전문 인력', them: '경력 무관 배정' },
  { label: '관리 체계', us: '주 1회 슈퍼바이저 모니터링', them: '비정기 확인' },
  { label: '가족 소통', us: '매일 돌봄 일지 공유', them: '요청 시 제공' },
  { label: '긴급 대응', us: '24시간 긴급 연락망', them: '근무시간 내 대응' },
  { label: '프로그램', us: '인지활동·정서지원 포함', them: '기본 요양만 제공' },
]

export default function ComparisonTable() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-4xl px-5">
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-mint tracking-wide">COMPARISON</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
              나무재가는 이렇게 다릅니다
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {/* 헤더 */}
            <div className="grid grid-cols-3 bg-deep-green text-white">
              <div className="p-4 lg:p-5 text-sm font-medium">비교 항목</div>
              <div className="p-4 lg:p-5 text-sm font-bold text-center">나무재가</div>
              <div className="p-4 lg:p-5 text-sm font-medium text-center opacity-70">일반 센터</div>
            </div>

            {/* 행 */}
            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 ${i < ROWS.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="p-4 lg:p-5 text-sm font-medium text-gray-700">{row.label}</div>
                <div className="p-4 lg:p-5 text-sm text-deep-green font-semibold text-center bg-mint-pale/30">
                  {row.us}
                </div>
                <div className="p-4 lg:p-5 text-sm text-gray-400 text-center">{row.them}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
