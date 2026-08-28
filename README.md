# Vasudev Meti — Software Engineering Portfolio

Portfolio website for **Vasudev Meti**, an experienced software engineer moving into evaluation-driven Applied AI and LLMOps.

The interface retains an operations-dashboard identity in a focused, light-only design. It prioritises inspectable project evidence, career progression and concise recruiter-facing content.

## Features

- Responsive, light-only operations-dashboard interface
- Featured case studies before experience and capabilities
- Evidence-led project status, decisions, limitations and repository links
- Keyboard command palette (`Ctrl/Cmd + K`)
- Accessible navigation, focus indicators, skip link and reduced-motion support
- Two clearly labelled Applied AI projects in development
- Downloadable, recruiter-focused CV
- Zero runtime dependencies or build step

## Run locally

Open `index.html` directly, or serve the directory with any static file server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Content updates

Content is written directly in `index.html`; `script.js` only handles navigation, the command palette, reveal effects and copy-email feedback. Add AI capabilities only when repository evidence demonstrates that they are implemented.

## Deployment

GitHub Pages deploys the static site directly from the repository's `main` branch.
