import React from 'react'

export default function Footer({ siteMeta }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-chess-dark to-chess-black py-8 mt-20 border-t border-chess-gold/20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <p className="text-chess-cream/80">
          &copy; {currentYear} <strong className="text-chess-gold">{siteMeta.name}</strong>. All rights reserved.
        </p>
        <p className="text-sm text-chess-cream/60">
          Built with React + Vite • Styled with Tailwind CSS • Hosted on GitHub Pages
        </p>
        <p className="text-xs text-chess-gold/70">
          ♔ Data Engineering + Chess Motif Portfolio ♔
        </p>
      </div>
    </footer>
  )
}
