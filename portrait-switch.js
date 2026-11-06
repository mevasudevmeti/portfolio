/* Four seconds per portrait, with remaining dwell preserved while paused. */
(() => {
  const portrait=document.querySelector('.journey-portrait');if(!portrait)return;
  const buttons=[...portrait.querySelectorAll('[data-portrait]')];
  const trail=portrait.querySelector('.trekking-figure'),work=portrait.querySelector('.formal-figure');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active='trail',visible=false,manual=false,timer=0,started=0,remaining=4000;
  function show(value){
    const previous=active;active=value;window.PortraitMorph?.play(previous,value);portrait.classList.toggle('portrait-at-work',value==='work');
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.portrait===value)));
    trail.setAttribute('aria-hidden',String(value!=='trail'));work.setAttribute('aria-hidden',String(value!=='work'));
  }
  function pause(){if(timer){clearTimeout(timer);timer=0;remaining=Math.max(0,remaining-(performance.now()-started));}}
  function sync(){
    const allowed=visible&&!manual&&!reduced.matches&&!document.hidden&&!document.body.classList.contains('motion-paused')&&!document.querySelector('#journey-intro')?.open;
    if(!allowed){pause();return;}if(timer)return;
    started=performance.now();timer=setTimeout(()=>{timer=0;show(active==='trail'?'work':'trail');remaining=4000;sync();},remaining);
  }
  buttons.forEach(b=>b.addEventListener('click',()=>{manual=true;pause();show(b.dataset.portrait);}));
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.55;if(!visible)window.PortraitMorph?.cancel();sync();},{threshold:[0,.55]}).observe(portrait);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  document.querySelector('#journey-intro')?.addEventListener('close',sync);
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  show(active);
})();
