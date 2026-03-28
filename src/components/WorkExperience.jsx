import React, { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

export default function WorkExperience() {
  const { adminConfig } = useAdmin()
  const experience = adminConfig.experience ?? []
  const [expanded, setExpanded] = useState(experience[0]?.id ?? null)

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 py-20">
      <h2
        className="text-4xl font-bold text-chess-cream mb-4 text-center"
        style={{ fontFamily: 'Playfair Display' }}
      >
        Work Experience
      </h2>
      <p className="text-chess-cream/70 text-center mb-14 max-w-2xl mx-auto">
        5+ years delivering production data systems — from greenfield pipelines to enterprise
        cloud migrations
      </p>

      <div className="relative">
        {/* Vertical timeline bar */}
        <div className="absolute left-6 top-2 bottom-2 w-px bg-chess-gold/20 hidden sm:block" />

        <div className="space-y-6">
          {experience.map((job, idx) => {
            const isOpen = expanded === job.id
            return (
              <div key={job.id} className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-5 w-12 h-12 rounded-full bg-chess-dark border-2 border-chess-gold items-center justify-center text-chess-gold font-bold text-lg shadow-lg">
                  {idx + 1}
                </div>

                <div
                  className={`glass rounded-xl border transition-all duration-200 ${
                    isOpen ? 'border-chess-gold/50' : 'border-chess-gold/15'
                  }`}
                >
                  {/* Header row */}
                  <button
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                    onClick={() => setExpanded(isOpen ? null : job.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span
                          className="text-xl font-bold text-chess-gold"
                          style={{ fontFamily: 'Playfair Display' }}
                        >
                          {job.role}
                        </span>
                        <span className="text-chess-cream/60 text-sm">{job.company}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-chess-cream/50">
                        <span>🗓 {job.period}</span>
                        <span>📍 {job.location}</span>
                      </div>
                      {!isOpen && (
                        <p className="mt-2 text-chess-cream/60 text-sm leading-relaxed line-clamp-2">
                          {job.summary}
                        </p>
                      )}
                    </div>
                    <span className="text-chess-gold/50 text-lg mt-1 flex-shrink-0">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Expanded body */}
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-chess-gold/15 pt-5 space-y-5">
                      <p className="text-chess-cream/80 leading-relaxed">{job.summary}</p>

                      <ul className="space-y-2">
                        {job.highlights.map((h, i) => (
                          <li key={i} className="flex gap-3 text-sm text-chess-cream/75">
                            <span className="text-chess-gold mt-0.5 flex-shrink-0">♟</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {job.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-chess-dark border border-chess-gold/25 text-chess-gold text-xs rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
