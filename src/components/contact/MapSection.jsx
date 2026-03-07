import FadeIn from '../common/FadeIn'

export default function MapSection() {
  return (
    <FadeIn>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="aspect-[16/9] bg-gray-100 relative">
          {/* 카카오맵 또는 네이버 지도 iframe 자리 — 추후 교체 */}
          <iframe
            src="https://www.google.com/maps?q=충청남도+천안시+서북구+불당25로+174&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            title="나무재가방문요양센터 위치"
            allowFullScreen
          />
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">나무재가방문요양센터</span>
            <br />
            충청남도 천안시 서북구 불당25로 174, 1021호
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
