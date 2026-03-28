import React from 'react'

export default function ProjectCard({ project, onClick }) {
  return (
    <button
      onClick={onClick}
      className="glass rounded-lg p-6 border border-chess-gold/20 hover:border-chess-gold/60 hover:shadow-premium transition text-left cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-chess-cream group-hover:text-chess-gold transition" style={{fontFamily: 'Playfair Display'}}>{project.title}</h3>
          <p className="text-sm text-chess-gold/80 font-medium">{project.role}</p>
        </div>
        <span className="text-2xl group-hover:scale-125 transition">♗</span>
      </div>
      <p className="text-chess-cream/70 mb-4 text-sm">{project.shortDesc}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-chess-dark border border-chess-gold/20 text-chess-gold text-xs rounded hover:border-chess-gold/60 transition"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-3 py-1 text-chess-cream/60 text-xs">+{project.tech.length - 3} more</span>
        )}
      </div>
      <div className="mt-4 text-chess-gold font-medium text-sm group-hover:text-chess-white transition">
        View case study →
      </div>
    </button>
  )
}
