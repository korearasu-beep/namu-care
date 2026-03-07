import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { FALLBACK } from '../../constants/fallback'

const FALLBACK_NOTICES = [
  { id: 1, '카테고리': '공지', '이름': '나무재가방문요양센터 홈페이지가 새롭게 오픈했습니다', '날짜': '2026.03.07', isNew: true },
  { id: 2, '카테고리': '공지', '이름': '2026년 장기요양보험 수가 안내', '날짜': '2026.03.05', isNew: true },
  { id: 3, '카테고리': '안내', '이름': '봄맞이 치매예방 프로그램 안내', '날짜': '2026.03.01', isNew: false },
  { id: 4, '카테고리': '안내', '이름': '방문목욕 서비스 확대 운영 안내', '날짜': '2026.02.20', isNew: false },
  { id: 5, '카테고리': '공지', '이름': '설 연휴 운영 시간 안내', '날짜': '2026.01.25', isNew: false },
  { id: 6, '카테고리': '안내', '이름': '요양보호사 정기 교육 완료 안내', '날짜': '2026.01.15', isNew: false },
]

export default function NoticeList() {
  const { data, loading } = useNotion('notice')
  const raw = data || FALLBACK.notice
  const notices = raw.length > 0 ? raw : FALLBACK_NOTICES

  const isNew = (dateStr) => {
    if (!dateStr) return false
    const diff = Date.now() - new Date(dateStr).getTime()
    return diff < 7 * 24 * 60 * 60 * 1000
  }

  if (loading) {
    return (
      <div className="rounded-[20px] overflow-hidden border border-gray-200">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-5 border-b border-[#F0F4F2] last:border-b-0">
            <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <FadeIn>
      <div className="rounded-[20px] overflow-hidden border border-gray-200">
        {notices.map((n, i) => {
          const badge = n['카테고리'] || '공지'
          const newFlag = n.isNew !== undefined ? n.isNew : isNew(n['날짜'])
          return (
            <div
              key={n.id || i}
              className={`flex items-center gap-4 px-6 py-5 cursor-pointer hover:bg-[#F2FBF6] transition-colors ${
                i < notices.length - 1 ? 'border-b border-[#F0F4F2]' : ''
              }`}
            >
              {/* Badge */}
              <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                badge === '공지'
                  ? 'bg-deep-green/[0.08] text-deep-green'
                  : 'bg-gray-400/[0.1] text-gray-500'
              }`}>
                {badge}
              </span>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <span className="text-[15px] font-medium text-gray-900 truncate block">{n['이름']}</span>
              </div>

              {/* New badge */}
              {newFlag && (
                <span className="shrink-0 text-[10px] font-extrabold text-white bg-[#E53E3E] px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}

              {/* Date */}
              <span className="shrink-0 text-[13px] text-gray-400 hidden sm:block">{n['날짜']}</span>
            </div>
          )
        })}
      </div>

      {/* Notion CMS note */}
      <div className="mt-6 p-3.5 rounded-xl bg-deep-green/[0.04] border border-dashed border-deep-green/[0.12] text-center">
        <p className="text-[13px] text-gray-400">
          💡 실제 서비스에서는 Notion 데이터베이스와 연동됩니다. Notion에 글을 작성하면 여기에 자동으로 표시됩니다.
        </p>
      </div>
    </FadeIn>
  )
}
