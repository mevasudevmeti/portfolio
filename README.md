# Vasudev Meti — Software Engineering Portfolio

Portfolio website for **Vasudev Meti**, an experienced software engineer moving into evaluation-driven Applied AI and MLOps.

An original illustrated mountain trail introduces the person behind the code. Interactive landmarks lead to an introduction, projects, career experience, Applied AI work and contact details. The detailed engineering evidence remains available below the landscape.

## Features

- Certifications section before Education, with the AWS Certified AI Practitioner credential, official badge, issue/expiry dates and Credly verification link; also linked from the hero and keyboard section navigator

- Responsive mountain landscape with five clickable landmarks and persistent recruiter navigation
- Personal interest dialogs for trekking, rides, gaming, sports, dance and gym; trekking includes a 450px-tall Snowdonia photo beside its location and description, stacking vertically on phones
- Rides pairs the supplied Royal Enfield Meteor photo with personal riding copy. Sports includes a reference-based cartoon illustration of a badminton jump smash. All three image-led dialogs share the responsive photo-and-text layout.
- A skippable six-second opening with “A beginning without an end”, kinetic outlined lettering, an animated infinity trail, badminton and moonwalk accents, and opening/final portfolio labels, and playback on every page load, including section URLs. Reduced-motion preferences keep the intro static.
- Bike and controller emoji, a dumbbell icon, Ghost of Yōtei in the gaming panel, and a short animated dancer sequence
- Scattered controller, bike, basketball, weight-plate and moonwalker stickers; an original Ghost of Yōtei-inspired illustration appears between sections
- Small animation interludes keep decoration outside reading and navigation areas. Offscreen scenes pause; footer controls pause/resume animations and replay the opening. Reduced-motion preferences keep the decorations static.
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

### Opening motion study

`intro-motion.js` uses a deterministic `seek(t)` timeline, closed-form springs, an outgoing-glyph outline mask, and four blended subframes per rendered frame. Local fonts and their licenses are in `assets/fonts/`. Inspect eight key beats with `intro-preview.html`. Run `node test-intro-motion.cjs` to check the timeline; regenerate the Archivo outlines with `node scripts/build-intro-glyphs.cjs`.

### Hero to basecamp

`journey-scroll.js` moves one fixed landscape from the hero bounds into the About circle using native scroll position. The photo-based illustrated trekking figure fades in at arrival. The movement reverses with scrolling; reduced-motion visitors get a static hero and portrait composition. `journey-scroll.css` includes the stacked mobile layout. No scroll interception or pinning is used.

The About portrait alternates every four visible seconds between trekking and the original formal photograph. `portrait-switch.js` pauses its remaining dwell off-screen, in a hidden tab, during the intro or when animations are paused. Manual selection stops automatic cycling for the page visit. Reduced-motion visitors switch manually.

Portrait changes use a 1.4-second canvas strip warp weighted toward the shoulders and torso. The head is not geometrically distorted, but the two source photographs have different poses and expressions, so this is a stylised image morph rather than a pose-locked clothing simulation. Reduced motion switches instantly.
