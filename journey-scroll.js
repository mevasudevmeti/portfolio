/* Native, reversible scroll: one landscape travels from hero to basecamp. */
(() => {
  const hero=document.querySelector('.trail-hero'), dock=document.querySelector('.landscape-dock');
  if(!hero||!dock)return;
  const landscape=document.createElement('div');landscape.className='travelling-landscape';landscape.setAttribute('aria-hidden','true');document.body.prepend(landscape);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=x=>Math.max(0,Math.min(1,x));let scheduled=false;
  function update(){
    scheduled=false;
    const h=hero.getBoundingClientRect(),d=dock.getBoundingClientRect();
    const end=Math.max(1,h.bottom+scrollY-innerHeight*.12);
    const progress=clamp(scrollY/end),p=progress*progress*(3-2*progress);
    document.documentElement.classList.toggle('scroll-journey-enabled',!reduced.matches);
    if(reduced.matches){landscape.hidden=true;hero.style.setProperty('--journey-progress',0);dock.parentElement.style.setProperty('--arrival',1);return;}
    landscape.hidden=false;
    const mix=(a,b)=>a+(b-a)*p;
    Object.assign(landscape.style,{left:`${mix(h.left,d.left)}px`,top:`${mix(h.top,d.top)}px`,width:`${mix(h.width,d.width)}px`,height:`${mix(h.height,d.height)}px`,borderRadius:`${p*50}%`,visibility:h.bottom<0&&d.bottom<0?'hidden':'visible'});
    hero.style.setProperty('--journey-progress',p);
    dock.parentElement.style.setProperty('--arrival',clamp((progress-.55)/.45));
  }
  function request(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request);addEventListener('pageshow',request);reduced.addEventListener('change',request);
  new ResizeObserver(request).observe(dock);update();
})();
