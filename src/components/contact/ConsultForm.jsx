import { useState } from 'react'
import FadeIn from '../common/FadeIn'

const RELATIONS = ['본인', '자녀', '배우자', '며느리/사위', '손자녀', '기타']
const ELDER_STATUS = ['거동 불편', '치매 의심', '와상 상태', '일상생활 보조 필요', '등급 미신청', '기타']

export default function ConsultForm() {
  const [form, setForm] = useState({
    name: '', phone: '', relation: '', elderStatus: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      alert('이름과 연락처는 필수입니다.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <FadeIn>
        <div className="p-16 rounded-3xl bg-mint-pale border border-[#B8E8D0] text-center">
          <div className="text-[56px] mb-5">✅</div>
          <h2 className="text-[26px] font-extrabold text-deep-green mb-3">상담 신청이 완료되었습니다</h2>
          <p className="text-base text-gray-500 leading-[1.7]">
            빠른 시일 내에 연락드리겠습니다.<br />
            급하신 경우 <strong className="text-deep-green">041-555-9991</strong>로 전화 주세요.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', relation: '', elderStatus: '', message: '' }) }}
            className="mt-7 bg-deep-green text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold cursor-pointer hover:bg-deep-green/90 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-3xl bg-[#F8FAF9] border border-gray-200"
      >
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">온라인 상담 신청</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          아래 양식을 작성해 주시면 담당자가 연락드립니다.
        </p>

        <div className="flex flex-col gap-5">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">이름 <span className="text-[#E53E3E]">*</span></label>
            <input
              type="text"
              placeholder="보호자 또는 본인 성함"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-[18px] py-3.5 rounded-xl border-[1.5px] border-gray-200 text-[15px] text-gray-900 bg-white outline-none focus:border-deep-green transition-colors"
            />
          </div>

          {/* 연락처 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">연락처 <span className="text-[#E53E3E]">*</span></label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-[18px] py-3.5 rounded-xl border-[1.5px] border-gray-200 text-[15px] text-gray-900 bg-white outline-none focus:border-deep-green transition-colors"
            />
          </div>

          {/* 관계 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">어르신과의 관계</label>
            <div className="flex flex-wrap gap-2">
              {RELATIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleChange('relation', r)}
                  className={`px-[18px] py-2.5 rounded-[10px] text-sm font-medium cursor-pointer transition-all ${
                    form.relation === r
                      ? 'bg-deep-green text-white'
                      : 'bg-white text-gray-500 border-[1.5px] border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 어르신 상태 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">어르신 현재 상태</label>
            <div className="flex flex-wrap gap-2">
              {ELDER_STATUS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleChange('elderStatus', s)}
                  className={`px-[18px] py-2.5 rounded-[10px] text-sm font-medium cursor-pointer transition-all ${
                    form.elderStatus === s
                      ? 'bg-deep-green text-white'
                      : 'bg-white text-gray-500 border-[1.5px] border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 문의 내용 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">문의 내용</label>
            <textarea
              placeholder="궁금하신 점이나 상담받고 싶은 내용을 자유롭게 적어주세요."
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={4}
              className="w-full px-[18px] py-3.5 rounded-xl border-[1.5px] border-gray-200 text-[15px] text-gray-900 bg-white outline-none focus:border-deep-green transition-colors resize-y min-h-[100px]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-br from-deep-green to-[#478A5F] text-white rounded-[14px] text-base font-bold cursor-pointer shadow-[0_4px_20px_rgba(45,90,61,0.2)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(45,90,61,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10l14-7-7 14v-7H3z" fill="currentColor" /></svg>
            상담 신청하기
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          개인정보는 상담 목적으로만 사용되며, 상담 완료 후 파기됩니다.
        </p>
      </form>
    </FadeIn>
  )
}
