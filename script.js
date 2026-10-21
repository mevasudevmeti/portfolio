const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.04 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
const hobbies = {
  trekking: { symbol: '↟', title: 'One more trail.', description: 'Trekking is one of my favourite ways to step away from the screen, get outside and explore somewhere new.' },
  rides: { symbol: '↗', title: 'Take the scenic route.', description: 'I enjoy heading out for rides. Sometimes a change of scenery is exactly what the day needs.' },
  gaming: { symbol: '＋', title: 'A different kind of challenge.', description: 'Video games are part of my downtime. A chance to play, explore and get absorbed in a different world.' },
  sports: { symbol: '◉', title: 'Always up for a game.', description: 'I enjoy playing sports. Getting moving and sharing a game is a good balance to time spent at a desk.' },
  dance: { symbol: '♫', title: 'Find a little rhythm.', description: 'I dance, too. A different kind of energy, and another way to enjoy life outside engineering.' },
  gym: { symbol: '↔', title: 'Keep showing up.', description: 'The gym is part of my routine. A little time to focus on movement and make room for myself outside work.' }
};
const hobbyDialog = document.querySelector('#hobby-dialog');
document.querySelectorAll('[data-hobby]').forEach(button => button.addEventListener('click', () => {
  const hobby = hobbies[button.dataset.hobby];
  hobbyDialog.querySelector('.hobby-symbol').textContent = hobby.symbol;
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
    event.preventDefault();if(hobbyDialog.open)return;
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
