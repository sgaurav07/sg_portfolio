import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolioTheme')
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme('dark')
    }
  }, [])

  const applyTheme = (themeName) => {
    const root = document.documentElement
    if (themeName === 'light') {
      root.setAttribute('data-theme', 'light')
      document.body.style.backgroundColor = 'var(--light-bg-primary)'
    } else {
      root.setAttribute('data-theme', 'dark')
      document.body.style.backgroundColor = 'var(--chess-black)'
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('portfolioTheme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
