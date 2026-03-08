import { useState, useEffect } from 'react'

export default function PageHeader({ tag, title, highlight, description }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 68,
        background: 'linear-gradient(168deg, #FAFDF8 0%, #E8F7EF 60%, #F2FBF6 100%)',
      }}
    >
      {/* Decorative blur */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-8%',
        width: 350,
        height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,232,208,0.15), transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1120,
        margin: '0 auto',
        padding: '80px 1.5rem 60px',
        position: 'relative',
        zIndex: 2,
      }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 13,
            fontWeight: 700,
            color: '#2D5A3D',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 12,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
            transitionDelay: '0.2s',
          }}
        >
          {tag}
        </span>
        <h1
          style={{
            fontSize: 'clamp(30px, 5vw, 46px)',
            fontWeight: 800,
            color: '#1A2B23',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease',
            transitionDelay: '0.3s',
          }}
        >
          {title}
          <br /><span style={{ color: '#2D5A3D' }}>{highlight}</span>
        </h1>
        {description && (
          <p
            style={{
              fontSize: 17,
              color: '#5F706A',
              marginTop: 12,
              lineHeight: 1.6,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.7s ease',
              transitionDelay: '0.5s',
            }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
