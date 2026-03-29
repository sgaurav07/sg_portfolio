import React, { useState } from 'react'
import { useAdmin, verifyAdminPassword, changeAdminPassword } from '../context/AdminContext'

export default function AdminDashboard() {
  const { adminConfig, updateComponentVisibility, updateQuickFacts, updateAnimationSpeed, updateAvatarSize, updateCustomAvatar, updateBouncingWords, updateExperience, updateBlogs, updateProjects } = useAdmin()
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
  const [expEditId, setExpEditId] = useState(null)
  const [expForm, setExpForm] = useState({})
  const [newHighlight, setNewHighlight] = useState('')
  const [newTech, setNewTech] = useState('')

  // Blog editor state
  const [blogEditId, setBlogEditId] = useState(null)
  const [blogForm, setBlogForm] = useState({})
  const [newBlogTag, setNewBlogTag] = useState('')

  // Project editor state
  const [projEditId, setProjEditId] = useState(null)
  const [projForm, setProjForm] = useState({})
  const [newProjTech, setNewProjTech] = useState('')
  const [newProjSkill, setNewProjSkill] = useState('')
  const [newProjMetricLabel, setNewProjMetricLabel] = useState('')
  const [newProjMetricValue, setNewProjMetricValue] = useState('')

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
          {['components', 'quickfacts', 'animations', 'avatar', 'words', 'experience', 'projects', 'blog', 'contacts', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                  setActiveTab(tab)
                if (tab === 'contacts') setContacts(loadContacts())
                if (tab !== 'experience') { setExpEditId(null); setExpForm({}) }
                if (tab !== 'blog') { setBlogEditId(null); setBlogForm({}) }
                if (tab !== 'projects') { setProjEditId(null); setProjForm({}) }
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
                : tab === 'projects' ? 'Projects'
                : tab === 'blog' ? (
                  <span className="flex items-center gap-1.5">
                    Blog
                    {(adminConfig.blogs ?? []).filter(b => !b.published && !b.archived).length > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-chess-gold/30 text-chess-gold text-xs font-bold rounded-full">
                        {(adminConfig.blogs ?? []).filter(b => !b.published && !b.archived).length}
                      </span>
                    )}
                  </span>
                )
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

        {/* Projects CRUD Tab */}
        {activeTab === 'projects' && (() => {
          const projects = adminConfig.projects ?? []

          const saveProjField = (field, val) => setProjForm(prev => ({ ...prev, [field]: val }))

          const commitProj = () => {
            let updated
            if (projEditId === '__new__') {
              const entry = { ...projForm, id: `proj-${Date.now()}`, visible: true }
              updated = [...projects, entry]
            } else {
              updated = projects.map(p => p.id === projEditId ? { ...projForm } : p)
            }
            updateProjects(updated)
            setProjEditId(null); setProjForm({}); setNewProjTech(''); setNewProjSkill(''); setNewProjMetricLabel(''); setNewProjMetricValue('')
          }

          const discardProj = () => { setProjEditId(null); setProjForm({}); setNewProjTech(''); setNewProjSkill('') }

          const deleteProj = (id) => {
            updateProjects(projects.filter(p => p.id !== id))
            if (projEditId === id) discardProj()
          }

          const moveProj = (idx, dir) => {
            const arr = [...projects]
            const swap = idx + dir
            if (swap < 0 || swap >= arr.length) return
            ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
            updateProjects(arr)
          }

          const toggleVisible = (id) => {
            updateProjects(projects.map(p => p.id === id ? { ...p, visible: !p.visible } : p))
          }

          const openNew = () => {
            setProjEditId('__new__')
            setProjForm({ title: '', role: '', shortDesc: '', problem: '', approach: '', tech: [], skills: [], metrics: [], visible: true })
            setNewProjTech(''); setNewProjSkill(''); setNewProjMetricLabel(''); setNewProjMetricValue('')
          }

          return (
            <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>Projects</h2>
                <button onClick={openNew} className="px-4 py-2 bg-chess-gold text-chess-black rounded-lg text-sm font-semibold hover:bg-chess-gold/80 transition">+ Add Project</button>
              </div>

              {/* New project form */}
              {projEditId === '__new__' && (
                <ProjectEditor
                  form={projForm} saveField={saveProjField}
                  newProjTech={newProjTech} setNewProjTech={setNewProjTech}
                  newProjSkill={newProjSkill} setNewProjSkill={setNewProjSkill}
                  newProjMetricLabel={newProjMetricLabel} setNewProjMetricLabel={setNewProjMetricLabel}
                  newProjMetricValue={newProjMetricValue} setNewProjMetricValue={setNewProjMetricValue}
                  onCommit={commitProj} onDiscard={discardProj} isNew
                />
              )}

              {projects.length === 0 && projEditId !== '__new__' && (
                <p className="text-chess-cream/40 text-sm text-center py-8">No projects yet. Click "+ Add Project" to create one.</p>
              )}

              {projects.map((proj, idx) => {
                const isEditing = projEditId === proj.id
                return (
                  <div key={proj.id} className={`rounded-xl border transition ${isEditing ? 'border-chess-gold/60 bg-chess-dark/40' : !proj.visible ? 'border-chess-gold/10 bg-chess-dark/10 opacity-60' : 'border-chess-gold/15 bg-chess-dark/20'}`}>
                    <div className="flex items-center gap-3 px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveProj(idx, -1)} disabled={idx === 0} className="text-chess-gold/40 hover:text-chess-gold disabled:opacity-20 text-xs leading-none">▲</button>
                        <button onClick={() => moveProj(idx, 1)} disabled={idx === projects.length - 1} className="text-chess-gold/40 hover:text-chess-gold disabled:opacity-20 text-xs leading-none">▼</button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <p className="font-semibold text-chess-cream truncate">{proj.title}</p>
                          {!proj.visible && <span className="px-2 py-0.5 bg-chess-dark border border-chess-gold/20 text-chess-gold/50 text-xs rounded-full">Hidden</span>}
                        </div>
                        <p className="text-chess-cream/40 text-xs truncate">{proj.shortDesc}</p>
                      </div>
                      {!isEditing && (
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => { setProjEditId(proj.id); setProjForm({ ...proj }); setNewProjTech(''); setNewProjSkill(''); setNewProjMetricLabel(''); setNewProjMetricValue('') }} className="px-3 py-1.5 border border-chess-gold/30 text-chess-gold text-xs rounded-lg hover:bg-chess-gold/10 transition">Edit</button>
                          <button onClick={() => toggleVisible(proj.id)} className={`px-3 py-1.5 border text-xs rounded-lg transition ${proj.visible ? 'border-orange-500/30 text-orange-400 hover:bg-orange-900/20' : 'border-green-500/30 text-green-400 hover:bg-green-900/20'}`}>{proj.visible ? 'Hide' : 'Show'}</button>
                          <button onClick={() => deleteProj(proj.id)} className="px-3 py-1.5 bg-red-900/30 border border-red-500/30 text-red-300 text-xs rounded-lg hover:bg-red-900/60 transition">Delete</button>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <ProjectEditor
                        form={projForm} saveField={saveProjField}
                        newProjTech={newProjTech} setNewProjTech={setNewProjTech}
                        newProjSkill={newProjSkill} setNewProjSkill={setNewProjSkill}
                        newProjMetricLabel={newProjMetricLabel} setNewProjMetricLabel={setNewProjMetricLabel}
                        newProjMetricValue={newProjMetricValue} setNewProjMetricValue={setNewProjMetricValue}
                        onCommit={commitProj} onDiscard={discardProj}
                        onDelete={() => deleteProj(proj.id)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )
        })()}

        {/* Blog Management Tab */}
        {activeTab === 'blog' && (() => {
          const blogs = adminConfig.blogs ?? []

          const saveBlogField = (field, val) => setBlogForm(prev => ({ ...prev, [field]: val }))

          const commitBlog = () => {
            const now = new Date().toISOString()
            let updated
            if (blogEditId === '__new__') {
              const entry = { ...blogForm, id: `blog-${Date.now()}`, publishedAt: now, updatedAt: now }
              updated = [...blogs, entry]
            } else {
              updated = blogs.map(b => b.id === blogEditId ? { ...blogForm, updatedAt: now } : b)
            }
            updateBlogs(updated)
            setBlogEditId(null)
            setBlogForm({})
            setNewBlogTag('')
          }

          const discardBlog = () => { setBlogEditId(null); setBlogForm({}); setNewBlogTag('') }

          const deleteBlog = (id) => {
            updateBlogs(blogs.filter(b => b.id !== id))
            if (blogEditId === id) { setBlogEditId(null); setBlogForm({}) }
          }

          const toggleArchive = (id) => {
            updateBlogs(blogs.map(b => b.id === id ? { ...b, archived: !b.archived } : b))
          }

          const togglePublish = (id) => {
            const now = new Date().toISOString()
            updateBlogs(blogs.map(b => {
              if (b.id !== id) return b
              const nowPublishing = !b.published
              return { ...b, published: nowPublishing, publishedAt: nowPublishing ? (b.publishedAt || now) : b.publishedAt }
            }))
          }

          const openNew = () => {
            setBlogEditId('__new__')
            setBlogForm({ title: '', excerpt: '', content: '', tags: [], published: false, archived: false })
            setNewBlogTag('')
          }

          return (
            <div className="glass rounded-xl p-8 border border-chess-gold/20 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-chess-gold" style={{fontFamily: 'Playfair Display'}}>Blog Posts</h2>
                <button
                  onClick={openNew}
                  className="px-4 py-2 bg-chess-gold text-chess-black rounded-lg text-sm font-semibold hover:bg-chess-gold/80 transition"
                >
                  + Write Post
                </button>
              </div>

              {/* New post editor */}
              {blogEditId === '__new__' && (
                <BlogEditor
                  form={blogForm}
                  newBlogTag={newBlogTag}
                  setNewBlogTag={setNewBlogTag}
                  saveField={saveBlogField}
                  onCommit={commitBlog}
                  onDiscard={discardBlog}
                  isNew
                />
              )}

              {blogs.length === 0 && blogEditId !== '__new__' && (
                <p className="text-chess-cream/40 text-sm text-center py-8">No posts yet. Click "+ Write Post" to create your first.</p>
              )}

              {/* Post list */}
              {[...blogs].reverse().map(post => {
                const isEditing = blogEditId === post.id
                const publishedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : null
                const updatedDate = post.updatedAt && post.updatedAt !== post.publishedAt
                  ? new Date(post.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : null

                return (
                  <div key={post.id} className={`rounded-xl border transition ${isEditing ? 'border-chess-gold/60 bg-chess-dark/40' : post.archived ? 'border-chess-gold/10 bg-chess-dark/10 opacity-60' : 'border-chess-gold/15 bg-chess-dark/20'}`}>
                    {/* Row header */}
                    <div className="flex items-start gap-3 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-semibold text-chess-cream truncate">{post.title || <span className="italic text-chess-cream/40">Untitled</span>}</p>
                          {post.published && !post.archived && <span className="px-2 py-0.5 bg-green-900/40 border border-green-500/30 text-green-400 text-xs rounded-full">Published</span>}
                          {!post.published && !post.archived && <span className="px-2 py-0.5 bg-chess-dark border border-chess-gold/20 text-chess-gold/60 text-xs rounded-full">Draft</span>}
                          {post.archived && <span className="px-2 py-0.5 bg-red-900/30 border border-red-500/20 text-red-400/70 text-xs rounded-full">Archived</span>}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-chess-cream/35 font-mono">
                          {publishedDate && <span>📅 {publishedDate}</span>}
                          {updatedDate   && <span>✏️ {updatedDate}</span>}
                        </div>
                        {!isEditing && post.excerpt && (
                          <p className="text-chess-cream/50 text-sm mt-1.5 line-clamp-2">{post.excerpt}</p>
                        )}
                      </div>
                      {!isEditing && (
                        <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                          <button
                            onClick={() => { setBlogEditId(post.id); setBlogForm({ ...post }); setNewBlogTag('') }}
                            className="px-3 py-1.5 border border-chess-gold/30 text-chess-gold text-xs rounded-lg hover:bg-chess-gold/10 transition"
                          >Edit</button>
                          <button
                            onClick={() => togglePublish(post.id)}
                            className={`px-3 py-1.5 border text-xs rounded-lg transition ${post.published ? 'border-amber-500/30 text-amber-400 hover:bg-amber-900/20' : 'border-green-500/30 text-green-400 hover:bg-green-900/20'}`}
                          >{post.published ? 'Unpublish' : 'Publish'}</button>
                          <button
                            onClick={() => toggleArchive(post.id)}
                            className={`px-3 py-1.5 border text-xs rounded-lg transition ${post.archived ? 'border-chess-gold/30 text-chess-gold hover:bg-chess-gold/10' : 'border-orange-500/30 text-orange-400 hover:bg-orange-900/20'}`}
                          >{post.archived ? 'Unarchive' : 'Archive'}</button>
                          <button
                            onClick={() => deleteBlog(post.id)}
                            className="px-3 py-1.5 bg-red-900/30 border border-red-500/30 text-red-300 text-xs rounded-lg hover:bg-red-900/60 transition"
                          >Delete</button>
                        </div>
                      )}
                    </div>

                    {/* Inline edit form */}
                    {isEditing && (
                      <BlogEditor
                        form={blogForm}
                        newBlogTag={newBlogTag}
                        setNewBlogTag={setNewBlogTag}
                        saveField={saveBlogField}
                        onCommit={commitBlog}
                        onDiscard={discardBlog}
                        onDelete={() => deleteBlog(post.id)}
                        publishedAt={post.publishedAt}
                        updatedAt={post.updatedAt}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )
        })()}

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
          {['Projects Management'].map((section) => (
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

// ---------------------------------------------------------------------------
// BlogEditor — reusable inline blog post form (new or existing)
// ---------------------------------------------------------------------------
function BlogEditor({ form, newBlogTag, setNewBlogTag, saveField, onCommit, onDiscard, onDelete, isNew, publishedAt, updatedAt }) {
  const publishedDate = publishedAt
    ? new Date(publishedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : null
  const updatedDate = updatedAt && updatedAt !== publishedAt
    ? new Date(updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div className="px-5 pb-6 border-t border-chess-gold/15 pt-5 space-y-4">
      {/* Dates (read-only) */}
      {!isNew && (publishedDate || updatedDate) && (
        <div className="flex flex-wrap gap-x-5 text-xs text-chess-cream/35 font-mono">
          {publishedDate && <span>📅 Published: {publishedDate}</span>}
          {updatedDate   && <span>✏️ Updated: {updatedDate}</span>}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-1">Title</label>
        <input
          type="text"
          value={form.title || ''}
          onChange={e => saveField('title', e.target.value)}
          placeholder="Post title"
          className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-2 focus:ring-chess-gold/50"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-1">Excerpt <span className="text-chess-cream/30">(shown on blog index)</span></label>
        <textarea
          rows={2}
          value={form.excerpt || ''}
          onChange={e => saveField('excerpt', e.target.value)}
          placeholder="Short teaser for the post…"
          className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-2 focus:ring-chess-gold/50 resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-1">Content <span className="text-chess-cream/30">(full post body)</span></label>
        <textarea
          rows={12}
          value={form.content || ''}
          onChange={e => saveField('content', e.target.value)}
          placeholder="Write your post here…"
          className="w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-2 focus:ring-chess-gold/50 resize-y font-mono leading-relaxed"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.tags ?? []).map((t, ti) => (
            <span key={ti} className="flex items-center gap-1 px-3 py-1 bg-chess-dark border border-chess-gold/25 text-chess-gold text-xs rounded-full">
              {t}
              <button
                onClick={() => saveField('tags', form.tags.filter((_, i) => i !== ti))}
                className="text-chess-gold/40 hover:text-red-300 ml-1"
              >×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newBlogTag}
            onChange={e => setNewBlogTag(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && newBlogTag.trim()) {
                saveField('tags', [...(form.tags ?? []), newBlogTag.trim()])
                setNewBlogTag('')
              }
            }}
            placeholder="Add tag… (Enter)"
            className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40"
          />
          <button
            onClick={() => { if (newBlogTag.trim()) { saveField('tags', [...(form.tags ?? []), newBlogTag.trim()]); setNewBlogTag('') } }}
            className="px-3 py-1.5 bg-chess-gold/20 text-chess-gold text-sm rounded-lg hover:bg-chess-gold/30 transition"
          >+ Add</button>
        </div>
      </div>

      {/* Publish toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={!!form.published}
          onChange={e => saveField('published', e.target.checked)}
          className="w-4 h-4 accent-chess-gold"
        />
        <span className="text-chess-cream/80 text-sm">Publish immediately</span>
        <span className="text-chess-cream/40 text-xs">(unchecked = draft)</span>
      </label>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2 flex-wrap">
        <button
          onClick={onCommit}
          className="px-5 py-2 bg-chess-gold text-chess-black rounded-lg text-sm font-semibold hover:bg-chess-gold/80 transition"
        >
          {isNew ? 'Create Post' : 'Save Changes'}
        </button>
        <button
          onClick={onDiscard}
          className="px-4 py-2 border border-chess-gold/20 text-chess-cream/60 rounded-lg text-sm hover:border-chess-gold/40 transition"
        >
          Cancel
        </button>
        {!isNew && onDelete && (
          <button
            onClick={onDelete}
            className="ml-auto px-4 py-2 bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg text-sm hover:bg-red-900/60 transition"
          >
            Delete Post
          </button>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProjectEditor — inline form for creating / editing a project
// ---------------------------------------------------------------------------
function ProjectEditor({ form, saveField, newProjTech, setNewProjTech, newProjSkill, setNewProjSkill, newProjMetricLabel, setNewProjMetricLabel, newProjMetricValue, setNewProjMetricValue, onCommit, onDiscard, onDelete, isNew }) {

  const INPUT = 'w-full px-3 py-2 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm focus:outline-none focus:ring-2 focus:ring-chess-gold/50'
  const TEXTAREA = INPUT + ' resize-none'

  return (
    <div className="px-5 pb-6 border-t border-chess-gold/15 pt-5 space-y-5">

      {/* Title + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-chess-gold/70 mb-1">Project Title</label>
          <input type="text" value={form.title || ''} onChange={e => saveField('title', e.target.value)} placeholder="e.g. Vimeo CDN Pipeline" className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-chess-gold/70 mb-1">Your Role</label>
          <input type="text" value={form.role || ''} onChange={e => saveField('role', e.target.value)} placeholder="e.g. Senior Data Engineer" className={INPUT} />
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-1">Short Description <span className="text-chess-cream/30">(shown on card)</span></label>
        <input type="text" value={form.shortDesc || ''} onChange={e => saveField('shortDesc', e.target.value)} placeholder="One-liner summary…" className={INPUT} />
      </div>

      {/* Problem */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-1">Problem</label>
        <textarea rows={3} value={form.problem || ''} onChange={e => saveField('problem', e.target.value)} placeholder="What problem did this project solve?" className={TEXTAREA} />
      </div>

      {/* Approach */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-1">Approach / Solution</label>
        <textarea rows={3} value={form.approach || ''} onChange={e => saveField('approach', e.target.value)} placeholder="How did you solve it?" className={TEXTAREA} />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-2">Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.tech ?? []).map((t, ti) => (
            <span key={ti} className="flex items-center gap-1 px-3 py-1 bg-chess-dark border border-chess-gold/25 text-chess-gold text-xs rounded-full">
              {t}
              <button onClick={() => saveField('tech', form.tech.filter((_, i) => i !== ti))} className="text-chess-gold/40 hover:text-red-300 ml-1">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newProjTech} onChange={e => setNewProjTech(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && newProjTech.trim()) { saveField('tech', [...(form.tech ?? []), newProjTech.trim()]); setNewProjTech('') } }}
            placeholder="Add tech… (Enter)" className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40" />
          <button onClick={() => { if (newProjTech.trim()) { saveField('tech', [...(form.tech ?? []), newProjTech.trim()]); setNewProjTech('') } }}
            className="px-3 py-1.5 bg-chess-gold/20 text-chess-gold text-sm rounded-lg hover:bg-chess-gold/30 transition">+ Add</button>
        </div>
      </div>

      {/* Skills Acquired */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-2">Skills Acquired / Learned</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.skills ?? []).map((s, si) => (
            <span key={si} className="flex items-center gap-1 px-3 py-1 bg-chess-gold/10 border border-chess-gold/40 text-chess-gold text-xs rounded-full font-medium">
              ✦ {s}
              <button onClick={() => saveField('skills', form.skills.filter((_, i) => i !== si))} className="text-chess-gold/40 hover:text-red-300 ml-1">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newProjSkill} onChange={e => setNewProjSkill(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && newProjSkill.trim()) { saveField('skills', [...(form.skills ?? []), newProjSkill.trim()]); setNewProjSkill('') } }}
            placeholder="Add skill… (Enter)" className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40" />
          <button onClick={() => { if (newProjSkill.trim()) { saveField('skills', [...(form.skills ?? []), newProjSkill.trim()]); setNewProjSkill('') } }}
            className="px-3 py-1.5 bg-chess-gold/20 text-chess-gold text-sm rounded-lg hover:bg-chess-gold/30 transition">+ Add</button>
        </div>
      </div>

      {/* Metrics / Outcomes */}
      <div>
        <label className="block text-xs text-chess-gold/70 mb-2">Outcomes / Metrics</label>
        <div className="space-y-2 mb-2">
          {(form.metrics ?? []).map((m, mi) => (
            <div key={mi} className="flex gap-2 items-center p-2 bg-chess-dark/40 rounded-lg border border-chess-gold/10">
              <div className="flex-1 min-w-0">
                <p className="text-chess-gold text-xs font-medium truncate">{m.label}</p>
                <p className="text-chess-cream/60 text-xs truncate">{m.value}</p>
              </div>
              <button onClick={() => saveField('metrics', form.metrics.filter((_, i) => i !== mi))} className="px-2 py-1 text-red-400/70 hover:text-red-300 text-xs border border-red-500/20 rounded-lg transition flex-shrink-0">✕</button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input type="text" value={newProjMetricLabel} onChange={e => setNewProjMetricLabel(e.target.value)} placeholder="Metric label (e.g. Latency)" className="px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40" />
          <div className="flex gap-2">
            <input type="text" value={newProjMetricValue} onChange={e => setNewProjMetricValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && newProjMetricLabel.trim() && newProjMetricValue.trim()) {
                  saveField('metrics', [...(form.metrics ?? []), { label: newProjMetricLabel.trim(), value: newProjMetricValue.trim(), note: null }])
                  setNewProjMetricLabel(''); setNewProjMetricValue('')
                }
              }}
              placeholder="Value (Enter to add)" className="flex-1 px-3 py-1.5 bg-chess-dark/50 border border-chess-gold/20 rounded-lg text-chess-cream text-sm placeholder-chess-cream/30 focus:outline-none focus:ring-1 focus:ring-chess-gold/40" />
            <button onClick={() => {
              if (newProjMetricLabel.trim() && newProjMetricValue.trim()) {
                saveField('metrics', [...(form.metrics ?? []), { label: newProjMetricLabel.trim(), value: newProjMetricValue.trim(), note: null }])
                setNewProjMetricLabel(''); setNewProjMetricValue('')
              }
            }} className="px-3 py-1.5 bg-chess-gold/20 text-chess-gold text-sm rounded-lg hover:bg-chess-gold/30 transition">+ Add</button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2 flex-wrap">
        <button onClick={onCommit} className="px-5 py-2 bg-chess-gold text-chess-black rounded-lg text-sm font-semibold hover:bg-chess-gold/80 transition">
          {isNew ? 'Create Project' : 'Save Changes'}
        </button>
        <button onClick={onDiscard} className="px-4 py-2 border border-chess-gold/20 text-chess-cream/60 rounded-lg text-sm hover:border-chess-gold/40 transition">
          Cancel
        </button>
        {!isNew && onDelete && (
          <button onClick={onDelete} className="ml-auto px-4 py-2 bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg text-sm hover:bg-red-900/60 transition">
            Delete Project
          </button>
        )}
      </div>
    </div>
  )
}
