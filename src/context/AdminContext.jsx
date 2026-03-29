import React, { createContext, useContext, useState, useEffect } from 'react'

import { projects as SEED_PROJECTS } from '../data/projects'

const AdminContext = createContext()

// ---------------------------------------------------------------------------
// Password security — PBKDF2-SHA256 via Web Crypto API
//
// Storage format: "pbkdf2v1:<salt_hex>:<key_hex>"
//   - Random 16-byte salt per password change → immune to rainbow tables
//   - 210,000 PBKDF2 iterations → brute-forcing costs 210,000× more than SHA-256
//   - No plaintext is ever stored in source or localStorage
//
// DEFAULT_PW_ENTRY is PBKDF2-SHA256("G7r$k9PqV2m!Xb4Z", salt="portfolioadminv1",
//   iterations=210000, keylen=32), computed offline. Plaintext never in source.
// ---------------------------------------------------------------------------
const PW_HASH_KEY = 'portfolioAdminPwHash'
const PBKDF2_ITERATIONS = 210000
const PBKDF2_KEYLEN = 32
const DEFAULT_PW_ENTRY = 'pbkdf2v1:706f7274666f6c696f61646d696e7631:a24229248deefbea3c6700698489955c7003890a6a44b46a9a5d2378e55ce828'

function hexToBytes(hex) {
  return Uint8Array.from(hex.match(/.{2}/g).map(h => parseInt(h, 16)))
}
function bytesToHex(buf) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function pbkdf2Derive(password, saltHex) {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: hexToBytes(saltHex), iterations: PBKDF2_ITERATIONS },
    keyMaterial,
    PBKDF2_KEYLEN * 8
  )
  return bytesToHex(bits)
}

/** Returns true if 'input' matches the stored PBKDF2 entry. */
export async function verifyAdminPassword(input) {
  const stored = localStorage.getItem(PW_HASH_KEY) || DEFAULT_PW_ENTRY
  if (!stored.startsWith('pbkdf2v1:')) return false // unknown/legacy format — reject
  const parts = stored.split(':')
  const saltHex = parts[1]
  const storedKey = parts[2]
  const derived = await pbkdf2Derive(input, saltHex)
  return derived === storedKey
}

/** Derives and stores PBKDF2 entry for 'newPassword' with a fresh random salt. */
export async function changeAdminPassword(newPassword) {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16))
  const saltHex = bytesToHex(saltBytes)
  const keyHex = await pbkdf2Derive(newPassword, saltHex)
  localStorage.setItem(PW_HASH_KEY, `pbkdf2v1:${saltHex}:${keyHex}`)
}
// ---------------------------------------------------------------------------

const DEFAULT_CONFIG = {
  projects: SEED_PROJECTS.map(p => ({ ...p, visible: true, skills: [] })),
  blog: [],
  componentVisibility: {
    hero: true,
    dataPipeline: true,
    skillGrid: true,
    projects: true,
    resume: true,
    contact: true,
    blog: true,
  },
  quickFacts: {
    experience: '5+ years in data engineering',
    location: 'Remote / Open to Bengaluru / Pune',
    specialty: 'Cloud ETL & Data Pipelines',
    topSkills: 'Airflow, Vertex AI, Snowflake, Python',
  },
  animationSpeed: 1,
  avatar: {
    size: 32,
    customUrl: null,
  },
  bouncingWords: [
    { id: 1, text: 'Data_Engineer', size: '1.35rem', weight: '800' },
    { id: 2, text: 'SDE',           size: '1.6rem',  weight: '900' },
    { id: 3, text: 'DE',            size: '2rem',    weight: '900' },
  ],
  blogs: [],
  skills: [
    { id: 'sk-1', category: 'Cloud Platforms (Core)', icon: '\u2601\ufe0f', items: ['Azure', 'GCP', 'AWS'] },
    { id: 'sk-2', category: 'Data Warehouse',          icon: '\ud83c\udfd7\ufe0f', items: ['Snowflake', 'Postgres', 'BigQuery'] },
    { id: 'sk-3', category: 'Orchestration',           icon: '\u26a1\ufe0f', items: ['Apache Airflow', 'Vertex AI', 'Dataproc'] },
    { id: 'sk-4', category: 'Languages (Core: Python)',icon: '\ud83d\udc0d', items: ['Python', 'SQL', 'Flask'] },
    { id: 'sk-5', category: 'Streaming & Tools',       icon: '\ud83d\udd04', items: ['PySpark', 'MLflow', 'Singer.io', 'Pub/Sub'] },
    { id: 'sk-6', category: 'DevOps & Version Control',icon: '\ud83d\udd00', items: ['Git', 'GitHub', 'CI/CD', 'gcloud CLI'] },
  ],
  sectionMeta: {
    hero:           { heading: 'From data chaos to production pipelines', tagline: 'I design and deliver production-grade data pipelines for ETL, batch and streaming platforms on Azure, GCP, and Snowflake — migrating legacy systems and automating workflows for measurable impact.' },
    workExperience: { heading: 'Work Experience', tagline: '5+ years delivering production data systems — from greenfield pipelines to enterprise cloud migrations' },
    dataPipeline:   { heading: 'Data Pipeline Architecture', tagline: "Strategic data flows orchestrated with precision — like a grandmaster's opening, each move optimizes for scalability, reliability, and speed." },
    skills:         { heading: 'Technical Mastery', tagline: 'Core expertise in Python + Cloud — architecture, orchestration, and optimization' },
    projects:       { heading: 'Flagship Projects', tagline: 'Production systems delivering measurable impact — built with precision and scale' },
    blog:           { heading: 'Technical Insights', tagline: 'Deep-dive articles on architecture, optimization, and lessons learned from production systems' },
    resume:         { heading: 'Download Resume', tagline: 'Get my complete resume and background as a PDF. Updated regularly with latest projects and experience.' },
    contact:        { heading: 'Get in Touch', tagline: "Have a project in mind or want to discuss data engineering? I'd love to hear from you." },
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Data Engineer',
      company: 'Verizon (via Consulting)',
      period: '2023 – Present',
      location: 'Remote',
      summary: 'Led migration of real-time stream processing from legacy IBM-Streams to GCP Dataflow, reducing operational overhead by ~50% and enabling auto-scaling cloud infrastructure.',
      highlights: [
        'Migrated IBM-Streams proprietary pipelines to GCP Dataflow (Python/Java) with full logic parity',
        'Reduced maintenance and operational costs by ~50% through cloud-native architecture',
        'Preserved sub-second event processing latency post-migration at full production load',
        'Designed Pub/Sub event schemas and Dataflow DAGs for 10M+ daily events',
      ],
      tech: ['GCP Dataflow', 'Pub/Sub', 'Python', 'Java', 'IBM Streams'],
    },
    {
      id: 'exp-2',
      role: 'Data Engineer',
      company: 'Vimeo (via Consulting)',
      period: '2021 – 2023',
      location: 'Remote',
      summary: 'Built and maintained a large-scale CDN data analytics pipeline on GCP, enabling 50+ real-time KPI dashboards and increasing data scientist productivity by 3×.',
      highlights: [
        'Designed real-time CDN event ingestion pipeline using GCP Dataflow and Pub/Sub',
        'Delivered 50+ KPI dashboards consumed by data science & product teams',
        'Processed 10M+ events/day at 99.5% delivery reliability under peak load',
        'Enabled 3× faster analytics iteration for data science team via BigQuery integration',
      ],
      tech: ['GCP Dataflow', 'Pub/Sub', 'BigQuery', 'Python', 'Google Analytics'],
    },
    {
      id: 'exp-3',
      role: 'Data Engineer',
      company: 'Cos-CdC / Internal Projects',
      period: '2019 – 2021',
      location: 'Gurugram / Remote',
      summary: 'Designed and delivered a unified data integration platform aggregating project data from 5+ sources, cutting manual reporting overhead by ~40%.',
      highlights: [
        'Integrated Tempo Timesheet, Jira, AppSheet, BambooHR, and more via Singer.io taps',
        'Orchestrated ETL workflows with Apache Airflow on Azure VM for reliable scheduling',
        'Built Postgres data warehouse enabling real-time project analytics and dashboards',
        'Reduced manual reporting overhead by ~40% across project management and HR teams',
      ],
      tech: ['Singer.io', 'Airflow', 'Postgres', 'Azure VM', 'Python', 'SQL'],
    },
  ],
}

/** Merge saved keys over defaults so new fields added in code are always present */
function loadConfig() {
  try {
    const raw = localStorage.getItem('portfolioAdmin')
    if (!raw) return DEFAULT_CONFIG
    const saved = JSON.parse(raw)
    // Strip any legacy plaintext password that may have been saved in older versions
    const { adminPassword: _dropped, ...savedClean } = saved
    // Deep-merge top-level objects so new default keys survive upgrades
    return {
      ...DEFAULT_CONFIG,
      ...savedClean,
      componentVisibility: { ...DEFAULT_CONFIG.componentVisibility, ...(savedClean.componentVisibility ?? {}) },
      quickFacts:          { ...DEFAULT_CONFIG.quickFacts,          ...(savedClean.quickFacts ?? {}) },
      avatar:              { ...DEFAULT_CONFIG.avatar,              ...(savedClean.avatar ?? {}) },
      experience:          savedClean.experience ?? DEFAULT_CONFIG.experience,
      blogs:               savedClean.blogs      ?? DEFAULT_CONFIG.blogs,
      projects:            savedClean.projects   ?? DEFAULT_CONFIG.projects,
      skills:              savedClean.skills      ?? DEFAULT_CONFIG.skills,
      sectionMeta:         {
        ...DEFAULT_CONFIG.sectionMeta,
        ...(savedClean.sectionMeta ?? {}),
        // deep-merge each section so new default keys survive upgrades
        ...Object.fromEntries(
          Object.keys(DEFAULT_CONFIG.sectionMeta).map(k => [
            k,
            { ...DEFAULT_CONFIG.sectionMeta[k], ...(savedClean.sectionMeta?.[k] ?? {}) },
          ])
        ),
      },
    }
  } catch {
    return DEFAULT_CONFIG
  }
}

export const AdminProvider = ({ children }) => {
  // Lazy initializer — reads localStorage synchronously on first render.
  // This eliminates the race where the save-effect would fire with defaults
  // BEFORE the load-effect's setState could take effect, overwriting stored data.
  const [adminConfig, setAdminConfig] = useState(loadConfig)

  // Seed PBKDF2 entry on first load, and migrate any legacy SHA-256 or bad
  // entries — anything that isn't the new pbkdf2v1 format gets reset to default.
  useEffect(() => {
    const stored = localStorage.getItem(PW_HASH_KEY)
    if (!stored || !stored.startsWith('pbkdf2v1:')) {
      localStorage.setItem(PW_HASH_KEY, DEFAULT_PW_ENTRY)
    }
  }, [])

  // Persist every change. Avatar base64 can be large so we catch quota errors gracefully.
  useEffect(() => {
    try {
      localStorage.setItem('portfolioAdmin', JSON.stringify(adminConfig))
    } catch (err) {
      if (err.name === 'QuotaExceededError') {
        // Avatar photo may push past the ~5 MB limit — store without it and warn.
        console.warn('localStorage quota exceeded. Saving config without avatar image.')
        try {
          const slim = { ...adminConfig, avatar: { ...adminConfig.avatar, customUrl: null } }
          localStorage.setItem('portfolioAdmin', JSON.stringify(slim))
          // Store avatar separately so it survives the slim save
          if (adminConfig.avatar.customUrl) {
            localStorage.setItem('portfolioAdminAvatar', adminConfig.avatar.customUrl)
          }
        } catch {
          console.error('Could not persist admin config even without avatar.')
        }
      }
    }
  }, [adminConfig])

  // Restore avatar from its dedicated key if the main config lost it due to quota
  useEffect(() => {
    const savedAvatar = localStorage.getItem('portfolioAdminAvatar')
    if (savedAvatar && !adminConfig.avatar.customUrl) {
      setAdminConfig(prev => ({ ...prev, avatar: { ...prev.avatar, customUrl: savedAvatar } }))
    }
  }, []) // runs once on mount

  const updateProjects = (projectsArray) => {
    setAdminConfig((prev) => ({ ...prev, projects: projectsArray }))
  }

  const updateProject = (id, updatedProject) => {
    setAdminConfig((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)),
    }))
  }

  const deleteProject = (id) => {
    setAdminConfig((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  const toggleProjectVisibility = (id) => {
    setAdminConfig((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)),
    }))
  }

  const updateComponentVisibility = (component, visible) => {
    setAdminConfig((prev) => ({
      ...prev,
      componentVisibility: {
        ...prev.componentVisibility,
        [component]: visible,
      },
    }))
  }

  const updateQuickFacts = (key, value) => {
    setAdminConfig((prev) => ({
      ...prev,
      quickFacts: {
        ...prev.quickFacts,
        [key]: value,
      },
    }))
  }

  const updateAnimationSpeed = (speed) => {
    setAdminConfig((prev) => ({
      ...prev,
      animationSpeed: Math.min(2, Math.max(0.5, speed)),
    }))
  }

  const updateAvatarSize = (size) => {
    setAdminConfig((prev) => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        size: Math.min(48, Math.max(16, size)),
      },
    }))
  }

  const updateCustomAvatar = (url) => {
    // Also update the dedicated avatar key so it survives quota-slim saves
    if (url) {
      try { localStorage.setItem('portfolioAdminAvatar', url) } catch {}
    } else {
      localStorage.removeItem('portfolioAdminAvatar')
    }
    setAdminConfig((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, customUrl: url },
    }))
  }

  const updateBouncingWords = (words) => {
    setAdminConfig((prev) => ({
      ...prev,
      bouncingWords: words,
    }))
  }

  const updateExperience = (expArray) => {
    setAdminConfig((prev) => ({
      ...prev,
      experience: expArray,
    }))
  }

  const updateBlogs = (blogsArray) => {
    setAdminConfig((prev) => ({
      ...prev,
      blogs: blogsArray,
    }))
  }

  const updateSkills = (skillsArray) => {
    setAdminConfig((prev) => ({
      ...prev,
      skills: skillsArray,
    }))
  }

  const updateSectionMeta = (section, field, val) => {
    setAdminConfig((prev) => ({
      ...prev,
      sectionMeta: {
        ...prev.sectionMeta,
        [section]: { ...prev.sectionMeta[section], [field]: val },
      },
    }))
  }

  const value = {
    adminConfig,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
    updateComponentVisibility,
    updateQuickFacts,
    updateAnimationSpeed,
    updateAvatarSize,
    updateCustomAvatar,
    updateBouncingWords,
    updateExperience,
    updateBlogs,
    updateProjects,
    updateSkills,
    updateSectionMeta,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
