import React, { useEffect } from 'react'

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-chess-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="glass rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-chess-gold/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-chess-dark/90 backdrop-blur border-b border-chess-gold/20 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>{project.title}</h2>
            <p className="text-chess-gold/80 font-medium mt-1">{project.role}</p>
          </div>
          <button
            onClick={onClose}
            className="text-chess-gold/60 hover:text-chess-gold text-2xl transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Problem */}
          <div>
            <h3 className="text-xl font-semibold text-chess-gold mb-2" style={{fontFamily: 'Playfair Display'}}>Problem</h3>
            <p className="text-chess-cream/80 leading-relaxed">{project.problem}</p>
          </div>

          {/* Approach */}
          <div>
            <h3 className="text-xl font-semibold text-chess-gold mb-2" style={{fontFamily: 'Playfair Display'}}>Approach</h3>
            <p className="text-chess-cream/80 leading-relaxed">{project.approach}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold text-chess-gold mb-3" style={{fontFamily: 'Playfair Display'}}>Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-chess-dark/50 border border-chess-gold/30 text-chess-gold text-sm rounded-full hover:border-chess-gold/60 transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Acquired */}
          {project.skills?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-chess-gold mb-3" style={{fontFamily: 'Playfair Display'}}>Skills Acquired / Learned</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-chess-gold/10 border border-chess-gold/40 text-chess-gold text-sm rounded-full font-medium"
                  >
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metrics */}
          <div>
            <h3 className="text-xl font-semibold text-chess-gold mb-3" style={{fontFamily: 'Playfair Display'}}>Outcomes</h3>
            <ul className="space-y-2">
              {project.metrics.map((metric, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-2 h-2 bg-chess-gold rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <p className="text-chess-gold font-medium">{metric.label}</p>
                    <p className="text-chess-cream/80 text-sm">{metric.value}</p>
                    {metric.note && (
                      <p className="text-chess-cream/60 text-xs italic">{metric.note}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Close button */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-chess-gold/20 rounded-lg text-chess-gold hover:bg-chess-gold/10 hover:border-chess-gold/60 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
