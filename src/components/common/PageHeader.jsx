import { useState, useEffect } from 'react'

export default function PageHeader({ tag, title, highlight, description }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section className="pt-16 bg-gradient-to-br from-[#FAFDF8] via-mint-pale to-[#F2FBF6] relative overflow-hidden">
      <div className="absolute top-[20%] right-[-8%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,_#B8E8D040,_transparent_70%)] blur-[40px]" />
      <div className="mx-auto max-w-6xl px-6 py-20 pb-15 relative z-[2]">
        <span
          className="inline-block text-[13px] font-bold text-deep-green tracking-[0.08em] uppercase mb-3 transition-opacity duration-600"
          style={{ opacity: loaded ? 1 : 0, transitionDelay: '0.2s' }}
        >
          {tag}
        </span>
        <h1
          className="text-[clamp(30px,5vw,46px)] font-extrabold text-gray-900 leading-[1.3] tracking-tight transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.3s',
          }}
        >
          {title}{' '}
          <span className="text-deep-green">{highlight}</span>
        </h1>
        {description && (
          <p
            className="text-[17px] text-gray-500 mt-3 leading-relaxed transition-opacity duration-700"
            style={{ opacity: loaded ? 1 : 0, transitionDelay: '0.5s' }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
