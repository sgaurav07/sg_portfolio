import React, { useState, useEffect } from 'react'
import { useAdmin } from './context/AdminContext'
import Hero from './components/Hero'
import WorkExperience from './components/WorkExperience'
import DataPipeline from './components/DataPipeline'
import SkillGrid from './components/SkillGrid'
import ProjectCard from './components/ProjectCard'
import CaseStudyModal from './components/CaseStudyModal'
import BlogIndex from './components/BlogIndex'
import ResumeDownload from './components/ResumeDownload'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChessDivider from './components/ChessDivider'
import AdminDashboard from './components/AdminDashboard'
import { projects } from './data/projects'
import { siteMeta } from './data/siteMeta'

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [visitorSpeed, setVisitorSpeed] = useState(null)
  const { adminConfig } = useAdmin()

  // Load visitor speed preference from localStorage on mount
  useEffect(() => {
    const savedSpeed = localStorage.getItem('visitorAnimationSpeed')
    if (savedSpeed) {
      setVisitorSpeed(parseFloat(savedSpeed))
    }
  }, [])

  // Use visitor speed if set, otherwise use admin default
  const effectiveSpeed = visitorSpeed !== null ? visitorSpeed : adminConfig.animationSpeed

  // Handle speed changes from any ChessDivider slider
  const handleSpeedChange = (newSpeed) => {
    setVisitorSpeed(newSpeed)
  }

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-chess-black via-chess-dark to-chess-black section-bg-primary mesh-pattern">
      {/* Background chess grid pattern */}
      <div className="chess-grid-bg"></div>

      {/* Navigation / Fixed Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-chess-dark/95 backdrop-blur-md shadow-lg border-b border-chess-gold/20">
        <nav className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display, Georgia, serif'}}>
            <a href="#top" className="text-chess-gold hover:text-chess-cream transition">♔ {siteMeta.name}</a>
          </h1>
          {/* Desktop nav */}
          <div className="hidden sm:flex gap-8 text-sm items-center">
            <a href="#experience" className="text-chess-cream/80 hover:text-chess-gold transition font-medium">
              Experience
            </a>
            <a href="#pipeline" className="text-chess-cream/80 hover:text-chess-gold transition font-medium">
              Pipeline
            </a>
            <a href="#projects" className="text-chess-cream/80 hover:text-chess-gold transition font-medium">
              Projects
            </a>
            <a href="#blog" className="text-chess-cream/80 hover:text-chess-gold transition font-medium">
              Insights
            </a>
            <a href="#contact" className="text-chess-cream/80 hover:text-chess-gold transition font-medium">
              Contact
            </a>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="px-3 py-1 border border-chess-gold/40 text-chess-gold/80 text-xs rounded hover:border-chess-gold transition"
              title="Admin Panel"
            >
              ⚙️
            </button>
          </div>
          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-chess-gold text-2xl leading-none"
            onClick={() => setMobileNavOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </nav>
        {/* Mobile drawer */}
        {mobileNavOpen && (
          <div className="sm:hidden bg-chess-dark/95 border-t border-chess-gold/10 px-4 pb-4 flex flex-col gap-4 text-sm">
            {[['#experience','Experience'],['#pipeline','Pipeline'],['#projects','Projects'],['#blog','Insights'],['#contact','Contact']].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-chess-cream/80 hover:text-chess-gold transition font-medium py-1"
                onClick={() => setMobileNavOpen(false)}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => { setShowAdmin(!showAdmin); setMobileNavOpen(false) }}
              className="self-start px-3 py-1 border border-chess-gold/40 text-chess-gold/80 text-xs rounded hover:border-chess-gold transition"
            >
              ⚙️ Admin
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Admin Dashboard */}
        {showAdmin && <AdminDashboard />}

        {/* Hero Section */}
        {adminConfig.componentVisibility.hero && <Hero siteMeta={siteMeta} visitorSpeed={effectiveSpeed} />}
        {adminConfig.componentVisibility.hero && <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />}

        {/* Work Experience Section */}
        <>
          <WorkExperience />
          <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />
        </>

        {/* Data Pipeline Section */}
        {adminConfig.componentVisibility.dataPipeline && (
          <>
            <section id="pipeline" className="py-20 relative section-bg-primary">
              <DataPipeline />
            </section>
            <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />
          </>
        )}

        {/* Skills Section */}
        {adminConfig.componentVisibility.skillGrid && (
          <>
            <section className="max-w-5xl mx-auto px-4 py-20 section-bg-secondary relative z-10">
              <h2 className="text-4xl font-bold text-chess-cream mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
                Technical Mastery
              </h2>
              <p className="text-chess-cream/70 text-center mb-12 max-w-2xl mx-auto">
                Core expertise in Python + Cloud — architecture, orchestration, and optimization
              </p>
              <SkillGrid />
            </section>
            <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />
          </>
        )}

        {/* Projects Section */}
        {adminConfig.componentVisibility.projects && (
          <>
            <section id="projects" className="max-w-5xl mx-auto px-4 py-20">
              <h2 className="text-4xl font-bold text-chess-cream mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
                Flagship Projects
              </h2>
              <p className="text-chess-cream/70 text-center mb-12 max-w-2xl mx-auto">
                Production systems delivering measurable impact — built with precision and scale
              </p>
              <div className="grid gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </section>
            <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />
          </>
        )}

        {/* Blog Section */}
        {adminConfig.componentVisibility.blog && (
          <>
            <section id="blog" className="max-w-5xl mx-auto px-4 py-20 section-bg-secondary relative z-10">
              <h2 className="text-4xl font-bold text-chess-cream mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
                Technical Insights
              </h2>
              <p className="text-chess-cream/70 text-center mb-12 max-w-2xl mx-auto">
                Deep-dive articles on architecture, optimization, and lessons learned from production systems
              </p>
              <BlogIndex />
            </section>
            <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />
          </>
        )}

        {/* Resume Section */}
        {adminConfig.componentVisibility.resume && (
          <>
            <section className="max-w-5xl mx-auto px-4 py-20">
              <ResumeDownload siteMeta={siteMeta} />
            </section>
            <ChessDivider visitorSpeed={effectiveSpeed} onSpeedChange={handleSpeedChange} />
          </>
        )}

        {/* Contact Section */}
        {adminConfig.componentVisibility.contact && (
          <section id="contact" className="max-w-5xl mx-auto px-4 py-20">
            <Contact siteMeta={siteMeta} />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer siteMeta={siteMeta} />

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
