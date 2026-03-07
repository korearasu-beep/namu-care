import { useState } from 'react'
import FadeIn from '../common/FadeIn'

export default function ConsultForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    relation: '',
    grade: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 추후 Notion API 연동
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <FadeIn>
        <div className="bg-mint-pale rounded-2xl p-10 text-center">
          <div className="w-16 h-16 mx-auto bg-deep-green rounded-full flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">상담 신청이 완료되었습니다</h3>
          <p className="mt-3 text-gray-500">빠른 시일 내에 연락드리겠습니다.</p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', relation: '', grade: '', message: '' }) }}
            className="mt-6 px-6 py-2.5 bg-deep-green text-white text-sm font-semibold rounded-xl hover:bg-deep-green/90 transition-colors"
          >
            추가 상담 신청
          </button>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 lg:p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">상담 신청서</h3>

        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="이름을 입력해주세요"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent transition-all"
            />
          </div>

          {/* 연락처 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent transition-all"
            />
          </div>

          {/* 관계 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">어르신과의 관계</label>
            <select
              name="relation"
              value={form.relation}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent transition-all"
            >
              <option value="">선택해주세요</option>
              <option value="본인">본인</option>
              <option value="자녀">자녀</option>
              <option value="배우자">배우자</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* 장기요양등급 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">장기요양등급</label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent transition-all"
            >
              <option value="">선택해주세요</option>
              <option value="1등급">1등급</option>
              <option value="2등급">2등급</option>
              <option value="3등급">3등급</option>
              <option value="4등급">4등급</option>
              <option value="5등급">5등급</option>
              <option value="인지지원등급">인지지원등급</option>
              <option value="미신청">아직 신청 전</option>
            </select>
          </div>

          {/* 상담 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">상담 내용</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="궁금한 사항이나 상담 내용을 적어주세요"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-4 bg-deep-green text-white font-semibold rounded-xl hover:bg-deep-green/90 transition-colors shadow-lg shadow-deep-green/20"
          >
            상담 신청하기
          </button>
        </div>
      </form>
    </FadeIn>
  )
}
