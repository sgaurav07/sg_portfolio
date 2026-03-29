import React, { useState, useRef } from 'react'
import { useAdmin } from '../context/AdminContext'

const COOLDOWN_SECONDS = 60

export default function Contact({ siteMeta }) {
  const { adminConfig } = useAdmin()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [cooldownLeft, setCooldownLeft] = useState(0)
  // Honeypot — bots fill this, humans don't see it
  const [honeypot, setHoneypot] = useState('')
  const cooldownTimer = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const startCooldown = () => {
    setCooldownLeft(COOLDOWN_SECONDS)
    cooldownTimer.current = setInterval(() => {
      setCooldownLeft((s) => {
        if (s <= 1) { clearInterval(cooldownTimer.current); return 0 }
        return s - 1
      })
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Reject silently if honeypot is filled (bot)
    if (honeypot) return
    if (cooldownLeft > 0) return

    const entry = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      receivedAt: new Date().toISOString(),
      read: false,
    }
    try {
      const existing = JSON.parse(localStorage.getItem('portfolioContacts') || '[]')
      localStorage.setItem('portfolioContacts', JSON.stringify([entry, ...existing]))
    } catch {
      // localStorage full — still show success to the visitor
    }

    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    startCooldown()
  }

  if (submitted) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-chess-gold" style={{fontFamily: 'Playfair Display'}}>Get in Touch</h2>
        <div className="glass rounded-xl p-10 border border-chess-gold/30 text-center space-y-4">
          <div className="text-5xl">♔</div>
          <h3 className="text-2xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>Message Received!</h3>
          <p className="text-chess-cream/70">Thanks for reaching out. I'll get back to you as soon as possible.</p>
          <button
            onClick={() => setSubmitted(false)}
            disabled={cooldownLeft > 0}
            className="mt-4 px-6 py-2 border border-chess-gold/40 text-chess-gold rounded-lg hover:bg-chess-gold/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cooldownLeft > 0 ? `Send another message (${cooldownLeft}s)` : 'Send another message'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-4 text-chess-gold" style={{fontFamily: 'Playfair Display'}}>
        {adminConfig.sectionMeta?.contact?.heading ?? 'Get in Touch'}
      </h2>
      <p className="text-chess-cream/70 mb-8">
        {adminConfig.sectionMeta?.contact?.tagline ?? "Have a project in mind or want to discuss data engineering? I'd love to hear from you."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from humans, visible to bots */}
        <input
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          aria-hidden="true"
        />

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-chess-gold mb-1">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-chess-gold mb-1">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-chess-gold mb-1">Subject *</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
          >
            <option value="" disabled className="bg-chess-dark">Select a subject…</option>
            <option value="Job Opportunity" className="bg-chess-dark">Job Opportunity</option>
            <option value="Freelance / Contract Work" className="bg-chess-dark">Freelance / Contract Work</option>
            <option value="Project Collaboration" className="bg-chess-dark">Project Collaboration</option>
            <option value="Technical Discussion" className="bg-chess-dark">Technical Discussion</option>
            <option value="Other" className="bg-chess-dark">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-chess-gold mb-1">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50 resize-none"
            placeholder="Tell me about your project or opportunity..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={cooldownLeft > 0}
          className="w-full px-6 py-3 bg-gradient-to-r from-chess-gold to-chess-accent text-chess-black rounded-lg hover:shadow-premium font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {cooldownLeft > 0 ? `Please wait ${cooldownLeft}s…` : 'Send Message'}
        </button>
      </form>

      {/* Direct contact links */}
      <div className="mt-8 pt-8 border-t border-chess-gold/20">
        <p className="text-sm text-chess-cream/60 mb-4">Or connect with me directly:</p>
        <div className="flex gap-4 flex-wrap">
          <a
            href={`mailto:${siteMeta.email}`}
            className="px-4 py-2 border border-chess-gold/40 text-chess-gold rounded-lg hover:border-chess-gold hover:bg-chess-gold/10 font-medium transition"
          >
            Email
          </a>
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-chess-gold/40 text-chess-gold rounded-lg hover:border-chess-gold hover:bg-chess-gold/10 font-medium transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
