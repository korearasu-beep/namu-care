import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { FALLBACK } from '../../constants/fallback'

const FALLBACK_ALBUMS = [
  { id: 1, '이름': '3월 치매예방 인지활동 프로그램', '날짜': '2026.03.06', count: 8, emoji: '🌸' },
  { id: 2, '이름': '봄맞이 산책 나들이', '날짜': '2026.03.03', count: 12, emoji: '🚶' },
  { id: 3, '이름': '설 명절 함께하기 행사', '날짜': '2026.01.28', count: 6, emoji: '🎉' },
  { id: 4, '이름': '2월 생신 축하 이벤트', '날짜': '2026.02.15', count: 5, emoji: '🎂' },
  { id: 5, '이름': '겨울 방문목욕 서비스 현장', '날짜': '2026.01.10', count: 4, emoji: '🛁' },
  { id: 6, '이름': '신년 요양보호사 워크숍', '날짜': '2026.01.05', count: 9, emoji: '📝' },
]

const EMOJIS = ['🌸', '🚶', '🎉', '🎂', '🛁', '📝']

export default function AlbumGrid() {
  const { data, loading } = useNotion('album')
  const raw = data || FALLBACK.album
  const albums = raw.length > 0 ? raw : FALLBACK_ALBUMS

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-[20px] overflow-hidden border border-gray-200">
            <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
            <div className="p-4"><div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" /></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {albums.map((a, i) => {
          const thumbnail = a['사진']?.[0]
          const photoCount = a.count || a['사진']?.length || 0
          return (
            <div
              key={a.id || i}
              className="rounded-[20px] overflow-hidden border border-gray-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,90,61,0.06)] transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-mint-pale to-[#B8E8D0] flex flex-col items-center justify-center gap-2 relative">
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={a['이름']}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <div className="text-[40px] opacity-50">{a.emoji || EMOJIS[i % EMOJIS.length]}</div>
                <span className="text-xs text-gray-400">활동 사진</span>
                {/* Photo count badge */}
                {photoCount > 0 && (
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    📷 {photoCount}장
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4 px-5">
                <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">{a['이름']}</h3>
                <span className="text-[13px] text-gray-400">{a['날짜']}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-3.5 rounded-xl bg-deep-green/[0.04] border border-dashed border-deep-green/[0.12] text-center">
        <p className="text-[13px] text-gray-400">
          💡 실제 서비스에서는 Notion 갤러리 데이터베이스와 연동됩니다. Notion에 사진을 업로드하면 여기에 자동으로 표시됩니다.
        </p>
      </div>
    </FadeIn>
  )
}
