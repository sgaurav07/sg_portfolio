import React, { useState, useEffect } from 'react'

export default function BlogIndex() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Import and load blog posts from src/posts
    const loadPosts = async () => {
      try {
        // For now, show a placeholder; later posts will be dynamically loaded
        setPosts([
          {
            id: 'sample-1',
            title: 'Building scalable data pipelines with Apache Airflow',
            excerpt: 'Learn best practices for designing Airflow DAGs for multi-tenant ETL systems...',
            date: '2026-03-28',
            tags: ['airflow', 'etl'],
          },
          {
            id: 'sample-2',
            title: 'Migrating legacy streams to GCP Dataflow',
            excerpt: 'A practical guide to migrating IBM-streams workloads to Google Cloud Dataflow...',
            date: '2026-03-15',
            tags: ['gcp', 'migration'],
          },
        ])
        setLoading(false)
      } catch (err) {
        console.error('Failed to load posts:', err)
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) return <p className="text-chess-cream/60">Loading posts...</p>

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-chess-cream/60">Blog posts coming soon. Check back later!</p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="glass p-6 rounded-lg border border-chess-gold/20 hover:border-chess-gold/60 hover:shadow-premium transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-chess-gold flex-1" style={{fontFamily: 'Playfair Display'}}>
                {post.title}
              </h3>
              <time className="text-chess-cream/60 text-sm ml-4 flex-shrink-0">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <p className="text-chess-cream/70 mb-3">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-chess-dark/50 border border-chess-gold/20 text-chess-gold text-xs rounded hover:border-chess-gold/60 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a href={`#blog/${post.id}`} className="inline-block mt-3 text-chess-gold font-medium text-sm hover:text-chess-accent transition">
              Read more →
            </a>
          </article>
        ))
      )}
    </div>
  )
}
