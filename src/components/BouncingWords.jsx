import React, { useEffect, useRef } from 'react'
import { useAdmin } from '../context/AdminContext'

const DEFAULT_WORDS = [
  { id: 1, text: 'Data_Engineer', size: '1.35rem', weight: '800' },
  { id: 2, text: 'SDE',           size: '1.6rem',  weight: '900' },
  { id: 3, text: 'DE',            size: '2rem',    weight: '900' },
]

// Color palette that fits the chess dark theme
const COLORS = ['#c9a961', '#60a5fa', '#a78bfa', '#34d399', '#fb923c', '#f472b6']

function pickColor(exclude) {
  const options = COLORS.filter(c => c !== exclude)
  return options[Math.floor(Math.random() * options.length)]
}

export default function BouncingWords() {
  const { adminConfig } = useAdmin()
  const words = (adminConfig.bouncingWords?.length > 0) ? adminConfig.bouncingWords : DEFAULT_WORDS
  const containerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elems = Array.from(container.querySelectorAll('[data-bounce-word]'))
    if (elems.length === 0) return

    // Shared lastTs — accessible by the loop and the visibility handler
    let lastTs = null

    // Wait one frame so the browser has laid out the spans and offsetWidth is real
    const init = () => {
      const { width: cw, height: ch } = container.getBoundingClientRect()

      const state = elems.map((el, i) => {
        const w = el.offsetWidth
        const h = el.offsetHeight
        const color = COLORS[i % COLORS.length]
        el.style.color = color
        el.style.textShadow = `0 0 14px ${color}80`
        return {
          el,
          x: Math.random() * Math.max(0, cw - w),
          y: Math.random() * Math.max(0, ch - h),
          // px per second — varied per word so they never perfectly sync
          vx: (55 + Math.random() * 50) * (Math.random() > 0.5 ? 1 : -1),
          vy: (40 + Math.random() * 40) * (Math.random() > 0.5 ? 1 : -1),
          color,
        }
      })

      const loop = (ts) => {
        if (!lastTs) lastTs = ts
        const dt = Math.min((ts - lastTs) / 1000, 0.05) // cap at 50ms
        lastTs = ts

        const { width: cw2, height: ch2 } = container.getBoundingClientRect()

        state.forEach(s => {
          s.x += s.vx * dt
          s.y += s.vy * dt

          const elW = s.el.offsetWidth
          const elH = s.el.offsetHeight

          let bounced = false
          if (s.x <= 0)          { s.vx =  Math.abs(s.vx); s.x = 0;          bounced = true }
          if (s.x + elW >= cw2)  { s.vx = -Math.abs(s.vx); s.x = cw2 - elW; bounced = true }
          if (s.y <= 0)          { s.vy =  Math.abs(s.vy); s.y = 0;          bounced = true }
          if (s.y + elH >= ch2)  { s.vy = -Math.abs(s.vy); s.y = ch2 - elH; bounced = true }

          if (bounced) {
            s.color = pickColor(s.color)
            s.el.style.color = s.color
            s.el.style.textShadow = `0 0 14px ${s.color}80`
          }

          // Direct DOM update — no React state, no re-render overhead
          s.el.style.transform = `translate(${s.x}px, ${s.y}px)`
        })

        rafRef.current = requestAnimationFrame(loop)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    // Single rAF delay to let the DOM paint and measure real sizes
    rafRef.current = requestAnimationFrame(init)

    // Reset lastTs when the page becomes visible so the first resumed frame
    // doesn't carry stale timestamps from while the tab was hidden/throttled
    const onVisibilityChange = () => {
      if (!document.hidden) lastTs = null
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [words]) // re-init whenever word list changes

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {words.map((w) => (
        <span
          key={w.id ?? w.text}
          data-bounce-word
          className="absolute top-0 left-0 select-none opacity-30"
          style={{
            fontSize: w.size,
            fontWeight: w.weight,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            letterSpacing: '0.04em',
            willChange: 'transform',
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  )
}
