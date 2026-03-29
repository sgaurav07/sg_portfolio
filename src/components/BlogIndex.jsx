import React from 'react'
import { useAdmin } from '../context/AdminContext'

export default function BlogIndex({ onOpen }) {
  const { adminConfig } = useAdmin()

  // Show only published, non-archived posts sorted newest-first
  const posts = (adminConfig.blogs ?? [])
    .filter(p => p.published && !p.archived)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-chess-cream/60">Blog posts coming soon. Check back later!</p>
      ) : (
        posts.map((post) => {
          const publishedDate = post.publishedAt
            ? new Date(post.publishedAt).toLocaleString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              })
            : null
          const updatedDate = post.updatedAt && post.updatedAt !== post.publishedAt
            ? new Date(post.updatedAt).toLocaleString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
              })
            : null

          return (
            <article
              key={post.id}
              className="glass p-6 rounded-xl border border-chess-gold/20 hover:border-chess-gold/50 hover:shadow-lg transition"
            >
              {/* Tags row */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-chess-dark/50 border border-chess-gold/20 text-chess-gold text-xs rounded-full font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title + date */}
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3
                  className="text-xl font-semibold text-chess-gold leading-snug"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {post.title}
                </h3>
              </div>

              {/* Datetime meta */}
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-chess-cream/40 font-mono mb-3">
                {publishedDate && <span>📅 {publishedDate}</span>}
                {updatedDate   && <span>✏️ Updated {updatedDate}</span>}
              </div>

              {/* Excerpt */}
              <p className="text-chess-cream/70 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Read more */}
              <button
                onClick={() => onOpen && onOpen(post)}
                className="text-chess-gold font-medium text-sm hover:text-chess-cream transition"
              >
                Read more →
              </button>
            </article>
          )
        })
      )}
    </div>
  )
}
