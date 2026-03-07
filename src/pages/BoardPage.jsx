import { useState } from 'react'
import FadeIn from '../components/common/FadeIn'
import NoticeList from '../components/board/NoticeList'
import AlbumGrid from '../components/board/AlbumGrid'

const TABS = [
  { key: 'notice', label: '공지사항' },
  { key: 'album', label: '활동앨범' },
]

export default function BoardPage() {
  const [activeTab, setActiveTab] = useState('notice')

  return (
    <section className="py-20 lg:py-28 bg-gray-50 min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">소식/활동</h1>
          <p className="mt-3 text-gray-500">나무재가의 새로운 소식과 활동을 확인하세요.</p>
        </FadeIn>

        {/* 탭 */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex gap-2 p-1 bg-white rounded-xl w-fit shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-deep-green text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 콘텐츠 */}
        <div className="mt-8">
          {activeTab === 'notice' ? <NoticeList /> : <AlbumGrid />}
        </div>
      </div>
    </section>
  )
}
