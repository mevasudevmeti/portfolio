/* Cloth-weighted strip warp: native portraits remain the accessible fallback. */
(() => {
  const stage=document.querySelector('.journey-portrait');if(!stage)return;
  const images={trail:stage.querySelector('.trekking-figure'),work:stage.querySelector('.formal-figure')};
  const canvas=document.createElement('canvas');canvas.className='portrait-morph';canvas.setAttribute('aria-hidden','true');stage.append(canvas);
  const ctx=canvas.getContext('2d'),surfaces={};let request=0,token=0;
  const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
  function cancel(){token++;cancelAnimationFrame(request);stage.classList.remove('portrait-morphing');}
  function raster(image){
    const c=document.createElement('canvas');c.width=680;c.height=1000;const x=c.getContext('2d');
    // Match each native figure's object-fit: contain within the common stage.
    const w=680,h=1000,dx=0,dy=0;
    const scale=Math.min(w/image.naturalWidth,h/image.naturalHeight),iw=image.naturalWidth*scale,ih=image.naturalHeight*scale;
    x.drawImage(image,dx+(w-iw)/2,dy+h-ih,iw,ih);return c;
  }
  async function play(from,to){
    cancel();if(from===to||matchMedia('(prefers-reduced-motion: reduce)').matches||document.hidden)return;
    const id=token;
    try{await Promise.all(Object.values(images).map(im=>im.decode()));}catch{return;}
    if(id!==token)return;
    for(const key of Object.keys(images))surfaces[key]=raster(images[key]);
    canvas.width=680;canvas.height=1000;stage.classList.add('portrait-morphing');
    const start=performance.now(),duration=1400;
    function frame(now){
      if(id!==token)return;const p=clamp((now-start)/duration),envelope=Math.sin(Math.PI*p);
      ctx.clearRect(0,0,680,1000);
      for(let y=0;y<1000;y+=4){
        // Head stays unwarped; ripple grows across shoulders, sleeves and torso.
        const cloth=smooth((y-245)/120),wave=Math.sin(y*.024-p*8)*14*envelope*cloth;
        const blend=smooth((p*1.65-.65*y/1000-.05)/.6);
        const stretch=1+.045*envelope*cloth*Math.sin(y*.014-p*5),width=680*stretch;
        ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1-blend;
        ctx.drawImage(surfaces[from],0,y,680,4,(680-width)/2+wave,y,width,4);
        ctx.globalCompositeOperation='lighter';ctx.globalAlpha=blend;
        ctx.drawImage(surfaces[to],0,y,680,4,(680-width)/2-wave,y,width,4);
      }
      ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
      if(p<1)request=requestAnimationFrame(frame);else stage.classList.remove('portrait-morphing');
    }
    request=requestAnimationFrame(frame);
  }
  window.PortraitMorph={play,cancel};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',cancel);
})();
