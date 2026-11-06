/* Six-second, time-addressable intro. All scene state is a pure function of seconds. */
(() => {
  const DURATION = 6, FPS = 60, STAGGER = .125;
  const C = {paper:'#f5f3e9', ink:'#213c32', green:'#607b4c', rust:'#b9794c', light:'#d9dfca', shirt:'#793b41'};
  const clamp = x => Math.max(0, Math.min(1, x));
  const ramp = (t,a,b) => clamp((t-a)/(b-a));
  const smooth = x => x*x*(3-2*x);
  // Closed-form underdamped unit-step response. Target changes sum independently.
  function spring(t, frequency=18, damping=.78) {
    if (t <= 0) return 0;
    const wd = frequency*Math.sqrt(1-damping*damping);
    return 1-Math.exp(-damping*frequency*t)*(Math.cos(wd*t)+damping*frequency/wd*Math.sin(wd*t));
  }
  const steps = (t, changes) => changes.reduce((sum,[at,delta]) => sum+delta*spring(t-at),0);
  function seek(time) {
    const t = Math.max(0,Math.min(DURATION,Number.isFinite(time)?time:0));
    return {
      t, beat:Math.min(11,Math.floor(t*2)), impact:Math.exp(-24*(t%.5)),
      mask:smooth(ramp(t,1.4,2.15)), firstFade:1-smooth(ramp(t,1.4,1.85)),
      finalFade:smooth(ramp(t,1.9,2.25)), trail:smooth(ramp(t,1.45,3.1)),
      camera:1+steps(t,[[.5,.025],[1,-.025],[1.5,.04],[2,-.04],[2.5,.015],[3,-.015]]),
      pan:steps(t,[[1.5,-16],[2,16]]),
      jump:Math.sin(Math.PI*ramp(t,1.5,2.5)), swing:spring(t-2.0,26,.86),
      moon:smooth(ramp(t,2.0,3.25)), lockup:smooth(ramp(t,3.5,4.1)), aperture:smooth(ramp(t,5.3,DURATION)),
      glyphs:Array.from({length:12},(_,i)=>{ const r=spring(t-i*STAGGER); return {y:130*(1-r),opacity:clamp(r),blur:Math.max(0,12*(1-r))}; })
    };
  }
  const dialog = document.querySelector('#journey-intro');
  if (!dialog) { window.IntroMotion={duration:DURATION,seek,spring,steps}; return; }
  const canvas = dialog.querySelector('canvas'), ctx = canvas.getContext('2d');
  const frame = document.createElement('canvas'), mask = document.createElement('canvas'), destination = document.createElement('canvas');
  [frame,mask,destination].forEach(c=>{c.width=c.height=1080;});
  const f = frame.getContext('2d'), m = mask.getContext('2d'), dest = destination.getContext('2d');
  const paths = Object.fromEntries(Object.entries(window.IntroGlyphs.glyphs).map(([c,g])=>[c,new Path2D(g.d)]));
  const em = window.IntroGlyphs.em;
  function outlineText(c,text,size,baseline,{state=null,maskStroke=0,color=C.ink}={}) {
    const tracking=-size*.055;
    const width=[...text].reduce((n,ch)=>n+window.IntroGlyphs.glyphs[ch].advance/em*size+tracking,0)-tracking;
    let x=(1080-width)/2, index=0;
    for (const ch of text) {
      const g=window.IntroGlyphs.glyphs[ch], motion=state?.glyphs[index] || {y:0,opacity:1,blur:0};
      c.save(); c.globalAlpha*=motion.opacity; c.filter=motion.blur?`blur(${motion.blur}px)`:'none';
      c.translate(x,baseline+motion.y); c.scale(size/em,size/em); c.fillStyle=color; c.fill(paths[ch]);
      if(maskStroke){c.strokeStyle=color;c.lineJoin='round';c.lineWidth=maskStroke*em/size;c.stroke(paths[ch]);}
      c.restore(); x+=g.advance/em*size+tracking; if(ch!==' ')index++;
    }
  }
  function label(c,text,x,y,align='left') {c.save();c.font='500 15px IntroMono';c.letterSpacing='2px';c.fillStyle=C.green;c.textAlign=align;c.fillText(text,x,y);c.restore();}
  function line(c,x1,y1,x2,y2,width=3,color=C.ink){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke();}
  function controller(c,x,y,rotation) {
    c.save();c.translate(x,y);c.rotate(rotation);c.fillStyle=C.ink;c.strokeStyle=C.paper;c.lineWidth=10;
    const p=new Path2D('M-52 -25Q-76 -32 -80 -8L-95 40Q-98 57 -78 49L-44 26H44L78 49Q98 57 95 40L80 -8Q76 -32 52 -25Z');c.stroke(p);c.fill(p);
    line(c,-55,-10,-55,12,5,C.paper);line(c,-66,1,-44,1,5,C.paper);
    for(const [dx,dy]of[[55,-11],[67,1],[43,1],[55,13]]){c.fillStyle=C.rust;c.beginPath();c.arc(dx,dy,4,0,7);c.fill();}c.restore();
  }
  function dancer(c,s) {
    c.save();c.translate(910-90*s.moon,800);c.rotate(-.08);const step=Math.sin(s.t*Math.PI*5)*11;
    c.fillStyle=C.ink;c.beginPath();c.arc(0,-75,13,0,7);c.fill();c.fillRect(-20,-92,40,6);c.fillRect(-13,-107,27,18);
    line(c,0,-52,8,-4,24,C.green);line(c,-7,-45,-29,-22,8,C.rust);line(c,-29,-22,-47,-38,8,C.rust);line(c,9,-45,33,-28,8,C.rust);line(c,33,-28,48,-46,8,C.rust);
    line(c,4,-2,-18-step,34,10);line(c,-18-step,34,-38-step,68,10);line(c,13,-2,25+step,35,10);line(c,25+step,35,40+step,68,10);
    line(c,-38-step,70,-14-step,70,6,C.paper);line(c,40+step,70,64+step,70,6,C.paper);c.restore();
  }
  function badminton(c,s) {
    c.save();c.translate(178,842-s.jump*65);c.rotate(-.1*s.jump);
    c.fillStyle=C.ink;c.beginPath();c.arc(0,-80,17,0,7);c.fill();for(let i=0;i<7;i++){c.beginPath();c.arc(-14+i*4,-91-Math.sin(i)*4,6,0,7);c.fill();}
    line(c,0,-54,8,-4,27,C.shirt);line(c,-10,-46,-38,-21,9,C.rust);line(c,-38,-21,-56,-30,9,C.rust);
    const angle=-.9+1.9*s.swing, elbow={x:25,y:-55}, wrist={x:25+Math.sin(angle)*38,y:-55-Math.cos(angle)*38};
    line(c,10,-47,elbow.x,elbow.y,9,C.rust);line(c,elbow.x,elbow.y,wrist.x,wrist.y,9,C.rust);
    c.save();c.translate(wrist.x,wrist.y);c.rotate(angle);line(c,0,0,0,-45,3);c.beginPath();c.ellipse(0,-66,16,23,0,0,7);c.lineWidth=3;c.strokeStyle=C.ink;c.stroke();for(let i=-8;i<=8;i+=8)line(c,i,-83,i,-49,1,C.green);c.restore();
    line(c,0,0,-24,30,11);line(c,-24,30,-10,54-s.jump*15,11);line(c,14,0,28,35,11);line(c,28,35,49,54-s.jump*15,11);c.restore();
    const hit=smooth(ramp(s.t,2,2.4));const sx=230+hit*130,sy=640+hit*105;
    c.save();c.translate(sx,sy);c.rotate(-.4+hit);c.fillStyle=C.paper;c.strokeStyle=C.green;c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(-8,-22);c.lineTo(8,-22);c.closePath();c.fill();c.stroke();c.beginPath();c.arc(0,1,4,0,7);c.fillStyle=C.rust;c.fill();c.restore();
  }
  function trail(c,s) {
    const p=new Path2D('M540 810C470 706 290 706 290 810C290 914 470 914 540 810C610 706 790 706 790 810C790 914 610 914 540 810');
    c.save();c.strokeStyle=C.green;c.lineWidth=4;c.setLineDash([1400]);c.lineDashOffset=1400*(1-s.trail);c.stroke(p);c.restore();
    const a=Math.PI*2*s.trail;c.fillStyle=C.rust;c.beginPath();c.arc(540+250*Math.sin(a),810+75*Math.sin(2*a),5,0,7);c.fill();
  }
  function renderScene(s) {
    f.setTransform(1,0,0,1,0,0);f.clearRect(0,0,1080,1080);f.fillStyle=C.paper;f.fillRect(0,0,1080,1080);
    f.save();f.translate(540+s.pan,540);f.scale(s.camera,s.camera);f.translate(-540,-540);
    label(f,'VASUDEV METI',80,100);label(f,'PORTFOLIO',80,126);label(f,'ENGINEER / EXPLORER',1000,100,'right');
    line(f,80,150,1000,150,1,C.light);
    for(let i=0;i<12;i++){const active=s.beat===i;line(f,80+i*18,958,80+i*18,958-(active?22:8),active?4:2,active?C.rust:C.light);}
    label(f,`${String(Math.min(DURATION*FPS,Math.floor(s.t*FPS))).padStart(3,'0')} / ${DURATION*FPS}`,1000,960,'right');
    // Sparse print offsets, restricted to the first 30ms of a beat.
    if(s.t% .5<.03 && s.t<1.9){f.save();f.globalAlpha=.4*s.firstFade;f.translate(-3,2);outlineText(f,'A BEGINNING',121,535,{state:s,color:C.rust});f.translate(6,-4);outlineText(f,'A BEGINNING',121,535,{state:s,color:C.green});f.restore();}
    f.save();f.globalAlpha=s.firstFade;outlineText(f,'A BEGINNING',121,535,{state:s});f.restore();
    if(s.t>=1.4){
      dest.clearRect(0,0,1080,1080);dest.fillStyle=C.ink;dest.textAlign='center';dest.font='800 126px IntroSyne';dest.letterSpacing='-6px';
      for(const [text,y,start]of[['WITHOUT',492,1.4],['AN END.',630,1.525]]){
        // Preserve a clear word gap independently of the tight display tracking.
        const widths=[...text].map(ch=>ch===' '?48:dest.measureText(ch).width-6),total=widths.reduce((a,b)=>a+b,0);let x=540-total/2,index=0;
        for(let i=0;i<text.length;i++){const r=spring(s.t-start-index*.125);dest.save();dest.globalAlpha=clamp(r);dest.filter=`blur(${Math.max(0,8*(1-r))}px)`;dest.fillText(text[i],x+widths[i]/2,y+75*(1-r));dest.restore();x+=widths[i];if(text[i]!==' ')index++;}
      }
      m.clearRect(0,0,1080,1080);outlineText(m,'A BEGINNING',121,535,{maskStroke:600*s.mask,color:'#ffffff'});
      dest.save();dest.globalCompositeOperation='destination-in';dest.drawImage(mask,0,0);dest.restore();f.drawImage(destination,0,0);
    }
    f.save();f.globalAlpha=s.finalFade;outlineText(f,'A BEGINNING',64,326);f.restore();
    f.save();f.globalAlpha=smooth(ramp(s.t,.55,1.0));controller(f,885,250,.18);f.restore();
    f.save();f.globalAlpha=smooth(ramp(s.t,1.5,1.75));badminton(f,s);f.restore();
    f.save();f.globalAlpha=smooth(ramp(s.t,2,2.2));dancer(f,s);f.restore();
    f.save();f.globalAlpha=s.lockup;f.font='500 22px IntroMono';f.letterSpacing='3px';f.textAlign='center';f.fillStyle=C.ink;f.fillText('VASUDEV METI / PORTFOLIO',540,688);f.restore();
    trail(f,s);f.restore();
    // Expanding aperture follows the infinity-loop crossing into the real hero.
    if(s.aperture>0){f.save();f.globalCompositeOperation='destination-out';f.beginPath();f.arc(540,810,1700*s.aperture,0,7);f.fill();f.restore();}
  }
  function render(t,{samples=4,staticFrame=false}={}) {
    const width=canvas.width,height=canvas.height,scale=Math.min(width/1080,height/1080),x=(width-1080*scale)/2,y=(height-1080*scale)/2;
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,width,height);
    const s=seek(t),opacity=1-smooth(ramp(t,5.3,DURATION-.02));
    ctx.fillStyle=C.paper;ctx.globalAlpha=opacity;
    if(x>0){ctx.fillRect(0,0,x,height);ctx.fillRect(width-x,0,x,height);}
    if(y>0){ctx.fillRect(0,0,width,y);ctx.fillRect(0,height-y,width,y);}
    ctx.globalAlpha=1;
    for(let i=0;i<samples;i++){
      renderScene(seek(staticFrame?t:Math.max(0,t-i/(FPS*samples))));
      ctx.globalCompositeOperation=i===0?'source-over':'lighter';ctx.globalAlpha=1/samples;
      ctx.drawImage(frame,x,y,1080*scale,1080*scale);
    }
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    dialog.querySelector('.intro-skip').style.opacity=String(opacity);
    return s;
  }
  function resize(){const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(innerWidth*dpr);canvas.height=Math.round(innerHeight*dpr);}
  let raf=0,generation=0;
  function stop(){generation++;cancelAnimationFrame(raf);document.body.classList.remove('journey-intro-open');}
  async function play(){
    stop();const token=generation;resize();if(!dialog.open)dialog.showModal();document.body.classList.add('journey-intro-open');render(0,{samples:1});
    try{await Promise.all([document.fonts.load('800 126px IntroSyne'),document.fonts.load('500 15px IntroMono')]);}catch{/* The readable fallback remains available. */}
    if(token!==generation||!dialog.open)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started=performance.now();
    function tick(now){if(token!==generation||!dialog.open)return;const t=(now-started)/1000;render(reduced?4.5:Math.min(DURATION,t),{samples:reduced?1:4,staticFrame:reduced});if(t>=DURATION){dialog.close();stop();}else raf=requestAnimationFrame(tick);}
    raf=requestAnimationFrame(tick);
  }
  dialog.addEventListener('close',stop);
  window.addEventListener('resize',resize);
  resize();
  window.IntroMotion={duration:DURATION,seek,spring,steps,render,play,stop};
})();
