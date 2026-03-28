import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border-2"
      style={{
        backgroundColor: theme === 'dark' ? 'var(--chess-gold)' : 'var(--light-accent)',
        borderColor: theme === 'dark' ? 'var(--chess-gold)' : 'var(--light-accent)',
        color: theme === 'dark' ? 'var(--chess-black)' : 'var(--light-text-primary)',
      }}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-label="Toggle theme"
    >
      <span className="text-xl">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
