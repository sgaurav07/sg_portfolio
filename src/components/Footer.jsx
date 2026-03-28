import React from 'react'

export default function Footer({ siteMeta }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-chess-dark to-chess-black py-10 mt-20 border-t border-chess-gold/20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
        {/* Social links */}
        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-chess-cream/70 hover:text-chess-gold transition text-sm font-medium"
          >
            {/* LinkedIn icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V9h3v10zM6.5 7.73A1.77 1.77 0 1 1 6.5 4.2a1.77 1.77 0 0 1 0 3.53zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V9h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href={siteMeta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-chess-cream/70 hover:text-chess-gold transition text-sm font-medium"
          >
            {/* GitHub icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href={`mailto:${siteMeta.email}`}
            className="flex items-center gap-2 text-chess-cream/70 hover:text-chess-gold transition text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
            </svg>
            {siteMeta.email}
          </a>
        </div>

        <div className="w-16 h-px bg-chess-gold/20 mx-auto" />

        <p className="text-chess-cream/60 text-sm">
          &copy; {currentYear} <strong className="text-chess-gold">{siteMeta.name}</strong>. All rights reserved.
        </p>
        <p className="text-xs text-chess-cream/40">
          Built with React + Vite &bull; Tailwind CSS &bull; Hosted on GitHub Pages
        </p>
        <p className="text-xs text-chess-gold/50">♔ Data Engineering + Chess Motif Portfolio ♔</p>
      </div>
    </footer>
  )
}

