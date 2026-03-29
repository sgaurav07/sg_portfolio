import React, { useEffect } from 'react'

export default function BlogPostModal({ post, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!post) return null

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : null

  const updatedDate = post.updatedAt && post.updatedAt !== post.publishedAt
    ? new Date(post.updatedAt).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-20 sm:pt-24"
      style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl border border-chess-gold/30 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close post"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-chess-dark/80 border border-chess-gold/20 text-chess-gold/70 hover:text-chess-gold hover:border-chess-gold/60 hover:bg-chess-dark transition text-lg font-bold"
        >
          ✕
        </button>

        {/* Content */}
        <div className="px-6 sm:px-10 py-8 sm:py-10">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 bg-chess-dark/50 border border-chess-gold/20 text-chess-gold text-xs rounded-full font-mono">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2
            className="text-2xl sm:text-3xl font-bold text-chess-cream mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {post.title}
          </h2>

          {/* Meta: dates */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-chess-cream/40 mb-8 font-mono">
            {publishedDate && <span>📅 Published: {publishedDate}</span>}
            {updatedDate   && <span>✏️ Updated: {updatedDate}</span>}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-chess-gold/30 mb-8" />

          {/* Body — render content as-is with whitespace preserved */}
          <div className="text-chess-cream/85 leading-relaxed text-base whitespace-pre-wrap">
            {post.content || post.excerpt || 'No content yet.'}
          </div>
        </div>
      </div>
    </div>
  )
}
