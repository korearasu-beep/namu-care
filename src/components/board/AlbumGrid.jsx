import FadeIn from '../common/FadeIn'
import { useNotion } from '../../hooks/useNotion'
import { FALLBACK } from '../../constants/fallback'

export default function AlbumGrid() {
  const { data, loading } = useNotion('album')
  const albums = data || FALLBACK.album

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden">
            <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
            <div className="p-5">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3 mt-3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {albums.map((album, i) => {
        const thumbnail = album['사진']?.[0]
        return (
          <FadeIn key={album.id || i} delay={i * 0.08}>
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-mint/40 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 cursor-pointer">
              <div className="aspect-[16/10] bg-mint-pale/40 relative overflow-hidden">
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={album['이름']}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center text-deep-green/20">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 group-hover:text-deep-green transition-colors">
                  {album['이름']}
                </h3>
                <p className="text-xs text-gray-400 mt-2">{album['날짜']}</p>
              </div>
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}
