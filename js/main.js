/* ============================================================
   《词域远征》 初始化 / UI / 主题 / 音效 / 配乐 / 药水 (main.js)
   依赖：data.js, game.js
============================================================ */

/* ============ 主题（三主题：minimal / pink / mech） ============ */
function applyTheme(t){
  S.theme=t;
  document.documentElement.setAttribute('data-theme',t);
  try{localStorage.setItem('lexicon_theme',t);}catch(e){}
  const opts=document.querySelectorAll('.t-opt');
  opts.forEach(o=>o.classList.toggle('selected',o.dataset.theme===t));
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
let musicTimer=null,musicStep=0,musicPhase='',musicOn=false;
function playMusic(phase){
  if(S.muted){stopMusic();return;}
  if(phase===musicPhase&&musicOn)return;
  stopMusic();
  const cfg=MUSIC[phase];if(!cfg)return;
  musicPhase=phase;musicOn=true;musicStep=0;
  try{ if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){return;}
  const tick=()=>{
    if(!musicOn)return;
    const notes=cfg.notes;const note=notes[musicStep%notes.length];
    playNote(note.f,note.dur,cfg.type,cfg.vol);
    musicStep++;
    musicTimer=setTimeout(tick,cfg.bpm);
  };
  tick();
}
function stopMusic(){musicOn=false;if(musicTimer){clearTimeout(musicTimer);musicTimer=null;}}
function playNote(freq,dur,type,vol){
  if(!AC)return;
  try{
    const o=AC.createOscillator();const g=AC.createGain();
    o.type=type||'triangle';o.frequency.value=freq;
    o.connect(g);g.connect(AC.destination);
    const t=AC.currentTime;
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(vol||0.1,t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.start(t);o.stop(t+dur+0.05);
  }catch(e){}
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
      s.title=P.name+'：'+P.desc;
      s.onclick=()=>{usePotion(i);};
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
  if(S.muted)stopMusic();else sfx('button');
  updateMuteBtn();
}
function updateMuteBtn(){
  const b=$('btnMute');
  if(b)b.innerHTML=S.muted?'<i data-lucide="volume-x"></i> 音效关闭':'<i data-lucide="volume-2"></i> 音效开启';
  if(window.lucide)lucide.createIcons();
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
  applyTheme(_th);

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
  const tc=$('tierChips');tc.innerHTML='<div class="chip selected">KET<span class="d">剑桥 A2 核心词</span></div>';S.tier='ket';
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
}
document.addEventListener('DOMContentLoaded',init);
