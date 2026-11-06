const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const sandbox={window:{},document:{querySelector:()=>null}};
vm.runInNewContext(fs.readFileSync(__dirname+'/intro-motion.js','utf8'),sandbox);
const {seek,spring,steps,duration}=sandbox.window.IntroMotion;
assert.equal(duration,6);
assert.equal(JSON.stringify(seek(2.25)),JSON.stringify(seek(2.25)));
const expected=JSON.stringify(seek(1.75));seek(4);seek(0);seek(3);assert.equal(JSON.stringify(seek(1.75)),expected);
assert.equal(seek(-1).t,0);assert.equal(seek(100).t,6);assert.equal(seek(NaN).t,0);
assert.equal(spring(-1),0);assert.ok(Math.abs(spring(3)-1)<1e-9);
assert.equal(steps(2,[[0,1],[1,-1]]),spring(2)-spring(1));
for(let i=0;i<=360;i++){
  const s=seek(i/60);assert.ok(s.mask>=0&&s.mask<=1);assert.ok(s.aperture>=0&&s.aperture<=1);
  assert.ok(s.camera>=1-0.01&&s.camera<=1.08);
  s.glyphs.forEach(g=>{assert.ok(Number.isFinite(g.y));assert.ok(g.opacity>=0&&g.opacity<=1);assert.ok(g.blur>=0);});
}
assert.equal(seek(4).aperture,0);assert.equal(seek(4.5).lockup,1);assert.equal(seek(6).aperture,1);assert.equal(seek(0).beat,0);assert.equal(seek(3.5).beat,7);
console.log('PASS: deterministic seeking, reverse seeking, 360 finite frames, closed-form springs, camera limits and final aperture');
