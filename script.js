const navCommands = [
  { label: "Overview", detail: "Positioning and contact", target: "overview" },
  { label: "Projects", detail: "Case studies and evidence", target: "projects-heading" },
  { label: "Experience", detail: "Professional progression", target: "experience-heading" },
  { label: "Capabilities", detail: "Verified technical toolkit", target: "capabilities-heading" },
  { label: "AI Projects", detail: "Work in development", target: "ai-projects-heading" },
  { label: "Education", detail: "Academic background", target: "education-heading" },
  { label: "Contact", detail: "Email, CV and profiles", target: "contact-heading" },
];

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.06 },
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const currentView = document.querySelector("#current-view");
let activeUpdateQueued = false;

const updateActiveSection = () => {
  const marker = Math.min(window.innerHeight * 0.3, 190);
  let active = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) active = section;
  });
  const matchingLink = navLinks.find((link) => link.dataset.section === active.id);
  currentView.textContent = matchingLink?.dataset.label.toLowerCase().replaceAll(" ", "-") || active.id;
  navLinks.forEach((link) => {
    const isActive = link.dataset.section === active.id;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  activeUpdateQueued = false;
};

const queueActiveUpdate = () => {
  if (activeUpdateQueued) return;
  activeUpdateQueued = true;
  window.requestAnimationFrame(updateActiveSection);
};
window.addEventListener("scroll", queueActiveUpdate, { passive: true });
window.addEventListener("resize", queueActiveUpdate);
updateActiveSection();

const menuButton = document.querySelector("#menu-button");
const menuScrim = document.querySelector("#menu-scrim");
const setMenu = (open) => {
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuScrim.hidden = !open;
};
menuButton.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
menuScrim.addEventListener("click", () => setMenu(false));
navLinks.forEach((link) => link.addEventListener("click", () => {
  setMenu(false);
  currentView.textContent = link.dataset.label.toLowerCase().replaceAll(" ", "-");
}));

const commandDialog = document.querySelector("#command-dialog");
const commandButton = document.querySelector("#command-button");
const commandInput = document.querySelector("#command-input");
const commandResults = document.querySelector("#command-results");
let selectedCommand = 0;

const matchingCommands = () => navCommands.filter((command) =>
  `${command.label} ${command.detail}`.toLowerCase().includes(commandInput.value.toLowerCase()),
);

const goToCommand = (target) => {
  commandDialog.close();
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const renderCommands = () => {
  const matches = matchingCommands();
  selectedCommand = Math.min(selectedCommand, Math.max(matches.length - 1, 0));
  commandResults.innerHTML = matches.length
    ? matches.map((command, index) => `
        <button class="command-item ${index === selectedCommand ? "selected" : ""}" data-target="${command.target}" type="button">
          <span>${command.label}</span><span>${command.detail}</span>
        </button>`).join("")
    : '<p class="command-empty">No matching section</p>';
  commandResults.querySelectorAll(".command-item").forEach((item) => {
    item.addEventListener("click", () => goToCommand(item.dataset.target));
  });
};

const openCommands = () => {
  selectedCommand = 0;
  commandInput.value = "";
  renderCommands();
  commandDialog.showModal();
  commandInput.focus();
};
commandButton.addEventListener("click", openCommands);
commandInput.addEventListener("input", () => {
  selectedCommand = 0;
  renderCommands();
});
commandInput.addEventListener("keydown", (event) => {
  const matches = matchingCommands();
  if (event.key === "ArrowDown") selectedCommand = Math.min(selectedCommand + 1, matches.length - 1);
  if (event.key === "ArrowUp") selectedCommand = Math.max(selectedCommand - 1, 0);
  if (event.key === "Enter" && matches[selectedCommand]) goToCommand(matches[selectedCommand].target);
  if (["ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
    renderCommands();
  }
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    commandDialog.open ? commandDialog.close() : openCommands();
  }
  if (event.key === "Escape" && commandDialog.open) commandDialog.close();
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
});

const copyEmail = document.querySelector("#copy-email");
copyEmail.addEventListener("click", async () => {
  const originalLabel = "Copy email";
  try {
    await navigator.clipboard.writeText(copyEmail.dataset.email);
    copyEmail.textContent = "Email copied";
  } catch {
    copyEmail.textContent = copyEmail.dataset.email;
  }
  window.setTimeout(() => (copyEmail.textContent = originalLabel), 2200);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
