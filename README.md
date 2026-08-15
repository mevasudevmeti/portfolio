# OpsLab Control Plane

Portfolio website for **Vasudev Meti**, a software engineer working across frontend, backend, platform delivery, identity, and data.

The interface is designed as an engineering control plane. It presents current experience honestly while leaving clear, reusable modules for future MLOps experiments, model registries, pipelines, and monitoring work.

## Features

- Responsive operations-dashboard interface
- Data-driven capability, project, and experience sections
- Project filtering by engineering discipline
- Keyboard command palette (`Ctrl/Cmd + K`)
- Dark and light themes with saved preference
- Accessible semantic structure and reduced-motion support
- Future-facing MLOps lab without placeholder claims
- Zero runtime dependencies or build step

## Run locally

Open `index.html` directly, or serve the directory with any static file server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Content updates

Capability, project, and experience content is stored in the arrays at the top of `script.js`. Add future MLOps case studies to the `projects` array and extend the ML lab as real experiments are completed.

## Deployment

The included GitHub Actions workflow enables GitHub Pages and deploys the repository as a static site from `main`.

