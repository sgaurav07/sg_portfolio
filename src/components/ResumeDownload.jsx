import React from 'react'
import { useAdmin } from '../context/AdminContext'

export default function ResumeDownload({ siteMeta }) {
  const { adminConfig } = useAdmin()
  return (
    <div className="glass rounded-lg p-8 border border-chess-gold/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Download Section */}
        <div>
          <h3 className="text-2xl font-bold text-chess-gold mb-4" style={{fontFamily: 'Playfair Display'}}>Download Resume</h3>
          <p className="text-chess-cream/70 mb-6">
            Get my complete resume and background as a PDF. Updated regularly with latest projects and experience.
          </p>
          <a
            href={siteMeta.resumePath}
            download
            className="inline-block px-6 py-3 bg-gradient-to-r from-chess-gold to-chess-accent text-chess-black rounded-lg hover:shadow-premium font-medium transition"
          >
            📄 Download PDF
          </a>
        </div>

        {/* Key Stats */}
        <div>
          <h3 className="text-2xl font-bold text-chess-gold mb-4" style={{fontFamily: 'Playfair Display'}}>Quick Facts</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-chess-gold rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-chess-cream/80"><strong className="text-chess-gold">Experience:</strong> {adminConfig.quickFacts.experience}</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-chess-gold rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-chess-cream/80"><strong className="text-chess-gold">Locations:</strong> {adminConfig.quickFacts.location}</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-chess-gold rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-chess-cream/80"><strong className="text-chess-gold">Specialty:</strong> {adminConfig.quickFacts.specialty}</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-chess-gold rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-chess-cream/80"><strong className="text-chess-gold">Top Skills:</strong> {adminConfig.quickFacts.topSkills}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
