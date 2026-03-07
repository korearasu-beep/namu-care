export default function MapSection() {
  return (
    <div className="rounded-[20px] overflow-hidden border border-gray-200 bg-gray-100 aspect-[4/3] relative">
      <iframe
        src="https://www.google.com/maps?q=충청남도+천안시+서북구+불당25로+174&output=embed"
        className="w-full h-full border-0"
        loading="lazy"
        title="나무재가방문요양센터 위치"
        allowFullScreen
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none opacity-0">
        <div className="text-[48px] opacity-40">🗺️</div>
        <span className="text-[15px] font-semibold text-gray-500">카카오맵 / 네이버지도</span>
        <span className="text-xs text-gray-400 text-center px-5">
          충청남도 천안시 서북구 불당25로 174, 1021호
        </span>
      </div>
    </div>
  )
}
