import React, { useState, useEffect } from 'react'
import { useAdmin } from '../context/AdminContext'

export default function VisitorSpeedControl({ visitorSpeed, setVisitorSpeed }) {
  const { adminConfig } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)
  const [localSpeed, setLocalSpeed] = useState(visitorSpeed || adminConfig.animationSpeed)

  // Sync with visitorSpeed prop changes
  useEffect(() => {
    if (visitorSpeed !== undefined) {
      setLocalSpeed(visitorSpeed)
    }
  }, [visitorSpeed])

  // Update speed
  const handleSpeedChange = (newSpeed) => {
    const constrainedSpeed = Math.min(2, Math.max(0.5, newSpeed))
    setLocalSpeed(constrainedSpeed)
    setVisitorSpeed(constrainedSpeed)
    localStorage.setItem('visitorAnimationSpeed', constrainedSpeed.toFixed(1))
  }

  // Reset to admin default
  const handleReset = () => {
    setLocalSpeed(adminConfig.animationSpeed)
    setVisitorSpeed(adminConfig.animationSpeed)
    localStorage.removeItem('visitorAnimationSpeed')
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-chess-gold to-chess-accent text-chess-black shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center font-bold text-lg"
        title="Control animation speed"
      >
        ⚡
      </button>

      {/* Speed Control Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 bg-chess-dark border-2 border-chess-gold/40 rounded-xl p-6 shadow-2xl glass w-64 sm:w-80 animate-fade-in">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-chess-gold font-bold text-sm">Animation Speed</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-chess-cream/60 hover:text-chess-cream transition text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Speed Display */}
            <div className="flex items-center justify-between">
              <span className="text-chess-cream/70 text-xs">Current Speed</span>
              <span className="text-chess-accent text-lg font-bold">{localSpeed.toFixed(1)}x</span>
            </div>

            {/* Speed Slider */}
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={localSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-chess-dark rounded-lg appearance-none cursor-pointer accent-chess-gold"
            />

            {/* Speed Labels */}
            <div className="flex justify-between text-chess-cream/50 text-xs">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>

            {/* Info Text */}
            <p className="text-chess-cream/60 text-xs border-t border-chess-gold/20 pt-3">
              Your speed preference is saved locally. Reload to reset to admin default.
            </p>

            {/* Reset Button */}
            {localSpeed !== adminConfig.animationSpeed && (
              <button
                onClick={handleReset}
                className="w-full px-3 py-2 mt-2 text-xs bg-chess-gold/20 border border-chess-gold/40 text-chess-gold rounded hover:bg-chess-gold/30 transition font-medium"
              >
                Reset to Default ({adminConfig.animationSpeed.toFixed(1)}x)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Backdrop to close panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
