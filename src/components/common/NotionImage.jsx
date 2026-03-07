import { useState, useEffect } from 'react'

export default function NotionImage({ src, alt = '', className = '', fallback }) {
  const [status, setStatus] = useState(src ? 'loading' : 'error')

  useEffect(() => {
    setStatus(src ? 'loading' : 'error')
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 스켈레톤 (로딩 중) */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* 에러 플레이스홀더 */}
      {status === 'error' && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
          {fallback || (
            <>
              <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs">이미지를 불러올 수 없습니다</span>
            </>
          )}
        </div>
      )}

      {/* 실제 이미지 */}
      {src && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
