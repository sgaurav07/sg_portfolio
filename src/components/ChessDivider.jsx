import React, { useState, useEffect, useRef } from 'react'
import { useAdmin } from '../context/AdminContext'

const VELOCITY = 8         // % of width per second at 1.0x speed
const SPAWN_BASE_MS = 2000  // ms between spawns at 1.0x speed
const MAX_PARTICLES = 12    // cap prevents burst on wake-up
const CHESS_PIECES = ['♔', '♕', '♖', '♗', '♘', '♙']

export default function ChessDivider({ visitorSpeed, onSpeedChange, hideSlider = false, isBackground = false }) {
  const { adminConfig } = useAdmin()
  const [particles, setParticles] = useState([])
  const [localSpeed, setLocalSpeed] = useState(
    visitorSpeed != null ? visitorSpeed : 0.5
  )
  const speedRef = useRef(localSpeed)
  const lastTimeRef = useRef(null)

  // Measure actual pixel position of the gear cluster to compute exact thresholds
  const containerRef = useRef(null)
  const gearClusterRef = useRef(null)
  const [thresholds, setThresholds] = useState({ enter: 38, exit: 63 })

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current || !gearClusterRef.current) return
      const cRect = containerRef.current.getBoundingClientRect()
      const gRect = gearClusterRef.current.getBoundingClientRect()
      if (cRect.width === 0) return
      setThresholds({
        enter: ((gRect.left - cRect.left) / cRect.width) * 100,
        exit:  ((gRect.right - cRect.left) / cRect.width) * 100,
      })
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const speed = localSpeed || adminConfig.animationSpeed

  // Keep speedRef current without restarting rAF loop
  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value)
    setLocalSpeed(newSpeed)
    if (onSpeedChange) onSpeedChange(newSpeed)
    localStorage.setItem('visitorAnimationSpeed', newSpeed.toFixed(1))
  }

  // Single rAF loop — movement + spawning merged to avoid setInterval throttling
  // when the browser applies idle/background timer throttling (Chrome 5-min rule).
  useEffect(() => {
    let animFrameId
    let lastSpawnTs = null

    const loop = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp
        lastSpawnTs = timestamp
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = timestamp

      const spawnIntervalMs = SPAWN_BASE_MS / speedRef.current
      const shouldSpawn = lastSpawnTs !== null && (timestamp - lastSpawnTs) >= spawnIntervalMs
      if (shouldSpawn) lastSpawnTs = timestamp

      setParticles(prev => {
        let next = prev
          .map(p => ({ ...p, position: p.position + VELOCITY * speedRef.current * dt }))
          .filter(p => p.position < 108)
        if (shouldSpawn && next.length < MAX_PARTICLES) {
          next = [
            ...next,
            {
              id: timestamp + Math.random(),
              position: 0,
              pieceType: CHESS_PIECES[Math.floor(Math.random() * CHESS_PIECES.length)],
            },
          ]
        }
        return next
      })

      animFrameId = requestAnimationFrame(loop)
    }

    // Reset timestamps when the tab becomes visible again so stale timestamps
    // from the throttled/paused period don't cause a dt spike or spawn burst
    const onVisibilityChange = () => {
      if (!document.hidden) {
        lastTimeRef.current = null
        lastSpawnTs = null
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    animFrameId = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(animFrameId)
      lastTimeRef.current = null
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, []) // reads speed via speedRef — never needs to restart

  return (
    <div className={`${isBackground ? 'absolute inset-0 opacity-40 pointer-events-none z-0' : 'relative my-2 sm:my-3 md:my-4 lg:my-5 px-2 sm:px-4'}`}>
      {/* Factory Container */}
      <div className={`${isBackground ? 'absolute inset-0 overflow-hidden' : 'relative rounded-xl overflow-hidden border-2 border-chess-gold/40 shadow-2xl'} bg-gradient-to-b from-chess-dark/90 to-chess-dark`}>

        {/* Main conveyor belt area */}
        <div ref={containerRef} className={`${isBackground ? 'h-20 sm:h-24 md:h-28 lg:h-32' : 'h-32 sm:h-40 md:h-48 lg:h-56'} relative flex items-center overflow-hidden`}>

          {/* Track lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-chess-gold/50"></div>
            <div className="absolute bottom-6 left-0 w-full h-1 bg-chess-gold/50"></div>
          </div>

          {/* Left Input Station (use a responsive left clamp so it doesn't hug the viewport edge) */}
          <div className="absolute top-1/2 -translate-y-1/2 z-20" style={{ left: 'clamp(0.75rem, 4%, 2.5rem)' }}>
            <div className="sm:w-9 sm:h-9 w-7 h-7 md:w-11 md:h-11 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300 animate-pulse shadow-lg shadow-blue-400/40"></div>
          </div>

          {/* Center Processors */}
          <div ref={gearClusterRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

              {/* PARSE */}
              <div className="flex flex-col items-center">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <div className="absolute inset-0 border-2 border-transparent border-t-chess-gold border-r-chess-gold rounded-full animate-spin"
                    style={{ animationDuration: `${4 / speed}s` }}></div>
                  <div className="absolute inset-0.5 border-2 border-transparent border-b-amber-500 border-l-amber-500 rounded-full animate-spin"
                    style={{ animationDuration: `${5 / speed}s`, animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-1 flex items-center justify-center text-yellow-400 text-xs md:text-sm">⚙️</div>
                </div>
                <div className="text-xs text-chess-gold/60 font-mono mt-1">PARSE</div>
              </div>

              <div className="hidden sm:block opacity-50">
                <svg width="36" height="20" viewBox="0 0 36 20">
                  <line x1="0" y1="10" x2="28" y2="10" stroke="rgba(201,169,97,0.6)" strokeWidth="1.5" strokeDasharray="4 2"/>
                  <polygon points="26,7 32,10 26,13" fill="rgba(201,169,97,0.6)"/>
                </svg>
              </div>

              {/* PROCESS */}
              <div className="flex flex-col items-center">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <div className="absolute inset-0 border-2 border-transparent border-t-amber-500 border-r-amber-500 rounded-full animate-spin"
                    style={{ animationDuration: `${4.5 / speed}s` }}></div>
                  <div className="absolute inset-2 border border-chess-gold/40 rounded-full"></div>
                  <div className="absolute inset-1 flex items-center justify-center text-amber-400 text-xs md:text-sm">⚡</div>
                </div>
                <div className="text-xs text-chess-gold/60 font-mono mt-1">PROCESS</div>
              </div>

              <div className="hidden sm:block opacity-50">
                <svg width="36" height="20" viewBox="0 0 36 20">
                  <line x1="0" y1="10" x2="28" y2="10" stroke="rgba(201,169,97,0.6)" strokeWidth="1.5" strokeDasharray="4 2"/>
                  <polygon points="26,7 32,10 26,13" fill="rgba(201,169,97,0.6)"/>
                </svg>
              </div>

              {/* FORGE */}
              <div className="flex flex-col items-center">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <div className="absolute inset-0 border-2 border-chess-gold/60 rounded-lg animate-spin"
                    style={{ animationDuration: `${6 / speed}s` }}></div>
                  <div className="absolute inset-1 border border-chess-gold/30 rounded-sm"></div>
                  <div className="absolute inset-2 flex items-center justify-center text-chess-gold text-xs font-bold">◆</div>
                </div>
                <div className="text-xs text-chess-gold/60 font-mono mt-1">FORGE</div>
              </div>
            </div>
          </div>

          {/* Flowing Particles */}
          {particles.map((particle) => {
            // Use measured gear-cluster pixel bounds — works for any container width
            const isInput      = particle.position < thresholds.enter
            const isProcessing = particle.position >= thresholds.enter && particle.position < thresholds.exit
            const isOutput     = particle.position >= thresholds.exit

            const content  = isInput ? '●' : isProcessing ? '◆' : particle.pieceType
            const color    = isInput ? '#60a5fa' : isProcessing ? '#fbbf24' : '#c9a961'
            const glow     = isInput
              ? '0 0 6px rgba(96,165,250,0.7)'
              : isProcessing
                ? '0 0 10px rgba(251,191,36,0.8)'
                : '0 0 12px rgba(201,169,97,0.9)'
            const fontSize = isOutput ? '1.4rem' : '1rem'
            const opacity  = particle.position > 98 ? Math.max(0, (108 - particle.position) / 10) : 1

            return (
              <div
                key={particle.id}
                className="absolute top-1/2 -translate-y-1/2 font-bold select-none pointer-events-none"
                style={{
                  left: `${particle.position}%`,
                  opacity,
                  color,
                  fontSize,
                  textShadow: glow,
                  // Near-instant so character and color change together without lag
                  transition: 'color 0.06s, font-size 0.06s, text-shadow 0.06s',
                  willChange: 'left',
                }}
              >
                {content}
              </div>
            )
          })}
        </div>

        {/* Conveyor Belt with visible data packages */}
        <div className="relative h-10 sm:h-12 bg-gradient-to-b from-chess-dark/80 via-chess-dark to-chess-dark border-t-2 border-chess-gold/40 overflow-hidden">
          {/* Belt surface rail */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-chess-gold/25 border-t border-chess-gold/50" />
          <div className="absolute bottom-1.5 left-0 w-full h-px bg-chess-gold/10" />

          {/* Scrolling packages layer */}
          <div
            className="absolute top-0 left-0 h-full flex items-center"
            style={{
              whiteSpace: 'nowrap',
              animation: `conveyorScroll ${30 / speed}s linear infinite`,
              willChange: 'transform',
            }}
          >
            {/* Two copies for seamless loop */}
            {[0, 1].map((copy) => (
              <span key={copy} className="inline-flex items-center gap-5 px-5">
                {[
                  { icon: '📄', label: 'CSV' },
                  { icon: '🐍', label: 'Python' },
                  { icon: '🔷', label: 'SQL' },
                  { icon: '☁️', label: 'GCP' },
                  { icon: '⚡', label: 'ETL' },
                  { icon: '❄️', label: 'Snowflake' },
                  { icon: '💾', label: 'JSON' },
                  { icon: '⚙️', label: 'Airflow' },
                  { icon: '🔄', label: 'API' },
                  { icon: '📊', label: 'BI' },
                  { icon: '🔺', label: 'Azure' },
                  { icon: '🌊', label: 'Streaming' },
                ].map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-chess-gold/30 bg-chess-dark/90 text-chess-gold/80 font-mono select-none"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.03em', boxShadow: '0 1px 4px rgba(201,169,97,0.15)' }}
                  >
                    <span style={{ fontSize: '0.7rem' }}>{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </span>
            ))}
          </div>

          {/* Belt segment lines (overlay) */}
          <div
            className="absolute top-0 left-0 h-full w-[200%] flex pointer-events-none opacity-20"
            style={{ animation: `conveyorScroll ${30 / speed}s linear infinite` }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="flex-1 border-r border-chess-gold/20" />
            ))}
          </div>
        </div>

        {/* Speed Slider */}
        {!hideSlider && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-64 sm:w-72">
            <div className="flex items-center gap-3 p-2">
              <span className="text-chess-gold/70 text-xs font-semibold flex-shrink-0">Speed</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={localSpeed}
                onChange={handleSpeedChange}
                className="flex-1 h-2 bg-chess-dark rounded-lg appearance-none cursor-pointer accent-chess-gold"
              />
              <span className="text-chess-gold text-xs sm:text-sm font-bold flex-shrink-0 w-10 text-right">
                {localSpeed.toFixed(1)}x
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Labels */}
      {!isBackground && (
        <div className="mt-2 flex justify-between px-4 sm:px-6 md:px-8">
          <span className="text-xs md:text-sm text-blue-300/70 font-bold">← DATA IN</span>
          <span className="text-xs md:text-sm text-chess-gold/70 font-bold">PIECES OUT →</span>
        </div>
      )}

      {/* Status */}
      {!isBackground && (
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-chess-cream/50">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span>Factory Pipeline Running</span>
          <div className="w-2 h-2 rounded-full bg-chess-gold animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      )}

      <style>{`
        @keyframes conveyorScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
