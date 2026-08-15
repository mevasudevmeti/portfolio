const services = [
  {
    id: "FE",
    title: "Frontend systems",
    description: "Responsive product interfaces and modular frontend architecture built for real operational workflows.",
    technologies: ["React", "TypeScript", "JavaScript", "Micro Frontends", "Webpack"],
    color: "#38bdf8",
  },
  {
    id: "BE",
    title: "Backend & APIs",
    description: "Service-oriented applications, secure integrations, data access, and maintainable REST interfaces.",
    technologies: ["Java", "Spring Boot", "Django", "REST APIs", "PostgreSQL"],
    color: "#34d399",
  },
  {
    id: "ID",
    title: "Identity & security",
    description: "Authentication experiences spanning enterprise identity providers and multi-factor workflows.",
    technologies: ["OIDC", "SAML", "MFA", "Google Authenticator", "Secure flows"],
    color: "#a78bfa",
  },
  {
    id: "OP",
    title: "Delivery & operations",
    description: "Quality gates and delivery tooling that help teams ship dependable software with confidence.",
    technologies: ["Docker", "GitLab CI/CD", "Cypress", "Jest", "Git"],
    color: "#fbbf24",
  },
  {
    id: "DA",
    title: "Data analysis",
    description: "Cleaning, validation, statistical analysis, and evidence-led interpretation of complex datasets.",
    technologies: ["Python", "Regression", "Testing", "Data quality", "Survey data"],
    color: "#fb7185",
  },
  {
    id: "ML",
    title: "MLOps trajectory",
    description: "Building toward reproducible model development, deployment, versioning, and observability.",
    technologies: ["Experimentation", "Pipelines", "Model registry", "Monitoring", "Cloud"],
    color: "#22d3ee",
  },
];

const projects = [
  {
    name: "AutoOps Portal",
    type: "Operations platform",
    description: "Operational dashboards and Spring Boot APIs for delivery and support workflows, backed by structured PostgreSQL data and Redis caching.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "Redis", "GitLab CI/CD"],
    categories: ["frontend", "backend", "platform"],
    status: "PRODUCTION EXPERIENCE",
    url: "https://github.com/mevasudevmeti/autoops-portal",
  },
  {
    name: "Student Course Microservices",
    type: "Distributed application",
    description: "Student registration, authentication, course enrollment, profile management, and graduation eligibility across REST-based services.",
    technologies: ["Java", "Spring Boot", "REST", "MySQL"],
    categories: ["backend", "platform"],
    status: "DEPLOYED",
    url: "https://github.com/mevasudevmeti/Student-Courses-Microservice",
  },
  {
    name: "Payment Integration System",
    type: "Secure web application",
    description: "Payment workflows supporting cards, UPI, and net banking through Razorpay, with validation, error handling, and accessible user journeys.",
    technologies: ["Django", "Python", "Razorpay", "HTML", "CSS"],
    categories: ["frontend", "backend"],
    status: "DEPLOYED",
    url: "https://github.com/mevasudevmeti/Payment-Integration-System---Internship",
  },
  {
    name: "Survey Data Validation",
    type: "Analysis pipeline",
    description: "Data cleaning, cross-validation against regional GVA models, and statistical testing to identify meaningful business factors.",
    technologies: ["Python", "Data cleaning", "Regression", "Cross-validation"],
    categories: ["data"],
    status: "CURRENT WORK",
    url: null,
  },
];

const experience = [
  {
    period: "APR 2026 — PRESENT",
    location: "Leeds, United Kingdom",
    role: "Student Data Analyst",
    company: "CSR Host Consulting Ltd",
    description: "Designing data-cleaning and analysis pipelines, validating survey outputs against regional models, and testing business hypotheses with statistical methods.",
    highlights: ["Data quality", "Statistical analysis", "Regression", "Cross-validation"],
  },
  {
    period: "OCT 2021 — JAN 2026",
    location: "Bengaluru, India",
    role: "Software Engineer II",
    company: "Bottomline Technologies",
    description: "Built and modernized API-management, operations, identity, and micro-frontend products while strengthening performance, quality, and delivery workflows.",
    highlights: ["React", "Spring Boot", "Micro Frontends", "OIDC / SAML / MFA", "CI/CD"],
  },
  {
    period: "JAN 2026 — MAY 2027",
    location: "Leeds, United Kingdom",
    role: "MSc Advanced Computer Science",
    company: "Leeds Beckett University",
    description: "Deepening expertise in advanced computing while expanding toward cloud platforms, large-scale system design, machine learning, and MLOps.",
    highlights: ["Advanced CS", "Systems", "Cloud", "ML trajectory"],
  },
];

const navCommands = [
  { label: "Overview", detail: "Profile and status", target: "overview" },
  { label: "Services", detail: "Capability map", target: "services" },
  { label: "Deployments", detail: "Selected projects", target: "projects" },
  { label: "Activity logs", detail: "Experience timeline", target: "experience" },
  { label: "ML lab", detail: "Future MLOps workspace", target: "ml-lab" },
  { label: "Contact", detail: "Open a connection", target: "contact" },
];

const servicesGrid = document.querySelector("#services-grid");
const projectsGrid = document.querySelector("#projects-grid");
const timeline = document.querySelector("#experience-timeline");

servicesGrid.innerHTML = services
  .map(
    (service) => `
      <article class="service-card reveal" style="--service-color:${service.color}">
        <div class="service-top">
          <span class="service-id">${service.id}</span>
          <span class="service-state"><i></i> OPERATIONAL</span>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <div class="tech-list">${service.technologies.map((item) => `<span>${item}</span>`).join("")}</div>
      </article>`,
  )
  .join("");

projectsGrid.innerHTML = projects
  .map(
    (project, index) => `
      <article class="project-card reveal" data-categories="${project.categories.join(" ")}">
        <div class="project-heading">
          <span class="project-number">DEP-${String(index + 1).padStart(3, "0")}</span>
          <span class="health">${project.status}</span>
        </div>
        <h3>${project.name}</h3>
        <p class="project-type">${project.type}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-footer">
          <div class="tech-list">${project.technologies.map((item) => `<span>${item}</span>`).join("")}</div>
          ${project.url ? `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="View ${project.name} on GitHub">View ↗</a>` : `<span class="project-link">Private work</span>`}
        </div>
      </article>`,
  )
  .join("");

timeline.innerHTML = experience
  .map(
    (item) => `
      <article class="timeline-item reveal">
        <div class="timeline-node" aria-hidden="true"></div>
        <div class="timeline-meta"><time>${item.period}</time><p>${item.location}</p></div>
        <div class="timeline-content">
          <h3>${item.role} <span>· ${item.company}</span></h3>
          <p>${item.description}</p>
          <div class="timeline-highlights">${item.highlights.map((highlight) => `<span>${highlight}</span>`).join("")}</div>
        </div>
      </article>`,
  )
  .join("");

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const currentView = document.querySelector("#current-view");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id;
    currentView.textContent = id;
    navLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === id));
  },
  { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.5] },
);
sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".filter").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    const filter = filterButton.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && !card.dataset.categories.split(" ").includes(filter);
    });
  });
});

const themeButton = document.querySelector("#theme-button");
const themeIcon = document.querySelector("#theme-icon");
const preferredTheme = localStorage.getItem("opslab-theme") || "dark";
document.documentElement.dataset.theme = preferredTheme;
themeIcon.textContent = preferredTheme === "dark" ? "☼" : "☾";
themeButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  themeIcon.textContent = nextTheme === "dark" ? "☼" : "☾";
  localStorage.setItem("opslab-theme", nextTheme);
});

const menuButton = document.querySelector("#menu-button");
const menuScrim = document.querySelector("#menu-scrim");
const setMenu = (open) => {
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuScrim.hidden = !open;
};
menuButton.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
menuScrim.addEventListener("click", () => setMenu(false));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const commandDialog = document.querySelector("#command-dialog");
const commandButton = document.querySelector("#command-button");
const commandInput = document.querySelector("#command-input");
const commandResults = document.querySelector("#command-results");
let selectedCommand = 0;

const renderCommands = (query = "") => {
  const matches = navCommands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));
  selectedCommand = Math.min(selectedCommand, Math.max(matches.length - 1, 0));
  commandResults.innerHTML = matches
    .map(
      (command, index) => `<button class="command-item ${index === selectedCommand ? "selected" : ""}" data-target="${command.target}"><span>${command.label}</span><span>${command.detail}</span></button>`,
    )
    .join("");
  commandResults.querySelectorAll(".command-item").forEach((item) => {
    item.addEventListener("click", () => goToCommand(item.dataset.target));
  });
  return matches;
};

const openCommands = () => {
  selectedCommand = 0;
  commandInput.value = "";
  renderCommands();
  commandDialog.showModal();
  commandInput.focus();
};
const goToCommand = (target) => {
  commandDialog.close();
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
};
commandButton.addEventListener("click", openCommands);
commandInput.addEventListener("input", () => renderCommands(commandInput.value));
commandInput.addEventListener("keydown", (event) => {
  const matches = navCommands.filter((command) => command.label.toLowerCase().includes(commandInput.value.toLowerCase()));
  if (event.key === "ArrowDown") selectedCommand = Math.min(selectedCommand + 1, matches.length - 1);
  if (event.key === "ArrowUp") selectedCommand = Math.max(selectedCommand - 1, 0);
  if (event.key === "Enter" && matches[selectedCommand]) goToCommand(matches[selectedCommand].target);
  if (["ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
    renderCommands(commandInput.value);
  }
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    commandDialog.open ? commandDialog.close() : openCommands();
  }
});

const copyEmail = document.querySelector("#copy-email");
copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyEmail.dataset.email);
    copyEmail.textContent = "Email copied";
  } catch {
    copyEmail.textContent = copyEmail.dataset.email;
  }
  window.setTimeout(() => (copyEmail.textContent = "Copy email"), 2200);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

