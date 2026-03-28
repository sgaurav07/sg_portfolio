import React, { useState } from 'react'
import { useAdmin, verifyAdminPassword, changeAdminPassword } from '../context/AdminContext'

export default function AdminDashboard() {
  const { adminConfig, updateComponentVisibility, updateQuickFacts, updateAnimationSpeed, updateAvatarSize, updateCustomAvatar, updateBouncingWords, updateExperience } = useAdmin()
  const [activeTab, setActiveTab] = useState('components')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  // Words editor state
  const [newWordText, setNewWordText] = useState('')
  const [newWordSize, setNewWordSize] = useState('1.5rem')
  const [newWordWeight, setNewWordWeight] = useState('800')

  // Security tab state
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwMsg, setPwMsg] = useState(null)

  // Experience editor state
  const [expEditId, setExpEditId] = useState(null)   // which entry is being edited (null = none)
  const [expForm, setExpForm] = useState({})          // live edits for the open entry
  const [newHighlight, setNewHighlight] = useState('')
  const [newTech, setNewTech] = useState('')

  // Contacts inbox state — read directly from localStorage (separate from adminConfig)
  const loadContacts = () => {
    try { return JSON.parse(localStorage.getItem('portfolioContacts') || '[]') } catch { return [] }
  }
  const [contacts, setContacts] = useState(loadContacts)
  const [expandedId, setExpandedId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)

  const markRead = (id) => {
    const updated = contacts.map(c => c.id === id ? { ...c, read: true } : c)
    setContacts(updated)
    localStorage.setItem('portfolioContacts', JSON.stringify(updated))
  }

  const deleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id)
    setContacts(updated)
    localStorage.setItem('portfolioContacts', JSON.stringify(updated))
    if (expandedId === id) setExpandedId(null)
  }

  const handleLogin = async () => {
    const ok = await verifyAdminPassword(password)
    if (ok) {
      setAuthenticated(true)
      setPassword('')
    } else {
      alert('Invalid password')
    }
  }

  if (!authenticated) {
    return (
      <section className="py-20 relative">
        <div className="max-w-md mx-auto px-4">
          <div className="glass rounded-xl p-8 border border-chess-gold/20">
            <h2 className="text-3xl font-bold text-chess-gold mb-6 text-center" style={{fontFamily: 'Playfair Display'}}>
              Admin Panel
            </h2>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
              />
              <button
                onClick={handleLogin}
                className="w-full px-6 py-3 bg-gradient-to-r from-chess-gold to-chess-accent text-chess-black rounded-lg hover:shadow-premium font-medium transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>
            Admin Panel
          </h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-2 border border-chess-gold/40 text-chess-gold rounded-lg hover:border-chess-gold transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-chess-gold/20 flex-wrap">
          {['components', 'quickfacts', 'animations', 'avatar', 'words', 'experience', 'contacts', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                if (tab === 'contacts') setContacts(loadContacts())
                if (tab !== 'experience') { setExpEditId(null); setExpForm({}) }
              }}
              className={`relative px-4 py-2 font-medium transition ${
                activeTab === tab
                  ? 'text-chess-gold border-b-2 border-chess-gold'
                  : 'text-chess-cream/60 hover:text-chess-cream'
              }`}
            >
              {tab === 'components' ? 'Visibility'
                : tab === 'quickfacts' ? 'Quick Facts'
                : tab === 'animations' ? 'Animations'
                : tab === 'avatar' ? 'Avatar'
                : tab === 'words' ? 'Bouncing Words'
                : tab === 'experience' ? 'Experience'
                : tab === 'contacts' ? (
                  <span className="flex items-center gap-1.5">
                    Contacts
                    {loadContacts().filter(c => !c.read).length > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-chess-gold text-chess-black text-xs font-bold rounded-full">
                        {loadContacts().filter(c => !c.read).length}
                      </span>
                    )}
                  </span>
                )
                : 'Security'}
            </button>
          ))}
        </div>

        {/* Component Visibility Tab */}
        {activeTab === 'components' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-4">
            <h2 className="text-2xl font-bold text-chess-gold mb-6" style={{fontFamily: 'Playfair Display'}}>
              Show/Hide Components
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(adminConfig.componentVisibility).map(([component, visible]) => (
                <label
                  key={component}
                  className="flex items-center gap-3 p-4 bg-chess-dark/50 rounded-lg border border-chess-gold/20 hover:border-chess-gold/60 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => updateComponentVisibility(component, e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-chess-cream font-medium capitalize">{component}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Quick Facts Tab */}
        {activeTab === 'quickfacts' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
            <h2 className="text-2xl font-bold text-chess-gold mb-6" style={{fontFamily: 'Playfair Display'}}>
              Edit Quick Facts
            </h2>
            <div className="space-y-4">
              {Object.entries(adminConfig.quickFacts).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-chess-gold font-medium mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateQuickFacts(key, e.target.value)}
                    className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
                  />
                </div>
              ))}
              <div className="pt-4">
                <p className="text-chess-cream/60 text-sm">Changes are saved automatically to your browser's local storage.</p>
              </div>
            </div>
          </div>
        )}

        {/* Animation Settings Tab */}
        {activeTab === 'animations' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
            <h2 className="text-2xl font-bold text-chess-gold mb-6" style={{fontFamily: 'Playfair Display'}}>
              Animation Settings
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-chess-gold font-medium">Pipeline Animation Speed</label>
                  <span className="text-chess-accent text-lg font-bold">{adminConfig.animationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={adminConfig.animationSpeed}
                  onChange={(e) => updateAnimationSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-chess-dark rounded-lg appearance-none cursor-pointer accent-chess-gold"
                />
                <div className="flex justify-between text-chess-cream/50 text-xs mt-2">
                  <span>Slow (0.5x)</span>
                  <span>Normal (1.0x)</span>
                  <span>Fast (2.0x)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-chess-gold/20">
                <p className="text-chess-cream/60 text-sm">
                  ⚡ Adjust the speed of pipeline animations and visual effects across the site. Changes apply immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Avatar Settings Tab */}
        {activeTab === 'avatar' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
            <h2 className="text-2xl font-bold text-chess-gold mb-6" style={{fontFamily: 'Playfair Display'}}>
              Avatar Settings
            </h2>
            
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-4 p-6 bg-chess-dark/50 rounded-lg border border-chess-gold/20">
              <p className="text-chess-cream/70 text-sm font-medium">Avatar Preview</p>
              <div className="relative" style={{ width: `${adminConfig.avatar.size * 4}px`, height: `${adminConfig.avatar.size * 4}px` }}>
                {adminConfig.avatar.customUrl ? (
                  <img
                    src={adminConfig.avatar.customUrl}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover border-4 border-chess-gold shadow-elevated"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-chess-gold to-chess-accent flex items-center justify-center border-4 border-chess-gold shadow-elevated">
                    <span className="text-chess-black font-bold" style={{ fontSize: `${adminConfig.avatar.size * 1.5}px` }}>SG</span>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-chess-gold text-chess-black rounded-full px-2 py-1 flex items-center justify-center text-sm border-2 border-chess-dark shadow-elevated">
                  ♔
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="space-y-3">
              <label className="block text-chess-gold font-medium">Upload Custom Avatar</label>
              <label className="block">
                <div className="px-6 py-4 bg-chess-dark/50 border-2 border-dashed border-chess-gold/40 rounded-lg text-chess-cream/70 text-center cursor-pointer hover:border-chess-gold/70 hover:text-chess-gold transition">
                  <p className="font-medium">Click to upload image</p>
                  <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (evt) => {
                        updateCustomAvatar(evt.target.result)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                />
              </label>
              {adminConfig.avatar.customUrl && (
                <button
                  onClick={() => updateCustomAvatar(null)}
                  className="mt-2 px-4 py-2 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-900 transition text-sm"
                >
                  Remove Custom Avatar
                </button>
              )}
            </div>

            {/* Avatar Size Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-chess-gold font-medium">Avatar Size</label>
                <span className="text-chess-accent text-lg font-bold">{(adminConfig.avatar.size * 4)}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="48"
                step="2"
                value={adminConfig.avatar.size}
                onChange={(e) => updateAvatarSize(parseFloat(e.target.value))}
                className="w-full h-2 bg-chess-dark rounded-lg appearance-none cursor-pointer accent-chess-gold"
              />
              <div className="flex justify-between text-chess-cream/50 text-xs">
                <span>Small (64px)</span>
                <span>Large (192px)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-chess-gold/20">
              <p className="text-chess-cream/60 text-sm">
                ✓ Avatar size adjusts responsively. Other components auto-align without breaking layout.
              </p>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>Work Experience</h2>
              <button
                onClick={() => {
                  const newEntry = {
                    id: `exp-${Date.now()}`,
                    role: 'New Role',
                    company: 'Company Name',
                    period: '20XX – Present',
                    location: 'Remote',
                    summary: '',
                    highlights: [],
                    tech: [],
                  }
                  const updated = [...adminConfig.experience, newEntry]
                  updateExperience(updated)
                  setExpEditId(newEntry.id)
                  setExpForm(newEntry)
                  setNewHighlight('')
                  setNewTech('')
                }}
                className="px-4 py-2 bg-chess-gold text-chess-black rounded-lg text-sm font-semibold hover:bg-chess-gold/80 transition"
              >
                + Add Entry
              </button>
            </div>

            {adminConfig.experience.length === 0 && (
              <p className="text-chess-cream/40 text-sm text-center py-8">No experience entries yet. Click "+ Add Entry" to create one.</p>
            )}

            {adminConfig.experience.map((job, idx) => {
              const isEditing = expEditId === job.id
              const d = isEditing ? expForm : job

              const saveField = (field, val) => setExpForm(prev => ({ ...prev, [field]: val }))

              const commitEdit = () => {
                const updated = adminConfig.experience.map(e => e.id === job.id ? { ...expForm } : e)
                updateExperience(updated)
                setExpEditId(null)
                setExpForm({})
              }

              const discardEdit = () => { setExpEditId(null); setExpForm({}) }

              const deleteEntry = () => {
                updateExperience(adminConfig.experience.filter(e => e.id !== job.id))
                setExpEditId(null)
                setExpForm({})
              }

              const moveUp = () => {
                if (idx === 0) return
                const arr = [...adminConfig.experience]
                ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
                updateExperience(arr)
              }
              const moveDown = () => {
                if (idx === adminConfig.experience.length - 1) return
                const arr = [...adminConfig.experience]
                ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
                updateExperience(arr)
              }

              return (
                <div key={job.id} className={`rounded-xl border transition ${isEditing ? 'border-chess-gold/60 bg-chess-dark/40' : 'border-chess-gold/15 bg-chess-dark/20'}`}>
                  {/* Header row */}
                  <div className="flex items-center gap-3 px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={moveUp} disabled={idx === 0} className="text-chess-gold/40 hover:text-chess-gold disabled:opacity-20 text-xs leading-none">▲</button>
                      <button onClick={moveDown} disabled={idx === adminConfig.experience.length - 1} className="text-chess-gold/40 hover:text-chess-gold disabled:opacity-20 text-xs leading-none">▼</button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-chess-cream truncate">{job.role} <span className="text-chess-gold/60 font-normal text-sm">— {job.company}</span></p>
                      <p className="text-chess-cream/40 text-xs">{job.period} &bull; {job.location}</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => { setExpEditId(job.id); setExpForm({ ...job }); setNewHighlight(''); setNewTech('') }}
                        className="px-3 py-1.5 border border-chess-gold/30 text-chess-gold text-xs rounded-lg hover:bg-chess-gold/10 transition"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {/* Edit form */}
                  {isEditing && (
                    <div className="px-5 pb-5 border-t border-chess-gold/15 pt-5 space-y-4">
                      {/* Basic fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[['role','Role / Title'],['company','Company'],['period','Period (e.g. 2021 – 2023)'],['location','Location']].map(([field, label]) => (
                          <div key={field}>
                            <label className="block text-xs text-chess-gold/70 mb-1">{label}</label>
                            <input
                              type="text"
                              value={d[field]}
                              onChange={e => saveField(field, e.target.value)}
                              className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Summary */}
                      <div>
                        <label className="block text-xs text-chess-gold/70 mb-1">Summary</label>
                        <textarea
                          rows={3}
                          value={d.summary}
                          onChange={e => saveField('summary', e.target.value)}
                          className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-2 focus:ring-chess-gold/50 resize-none"
                        />
                      </div>

                      {/* Highlights */}
                      <div>
                        <label className="block text-xs text-chess-gold/70 mb-2">Highlights</label>
                        <div className="space-y-2 mb-2">
                          {d.highlights.map((h, hi) => (
                            <div key={hi} className="flex gap-2 items-start">
                              <input
                                type="text"
                                value={h}
                                onChange={e => {
                                  const arr = [...d.highlights]
                                  arr[hi] = e.target.value
                                  saveField('highlights', arr)
                                }}
                                className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/15 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-1 focus:ring-chess-gold/40"
                              />
                              <button
                                onClick={() => saveField('highlights', d.highlights.filter((_, i) => i !== hi))}
                                className="px-2 py-1.5 text-red-400/70 hover:text-red-300 text-xs border border-red-500/20 rounded-lg transition"
                              >✕</button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newHighlight}
                            onChange={e => setNewHighlight(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && newHighlight.trim()) {
                                saveField('highlights', [...d.highlights, newHighlight.trim()])
                                setNewHighlight('')
                              }
                            }}
                            placeholder="Add highlight… (Enter to add)"
                            className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40"
                          />
                          <button
                            onClick={() => { if (newHighlight.trim()) { saveField('highlights', [...d.highlights, newHighlight.trim()]); setNewHighlight('') } }}
                            className="px-3 py-1.5 bg-chess-gold/20 text-chess-gold text-sm rounded-lg hover:bg-chess-gold/30 transition"
                          >+ Add</button>
                        </div>
                      </div>

                      {/* Tech tags */}
                      <div>
                        <label className="block text-xs text-chess-gold/70 mb-2">Tech Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {d.tech.map((t, ti) => (
                            <span key={ti} className="flex items-center gap-1 px-3 py-1 bg-chess-dark border border-chess-gold/25 text-chess-gold text-xs rounded-full">
                              {t}
                              <button
                                onClick={() => saveField('tech', d.tech.filter((_, i) => i !== ti))}
                                className="text-chess-gold/40 hover:text-red-300 ml-1"
                              >×</button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newTech}
                            onChange={e => setNewTech(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && newTech.trim()) {
                                saveField('tech', [...d.tech, newTech.trim()])
                                setNewTech('')
                              }
                            }}
                            placeholder="Add tech tag… (Enter to add)"
                            className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40"
                          />
                          <button
                            onClick={() => { if (newTech.trim()) { saveField('tech', [...d.tech, newTech.trim()]); setNewTech('') } }}
                            className="px-3 py-1.5 bg-chess-gold/20 text-chess-gold text-sm rounded-lg hover:bg-chess-gold/30 transition"
                          >+ Add</button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={commitEdit}
                          className="px-5 py-2 bg-chess-gold text-chess-black rounded-lg text-sm font-semibold hover:bg-chess-gold/80 transition"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={discardEdit}
                          className="px-4 py-2 border border-chess-gold/20 text-chess-cream/60 rounded-lg text-sm hover:border-chess-gold/40 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={deleteEntry}
                          className="ml-auto px-4 py-2 bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg text-sm hover:bg-red-900/60 transition"
                        >
                          Delete Entry
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Contacts Inbox Tab */}
        {activeTab === 'contacts' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>
                Contact Inbox
                {contacts.filter(c => !c.read).length > 0 && (
                  <span className="ml-3 inline-flex items-center justify-center px-2 py-0.5 bg-chess-gold text-chess-black text-sm font-bold rounded-full">
                    {contacts.filter(c => !c.read).length} new
                  </span>
                )}
              </h2>
              <span className="text-chess-cream/40 text-sm">{contacts.length} total message{contacts.length !== 1 ? 's' : ''}</span>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-16 text-chess-cream/30">
                <div className="text-5xl mb-4">✉️</div>
                <p className="text-lg">No messages yet</p>
                <p className="text-sm mt-1">Submissions from the Contact form will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-lg border transition ${
                      c.read
                        ? 'border-chess-gold/15 bg-chess-dark/30'
                        : 'border-chess-gold/40 bg-chess-dark/60 shadow-lg shadow-chess-gold/5'
                    }`}
                  >
                    {/* Row header */}
                    <button
                      className="w-full flex items-center gap-4 px-5 py-4 text-left"
                      onClick={() => {
                        setExpandedId(expandedId === c.id ? null : c.id)
                        if (!c.read) markRead(c.id)
                        setReplyingTo(null)
                        setReplyText('')
                      }}
                    >
                      {!c.read && <span className="w-2 h-2 rounded-full bg-chess-gold flex-shrink-0" />}
                      {c.read  && <span className="w-2 h-2 rounded-full bg-transparent flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className={`font-semibold truncate ${c.read ? 'text-chess-cream/70' : 'text-chess-cream'}`}>
                            {c.name}
                          </span>
                          <span className="text-chess-gold/50 text-xs truncate">{c.email}</span>
                        </div>
                        <p className="text-chess-cream/50 text-sm truncate mt-0.5">{c.message}</p>
                      </div>
                      <span className="text-chess-cream/30 text-xs flex-shrink-0">
                        {new Date(c.receivedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                      </span>
                      <span className="text-chess-gold/40 text-sm flex-shrink-0">{expandedId === c.id ? '▲' : '▼'}</span>
                    </button>

                    {/* Expanded detail */}
                    {expandedId === c.id && (
                      <div className="px-5 pb-5 border-t border-chess-gold/15 pt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-chess-gold/60 uppercase text-xs tracking-wider">From</span>
                            <p className="text-chess-cream mt-0.5">{c.name}</p>
                          </div>
                          <div>
                            <span className="text-chess-gold/60 uppercase text-xs tracking-wider">Email</span>
                            <p className="text-chess-cream mt-0.5">{c.email}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-chess-gold/60 uppercase text-xs tracking-wider">Message</span>
                          <p className="text-chess-cream/90 mt-1.5 whitespace-pre-wrap text-sm leading-relaxed bg-chess-dark/50 rounded-lg p-3 border border-chess-gold/10">
                            {c.message}
                          </p>
                        </div>

                        {/* Reply section */}
                        {replyingTo === c.id ? (
                          <div className="space-y-3">
                            <textarea
                              rows={4}
                              value={replyText}
                              onChange={e => setReplyText(e.target.value)}
                              placeholder="Type your reply..."
                              className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/30 focus:outline-none focus:ring-2 focus:ring-chess-gold/50 resize-none text-sm"
                            />
                            <div className="flex gap-3">
                              <a
                                href={`mailto:${c.email}?subject=Re: Portfolio Contact from ${encodeURIComponent(c.name)}&body=${encodeURIComponent(replyText + '\n\n---\nOriginal message:\n' + c.message)}`}
                                className="px-4 py-2 bg-chess-gold text-chess-black rounded-lg font-semibold text-sm hover:bg-chess-gold/80 transition"
                                onClick={() => { setReplyingTo(null); setReplyText('') }}
                              >
                                Open in Mail Client ↗
                              </a>
                              <p className="text-chess-cream/40 text-xs self-center">
                                SMTP sending coming soon — opens your mail client for now
                              </p>
                              <button
                                onClick={() => { setReplyingTo(null); setReplyText('') }}
                                className="ml-auto px-3 py-2 border border-chess-gold/20 text-chess-cream/50 rounded-lg text-sm hover:border-chess-gold/40 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={() => { setReplyingTo(c.id); setReplyText('') }}
                              className="px-4 py-2 bg-chess-gold/10 border border-chess-gold/30 text-chess-gold rounded-lg text-sm font-medium hover:bg-chess-gold/20 transition"
                            >
                              ↩ Reply
                            </button>
                            <button
                              onClick={() => deleteContact(c.id)}
                              className="px-4 py-2 bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg text-sm hover:bg-red-900/60 transition"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bouncing Words Tab */}
        {activeTab === 'words' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
            <h2 className="text-2xl font-bold text-chess-gold mb-6" style={{fontFamily: 'Playfair Display'}}>
              Bouncing Words
            </h2>

            {/* Current words list */}
            <div className="space-y-3">
              {(adminConfig.bouncingWords ?? []).map((w) => (
                <div key={w.id} className="flex items-center gap-3 p-3 bg-chess-dark/50 rounded-lg border border-chess-gold/20">
                  <span
                    className="flex-1 text-chess-cream font-mono"
                    style={{ fontSize: w.size, fontWeight: w.weight }}
                  >
                    {w.text}
                  </span>
                  <span className="text-chess-cream/40 text-xs">{w.size} / w{w.weight}</span>
                  <button
                    onClick={() => updateBouncingWords(
                      adminConfig.bouncingWords.filter(x => x.id !== w.id)
                    )}
                    className="px-3 py-1 bg-red-900/40 border border-red-500/40 text-red-300 rounded text-xs hover:bg-red-900 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {(adminConfig.bouncingWords ?? []).length === 0 && (
                <p className="text-chess-cream/40 text-sm">No words added yet.</p>
              )}
            </div>

            {/* Add new word */}
            <div className="pt-4 border-t border-chess-gold/20 space-y-3">
              <h3 className="text-chess-gold font-semibold">Add New Word</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-chess-cream/60 mb-1">Word / Label</label>
                  <input
                    type="text"
                    value={newWordText}
                    onChange={e => setNewWordText(e.target.value)}
                    placeholder="e.g. Python_Dev"
                    className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/30 focus:outline-none focus:ring-2 focus:ring-chess-gold/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-chess-cream/60 mb-1">Font Size</label>
                  <select
                    value={newWordSize}
                    onChange={e => setNewWordSize(e.target.value)}
                    className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream focus:outline-none focus:ring-2 focus:ring-chess-gold/50 text-sm"
                  >
                    <option value="1rem">Small (1rem)</option>
                    <option value="1.35rem">Medium (1.35rem)</option>
                    <option value="1.6rem">Large (1.6rem)</option>
                    <option value="2rem">X-Large (2rem)</option>
                    <option value="2.5rem">XX-Large (2.5rem)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-chess-cream/60 mb-1">Font Weight</label>
                  <select
                    value={newWordWeight}
                    onChange={e => setNewWordWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream focus:outline-none focus:ring-2 focus:ring-chess-gold/50 text-sm"
                  >
                    <option value="400">Normal (400)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra-Bold (800)</option>
                    <option value="900">Black (900)</option>
                  </select>
                </div>
              </div>
              <button
                disabled={!newWordText.trim()}
                onClick={() => {
                  if (!newWordText.trim()) return
                  const updated = [
                    ...(adminConfig.bouncingWords ?? []),
                    { id: Date.now(), text: newWordText.trim(), size: newWordSize, weight: newWordWeight },
                  ]
                  updateBouncingWords(updated)
                  setNewWordText('')
                }}
                className="px-6 py-2 bg-chess-gold text-chess-black rounded-lg font-semibold hover:bg-chess-gold/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                + Add Word
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6 max-w-lg">
            <h2 className="text-2xl font-bold text-chess-gold mb-6" style={{fontFamily: 'Playfair Display'}}>
              Change Admin Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-chess-gold font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPw}
                  onChange={e => { setCurrentPw(e.target.value); setPwMsg(null) }}
                  className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm text-chess-gold font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={newPw}
                  onChange={e => { setNewPw(e.target.value); setPwMsg(null) }}
                  className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm text-chess-gold font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={e => { setConfirmPw(e.target.value); setPwMsg(null) }}
                  className="w-full px-4 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream placeholder-chess-cream/40 focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
                  placeholder="Repeat new password"
                />
              </div>
              {pwMsg && (
                <p className={`text-sm font-medium ${pwMsg.ok ? 'text-green-400' : 'text-red-400'}`}>
                  {pwMsg.text}
                </p>
              )}
              <button
                onClick={async () => {
                  const currentOk = await verifyAdminPassword(currentPw)
                  if (!currentOk) {
                    setPwMsg({ ok: false, text: 'Current password is incorrect.' }); return
                  }
                  if (newPw.length < 8) {
                    setPwMsg({ ok: false, text: 'New password must be at least 8 characters.' }); return
                  }
                  if (newPw !== confirmPw) {
                    setPwMsg({ ok: false, text: 'Passwords do not match.' }); return
                  }
                  await changeAdminPassword(newPw)
                  setCurrentPw(''); setNewPw(''); setConfirmPw('')
                  setPwMsg({ ok: true, text: 'Password updated successfully.' })
                }}
                className="w-full px-6 py-3 bg-chess-gold text-chess-black rounded-lg font-semibold hover:bg-chess-gold/80 transition"
              >
                Update Password
              </button>
            </div>
            <p className="text-chess-cream/40 text-xs pt-2">
              Only the SHA-256 hash of your password is stored — the plaintext is never saved anywhere.
            </p>
          </div>
        )}

        {/* Coming Soon Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Projects Management', 'Blog Management'].map((section) => (
            <div key={section} className="glass rounded-xl p-6 border border-chess-gold/20 opacity-60">
              <h3 className="text-xl font-bold text-chess-gold mb-2" style={{fontFamily: 'Playfair Display'}}>
                {section}
              </h3>
              <p className="text-chess-cream/60 text-sm">Coming soon - Advanced management features</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
