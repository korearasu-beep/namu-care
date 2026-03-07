import FadeIn from '../components/common/FadeIn'
import ConsultForm from '../components/contact/ConsultForm'
import ContactInfo from '../components/contact/ContactInfo'
import MapSection from '../components/contact/MapSection'

export default function ContactPage() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-5">
        <FadeIn>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">상담신청</h1>
          <p className="mt-3 text-gray-500">
            무료 상담을 신청하시면 친절하게 안내해 드리겠습니다.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 폼 */}
          <ConsultForm />

          {/* 오른쪽: 연락처 + 지도 */}
          <div className="flex flex-col gap-6">
            <ContactInfo />
            <MapSection />
          </div>
        </div>
      </div>
    </section>
  )
}
