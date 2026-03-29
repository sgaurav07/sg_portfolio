import React from 'react'
import { useAdmin } from '../context/AdminContext'

export default function SkillGrid() {
  const { adminConfig } = useAdmin()
  const skills = adminConfig.skills ?? []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skillGroup) => (
        <div
          key={skillGroup.category}
          className="glass rounded-lg p-6 border border-chess-gold/20 hover:border-chess-gold/60 transition group"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl group-hover:scale-110 transition">{skillGroup.icon}</span>
            <h3 className="text-lg font-semibold text-chess-gold group-hover:text-white transition" style={{fontFamily: 'Playfair Display'}}>
              {skillGroup.category}
            </h3>
          </div>
          <ul className="space-y-2">
            {skillGroup.items.map((item) => (
              <li key={item} className="text-chess-cream/80 flex items-center text-sm">
                <span className="w-1.5 h-1.5 bg-chess-gold rounded-full mr-2.5 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
