import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import FadeIn from '../components/common/FadeIn'
import NoticeList from '../components/board/NoticeList'
import AlbumGrid from '../components/board/AlbumGrid'

const TABS = [
  { key: 'notice', label: '📋 공지사항' },
  { key: 'album', label: '📸 활동 앨범' },
]

export default function BoardPage() {
  const [activeTab, setActiveTab] = useState('notice')

  return (
    <>
      <PageHeader
        tag="NEWS & GALLERY"
        title="나무재가의"
        highlight="소식과 활동"
      />

      <section className="py-16 pb-24 px-6 bg-white">
        <div className="mx-auto max-w-[900px]">
          {/* Tab buttons */}
          <FadeIn>
            <div className="flex gap-2 mb-10">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-7 py-3 rounded-xl text-[15px] font-semibold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-deep-green text-white shadow-[0_4px_16px_rgba(45,90,61,0.2)]'
                      : 'bg-[#F8FAF9] text-gray-500 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Content */}
          <div>
            {activeTab === 'notice' ? <NoticeList /> : <AlbumGrid />}
          </div>

          {/* Pagination */}
          <FadeIn delay={0.15}>
            <div className="flex justify-center gap-1.5 mt-10">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-10 h-10 rounded-[10px] text-sm font-semibold cursor-pointer transition-all ${
                    p === 1
                      ? 'bg-deep-green text-white'
                      : 'bg-[#F8FAF9] text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
