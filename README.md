# Saharsh Gaurav — Senior Data Engineer Portfolio

A modern, responsive single-page application (SPA) portfolio showcasing data engineering expertise, cloud infrastructure, and ETL pipeline architecture.

**Live Demo:** (Coming soon — deploy to GitHub Pages)  
**Tech Stack:** React 18 + Vite + Tailwind CSS + MDX for blogging

---

## Features

✨ **Modern Design**
- Enterprise-clean theme with chess + data engineering visual motif
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions

📋 **Portfolio Sections**
- Hero with customizable avatar (initials or photo)
- Skills & tech stack grid
- Featured project case studies (3+ projects with details, metrics, approach)
- Blog system (MDX-powered, author-friendly)
- Resume download link
- Contact form with email + LinkedIn links

🚀 **Optimized for Performance**
- Code splitting and lazy loading via Vite
- CSS minification
- Image and SVG optimization
- SEO-friendly meta tags

♟ **Chess Theme**
- Subtle chessboard dividers between sections
- Chess piece icons as role badges
- Animation cues inspired by chess-move paths

---

## Project Structure

```
f:/Portfolio/
├── .github/
│   ├── agents/
│   │   └── portfolio-spa-planner.agent.md     # Custom Copilot agent
│   └── portfolio-spa-plan.md                    # Full planning document
├── public/
│   └── Saharsh_Gaurav.pdf                      # Resume (place here)
├── src/
│   ├── components/
│   │   ├── Hero.jsx                            # Hero section with avatar picker
│   │   ├── SkillGrid.jsx                       # Tech skills grid
│   │   ├── ProjectCard.jsx                     # Project summary tile
│   │   ├── CaseStudyModal.jsx                  # Detailed project modal
│   │   ├── BlogIndex.jsx                       # Blog post list
│   │   ├── ResumeDownload.jsx                  # Resume section
│   │   ├── Contact.jsx                         # Contact form
│   │   ├── ChessDivider.jsx                    # Decorative divider
│   │   └── Footer.jsx                          # Footer
│   ├── data/
│   │   ├── siteMeta.js                         # Site metadata & config
│   │   └── projects.js                         # Featured projects data
│   ├── posts/
│   │   └── sample-airflow-design.mdx           # Sample blog post (template)
│   ├── styles/
│   │   └── index.css                           # Global styles + Tailwind
│   ├── App.jsx                                 # Main app component
│   └── main.jsx                                # React entry point
├── index.html                                   # HTML template
├── vite.config.js                              # Vite configuration
├── tailwind.config.js                          # Tailwind theme & config
├── postcss.config.js                           # PostCSS setup
├── package.json                                # Dependencies & scripts
├── .gitignore                                  # Git ignore rules
└── README.md                                   # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** 16+ and **npm** or **yarn**
- **Git** for version control
- **GitHub account** for Pages deployment

### Installation

1. **Clone or navigate to the repo:**
   ```bash
   cd f:/Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add resume PDF:**
   - Copy `Saharsh_Gaurav.pdf` to the `public/` folder
   - Update the path in `src/data/siteMeta.js` if needed (currently `/Saharsh_Gaurav.pdf`)

### Development

Run the dev server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Changes auto-reload.

### Build for Production

```bash
npm run build
```

Output is in `dist/`. Test locally with:
```bash
npm run preview
```

---

## Customization

### Update Portfolio Content

**Edit site metadata** (`src/data/siteMeta.js`):
```javascript
export const siteMeta = {
  name: 'Saharsh Gaurav',
  headline: 'Your headline here',
  tagline: 'Your tagline',
  email: 'your-email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile/',
  location: 'Your location',
  resumePath: '/Saharsh_Gaurav.pdf',
}
```

**Edit projects** (`src/data/projects.js`):
```javascript
export const projects = [
  {
    id: 'unique-id',
    title: 'Project Title',
    shortDesc: 'One-liner description',
    role: 'Your Role',
    problem: 'Problem statement',
    approach: 'How you solved it',
    tech: ['Tech1', 'Tech2'],
    metrics: [
      { label: 'Metric', value: 'Result', note: '(estimate, unverified)' },
    ],
  },
  // ... more projects
]
```

### Add Blog Posts

Create a new `.mdx` file in `src/posts/`:

```mdx
---
title: "My Blog Post Title"
date: "2026-03-28"
tags: ["tag1", "tag2"]
excerpt: "Short summary for the index."
---

# Post Title

Your content here in Markdown + React components...
```

The blog system automatically loads posts from this folder (implementation detail: currently shows sample posts; full MDX integration coming).

### Customize Avatar

In the **Hero component**, click "Change avatar" to upload a photo. It's stored locally in browser state (or can be persisted to localStorage/backend).

### Adjust Theme Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'primary': '#0B5FFF',      // Main accent (blue)
  'secondary': '#00A89D',    // Secondary accent (teal)
  'neutral-light': '#F7F8FA',
  'neutral-dark': '#1F2937',
}
```

Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --primary: #0B5FFF;
  --secondary: #00A89D;
  /* ... */
}
```

---

## Deployment

### GitHub Pages

1. **Initialize git & connect to GitHub:**
   ```bash
   git init
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   ```

2. **Update `package.json` for GitHub Pages:**
   ```json
   "base": "/portfolio/"  (if deploying to subdirectory)
   ```
   Or leave as `"base": "/"` for a user/org site.

3. **Create a deploy script (optional):**
   ```bash
   npm run build && npx gh-pages -d dist
   ```

4. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "initial commit"
   git push -u origin main
   ```

5. **Enable Pages in repo settings:**
   - Go to **Settings** → **Pages**
   - Source: `gh-pages` branch
   - Save

6. **Add a custom domain (later):**
   - Update DNS records to point to GitHub Pages
   - Add `CNAME` file to `public/` with your domain name

---

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

## Accessibility

The site follows WCAG AA standards:
- Semantic HTML headings
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus outlines on all interactive elements
- Contrast ratio >= 4.5:1

---

## Performance

- **Lighthouse Scores Target:**
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 95+

- **Optimizations:**
  - Vite's code splitting
  - Lazy-loaded component modals
  - CSS minification
  - SVG compression
  - Responsive image sizing

---

## SEO

- **Dynamic meta tags** in `index.html`
- **Open Graph** tags for social sharing (can be enhanced)
- **Structured data** (JSON-LD coming soon)
- **Sitemap** (can be auto-generated)
- **RSS feed** for blog (can be added)

---

## Troubleshooting

### Build fails with module errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot reload not working
Ensure `vite.config.js` has the correct port and check firewall settings.

### CSS not loading
Check that `src/styles/index.css` is imported in `src/main.jsx`.

### Resume PDF not downloading
Verify `Saharsh_Gaurav.pdf` is in the `public/` folder and path in `siteMeta.js` matches.

---

## Future Enhancements

- [ ] MDX blog system with full rendering
- [ ] Dark mode toggle
- [ ] Analytics integration (Plausible / Fathom)
- [ ] Comment system for blog posts (Giscus / Utterances)
- [ ] Contact form backend (Formspree / SendGrid)
- [ ] Search functionality for blog
- [ ] Interactive diagram components (for architecture diagrams)
- [ ] Testimonials / References section
- [ ] Newsletter signup

---

## License

MIT © Saharsh Gaurav

---

## Questions?

Reach out via:
- **Email:** saharshgaurav@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/sgaurav03/

---

**Last Updated:** March 28, 2026  
**Version:** 1.0.0
