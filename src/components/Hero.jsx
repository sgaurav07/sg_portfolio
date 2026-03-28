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
          {siteMeta.headline}
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
              {siteMeta.tagline}
            </p>
          </div>
        </div>

        {/* CTA Buttons - Premium */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <a
            href="#projects"
            className="btn-premium px-8 py-4 bg-chess-gold text-chess-black rounded-lg hover:shadow-premium font-bold transition relative"
          >
            ↓ View Projects
          </a>
          <a
            href={siteMeta.resumePath}
            download
            className="btn-premium px-8 py-4 border-2 border-chess-gold text-chess-gold rounded-lg hover:bg-chess-gold/10 font-bold transition"
          >
            ⬇ Download Resume
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
