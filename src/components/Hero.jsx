import React from 'react'
import ChessDivider from './ChessDivider'
import BouncingWords from './BouncingWords'
import { useAdmin } from '../context/AdminContext'

export default function Hero({ siteMeta, visitorSpeed }) {
  const { adminConfig } = useAdmin()
  const avatar = adminConfig.avatar
  return (
    <section className="relative py-32 text-center overflow-hidden">
      {/* Bouncing label words — DVD-screensaver style */}
      <BouncingWords />

      {/* Background chess pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chessPattern" x="40" y="40" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="40" fill="#c9a961" />
              <rect x="40" y="40" width="40" height="40" fill="#c9a961" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chessPattern)" />
        </svg>
      </div>

      {/* Decorative chess pieces - top */}
      <div className="absolute top-0 left-0 text-6xl opacity-10 animate-pulse" style={{animationDuration: '4s'}}>♖</div>
      <div className="absolute top-10 right-0 text-5xl opacity-10 animate-pulse" style={{animationDuration: '5s'}}>♗</div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Avatar / Profile Photo */}
        <div className="flex justify-center mb-8">
          <div
            className="relative rounded-full border-4 border-chess-gold shadow-2xl overflow-hidden"
            style={{ width: `${avatar.size * 4}px`, height: `${avatar.size * 4}px` }}
          >
            {avatar.customUrl ? (
              <img
                src={avatar.customUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-chess-gold to-amber-700 flex items-center justify-center">
                <span className="text-chess-black font-bold text-4xl">SG</span>
              </div>
            )}
            <div className="absolute bottom-1 right-1 bg-chess-gold text-chess-black rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-chess-dark">
              ♔
            </div>
          </div>
        </div>

        {/* Headline - Premium */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-chess-cream leading-tight animate-slide-up" style={{fontFamily: 'Playfair Display, Georgia, serif'}}>
          {adminConfig.sectionMeta?.hero?.heading ?? siteMeta.headline}
        </h1>

        {/* Gold accent line */}
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-chess-gold to-transparent mx-auto mb-8"></div>

        {/* Tagline with Full-Width Animation Background - Premium */}
        <div className="relative mb-12">
          {/* Full width animation background */}
          <ChessDivider visitorSpeed={visitorSpeed} hideSlider={true} isBackground={true} />
          
          {/* Tagline Content - Constrained width on top of animation */}
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <p className="text-lg sm:text-xl text-chess-cream/90 leading-relaxed" style={{fontWeight: '300', letterSpacing: '0.3px'}}>
              {adminConfig.sectionMeta?.hero?.tagline ?? siteMeta.tagline}
            </p>
          </div>
        </div>

        {/* CTA Buttons - Premium */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <a
            href="#projects"
            className="btn-premium px-8 py-4 bg-chess-gold text-chess-black rounded-lg hover:shadow-premium font-bold transition relative"
          >
            ↓ View Projects
          </a>
          <a
            href={siteMeta.resumePath}
            download
            onClick={() => {
              try {
                const log = JSON.parse(localStorage.getItem('portfolioEvents') || '[]')
                log.unshift({ event: 'resume_download', ts: new Date().toISOString() })
                localStorage.setItem('portfolioEvents', JSON.stringify(log.slice(0, 50)))
              } catch {}
            }}
            className="btn-premium px-8 py-4 border-2 border-chess-gold text-chess-gold rounded-lg hover:bg-chess-gold/10 font-bold transition"
          >
            ⬇ Download Resume
          </a>
        </div>

        {/* Social links */}
        <div className="flex gap-5 justify-center mb-12">
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-chess-cream/60 hover:text-chess-gold transition text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V9h3v10zM6.5 7.73A1.77 1.77 0 1 1 6.5 4.2a1.77 1.77 0 0 1 0 3.53zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V9h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href={siteMeta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-chess-cream/60 hover:text-chess-gold transition text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href={`mailto:${siteMeta.email}`}
            className="flex items-center gap-2 text-chess-cream/60 hover:text-chess-gold transition text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
            </svg>
            Email
          </a>
        </div>

        {/* Tech Stack - Premium styling */}
        <div>
          <p className="text-chess-cream/60 text-sm mb-4 uppercase tracking-widest">Core Expertise</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Azure', 'GCP', 'Snowflake', 'Airflow', 'Python', 'SQL'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-chess-dark border border-chess-gold/30 text-chess-gold text-sm rounded-full hover:border-chess-gold/70 transition font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative chess pieces - bottom */}
      <div className="absolute bottom-0 right-10 text-6xl opacity-10 animate-pulse" style={{animationDuration: '6s'}}>♘</div>
      <div className="absolute bottom-20 left-5 text-5xl opacity-10 animate-pulse" style={{animationDuration: '3.5s'}}>♕</div>
    </section>
  )
}
