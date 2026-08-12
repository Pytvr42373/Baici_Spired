/* ============================================================
   《词域远征》 初始化 / UI / 主题 / 音效 / 配乐 / 药水 (main.js)
   依赖：data.js, game.js
============================================================ */

/* ============ 主题（三主题：minimal / pink / mech） ============ */

/* ★ 主题 icon 差异：pink 可爱系 / mech 机械系 / minimal 细线原样
   映射键 = 原始 lucide 图标名，值为该主题下的替身图标 */
const ICON_THEMES={
  minimal:{},
  pink:{
    scroll:'sparkles',sword:'heart',shield:'shield-heart',flame:'heart',
    heart:'heart',target:'star',wand:'wand-2',gem:'flower',skull:'ghost',
    trophy:'crown',swords:'heart-pulse',coins:'coins',eye:'eye',hourglass:'hourglass'
  },
  mech:{
    scroll:'cpu',sword:'zap',shield:'radar',flame:'flame',
    heart:'cpu',target:'crosshair',wand:'zap',gem:'diamond',skull:'skull',
    trophy:'award',swords:'crosshair',coins:'coins',eye:'scan',hourglass:'timer'
  }
};
/* 主题替身名集合：用于区分「原始名」与「已主题化名」 */
const _themedIconNames=new Set();
Object.keys(ICON_THEMES).forEach(k=>Object.values(ICON_THEMES[k]).forEach(v=>_themedIconNames.add(v)));
let _iconObserver=null;
/* 按主题重映射全部 data-lucide 图标（记录原始名于 data-base，幂等） */
function captureBaseIcons(){
  document.querySelectorAll('[data-lucide]').forEach(el=>{
    if(!el.dataset.base) el.dataset.base=el.getAttribute('data-lucide')||'';
  });
}
function rethemeIcons(theme){
  const map=ICON_THEMES[theme]||{};
  document.querySelectorAll('[data-lucide]').forEach(el=>{
    const cur=el.getAttribute('data-lucide')||'';
    // ★ base 只在首次记录原始名，此后永不更新（杜绝跨主题切换被污染）
    if(!el.dataset.base) el.dataset.base=cur;
    const themed=map[el.dataset.base]||el.dataset.base;
    if(el.getAttribute('data-lucide')!==themed) el.setAttribute('data-lucide',themed);
  });
  refreshIcons();
}
/* MutationObserver：game.js 动态改图标（意图/结算）后自动按当前主题重映射 */
function setupIconObserver(){
  if(_iconObserver)return;
  _iconObserver=new MutationObserver(()=>{ rethemeIcons(S.theme||'minimal'); });
  _iconObserver.observe(document.body,{attributes:true,attributeFilter:['data-lucide'],subtree:true});
}
function applyTheme(t){
  S.theme=t;
  document.documentElement.setAttribute('data-theme',t);
  try{localStorage.setItem('lexicon_theme',t);}catch(e){}
  const opts=document.querySelectorAll('.t-opt');
  opts.forEach(o=>o.classList.toggle('selected',o.dataset.theme===t));
  rethemeIcons(t);   // ★ 切换主题时同步替换关键 icon
}

/* ============ 统一悬浮弹窗（遗物/药水 tooltip） ============ */
function positionTooltip(el,title,desc){
  const t=$('tooltip'); if(!t)return;
  t.innerHTML='<div class="tt-name">'+title+'</div><div class="tt-desc">'+desc+'</div>';
  t.classList.remove('hidden');
  const r=el.getBoundingClientRect();
  const tw=t.offsetWidth||200, th=t.offsetHeight||60;
  let x=r.left+r.width/2-tw/2, y=r.top-th-10;
  if(y<8)y=r.bottom+10;
  x=Math.max(8,Math.min(x,window.innerWidth-tw-8));
  y=Math.max(8,Math.min(y,window.innerHeight-th-8));
  t.style.left=x+'px'; t.style.top=y+'px';
}
function hideTooltip(){
  const t=$('tooltip'); if(!t)return;
  t.classList.add('hidden'); t._owner=null;
}
/* 通用绑定：PC 悬浮 + 手机长按；tap=true 时点击切换（用于无点击行为的遗物图标） */
function bindTooltip(el,title,desc,tap){
  if(!el)return;
  el.removeAttribute('title');
  el.setAttribute('data-tt','1');
  el.addEventListener('mouseenter',()=>positionTooltip(el,title,desc));
  el.addEventListener('mouseleave',hideTooltip);
  let lp=null;
  el.addEventListener('touchstart',()=>{lp=setTimeout(()=>positionTooltip(el,title,desc),420);},{passive:true});
  el.addEventListener('touchmove',()=>{if(lp){clearTimeout(lp);lp=null;}},{passive:true});
  el.addEventListener('touchend',()=>{if(lp){clearTimeout(lp);lp=null;}});
  if(tap){
    el.addEventListener('click',()=>{
      const t=$('tooltip');
      if(t&&!t.classList.contains('hidden')&&t._owner===el)hideTooltip();
      else{positionTooltip(el,title,desc);if(t)t._owner=el;}
    });
  }
}

/* ============ 音效（WebAudio 程序化合成） ============ */
let AC=null;
function sfx(name){
  if(S.muted)return;
  try{
    if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();
    if(AC.state==='suspended')AC.resume();
    const cfg=SFX[name];if(!cfg)return;
    const t=AC.currentTime;
    const o=AC.createOscillator();o.type=cfg.type||'sine';
    o.frequency.setValueAtTime(cfg.freq||440,t);
    if(cfg.freqEnd)o.frequency.exponentialRampToValueAtTime(cfg.freqEnd,t+cfg.dur);
    const g=AC.createGain();
    g.gain.setValueAtTime(cfg.vol||0.2,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+cfg.dur);
    o.connect(g);g.connect(AC.destination);
    o.start(t);o.stop(t+cfg.dur+0.02);
  }catch(e){}
}
function wireSfx(){
  document.querySelectorAll('[data-sfx]').forEach(el=>{
    el.addEventListener('click',()=>sfx(el.getAttribute('data-sfx')));
  });
  // 答题按钮 / 攻防卡
  const bAtk=$('btnAtk'),bDef=$('btnDef');
  if(bAtk)bAtk.addEventListener('click',()=>sfx('button'));
  if(bDef)bDef.addEventListener('click',()=>sfx('button'));
}

/* ============ 配乐（WebAudio 程序化合成 + 阶段切换 + 优雅降级） ============ */
let TON=null,_musicLoop=null,musicPhase='',musicOn=false;
function _tone(){ if(TON)return TON; if(window.Tone)TON=window.Tone; return TON; }
function _resolvePhase(phase){
  if(phase==='battle'){
    const r=(S&&S.maxHp)?S.hp/S.maxHp:1;
    return r<=0.5?'battle_intense':'battle_calm';
  }
  return phase;
}
function playMusic(phase){
  if(S.muted){stopMusic();return;}
  const T=_tone(); if(!T){stopMusic();return;}
  if(phase===musicPhase&&musicOn)return;
  stopMusic();
  const _ph=_resolvePhase(phase);const cfg=MUSIC[_ph];if(!cfg)return;
  musicPhase=_ph;musicOn=true;
  try{ if(T.context&&T.context.state==='suspended')T.start(); }catch(e){}
  try{
    T.Transport.bpm.value=cfg.bpm;
    const reverb=new T.Reverb({decay:2.6,wet:0.42}).toDestination();
    const mel=new T.Synth({oscillator:{type:cfg.mode==='major'?'triangle':'sawtooth'},envelope:{attack:0.01,decay:0.25,sustain:0.22,release:0.4}}).connect(reverb);
    mel.volume.value=-13;
    const bass=new T.Synth({oscillator:{type:'sine'},envelope:{attack:0.01,decay:0.4,sustain:0.12,release:0.3}}).toDestination();
    bass.volume.value=-15;
    const hat=new T.NoiseSynth({noise:{type:'white'},envelope:{attack:0.001,decay:0.06,sustain:0,release:0.02}}).toDestination();
    hat.volume.value=-20;
    const kick=new T.MembraneSynth({pitchDecay:0.05,octaves:6,envelope:{attack:0.001,decay:0.4,sustain:0,release:0.2}}).toDestination();
    kick.volume.value=-17;
    const pad=new T.PolySynth(T.Synth,{oscillator:{type:'triangle'},envelope:{attack:0.7,decay:0.6,sustain:0.3,release:1.6}}).connect(reverb);
    pad.volume.value=-18;
    let step=0;
    _musicLoop=new T.Loop(time=>{
      const r=cfg.roots[Math.floor(step/8)%cfg.roots.length];
      const s8=step%8;
      if(s8===0){
        bass.triggerAttackRelease(T.Frequency(r-12,'midi').toNote(),'1n',time);
        if(cfg.pad){const chord=cfg.mode==='major'?[0,4,7,11]:[0,3,7,10];pad.triggerAttackRelease(chord.map(o=>T.Frequency(r+o,'midi').toNote()),'2n',time);}
      }
      const bar=Math.floor(step/8)%cfg.roots.length;
      const arpA=cfg.mode==='major'?[0,7,12,16,12,7,0,7]:[0,3,7,12,7,3,0,3];
      const arpB=cfg.mode==='major'?[12,7,16,12,7,4,7,12]:[12,7,3,7,12,10,7,3];
      const arp=(bar%2===0)?arpA:arpB;
      mel.triggerAttackRelease(T.Frequency(r+arp[s8],'midi').toNote(),'8n',time);
      if(cfg.drums>=1&&s8%2===0)hat.triggerAttackRelease('16n',time);
      if(cfg.drums>=2&&s8===0)kick.triggerAttackRelease('8n',time);
      if(cfg.drums>=3&&s8===4)kick.triggerAttackRelease('8n',time);
      step++;
    },'8n');
    _musicLoop.start(0);
    T.Transport.start();
  }catch(e){}
}
function stopMusic(){
  musicOn=false;musicPhase='';
  if(_musicLoop){try{_musicLoop.stop();_musicLoop.dispose&&_musicLoop.dispose();}catch(e){} _musicLoop=null;}
  if(TON){try{TON.Transport.stop();}catch(e){}}
}

/* ============ 药水系统（仿杀戮尖塔） ============ */
function randomPotion(){
  const r=POTION_RARITY[Math.floor(Math.random()*POTION_RARITY.length)];
  const keys=Object.keys(POTIONS).filter(k=>POTIONS[k].rarity===r);
  return keys[Math.floor(Math.random()*keys.length)];
}
function addPotion(key){
  if(!S.potions)S.potions=[null,null,null];
  const idx=S.potions.indexOf(null);
  if(idx<0)return false;
  S.potions[idx]=key;
  if(typeof updatePotionBar==='function')updatePotionBar();
  return true;
}
function dropPotionAfterBattle(){
  const chance=S.potionDrop+(S.enemy&&S.enemy.isBoss?0.2:0);
  let drop=Math.random()<chance||S.potionPity>=3;
  if(drop){
    const key=randomPotion();
    if(addPotion(key)){
      S.potionDrop=0.4;S.potionPity=0;
      toast('🧪 获得药水：'+POTIONS[key].name);
      sfx('potion');
    }
  }else{
    S.potionDrop=Math.min(0.9,S.potionDrop+0.1);
    S.potionPity++;
  }
}
function usePotion(idx){
  if(!S.potions||!S.potions[idx])return;
  const key=S.potions[idx];const P=POTIONS[key];
  switch(key){
    case 'heal':S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*0.2));log('🧪 回血药 +'+Math.round(S.maxHp*0.2)+' 生命','g');break;
    case 'block':S.block=(S.block||0)+14;log('🧪 格挡药 +14 格挡','b');break;
    case 'atk':S.enemy.hp-=20;log('🧪 攻击药 造成 20 伤害','r');break;
    case 'strength':S.atkMul=(S.atkMul||1)*1.25;$('atkRate').textContent='~'+Math.round(ATK_RATE*S.atkMul)+'/秒';log('🧪 力量药 攻击系数 +25%','y');break;
    case 'time':S.timeBonus=(S.timeBonus||0)+5;log('🧪 时间药 答题时间 +5 秒','y');break;
    case 'double':S.doubleAtk=true;log('🧪 双倍药 下次攻击 ×2','y');break;
    case 'thorn':S.thorn=true;log('🧪 荆棘药 反弹 6 伤害','b');break;
    case 'gold':{const g=Math.round(15+S.floor*2);S.gold+=g;log('🧪 金币药 +'+g+' 金币','y');updateTop();break;}
    case 'genie':S.genie=true;log('🧪 瓶中精灵 免死一次','y');break;
    case 'juice':S.maxHp+=12;S.hp+=12;log('🧪 果汁 最大生命 +12','g');break;
    case 'chaos':{addPotion(randomPotion());addPotion(randomPotion());log('🧪 混沌药 随机再得 2 瓶','y');break;}
    case 'charge':S.chargeAtk=true;log('🧪 蓄力药 敌人蓄力时攻击 ×2','y');break;
  }
  S.potions[idx]=null;
  if(typeof updatePotionBar==='function')updatePotionBar();
  if(typeof updatePlayer==='function')updatePlayer();
  if(typeof updateEnemy==='function')updateEnemy();
  if(typeof updateTop==='function')updateTop();
  sfx('potion');
  if(S.enemy&&S.enemy.hp<=0){setTimeout(()=>{if(typeof onKill==='function')onKill();},600);}
}
function potionSVG(color){
  return '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="'+color+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3h4"/><path d="M11 3v4.5l-5 9.2A3 3 0 0 0 8.7 21h6.6a3 3 0 0 0 2.7-4.3l-5-9.2V3"/><path d="M8.5 15h7"/></svg>';
}
const POTION_RARITY_COLOR=['var(--line)','#4da3ff','#ab47bc'];
function updatePotionBar(){
  const bar=$('potionBar');if(!bar)return;
  bar.innerHTML='<span class="pbar-title">药水</span>';
  for(let i=0;i<POTION_SLOTS;i++){
    const key=S.potions&&S.potions[i];
    const s=document.createElement('div');
    s.className='potion-slot'+(key?' filled':'');
    if(key){
      const P=POTIONS[key];
      s.style.setProperty('--p-color',P.color);
      s.setAttribute('data-rarity',P.rarity);
      s.innerHTML=potionSVG(P.color)+'<span class="p-name">'+P.name+'</span>';
      bindTooltip(s,P.name,P.desc,false);
      s.onclick=()=>{hideTooltip();usePotion(i);};
    }else{
      s.innerHTML='<span class="p-empty">空</span>';
    }
    bar.appendChild(s);
  }
}

/* ============ 悬浮按钮 / 静音 ============ */
function toggleThemePop(){
  const pop=$('themePop');
  pop.classList.toggle('hidden');
  sfx('button');
}
function toggleMute(){
  S.muted=!S.muted;
  try{localStorage.setItem('lexicon_muted',S.muted?'1':'0');}catch(e){}
  if(S.muted){S._pausedPhase=musicPhase;stopMusic();}
  else{ if(S._pausedPhase){const ph=S._pausedPhase;S._pausedPhase='';playMusic(ph);} else sfx('button'); }
  updateMuteBtn();
}
function updateMuteBtn(){
  const b=$('btnMute');
  if(b)b.innerHTML=S.muted?'<i data-lucide="volume-x"></i> 音效关闭':'<i data-lucide="volume-2"></i> 音效开启';
  refreshIcons();
}
function goHome(){
  clearInterval(S.timer);
  showScreen('start');
  if(typeof updatePotionBar==='function')updatePotionBar();
  sfx('button');
}

/* ============ 初始化 ============ */
function init(){
  // 主题记忆
  let _th='minimal';try{_th=localStorage.getItem('lexicon_theme')||'minimal';}catch(e){}
  let _mu=0;try{_mu=localStorage.getItem('lexicon_muted')==='1'?1:0;}catch(e){}
  S.muted=!!_mu;S.theme=_th;
  captureBaseIcons();
  applyTheme(_th);
  setupIconObserver();

  // 主题选择浮层
  document.querySelectorAll('.t-opt').forEach(o=>{
    o.addEventListener('click',()=>{applyTheme(o.dataset.theme);sfx('button');});
  });
  $('floatTheme').addEventListener('click',toggleThemePop);
  $('btnMute').addEventListener('click',toggleMute);
  updateMuteBtn();

  // 返回主页悬浮按钮
  $('btnHomeFloat').addEventListener('click',goHome);

  // 词库
  const tc=$('tierChips');tc.innerHTML='';Object.keys(TIERS).forEach((t,i)=>{const c=document.createElement('div');c.className='chip'+(i===0?' selected':'');c.innerHTML=TIERS[t].name+'<span class="d">'+TIERS[t].desc+'</span>';c.onclick=()=>{S.tier=t;document.querySelectorAll('#tierChips .chip').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');};tc.appendChild(c);if(i===0)S.tier=t;});
  // 角色
  const hc=$('heroChips');Object.keys(HEROES).forEach((h,i)=>{const c=document.createElement('div');c.className='chip'+(h==='warrior'?' selected':'');c.innerHTML='<span class="chip-ico"><i data-lucide="'+HEROES[h].icon+'"></i></span>'+HEROES[h].name+'<span class="d">'+HEROES[h].desc+'</span>';c.onclick=()=>{S.hero=h;document.querySelectorAll('#heroChips .chip').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');};hc.appendChild(c);});S.hero='warrior';
  // 难度
  const dc=$('diffChips');Object.keys(DIFFS).forEach((d,i)=>{const c=document.createElement('div');c.className='chip'+(d==='normal'?' selected':'');c.innerHTML=DIFFS[d].name;c.onclick=()=>{S.diff=d;document.querySelectorAll('#diffChips .chip').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');};dc.appendChild(c);});S.diff='normal';

  // 主按钮
  $('btnStart').addEventListener('click',()=>{sfx('button');startRun();});
  $('btnMeta').addEventListener('click',()=>{sfx('button');showScreen('meta');});
  $('btnMetaBack').addEventListener('click',()=>{sfx('button');showScreen('start');});
  $('btnAgain').addEventListener('click',()=>{sfx('button');showScreen('start');});
  $('btnHome').addEventListener('click',()=>{sfx('button');showScreen('start');});
  $('btnAtk').addEventListener('click',()=>choose('atk'));
  $('btnDef').addEventListener('click',()=>choose('def'));

  // 药水栏初始渲染
  updatePotionBar();
  wireSfx();
  refreshIcons();
  if(typeof playMusic==='function')playMusic('menu');
  const unlock=()=>{const T=_tone();if(T&&T.context&&T.context.state==='suspended'){T.start();}if(musicPhase&&!S.muted){const ph=musicPhase;stopMusic();if(ph)playMusic(ph);}};
  document.addEventListener('pointerdown',unlock,{once:true});
  document.addEventListener('click',unlock,{once:true});

  // 点击任意非 tip 元素关闭悬浮弹窗
  document.addEventListener('click',(e)=>{
    if(!e.target.closest('[data-tt]')&&!e.target.closest('#tooltip'))hideTooltip();
  });
}
document.addEventListener('DOMContentLoaded',init);
