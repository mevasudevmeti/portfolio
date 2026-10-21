const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const intro = document.querySelector('#journey-intro');
let introTimer;
let hasSeenIntro = false;
try { hasSeenIntro = sessionStorage.getItem('vasu-trail-intro') === 'seen'; } catch { /* Storage may be disabled. */ }
const openIntro = () => {
  window.clearTimeout(introTimer);
  intro.showModal();
  document.body.classList.add('journey-intro-open');
  introTimer = window.setTimeout(() => intro.close(), 3400);
};
if (!location.hash && !hasSeenIntro && !reducedMotion.matches) openIntro();
document.querySelector('#replay-intro').addEventListener('click', openIntro);
intro.querySelector('.intro-skip').addEventListener('click', () => intro.close());
intro.addEventListener('close', () => {
  window.clearTimeout(introTimer);
  document.body.classList.remove('journey-intro-open');
  try { sessionStorage.setItem('vasu-trail-intro', 'seen'); } catch { /* Intro still works without storage. */ }
});
reducedMotion.addEventListener('change', event => { if (event.matches && intro.open) intro.close(); });
const motionToggle = document.querySelector('#toggle-motion');
let motionPaused = reducedMotion.matches;
const applyMotionPreference = () => {
  document.body.classList.toggle('motion-paused', motionPaused || reducedMotion.matches);
  motionToggle.setAttribute('aria-pressed', String(motionPaused || reducedMotion.matches));
  motionToggle.textContent = motionPaused || reducedMotion.matches ? 'Animations paused' : 'Pause animations';
};
motionToggle.addEventListener('click', () => {
  if (reducedMotion.matches) return;
  motionPaused = !motionPaused;
  applyMotionPreference();
  if (motionPaused) motionToggle.textContent = 'Resume animations';
});
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; applyMotionPreference(); });
applyMotionPreference();
const shelfObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle('shelf-visible', entry.isIntersecting));
}, { threshold: 0.15 });
document.querySelectorAll('.ambient-shelf').forEach(shelf => shelfObserver.observe(shelf));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.04 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
const hobbies = {
  trekking: { symbol: '↟', title: 'One more trail.', description: 'Trekking is one of my favourite ways to step away from the screen, get outside and explore somewhere new.' },
  rides: { symbol: '🏍️', title: 'Take the scenic route.', description: 'I enjoy heading out for bike rides. Sometimes a change of scenery is exactly what the day needs.' },
  gaming: { symbol: '🎮', title: 'A different kind of adventure.', description: 'I love games like Ghost of Yōtei. Exploring beautiful worlds, getting drawn into a story and taking on a new challenge are some of my favourite ways to switch off.' },
  sports: { symbol: '◉', title: 'Always up for a game.', description: 'I enjoy playing sports. Getting moving and sharing a game is a good balance to time spent at a desk.' },
  dance: { symbol: '🕺', title: 'Find a little rhythm.', description: 'I love to dance. A few moves, a little rhythm and a different kind of energy outside engineering.' },
  gym: { symbol: 'dumbbell', title: 'Keep showing up.', description: 'The gym is part of my routine. A little time to focus on movement, pick up the dumbbells and make room for myself outside work.' }
};
const hobbyDialog = document.querySelector('#hobby-dialog');
document.querySelectorAll('[data-hobby]').forEach(button => button.addEventListener('click', () => {
  const hobby = hobbies[button.dataset.hobby];
  const symbol = hobbyDialog.querySelector('.hobby-symbol');
  symbol.textContent = hobby.symbol === 'dumbbell' ? '━' : hobby.symbol;
  symbol.classList.toggle('dumbbell-icon', hobby.symbol === 'dumbbell');
  symbol.hidden = button.dataset.hobby === 'dance';
  hobbyDialog.querySelector('.dance-stage').hidden = button.dataset.hobby !== 'dance';
  hobbyDialog.querySelector('h2').textContent = hobby.title;
  hobbyDialog.querySelector('.hobby-description').textContent = hobby.description;
  hobbyDialog.dataset.interest = button.dataset.hobby;
  hobbyDialog.showModal();
}));
hobbyDialog.querySelectorAll('button').forEach(button => button.addEventListener('click', () => hobbyDialog.close()));
hobbyDialog.addEventListener('click', event => {
  if (event.target !== hobbyDialog) return;
  const box = hobbyDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) hobbyDialog.close();
});
const navCommands = [['Trail map','overview'],['About me','about'],['Projects','projects'],['Experience','experience'],['Capabilities','capabilities'],['Applied AI','ai-projects'],['Education','education'],['Contact','contact']];
const commandDialog = document.querySelector('#command-dialog');
const commandInput = document.querySelector('#command-input');
const commandResults = document.querySelector('#command-results');
let selectedCommand = 0;
const renderCommands = () => {
  const matches = navCommands.filter(([label]) => label.toLowerCase().includes(commandInput.value.toLowerCase()));
  selectedCommand = Math.max(0, Math.min(selectedCommand, matches.length - 1));
  commandResults.replaceChildren();
  matches.forEach(([label,target],index) => {
    const button = document.createElement('button'); button.type='button';
    button.className='command-item'+(index===selectedCommand?' selected':''); button.textContent=label;
    button.addEventListener('click',()=>{commandDialog.close();document.getElementById(target).scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});});
    commandResults.append(button);
  });
  if (!matches.length) commandResults.textContent='No matching section';
};
commandInput.addEventListener('input',()=>{selectedCommand=0;renderCommands();});
commandInput.addEventListener('keydown',event=>{
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();selectedCommand+=event.key==='ArrowDown'?1:-1;renderCommands();}
  if(event.key==='Enter') commandResults.querySelector('.selected')?.click();
});
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
    event.preventDefault();if(hobbyDialog.open || intro.open)return;
    if(commandDialog.open)commandDialog.close();
    else{commandInput.value='';selectedCommand=0;renderCommands();commandDialog.showModal();commandInput.focus();}
  }
});
const dockLinks=[...document.querySelectorAll('.trail-dock a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  dockLinks.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
}),{rootMargin:'-10% 0px -60% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
const copyEmail=document.querySelector('#copy-email');copyEmail.setAttribute('aria-live','polite');
copyEmail.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(copyEmail.dataset.email);copyEmail.textContent='Email copied';}catch{copyEmail.textContent=copyEmail.dataset.email;}
  window.setTimeout(()=>{copyEmail.textContent='Copy email';},2500);
});
document.querySelector('#current-year').textContent=new Date().getFullYear();
