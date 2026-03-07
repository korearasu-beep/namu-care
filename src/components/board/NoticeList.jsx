import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { FALLBACK } from '../../constants/fallback'

export default function NoticeList() {
  const { data, loading } = useNotion('notice')
  const notices = data || FALLBACK.notice

  // 최근 7일 이내면 New 표시
  const isNew = (dateStr) => {
    if (!dateStr) return false
    const diff = Date.now() - new Date(dateStr).getTime()
    return diff < 7 * 24 * 60 * 60 * 1000
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-white rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {notices.map((notice, i) => (
        <FadeIn key={notice.id || i} delay={i * 0.05}>
          <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-mint/40 hover:shadow-md hover:shadow-gray-100/50 transition-all duration-200 cursor-pointer">
            <span className={`shrink-0 px-3 py-1 text-xs font-semibold rounded-lg ${
              notice['카테고리'] === '공지'
                ? 'bg-deep-green/10 text-deep-green'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {notice['카테고리']}
            </span>

            <h3 className="flex-1 text-sm lg:text-[15px] text-gray-800 group-hover:text-deep-green transition-colors truncate font-medium">
              {notice['이름']}
              {isNew(notice['날짜']) && (
                <span className="ml-2 inline-block px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded align-middle">
                  N
                </span>
              )}
            </h3>

            <span className="shrink-0 text-xs text-gray-400 hidden sm:block">{notice['날짜']}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
