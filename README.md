# Vasudev Meti — Software Engineering Portfolio

Portfolio website for **Vasudev Meti**, an experienced software engineer moving into evaluation-driven Applied AI and MLOps.

An original illustrated mountain trail introduces the person behind the code. Interactive landmarks lead to an introduction, projects, career experience, Applied AI work and contact details. The detailed engineering evidence remains available below the landscape.

## Features

- Responsive mountain landscape with five clickable landmarks and persistent recruiter navigation
- Personal interest dialogs for trekking, rides, gaming, sports, dance and gym
- A skippable 3.4-second opening with “A beginning without an end”, an animated endless mountain trail, and once-per-session playback. Direct section links and reduced-motion preferences bypass the intro.
- Bike and controller emoji, a dumbbell icon, Ghost of Yōtei in the gaming panel, and a short animated dancer sequence
- Original AI-generated landscape, delivered as an optimised WebP asset
- Expandable engineering details for the featured AutoOps case study
- Featured case studies before experience and capabilities
- Evidence-led project status, decisions, limitations and repository links
- Keyboard command palette (`Ctrl/Cmd + K`)
- Accessible navigation, focus indicators, skip link and reduced-motion support
- ModuleAtlas and an AI incident-response concept, both clearly labelled as development-stage work
- Downloadable, recruiter-focused CV
- Zero runtime dependencies or build step

## Run locally

Open `index.html` directly, or serve the directory with any static file server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Content updates

Content is written directly in `index.html`. `styles.css` retains the case-study and content components; `trail.css` provides the landscape, navigation, personal introduction and responsive theme. `script.js` handles interest dialogs, the command palette, active navigation, reveal effects and copy-email feedback. Add AI capabilities only when repository evidence demonstrates that they are implemented.

Validate local links, assets and accessible structure with `python verify-trail.py`, and check JavaScript syntax with `node --check script.js`.

## Deployment

GitHub Pages deploys the static site directly from the repository's `main` branch.
