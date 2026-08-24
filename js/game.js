/* ============================================================
   《词域远征》 战斗核心 (game.js)
   META / S 状态 / 工具函数 / 词库 / 回合 / 答题 / 击杀 / 渲染 / 开局结算
============================================================ */

/* ============ 局外成长持久化 ============ */
let META=loadMeta();
function wordKey(tier,en){return tier+':'+en;}
function migrateWordRecords(words){
  const src=words&&typeof words==='object'?words:{};
  const next={};
  for(const key in src){if(key.includes(':'))next[key]=src[key];}
  for(const tier in TIERS){
    for(const w of TIERS[tier].words){
      const key=wordKey(tier,w.en);
      if(!next[key]&&src[w.en])next[key]={...src[w.en]};
    }
  }
  return next;
}
function loadMeta(){
  try{
    const m=JSON.parse(localStorage.getItem(META_KEY));
    if(m&&typeof m==='object'){
      m.star=+m.star||0;m.maxHp=+m.maxHp||0;m.slot=+m.slot||0;m.goldStart=+m.goldStart||0;
      m.reviewToday=+m.reviewToday||0;m.reviewDate=m.reviewDate||'';m.tree=m.tree||{};
      if(m.wordDataVersion!==2){m.words=migrateWordRecords(m.words);m.wordDataVersion=2;localStorage.setItem(META_KEY,JSON.stringify(m));}
      else if(!m.words||typeof m.words!=='object')m.words={};
      return m;
    }
  }catch(e){}
  return {star:0,maxHp:0,slot:0,goldStart:0,reviewToday:0,reviewDate:'',tree:{},words:{},wordDataVersion:2};
}
function saveMeta(){localStorage.setItem(META_KEY,JSON.stringify(META));}

/* ============ 星尘天赋树：加点与查询 ============ */
function talentLv(id){return (META.tree&&META.tree[id])||0;}
function talentNode(id){for(const b of TALENT_BRANCHES){const n=b.nodes.find(x=>x.id===id);if(n)return n;}return null;}
function talentBranchOf(id){for(const b of TALENT_BRANCHES){if(b.nodes.some(x=>x.id===id))return b;}return null;}
function talentCost(node){const lv=talentLv(node.id);return node.cost(lv);}
function talentCanSpend(node){
  if(talentLv(node.id)>=node.max)return false;
  if(META.star<talentCost(node))return false;
  for(const pid of (node.prereq||[])){if(talentLv(pid)<=0)return false;}
  return true;
}
function spendTalent(id){
  const node=talentNode(id);if(!node)return;
  if(!talentCanSpend(node)){toast(node.prereq&&node.prereq.length&&talentLv(node.id)===0&&!node.prereq.every(p=>talentLv(p)>0)?'🔒 前置天赋未解锁':'✨ 星尘不足');return;}
  META.star-=talentCost(node);META.tree[id]=(talentLv(id)||0)+1;saveMeta();renderMeta();
  toast('🌟 点亮「'+node.name+'」Lv.'+talentLv(id));
}
/* 局内生效：开局时把天赋数值写入 S */
function applyTalentRun(){
  S.talentP1=talentLv('P1');          // 攻击 +5%/级
  S.critRate=talentLv('P2')*4;        // 暴击率 +4%/级
  S.talentP3=talentLv('P3');          // 每2连击 +1 伤害
  S.talentP5=talentLv('P5');          // BOSS 伤害 +12%/级
  S.talentP4=talentLv('P4')>0;        // 连击≥5 回2血
  S.talentL2=talentLv('L2');          // 答对金币 +1/级
  S.talentL4=talentLv('L4');          // 答题时间 +2秒/级
  S.talentL5=talentLv('L5')>0;        // 答对25%回2血
  if(S.talentP1)S.atkMul=(S.atkMul||1)*(1+S.talentP1*0.05);
  if(S.talentL4)S.timeBonus=(S.timeBonus||0)+S.talentL4*2;
}
function restoreTalentRunState(){
  if(S.talentP1===undefined)S.talentP1=talentLv('P1');
  if(S.critRate===undefined)S.critRate=talentLv('P2')*4;
  if(S.talentP3===undefined)S.talentP3=talentLv('P3');
  if(S.talentP5===undefined)S.talentP5=talentLv('P5');
  if(S.talentP4===undefined)S.talentP4=talentLv('P4')>0;
  if(S.talentL2===undefined)S.talentL2=talentLv('L2');
  if(S.talentL4===undefined)S.talentL4=talentLv('L4');
  if(S.talentL5===undefined)S.talentL5=talentLv('L5')>0;
}

let S={};
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function toast(msg){let t=$('toastBox');if(!t){t=document.createElement('div');t.className='toast';t.id='toastBox';document.body.appendChild(t);}t.textContent=msg;t.style.opacity=1;t.style.display='block';clearTimeout(t._tm);t._tm=setTimeout(()=>{t.style.opacity=0;setTimeout(()=>t.style.display='none',300);},1300);}
function log(msg,cls=''){const d=$('log');const div=document.createElement('div');div.className=cls;div.textContent=msg;d.prepend(div);while(d.children.length>9)d.removeChild(d.lastChild);}
function fx(x,y,txt,cls=''){const el=document.createElement('div');el.className='fx '+cls;el.textContent=txt;el.style.left=x+'px';el.style.top=y+'px';$('fxLayer').appendChild(el);setTimeout(()=>el.remove(),1000);}
function rect(id){const r=$(id).getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/3};}
function kebabToPascal(name){
  return name.split('-').map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join('');
}
const SVG_NS='http://www.w3.org/2000/svg';
function refreshIcons(){
  if(!window.lucide||!lucide.icons||!document.createElementNS)return;
  document.querySelectorAll('[data-lucide]').forEach(el=>{
    const name=el.getAttribute('data-lucide');
    if(!name)return;
    try{
      const nodes=lucide.icons[kebabToPascal(name)];
      if(!nodes)return;
      const svg=document.createElementNS(SVG_NS,'svg');
      svg.setAttribute('width','24');svg.setAttribute('height','24');
      svg.setAttribute('viewBox','0 0 24 24');
      svg.setAttribute('fill','none');
      svg.setAttribute('stroke','currentColor');
      svg.setAttribute('stroke-width','2');
      svg.setAttribute('stroke-linecap','round');
      svg.setAttribute('stroke-linejoin','round');
      svg.classList.add('lucide');
      nodes.forEach(pair=>{
        const n=document.createElementNS(SVG_NS,pair[0]);
        const a=pair[1]||{};
        for(const k in a)n.setAttribute(k,a[k]);
        svg.appendChild(n);
      });
      el.innerHTML=''; el.appendChild(svg);
    }catch(e){}
  });
}
function iconHTML(name){
  if(name==='svg-thorns')return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.6 4.2 4.2 1.6-3.1 3.1 1.1 4.9L12 14.5 8.2 16.8l1.1-4.9-3.1-3.1 4.2-1.6z"/><path d="M12 20v1"/></svg>';
  return '<i data-lucide="'+name+'"></i>';
}

/* ============ 间隔复习（学习属性 ↔ 游戏资源打通） ============ */
const REVIEW_IV=[1,2,4,7,15,30]; // 答对间隔递进天数
function touchWord(tier,en,correct){
  if(!tier||!en)return;
  META.words=META.words||{};
  const key=wordKey(tier,en);
  const r=META.words[key]||{iv:0,due:0,wrongs:0,mastery:0};
  const now=Date.now();
  if(correct){
    r.mastery=(r.mastery||0)+1;
    if((r.wrongs||0)>0)r.wrongs--;
    const idx=REVIEW_IV.indexOf(r.iv);
    if(idx>=0&&idx<REVIEW_IV.length-1)r.iv=REVIEW_IV[idx+1];
    else if(r.iv<=0)r.iv=REVIEW_IV[0];
    r.due=now+r.iv*86400000;
  }else{
    r.wrongs=(r.wrongs||0)+1;
    r.iv=REVIEW_IV[0];
    r.due=now+r.iv*86400000;
  }
  META.words[key]=r;
  saveMeta();
}
function wordRec(tier,en){return (META.words||{})[wordKey(tier,en)]||null;}
function isDueWord(tier,en){const r=wordRec(tier,en);return !!(r&&r.due>0&&r.due<=Date.now());}
function dueWordsCount(){let n=0,now=Date.now();for(const t in TIERS){for(const w of TIERS[t].words){const r=wordRec(t,w.en);if(r&&r.due>0&&r.due<=now)n++;}}return n;}

/* ============ 词库 ============ */
function getPool(){
  const words=TIERS[S.tier].words;
  const now=Date.now();
  const wlist=[];const dues=[];const wrongs=[];
  for(const w of words){
    const r=wordRec(S.tier,w.en);
    let wgt=1;
    if(r){
      if(r.due>0&&r.due<=now){wgt=10;dues.push(w);}
      else if(r.wrongs>0)wgt=6*(1+(talentLv('L3'))*0.2);
      else if(r.mastery>=3&&r.iv>=7)wgt=0.4;
    }
    if(S.wrongWords[w.en]){wgt+=10;wrongs.push(w);}
    const n=Math.max(1,Math.round(wgt));
    for(let i=0;i<n;i++)wlist.push(w);
  }
  const _cap=18+(talentLv('L1'))*5;let base=shuffle(wlist).slice(0,_cap);
  for(const d of dues){if(!base.some(x=>x.en===d.en)){if(base.length>=18)base.pop();base.push(d);}}
  for(const w of wrongs){if(!base.some(x=>x.en===w.en)){if(base.length>=18)base.pop();base.push(w);}}
  return base;
}
function buildOptions(target,pool,qType){
  const dist=[...TIERS[S.tier].words].filter(x=>x.en!==target.en);
  const opts=[];const used=shuffle(dist);
  if(qType==='e2c'){
    const p=[];for(const c of used){if(!p.includes(c.cn)&&c.cn!==target.cn){p.push(c.cn);if(p.length>=3)break;}}
    const f2=[...TIERS[S.tier].words].filter(x=>!p.includes(x.cn)&&x.cn!==target.cn);for(const c of f2){if(p.length>=3)break;p.push(c.cn);}while(p.length<3)p.push('其他释义'+(p.length+1));
    return shuffle([target.cn,...p]);
  }else{
    const p=[];for(const c of used){if(!p.includes(c.en)){p.push(c.en);if(p.length>=3)break;}}
    const f3=[...TIERS[S.tier].words].filter(x=>!p.includes(x.en));for(const c of f3){if(p.length>=3)break;p.push(c.en);}while(p.length<3)p.push('word'+(p.length+1));
    return shuffle([target.en,...p]);
  }
}

/* ============ 意图生成（攻击 / 非攻击各半） ============ */
function genIntent(pool){
  // 50% 攻击意图，50% 非攻击意图（防御/蓄力）
  const atkPool=pool.filter(i=>i[0]===0);
  const nonAtkPool=pool.filter(i=>i[0]!==0);
  let it;
  if(Math.random()<0.5&&atkPool.length){
    it=atkPool[Math.floor(Math.random()*atkPool.length)];
  }else if(nonAtkPool.length){
    it=nonAtkPool[Math.floor(Math.random()*nonAtkPool.length)];
  }else{
    it=pool[Math.floor(Math.random()*pool.length)];
  }
  return {type:it[0],val:it[1]};
}

/* ============ 回合 ============ */
function startTurn(){
  S.block=0;S.locked=false; // ★ 修复：每回合开始重置答题锁，避免上回合残留导致点击无反应
  updatePlayer();
  // 生成敌人意图（攻击/非攻击各半）
  const it=genIntent(S.enemy.intents);
  S.intent={type:it.type,val:it.val};
  if(S.intent.type===2)S.intent.val=1+Math.floor(Math.random()*3); // 蓄力层数
  renderIntent();
  renderEnemy();
  S.phase='choose';
  const qo=$('quizOverlay');if(qo)qo.classList.remove('show');
  log('—— 第 '+(S.turnCount+1)+' 回合 —— 敌人准备「'+INTENT_LABEL[S.intent.type]+'」','y');
}
function choose(mode){
  if(S.phase!=='choose')return;
  S.choice=mode;S.phase='question';
  const _at=$('btnAtk'),_de=$('btnDef');
  if(_at)_at.classList.toggle('active',mode==='atk');
  if(_de)_de.classList.toggle('active',mode==='def');
  refreshTab();
  const banner=$('choiceBanner');
  banner.className=mode==='atk'?'atk':'def';
  banner.textContent=mode==='atk'?'⚔ 攻击':'🛡 防御';
  const qo=$('quizOverlay');if(qo)qo.classList.add('show');
  nextQuestion();
}
function enemyAttackDamage(val){
  return Math.round(val*(S.enemyBuff?S.enemyBuff:1)*(DIFFS[S.diff].atkMul||1));
}
function renderIntent(){
  const _ici=INTENT_ICON[S.intent.type];$('intentIco').setAttribute('data-lucide',_ici);$('intentIco').dataset.base=_ici;
  $('intentLabel').textContent=INTENT_LABEL[S.intent.type];
  const num=S.intent.type===2?('×'+S.intent.val):(S.intent.type===0?enemyAttackDamage(S.intent.val):S.intent.val);
  $('intentNum').textContent=S.intent.type===2?'(下次 ×'+(1+S.intent.val)+')':(''+num);
  $('intentNum').style.color=S.intent.type===0?'var(--atk)':(S.intent.type===1?'var(--def)':'var(--gold)');
  $('intentNum').setAttribute('data-intent',S.intent.type);
  refreshIcons();
}
function nextQuestion(){
  const pool=getPool();if(pool.length<4)return;
  let w=pool[Math.floor(Math.random()*pool.length)];
  if(pool.length>1){while(w.en===S.lastWord){w=pool[Math.floor(Math.random()*pool.length)];}}
  S.lastWord=w.en;S.currentWord=w;
  const qType=Math.random()<.5?'e2c':'c2e';
  S.qType=qType;S.options=buildOptions(w,pool,qType);
  $('qType').textContent=(isDueWord(S.tier,w.en)?'📚 ':'')+(qType==='e2c'?'英→中':'中→英');
  $('qPos').textContent=w.pos;
  $('qHint').textContent=qType==='e2c'?('选择「'+w.en+'」的释义'):('选择「'+w.cn+'」对应的单词');
  $('qWord').textContent=qType==='e2c'?w.en:w.cn;
  const box=$('options');box.innerHTML='';const letters=['A','B','C','D'];
  S.options.forEach((o,i)=>{const b=document.createElement('div');b.className='opt';b.innerHTML='<span class="letter">'+letters[i]+'</span>'+o;b.onclick=()=>answer(i,b);box.appendChild(b);});
  $('feedback').textContent='';$('feedback').className='';
  startTimer();
}
function startTimer(){
  const time=(DIFFS[S.diff].time||15)+(HEROES[S.hero].time||0)+(S.timeBonus||0);let remain=time;
  const ring=$('timerRing');ring.textContent=remain;ring.style.background='var(--card)';ring.classList.remove('low');
  clearInterval(S.timer);
  S.timer=setInterval(()=>{remain--;ring.textContent=remain;if(remain<=5){ring.style.background='var(--red)';ring.style.color='#fff';ring.classList.add('low');}else{ring.style.background='var(--card)';ring.style.color='';ring.classList.remove('low');};if(remain<=0){clearInterval(S.timer);onTimeout();}},1000);
}
function lockOptions(){[...document.querySelectorAll('.opt')].forEach(b=>b.disabled=true);clearInterval(S.timer);}

/* ============ 答题结算 ============ */
function answer(i,el){
  if(S.phase!=='question'||S.locked)return;
  S.locked=true;lockOptions();
  const target=S.qType==='e2c'?S.currentWord.cn:S.currentWord.en;
  const btns=[...document.querySelectorAll('.opt')];
  const rightBtn=btns[S.options.indexOf(target)];
  const isRight=S.options[i]===target;
  if(isRight){if(rightBtn)rightBtn.classList.add('correct');resolve(true);}
  else{el.classList.add('wrong');if(rightBtn)rightBtn.classList.add('correct');resolve(false);}
}
function onTimeout(){if(S.phase!=='question')return;lockOptions();const target=S.qType==='e2c'?S.currentWord.cn:S.currentWord.en;const rb=[...document.querySelectorAll('.opt')][S.options.indexOf(target)];if(rb)rb.classList.add('correct');$('feedback').textContent='⏰ 超时！正确：'+target;$('feedback').className='bad';resolve(false,true);}
function recordWrong(){if(S.currentWord)S.wrongWords[S.currentWord.en]=true;}
function resolve(correct,timeout){
  S.locked=true;
  const _wasDue=!!(S.currentWord&&isDueWord(S.tier,S.currentWord.en)); // 答前判断是否到期复习词
  if(correct){S.correctTotal++;}else{S.wrongTotal++;recordWrong();}
  touchWord(S.tier,S.currentWord&&S.currentWord.en,correct);
  const curTime=$('timerRing');const remain=Math.max(0,parseInt(curTime.textContent)||0);
  // 数值 = 剩余时间 × 系数
  let val=correct?Math.round(remain*(S.choice==='atk'?ATK_RATE*S.atkMul:DEF_RATE*(S.defMul||1))):0;
  if(S.choice==='atk'&&S.knowBuff&&S.intent&&S.intent.type===2)val*=2;
  if(S.choice==='atk'&&S.chargeAtk&&S.intent&&S.intent.type===2){val*=2;S.chargeAtk=false;}
  if(S.choice==='atk'&&S.doubleAtk){val*=2;S.doubleAtk=false;}
  if(S.choice==='atk'&&correct&&S.enemy&&S.talentP5&&S.enemy.isBoss)val=Math.round(val*(1+S.talentP5*0.12));
  let _crit=false;if(S.choice==='atk'&&correct&&S.critRate&&Math.random()*100<S.critRate){val=Math.round(val*1.5);_crit=true;}
  if(S.choice==='atk'){
    if(correct){S.combo++;S.maxCombo=Math.max(S.maxCombo,S.combo);if(S.talentP3&&S.combo>=2&&S.combo%2===0)val+=S.talentP3;S.enemy.hp-=Math.max(val-S.enemy.block,0);const absorbed=Math.min(val,S.enemy.block);S.enemy.block-=absorbed;if(HEROES[S.hero].combo)S.gold++;if(S.comboGold&&S.combo%3===0)S.gold+=2;if(S.talentL2){S.gold+=S.talentL2;}if(S.talentP4&&S.combo>=5&&S.combo%5===0){S.hp=Math.min(S.maxHp,S.hp+2);fx(rect('playerArea').x,rect('playerArea').y,'+2','heal');}if(S.talentL5&&Math.random()<0.25){S.hp=Math.min(S.maxHp,S.hp+2);fx(rect('playerArea').x,rect('playerArea').y,'+2','heal');}}
    else{S.combo=0;}
    const p=rect('enemyArea');if(val>0)fx(p.x,p.y,'-'+val,_crit?'crit':'');else if(!correct)fx(p.x,p.y,'落空','heal');
    log((correct?('⚔ 攻击 '+val+(_crit?' ⚡暴击':'')):'✗ 落空')+(timeout?'（超时）':''),correct?'':'r');
  }else{
    if(correct){S.block+=val;S.combo++;S.maxCombo=Math.max(S.maxCombo,S.combo);if(HEROES[S.hero].combo)S.gold++;if(S.comboGold&&S.combo%3===0)S.gold+=2;if(S.talentL2){S.gold+=S.talentL2;}if(S.talentL5&&Math.random()<0.25){S.hp=Math.min(S.maxHp,S.hp+2);fx(rect('playerArea').x,rect('playerArea').y,'+2','heal');}}
    else{S.combo=0;}
    if(val>0)fx(rect('playerArea').x,rect('playerArea').y,'+'+val,'def');
    log((correct?('🛡 格挡 '+val):'✗ 防御失败')+(timeout?'（超时）':''),correct?'':'r');
  }
  updatePlayer();updateEnemy();updateTop();
  let _fb=correct?('✓ 正确 · '+(S.choice==='atk'?'伤害':'格挡')+' '+val):('✗ 答错，数值 0');
  if(correct&&_wasDue){S.reviewDone=(S.reviewDone||0)+1;S.gold+=2;updateTop();_fb+=' 📚复习+2';log('📚 复习词答对 +2 金币','g');}
  $('feedback').textContent=_fb;
  $('feedback').className=correct?'ok':'bad';
  setTimeout(()=>{
    // ★ 关闭答题弹窗，回到战斗视图
    const qo=$('quizOverlay');if(qo)qo.classList.remove('show');
    // ★ 玩家先手，攻击打死敌人则敌人不再行动，直接击杀
    if(S.enemy.hp<=0){onKill();return;}
    enemyTurn();
  },800);
}
function enemyTurn(){
  S.phase='enemy';
  // 敌人格挡保护一次玩家行动，并在敌人下一次行动开始时消失。
  if(S.enemy)S.enemy.block=0;
  const it=S.intent;
  if(it.type===0){ // 攻击
    const dmg=enemyAttackDamage(it.val);
    S.enemyBuff=0;
    const absorbed=Math.min(dmg,S.block);const real=dmg-absorbed;
    S.block-=absorbed;S.hp-=real;
    // ★ 瓶中精灵免死一次
    if(S.hp<=0&&S.genie){S.hp=1;S.genie=false;log('🧪 瓶中精灵挽救了你！','y');}
    log('👹 敌人攻击 '+dmg+'（格挡抵 '+absorbed+'，掉 '+real+' 血）',real>0?'r':'g');
    const p=rect('playerArea');if(real>0)fx(p.x,p.y,'-'+real,'');
    const thornDamage=S.thornDamage||(S.thorn?4:0);
    if(thornDamage){S.enemy.hp-=thornDamage;log('🌵 荆棘反弹 '+thornDamage+' 伤害','b');}
  }else if(it.type===1){ // 防御
    S.enemy.block+=it.val;log('👹 敌人防御 +'+it.val,'b');
  }else{ // 蓄力
    S.enemyBuff=(S.enemyBuff||1)+it.val;log('👹 敌人蓄力，下次攻击 ×'+(S.enemyBuff),'y');
  }
  updatePlayer();updateEnemy();
  // 判定
  if(S.hp<=0){setTimeout(()=>endRun(false),700);return;}
  if(S.enemy.hp<=0){setTimeout(()=>onKill(),700);return;}
  // 新回合
  setTimeout(()=>{S.turnCount++;S.locked=false;startTurn();},900);
}

/* ============ 击杀/层 ============ */
function onKill(){
  S.killedTotal++;S.gold+=Math.round((S.enemy.goldGain||0)*(S.goldMul||1));
  S.enemiesInFloor--;S.combo=0;
  if(S.enemy.isBoss){S.bossIndex=(S.bossIndex||0)+1;}
  toast('🎉 击败「'+S.enemy.name+'」');
  updateTop();
  setTimeout(()=>{
    if(S.enemiesInFloor<=0){floorClear();}
    else{spawnNextEnemy();}
  },600);
}
function updateFloorTag(){
  const ft=$('floorTag');if(!ft)return;
  ft.textContent=(S.enemy&&S.enemy.isBoss)?('☠ BOSS · 第 '+S.floor+' 层'):('第 '+S.floor+' 层 · 剩 '+(S.enemiesInFloor||1)+' 怪');
}
function floorClear(){
  log('✅ 本层敌人清空！','g');
  if(HEROES[S.hero].heal){S.hp=Math.min(S.maxHp,S.hp+HEROES[S.hero].heal);updatePlayer();}
  // ★ 战斗胜利：药水掉落（含保底）
  if(typeof dropPotionAfterBattle==='function')dropPotionAfterBattle();
  // ★ 网状地图：标记当前节点完成；Boss 行完成进下一幕或通关
  const n=S.map&&S.map.rows[S.mapRow]&&S.map.rows[S.mapRow][S.mapCol];
  if(n)n.done=true;
  if(S.mapRow===MAP_ROW_W.length-1){
    // ★ 修复：bossIndex 已在 onKill 中递增，这里不再重复 ++
    if(S.bossIndex>=BOSSES.length){endRun(true);return;}
    S.act=(S.act||1)+1;S.floor=(S.act-1)*7+1;
    S.map=genMap(S.act);S.mapRow=0;S.mapCol=-1;
    showScreen('map');if(typeof renderMap==='function')renderMap();updateTop();
    toast('🏰 踏入第 '+S.act+' 幕');
    return;
  }
  // ★ 遗物掉落节奏：精英必出遗物，普通战斗按概率出（防滚雪球），未出则给金币战利品
  const isElite=n&&n.type==='elite';
  if(isElite||Math.random()<0.45){giveRelic();}
  else{const _g=Math.round(8+S.floor*1.5);S.gold+=_g;updateTop();toast('🪙 战利品 +'+_g+' 金币');returnToMap();}
}
function giveRelic(){
  S.phase='relic';
  const box=$('relicChoices');box.innerHTML='';
  const choices=shuffle(RELICS).slice(0,3);
  choices.forEach(r=>{const d=document.createElement('div');d.className='relic';d.innerHTML='<div class="r-top"><span class="r-ico">'+iconHTML(r.icon)+'</span><div><div class="r-name">'+r.name+'</div><div class="r-desc">'+r.desc+'</div></div></div>';d.onclick=()=>{S.relics.push(r);if(typeof renderRelicBar==='function')renderRelicBar();r.apply();toast('获得 '+r.name);$('overlay').classList.remove('show');returnToMap();};box.appendChild(d);});
  $('overlay').classList.add('show');refreshIcons();
}
function spawnFloor(){
  S.turnCount=0;S.locked=false;S.enemyBuff=0;
  if(S.floor%7===0){spawnBoss();return;}
  if(typeof playMusic==='function')playMusic('battle');
  S.enemiesInFloor=1+Math.floor(Math.random()*2)+(S.floor>3?1:0);
  updateFloorTag();
  spawnNextEnemy();
  if(typeof updateTop==='function')updateTop();
}
function generateEnemy(){
  const idx=Math.floor(Math.random()*Math.min(ENEMIES.length,5+Math.floor(S.floor/3)));
  const e=ENEMIES[Math.min(idx,ENEMIES.length-1)];
  const hpMul=(DIFFS[S.diff].hpMul||2)*(1+S.floor*0.08);
  const hp=Math.round(e.hp*hpMul);
  return {name:e.name,icon:e.icon,monster:e.monster,hp,hpMax:hp,block:0,intents:e.intents,isBoss:false,goldGain:Math.round((10+S.floor)*1.2)};
}
function spawnNextEnemy(){
  S.enemyBuff=0;
  S.enemy=generateEnemy();
  updateFloorTag();
  renderEnemy();updateEnemy();
  startTurn();
}
function spawnBoss(){
  showScreen('game');
  const b=BOSSES[Math.min(S.bossIndex||0,BOSSES.length-1)];
  const hpMul=1+(S.floor/7-1)*0.35;
  S.enemy={name:b.name,icon:b.icon,monster:b.monster,hp:Math.round(b.hp*hpMul),hpMax:Math.round(b.hp*hpMul),block:0,intents:b.intents,isBoss:true,goldGain:60+S.floor*3};
  S.enemiesInFloor=1;updateFloorTag();
  renderEnemy();updateEnemy();
  toast('👹 BOSS '+S.enemy.name+' 现身！');
  if(typeof playMusic==='function')playMusic('boss');
  if(typeof updateTop==='function')updateTop();
  startTurn();
}

/* ============ 渲染 ============ */
function renderEnemy(){
  $('enemyIcon').innerHTML=monsterSVG(S.enemy.monster);
  $('enemyName').textContent=S.enemy.name;
  updateEnemy();
}
function updateEnemy(){
  const pct=Math.max(0,S.enemy.hp/S.enemy.hpMax*100);
  $('enemyHpFill').style.width=pct+'%';
  $('enemyHpTxt').textContent=Math.max(0,S.enemy.hp)+'/'+S.enemy.hpMax;
  if(S.enemy.block>0){$('enemyBlock').style.display='flex';$('enemyBlockNum').textContent=S.enemy.block;}
  else{$('enemyBlock').style.display='none';}
}
function updatePlayer(){
  $('pHp').textContent=Math.max(0,S.hp);
  $('pBlock').textContent=S.block||0;
  refreshTab();
  $('statHp').textContent=Math.max(0,S.hp);
  $('statHpBar').style.width=(S.hp/S.maxHp*100)+'%';
  refreshIcons();
}
function updateTop(){
  $('statFloor').textContent='Lv.'+S.floor;
  $('statGold').textContent=S.gold;
  $('combo').textContent='×'+S.combo;
}

/* ============ 遗物栏：实时渲染已获取遗物 ============ */
function renderRelicBar(){
  const bar=$('relicBar'); if(!bar)return;
  if(!S.relics||!S.relics.length){
    bar.innerHTML='<span class="rbar-title">遗物</span><span class="rbar-empty">暂无</span>';
    return;
  }
  bar.innerHTML='<span class="rbar-title">遗物</span>';
  S.relics.forEach(r=>{
    const d=document.createElement('div');
    d.className='rbar-icon';
    d.setAttribute('data-tt','1');
    d.innerHTML=iconHTML(r.icon);
    bar.appendChild(d);
    if(typeof bindTooltip==='function')bindTooltip(d,r.name,r.desc,true);
  });
  refreshIcons();
}

/* ============ 开局/结算 ============ */
function startRun(){
  S._settled=false;  // 新开局重置结算标记
  clearSave();
  if(typeof updateContinueBtn==='function')updateContinueBtn();
  Object.assign(S,{
    floor:1,gold:(META.goldStart||0)*5,combo:0,maxCombo:0,hp:0,maxHp:0,
    correctTotal:0,wrongTotal:0,killedTotal:0,atkMul:1,defMul:1,goldMul:1,
    bossIndex:0,timeBonus:0,enemyBuff:0,block:0,choice:'atk',locked:false,
    wrongWords:{},reviewDone:0,turnCount:0,enemiesInFloor:1,enemy:null,thorn:false,thornDamage:0,comboGold:false,knowBuff:false,
    /* 药水状态 */
    potions:[null,null,null],potionDrop:0.4,potionPity:0,
    doubleAtk:false,chargeAtk:false,genie:false,
    /* 已获取遗物 */
    relics:[],act:1,map:null,mapRow:0,mapCol:-1
  });
  S.atkMul=(HEROES[S.hero].atkMul||1)*(S.atkMul||1);
  applyTalentRun();
  S.maxHp=60+META.maxHp*8;S.hp=S.maxHp;
  refreshTab();
  renderPlayer();
  showScreen('game');$('log').innerHTML='';
  if(typeof updatePotionBar==='function')updatePotionBar();
  if(typeof renderRelicBar==='function')renderRelicBar();
  S.map=genMap(1);showScreen('map');if(typeof renderMap==='function')renderMap();updatePlayer();updateTop();
}
function endRun(win,abandon){
  S._settled=true;  // 本局已结算，pagehide 不再自动存档
  clearSave();
  if(typeof updateContinueBtn==='function')updateContinueBtn();
  clearInterval(S.timer);
  const _rate=(TIERS[S.tier]&&TIERS[S.tier].rate)||1;
  // ★ 新星尘公式：层数 + 通关 + 正确率 + 复习加成（学习=回报）
  const _node=S.map&&S.map.rows&&S.map.rows[S.mapRow]&&S.map.rows[S.mapRow][S.mapCol];
  const _hasProgress=(S.killedTotal||0)>0||((S.correctTotal||0)+(S.wrongTotal||0))>=5||!!(_node&&_node.done);
  let star=0;
  if(!abandon||_hasProgress){
    star=Math.max(1,S.floor+(win?8:0)+Math.floor(S.correctTotal/25)+Math.min(5,S.reviewDone||0));
    star=Math.max(1,Math.round(star*_rate));
    if(abandon)star=Math.max(1,Math.round(star*0.5));
  }
  META.star+=star;saveMeta();
  showScreen('result');
  const _g=abandon?'flag':(win?'trophy':'skull');$('resultGlyph').setAttribute('data-lucide',_g);$('resultGlyph').dataset.base=_g;refreshIcons();
  $('resultTitle').textContent=abandon?'已放弃远征':(win?'远征通关！':'远征失败');
  $('resultStats').innerHTML=
    '<div class="stat-row"><span>结算方式</span><span>'+(abandon?'中途放弃':'—')+'</span></div>'+
    '<div class="stat-row"><span>到达层数</span><span>第 '+S.floor+' 层</span></div>'+
    '<div class="stat-row"><span>答对 / 答错</span><span>'+S.correctTotal+' / '+S.wrongTotal+'</span></div>'+
    '<div class="stat-row"><span>击败敌人</span><span>'+S.killedTotal+'</span></div>'+
    '<div class="stat-row"><span>最高连击</span><span>×'+S.maxCombo+'</span></div>'+
    '<div class="stat-row"><span>复习词</span><span>📚 ×'+(S.reviewDone||0)+'</span></div>'+
    '<div class="stat-row"><span>获得金币</span><span>'+S.gold+'</span></div>'+
    '<div class="stat-row"><span>✨ 星尘</span><span>+'+star+'</span></div>';
}
function abandonRun(){
  // 中途放弃：按当前进度折半结算星尘
  endRun(false,true);
}
function renderMeta(){
  $('metaStar').innerHTML='<span class="star-ico">'+starSVG()+'</span><span id="metaStarNum">'+META.star+'</span>';
  const _rb=$('reviewBox');if(_rb){const _due=dueWordsCount();_rb.innerHTML='<div class="u-name" style="color:var(--accent)">📚 今日复习</div><div class="u-desc">'+_due+' 个词已到期 · 今日已复习 '+(META.reviewToday||0)+' 个 · 答对复习词 +2 金币 · 结算星尘 +1/词（封顶 +5）</div>';}
  const list=$('upgradeList');list.innerHTML='';
  const ups=[
    {k:'maxHp',name:'❤ 生命强化',desc:'每级 +8 最大生命',cost:n=>6+n*3,lv:META.maxHp,max:8},
    {k:'goldStart',name:'🪙 开局金币',desc:'每级 +5 金币',cost:n=>8+n*4,lv:META.goldStart,max:5}
  ];
  ups.forEach(u=>{const cost=u.cost(u.lv);const d=document.createElement('div');d.className='upgrade';d.innerHTML='<div><div class="u-name">'+u.name+' <span style="color:var(--gold)">Lv.'+u.lv+'</span></div><div class="u-desc">'+u.desc+'</div></div><div class="u-cost">'+starSVG()+'<span>'+cost+'</span></div>';if(META.star<cost||u.lv>=u.max)d.disabled=true;d.onclick=()=>{if(META.star>=cost&&u.lv<u.max){META.star-=cost;META[u.k]++;saveMeta();renderMeta();}};list.appendChild(d);});
  renderTalentTree();
}
/* 天赋树 UI：双分支面板，前置连线 + 节点卡片 */
function renderTalentTree(){
  const wrap=$('talentWrap');if(!wrap)return;
  wrap.innerHTML='';
  for(const b of TALENT_BRANCHES){
    const panel=document.createElement('div');panel.className='talent-panel';
    panel.style.setProperty('--tb',b.color);
    let html='<div class="talent-branch"><span class="tb-ico">'+b.icon+'</span>'+b.name+'</div>';
    const tierMap={};for(const n of b.nodes){const t=Math.max(0,...(n.prereq||[]).map(p=>{const pn=talentNode(p);return (tierMap[pn.id]||0)+1;}));tierMap[n.id]=t;n._tier=t;}
    const tiers=[];for(const n of b.nodes){const t=tierMap[n.id];(tiers[t]=tiers[t]||[]).push(n);}
    for(let t=0;t<tiers.length;t++){
      html+='<div class="talent-tier">';
      for(const n of tiers[t]){
        const lv=talentLv(n.id);const can=talentCanSpend(n);const locked=(lv===0&&(n.prereq||[]).some(p=>talentLv(p)<=0));
        const cls='talent-node'+(lv>0?' on':'')+(can?' can':'')+(locked?' lock':'');
        html+='<div class="'+cls+'" data-id="'+n.id+'"><div class="tn-top"><span class="tn-name">'+n.name+'</span><span class="tn-lv">Lv.'+lv+'/'+n.max+'</span></div><div class="tn-desc">'+n.desc+'</div><div class="tn-foot"><span class="tn-req">'+(locked?('🔒 '+(n.prereq||[]).map(p=>talentNode(p).name).join('、')):'')+'</span><span class="tn-cost">'+(lv>=n.max?'已满级':(can?(starSVG()+' '+talentCost(n)):('✨ '+talentCost(n))))+'</span></div></div>';
      }
      html+='</div>';
    }
    panel.innerHTML=html;
    panel.querySelectorAll('.talent-node').forEach(el=>{
      const id=el.dataset.id;const node=talentNode(id);const lv=talentLv(id);
      if(lv>0||!talentCanSpend(node))el.classList.add('no-click');
      el.addEventListener('click',()=>{if(talentCanSpend(node))spendTalent(id);});
    });
    wrap.appendChild(panel);
  }
}
function starSVG(){
  return '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.2l1.3-6.6L2.5 9l6.6-.8z"/></svg>';
}
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$('screen-'+id).classList.add('active');
  if(id==='meta')renderMeta();
  if(id==='review'){if(typeof renderReviewScreen==='function')renderReviewScreen();}
  if(id==='wrongbook'){if(typeof renderWrongBookScreen==='function')renderWrongBookScreen();}
  if(id==='map'&&typeof renderMap==='function')renderMap();
  if(id==='start'||id==='gamemenu'||id==='study'){if(typeof updateReviewBtn==='function')updateReviewBtn();}
  if(id==='gamemenu'&&typeof updateContinueBtn==='function')updateContinueBtn();
  // 返回主页/放弃按钮：仅战斗时显示
  const bh=$('btnHomeFloat');if(bh)bh.classList.toggle('hidden',!(id==='game'||id==='map'));
  const ba=$('btnAbandonFloat');if(ba)ba.classList.toggle('hidden',!(id==='game'||id==='map'));
  // 配乐按阶段切换
  if(id==='start'&&typeof playMusic==='function')playMusic('menu');
  if(id==='review'&&typeof playMusic==='function')playMusic('menu');
  if(id==='map'&&typeof playMusic==='function')playMusic('menu');
  if(id==='game'&&typeof playMusic==='function')playMusic('battle');
  if(id==='result'&&typeof playMusic==='function')playMusic('result');
  if((id==='game'||id==='start')&&typeof updatePotionBar==='function')updatePotionBar();
  if(id==='game'&&typeof renderRelicBar==='function')renderRelicBar();
  refreshIcons();
}


/* ============ 爬塔节点系统：奇遇 / 商店 / 休息处 ============ */
function nodeGiveGold(n){S.gold+=n;updateTop();toast('🪙 金币 '+(n>=0?'+'+n:n));}
function nodeGiveStar(n){META.star+=n;saveMeta();toast('✨ 星尘 '+(n>=0?'+'+n:n));}
function nodeGivePotion(key){
  if(typeof addPotion!=='function'){toast('🧪 获得药水');return true;}
  if(!addPotion(key)){toast('🧪 药水栏已满');return false;}
  return true;
}
function nodeDamage(n){S.hp=Math.max(1,S.hp-n);updatePlayer();toast('💔 生命 -'+n);}

function nodeDone(){
  const no=$('nodeOverlay');if(no)no.classList.remove('show');
  markNodeDone();
}
function renderNodeQuiz(q){
  const t=$('nodeTitle'),tx=$('nodeText'),ch=$('nodeChoices');
  t.textContent='📝 '+q.q;
  tx.textContent='选择你认为正确的答案：';
  ch.innerHTML='';
  const letters=['A','B','C','D'];
  q.opts.forEach((o,i)=>{
    const b=document.createElement('div');b.className='node-choice node-quiz';
    b.innerHTML='<span class="letter">'+letters[i]+'</span>'+o;
    b.onclick=()=>{
      if(typeof sfx==='function')sfx('button');
      ch.innerHTML='';
      if(i===q.ans){if(q.ok)q.ok();toast('✓ 回答正确！');}
      else{if(q.bad)q.bad();toast('✗ 回答错误');}
      setTimeout(()=>{nodeDone();},900);
    };
    ch.appendChild(b);
  });
}
function showEvent(ev){
  S.phase='node';
  const t=$('nodeTitle'),tx=$('nodeText'),ch=$('nodeChoices');
  t.textContent=ev.title;
  tx.textContent=ev.text;
  ch.innerHTML='';
  ev.choices.forEach((c,i)=>{
    const b=document.createElement('div');b.className='node-choice';
    b.innerHTML='<div class="nc-main">'+(i+1)+'. '+c.label+'</div>'+(c.tip?'<div class="nc-tip">'+c.tip+'</div>':'');
    b.onclick=()=>{
      if(typeof sfx==='function')sfx('button');
      if(c.quiz){renderNodeQuiz(c.quiz);}
      else{if(c.run&&c.run()===false)return;nodeDone();}
    };
    ch.appendChild(b);
  });
  const no=$('nodeOverlay');if(no)no.classList.add('show');
}
function showShop(){
  S.phase='node';
  const t=$('nodeTitle'),tx=$('nodeText'),ch=$('nodeChoices');
  t.textContent='🏪 尤利西斯商栈';
  tx.textContent='路边支着一顶绣金线的帐篷，店主叼着羽毛笔，面前的绒布上摆着几件发光的物件。';
  ch.innerHTML='';
  SHOP_ITEMS.forEach(item=>{
    const b=document.createElement('div');b.className='node-choice node-shop';
    b.dataset.price=item.price;
    b.innerHTML='<div class="nc-main">'+item.name+' <span class="price">'+item.price+' 金</span></div><div class="nc-tip">'+item.desc+'</div>';
    if(S.gold<item.price)b.classList.add('disabled');
    b.onclick=()=>{
      if(S.gold<item.price){toast('🪙 金币不够');return;}
      if(typeof sfx==='function')sfx('button');
      if(item.run&&item.run()===false)return;
      S.gold-=item.price;updateTop();
      ch.removeChild(b);
      ch.querySelectorAll('.node-shop').forEach(el=>el.classList.toggle('disabled',S.gold<Number(el.dataset.price)));
    };
    ch.appendChild(b);
  });
  const leave=document.createElement('button');leave.className='btn ghost node-leave';leave.textContent='离开商栈';
  leave.onclick=()=>{if(typeof sfx==='function')sfx('button');nodeDone();};
  ch.appendChild(leave);
  const no=$('nodeOverlay');if(no)no.classList.add('show');
}
function showRest(){
  S.phase='node';
  const t=$('nodeTitle'),tx=$('nodeText'),ch=$('nodeChoices');
  t.textContent='⛺ 篝火营地';
  tx.textContent='林间空地点着一堆篝火，木桩上摆着烤面包和热茶。你可以停下来休整片刻，或趁火光默诵今日的单词。';
  ch.innerHTML='';
  const hasDue=TIERS[S.tier].words.some(w=>isDueWord(S.tier,w.en));
  const opts=[
    {label:'🔥 在篝火旁休整',tip:'回复 '+Math.round(REST_HEAL*100)+'% 最大生命',run:()=>{
        const heal=Math.max(5,Math.round(S.maxHp*REST_HEAL));
        S.hp=Math.min(S.maxHp,S.hp+heal);toast('🔥 暖意传遍全身，生命 +'+heal);updatePlayer();}},
    {label:'📚 默诵今日单词',tip:hasDue?'复习一个到期词，答对得 2 星尘 +10 金币并计入结算':'当前没有到期词',run:()=>{if(!hasDue){toast('📚 当前没有到期词');return false;}return reviewOneDueWord();}},
    {label:'🌙 继续赶路',tip:'',run:()=>{}}
  ];
  opts.forEach((o,i)=>{
    const b=document.createElement('div');b.className='node-choice';
    b.innerHTML='<div class="nc-main">'+o.label+'</div>'+(o.tip?'<div class="nc-tip">'+o.tip+'</div>':'');
    b.onclick=()=>{
      if(typeof sfx==='function')sfx('button');
      const result=o.run?o.run():undefined;
      if(i===1){if(result===false)return;/* 复习题由 renderNodeQuiz 收尾 */}else{nodeDone();}
    };
    ch.appendChild(b);
  });
  const no=$('nodeOverlay');if(no)no.classList.add('show');
}
function reviewOneDueWord(){
  const words=TIERS[S.tier].words;
  let due=null;
  for(const w of shuffle(words)){if(isDueWord(S.tier,w.en)){due=w;break;}}
  if(!due){due=shuffle(words)[0];}
  const wasDue=isDueWord(S.tier,due.en);
  const dist=shuffle(words.filter(x=>x.en!==due.en));
  const p=[];for(const c of dist){if(!p.includes(c.cn)){p.push(c.cn);if(p.length>=3)break;}}
  while(p.length<3)p.push('其他释义'+(p.length+1));
  const opts=shuffle([due.cn,...p]);
  const ans=opts.indexOf(due.cn);
  renderNodeQuiz({
    q:'📚 复习：「'+due.en+'」的中文意思是？',
    opts,ans,
    ok:()=>{touchWord(S.tier,due.en,true);bumpReviewToday();if(wasDue){S.reviewDone=(S.reviewDone||0)+1;nodeGiveStar(2);}nodeGiveGold(10);},
    bad:()=>{touchWord(S.tier,due.en,false);bumpReviewToday();nodeGiveGold(5);toast('📚 温故知新，仍得 5 金币');}
  });
  return true;
}
/* ============ 网状爬塔地图（类杀戮尖塔） ============ */
function genMap(act){
  const W=MAP_ROW_W;
  const rows=[];
  for(let r=0;r<W.length;r++){
    const cols=[];
    for(let c=0;c<W[r];c++)cols.push({r,c,type:null,done:false});
    rows.push(cols);
  }
  // 类型分配：row0 全战斗，row6 Boss，中间 5 行随机池（每幕 7 层）
  rows[0].forEach(n=>n.type='battle');
  rows[6][0].type='boss';
  const t1=shuffle(['elite','rest','event','battle']);
  rows[1].forEach((n,i)=>n.type=t1[i]);
  const t2=shuffle(['elite','shop','event','battle']);
  rows[2].forEach((n,i)=>n.type=t2[i]);
  const t3=shuffle(['elite','treasure','event','battle']);
  rows[3].forEach((n,i)=>n.type=t3[i]);
  const t4=shuffle(['rest','shop','event','battle']);
  rows[4].forEach((n,i)=>n.type=t4[i]);
  const t5=shuffle(['treasure','elite','battle']);
  rows[5].forEach((n,i)=>n.type=t5[i]);
  // 连线：下层节点连到最近的上层节点（参考杀戮尖塔"连最近 3 房间"简化版）
  const edges=[];
  for(let r=0;r<W.length-1;r++){
    const up=W[r+1];
    for(let c=0;c<W[r];c++){
      const x=(c+0.5)/W[r];
      let c2=Math.round(x*up-0.5);
      c2=Math.max(0,Math.min(up-1,c2));
      edges.push([r,c,r+1,c2]);
      if(Math.random()<0.4){
        const c3=c2+(Math.random()<0.5?-1:1);
        if(c3>=0&&c3<up)edges.push([r,c,r+1,c3]);
      }
    }
    // 断路补连：上层每个节点保证至少一条入路
    for(let c2=0;c2<up;c2++){
      if(!edges.some(e=>e[2]===r+1&&e[3]===c2)){
        const y=(c2+0.5)/up;
        let bc=0,bd=9;
        for(let c=0;c<W[r];c++){const d=Math.abs((c+0.5)/W[r]-y);if(d<bd){bd=d;bc=c;}}
        edges.push([r,bc,r+1,c2]);
      }
    }
  }
  const outMap={};
  edges.forEach(e=>{const k=e[0]+'_'+e[1];(outMap[k]=outMap[k]||[]).push([e[2],e[3]]);});
  return {act,rows,edges,outMap};
}
function renderMap(){
  const svg=$('mapCanvas');if(!svg||!S.map)return;
  const M=S.map;
  // 头部：幕数 + 进度点
  const ae=$('mapAct');if(ae){
    let _dots='';
    for(let _i=1;_i<=BOSSES.length;_i++)_dots+='<span class="'+( _i<=(S.act||1)?'':'off')+'">●</span>';
    ae.innerHTML='第 '+(S.act||1)+' 幕 <span class="act-dots">'+_dots+'</span>';
  }
  const se=$('mapSub');
  if(se){
    if(S.mapRow===0&&S.mapCol===-1)se.textContent='选择路线，继续远征';
    else if(S.mapRow===MAP_ROW_W.length-2)se.textContent='Boss 就在前方';
    else if(S.mapRow===MAP_ROW_W.length-1)se.textContent='击败词灵，迈向下一幕';
    else se.textContent='选择路线，直抵塔顶';
  }
  const W=MAP_ROW_W,H=W.length;
  const padX=26,padY=16;
  const Wpx=320-padX*2,Hpx=560-padY*2;
  const pos=[];
  for(let r=0;r<H;r++){
    pos[r]=[];
    for(let c=0;c<W[r];c++){
      // ★ SVG y 轴向下，翻转行序：row0(第1层/起点)在最下，最后一行(Boss)在最上
      pos[r].push({x:padX+(c+0.5)*Wpx/W[r],y:padY+(H-1-r+0.5)*Hpx/H});
    }
  }
  let html='';
  M.edges.forEach(e=>{
    const a=pos[e[0]][e[1]],b=pos[e[2]][e[3]];
    const na=M.rows[e[0]][e[1]],nb=M.rows[e[2]][e[3]];
    const _done=!!(na.done&&nb.done);
    const mid=(a.y+b.y)/2;
    html+='<path d="M'+a.x.toFixed(1)+' '+a.y.toFixed(1)+' C'+a.x.toFixed(1)+' '+mid.toFixed(1)+','+b.x.toFixed(1)+' '+mid.toFixed(1)+','+b.x.toFixed(1)+' '+b.y.toFixed(1)+'" class="map-edge'+(_done?' done':'')+'"/>';
  });
  for(let r=0;r<H;r++){
    for(let c=0;c<W[r];c++){
      const n=M.rows[r][c];
      const p=pos[r][c];
      const re=isReachable(r,c);
      const cur=(r===S.mapRow&&c===S.mapCol);
      const isBoss=n.type==='boss';
      let cls='map-node';
      if(n.done)cls+=' done';
      if(cur)cls+=' cur';
      if(re)cls+=' reach';
      if(isBoss)cls+=' boss';
      const ico=n.done?'✓':(MAP_TYPE_ICON[n.type]||'?');
      const label=MAP_TYPE_NAME[n.type]||'';
      const bodyR=isBoss?31:25;
      const labelY=p.y+(isBoss?44:42);
      html+='<g class="'+cls+'" data-r="'+r+'" data-c="'+c+'">'+
        '<circle class="map-hit" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+(isBoss?40:33)+'"/>'+
        '<circle class="map-body" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="'+bodyR+'"/>'+
        '<text x="'+p.x.toFixed(1)+'" y="'+(p.y+6).toFixed(1)+'" text-anchor="middle" class="map-ico">'+ico+'</text>'+
        '<text x="'+p.x.toFixed(1)+'" y="'+labelY.toFixed(1)+'" text-anchor="middle" class="map-label">'+label+'</text>'+
        '</g>';
    }
  }
  svg.innerHTML=html;
  svg.querySelectorAll('g.map-node').forEach(g=>{
    g.addEventListener('click',()=>{
      const r=+g.dataset.r,c=+g.dataset.c;
      if(!isReachable(r,c))return;
      if(typeof sfx==='function')sfx('button');
      enterNode(r,c);
    });
  });
}
function isReachable(r,c){
  if(!S.map)return false;
  if(S.mapRow===0&&S.mapCol===-1)return r===0;
  if(r!==S.mapRow+1)return false;
  const key=S.mapRow+'_'+S.mapCol;
  const outs=S.map.outMap[key];
  return outs?outs.some(o=>o[0]===r&&o[1]===c):false;
}
function enterNode(r,c){
  const n=S.map&&S.map.rows[r]&&S.map.rows[r][c];
  if(!n)return;
  S.mapRow=r;S.mapCol=c;
  S.floor=(S.act-1)*7+r+1;
  if(typeof updateTop==='function')updateTop();
  switch(n.type){
    case 'battle':startNodeBattle(false);break;
    case 'elite':startNodeBattle(true);break;
    case 'boss':spawnBoss();break;
    case 'shop':showShop();break;
    case 'rest':showRest();break;
    case 'event':showEvent(pickEvent());break;
    case 'treasure':openTreasure();break;
    default:showRest();
  }
}
function startNodeBattle(isElite){
  S.turnCount=0;S.locked=false;S.enemyBuff=0;
  S.enemiesInFloor=1;
  showScreen('game');
  if(typeof updateFloorTag==='function')updateFloorTag();
  if(isElite){
    const idx=Math.min(ENEMIES.length-1,3+Math.floor((S.act||1)*1.6));
    const e=ENEMIES[idx];
    const hpMul=(DIFFS[S.diff].hpMul||2)*(1.7+S.floor*0.11);
    S.enemy={name:'精英·'+e.name,icon:e.icon,monster:e.monster,hp:Math.round(e.hp*hpMul),hpMax:Math.round(e.hp*hpMul),block:0,intents:e.intents,isBoss:false,isElite:true,goldGain:Math.round((22+S.floor*2.2)*1.6)};
    renderEnemy();updateEnemy();
    toast('💀 精英 '+S.enemy.name+' 拦路！');
    startTurn();
  }else{
    spawnNextEnemy();
  }
  if(typeof updateTop==='function')updateTop();
  if(typeof playMusic==='function')playMusic('battle');
}
function openTreasure(){
  S.phase='node';
  const t=$('nodeTitle'),tx=$('nodeText'),ch=$('nodeChoices');
  t.textContent='🎁 神秘宝箱';
  tx.textContent='一只覆着青苔的铁箱，锁扣微微弹开，里面透出微光。';
  ch.innerHTML='';
  const roll=Math.random();
  let label='';
  if(roll<0.35){const g=Math.round(12+S.floor*2);S.gold+=g;if(typeof updateTop==='function')updateTop();label='🪙 金币 +'+g;}
  else if(roll<0.6){const sd=Math.round(2+S.floor*0.6);nodeGiveStar(sd);label='✨ 星尘 +'+sd;}
  else if(roll<0.85){const rel=shuffle(RELICS.slice())[0];S.relics.push(rel);if(typeof renderRelicBar==='function')renderRelicBar();try{rel.apply();}catch(e){}label='💠 遗物：「'+rel.name+'」';}
  else{const k=randomPotion();if(addPotion(k)){label='🧪 药水：「'+POTIONS[k].name+'」';}else{const g=10;S.gold+=g;if(typeof updateTop==='function')updateTop();label='🪙 金币 +'+g;}}
  const b=document.createElement('div');b.className='node-choice';
  b.innerHTML='<div class="nc-main">'+label+'</div><div class="nc-tip">收起宝物，继续前行</div>';
  b.onclick=()=>{if(typeof sfx==='function')sfx('button');nodeDone();};
  ch.appendChild(b);
  const no=$('nodeOverlay');if(no)no.classList.add('show');
}
function markNodeDone(){
  const n=S.map&&S.map.rows[S.mapRow]&&S.map.rows[S.mapRow][S.mapCol];
  if(n&&!n.done)n.done=true;
  returnToMap();
}
function returnToMap(){
  S.phase='map';
  showScreen('map');
  if(typeof renderMap==='function')renderMap();
}
function pickEvent(){
  let idx=Math.floor(Math.random()*EVENT_POOL.length);
  if(S.lastEventId!==undefined&&EVENT_POOL.length>1){
    for(let g=0;g<8&&EVENT_POOL[idx].id===S.lastEventId;g++)idx=Math.floor(Math.random()*EVENT_POOL.length);
  }
  S.lastEventId=EVENT_POOL[idx].id;
  return EVENT_POOL[idx];
}


/* ============ 玩家自绘立绘渲染 + 攻防选项卡 ============ */
function renderPlayer(){
  const ic=$('playerIcon');if(!ic)return;
  ic.innerHTML=(typeof playerSVG==='function')?playerSVG(S.hero):'';
  const nm=$('pHeroName');if(nm&&HEROES[S.hero])nm.textContent=HEROES[S.hero].name;
  refreshIcons();
}
function refreshTab(){
  const d=$('tabDetail');if(!d)return;
  const isAtk=S.choice!=='def';
  const mul=isAtk?(S.atkMul||1):(S.defMul||1);
  const desc=$('tabDesc'),rate=$('tabRate');
  if(desc)desc.textContent=(isAtk?'答对造成伤害':'答对获得格挡')+(mul&&mul!==1?(' ×'+Math.round(mul*100)/100):'');
  if(rate)rate.textContent='~'+(isAtk?Math.round(ATK_RATE*(S.atkMul||1)):Math.round(DEF_RATE*(S.defMul||1)))+'/秒';
}

/* ============ 每日复习界面（主页独立入口，脱离远征） ============ */
const RV={words:[],idx:0,correct:0,wrong:0,star:0,rewardEligible:0,rewardCorrect:0,qType:'e2c',opts:[],ans:0,_locked:false};
function todayStr(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function findTierOf(en){for(const t in TIERS){if(TIERS[t].words.some(w=>w.en===en))return t;}return null;}
function bumpReviewToday(){const ts=todayStr();if(META.reviewDate!==ts){META.reviewDate=ts;META.reviewToday=0;}META.reviewToday=(META.reviewToday||0)+1;saveMeta();}
function masterWordCount(){let n=0;for(const t in TIERS){for(const w of TIERS[t].words){const r=wordRec(t,w.en);if(r&&r.mastery>=3&&r.iv>=7)n++;}}return n;}
function gatherReviewWords(max){
  max=max||10;
  const now=Date.now();
  const learned=[];
  for(const t in TIERS){for(const w of TIERS[t].words){const r=wordRec(t,w.en);if(!r)continue;learned.push({w,tier:t,r});}}
  // ★ 复习只针对「学习过的词」：到期优先 → 错词 → 其余学过词（不再从全词库兜底）
  const dues=learned.filter(x=>x.r.due>0&&x.r.due<=now);
  const wrongs=learned.filter(x=>!(x.r.due>0&&x.r.due<=now)&&(x.r.wrongs||0)>0);
  const rest=learned.filter(x=>!(x.r.due>0&&x.r.due<=now)&&(x.r.wrongs||0)<=0);
  const pool=[...shuffle(dues).map(x=>({...x,rewardEligible:true})),...shuffle(wrongs).map(x=>({...x,rewardEligible:false})),...shuffle(rest).map(x=>({...x,rewardEligible:false}))];
  return pool.slice(0,max).map(x=>({w:x.w,tier:x.tier,rewardEligible:x.rewardEligible}));
}
function learnedWordCount(){let n=0;for(const t in TIERS){for(const w of TIERS[t].words){if(wordRec(t,w.en))n++;}}return n;}
function renderReviewScreen(){
  const h=$('reviewHero');if(!h)return;
  h.innerHTML='<div class="rv-row"><span class="rv-k">今日到期</span><span class="rv-v">'+dueWordsCount()+' 词</span></div>'+
    '<div class="rv-row"><span class="rv-k">已学习</span><span class="rv-v">'+learnedWordCount()+' 词</span></div>'+
    '<div class="rv-row"><span class="rv-k">今日已复习</span><span class="rv-v">'+(META.reviewToday||0)+' 词</span></div>'+
    '<div class="rv-row"><span class="rv-k">累计掌握</span><span class="rv-v">'+masterWordCount()+' 词</span></div>'+
    '<div class="rv-desc">按记忆间隔复习学习过的词汇，到期词首次答对 +1 星尘，全对另有奖励。</div>';
  updateReviewBtn();
}
/* ---- 错题本页渲染（独立页） ---- */
function renderWrongBookScreen(){
  if(typeof renderWrongBook==='function')renderWrongBook();
  if(typeof updateReviewBtn==='function')updateReviewBtn();
}
function updateReviewBtn(){
  const b=$('btnReview');if(b){const due=dueWordsCount();b.textContent='📚 复习单词'+(due>0?'（'+due+'）':'');}
  const bw=$('btnWrongBook');if(bw){const n=wrongBookWords().length;bw.textContent='📕 错题本'+(n>0?'（'+n+'）':'');}
}
/* ---- 错题本：所有答错过的词（全局记录，独立栏目） ---- */
function wrongBookWords(){
  const list=[];
  for(const t in TIERS){for(const w of TIERS[t].words){const r=wordRec(t,w.en);if(r&&(r.wrongs||0)>0)list.push({w,tier:t,wrongs:r.wrongs});}}
  return list.sort((a,b)=>b.wrongs-a.wrongs);
}
function renderWrongBook(){
  const box=$('wrongList');if(!box)return;
  const list=wrongBookWords();
  const hd=$('wrongSummary');
  if(hd){hd.innerHTML='<div class="rv-row"><span class="rv-k">错题总数</span><span class="rv-v">'+list.length+' 词</span></div><div class="rv-desc">按错误次数排序 · 答对一次减少一次错误，归零后自动移出错题本。</div>';}
  if(!list.length){box.innerHTML='<div class="rv-done" style="font-size:18px;padding:16px 0;">🎉 暂无错题，继续保持！</div>';return;}
  box.innerHTML=list.map((it,i)=>{
    const w=it.w;
    return '<div class="wb-row"><div class="wb-l"><div class="wb-en">'+(i+1)+'. '+w.en+' <span class="wb-pos">'+w.pos+'</span></div><div class="wb-cn">'+w.cn+'</div></div><div class="wb-bad">❌ ×'+it.wrongs+'</div></div>';
  }).join('');
}
function startWrongReview(){
  const list=wrongBookWords();
  if(!list.length){toast('🎉 错题本空空如也');return;}
  const pool=[];
  for(const it of list){const n=Math.min(3,it.wrongs);for(let i=0;i<n;i++)pool.push({w:it.w,tier:it.tier,rewardEligible:false});}
  RV.words=shuffle(pool).slice(0,10);
  RV.idx=0;RV.correct=0;RV.wrong=0;RV.star=0;RV.rewardEligible=0;RV.rewardCorrect=0;RV._locked=false;
  openReviewQuestion();
}
function startReview(){
  RV.words=gatherReviewWords(10);
  if(!RV.words.length){toast('还没有学习过的单词，先开始远征学习吧！');return;}
  RV.idx=0;RV.correct=0;RV.wrong=0;RV.star=0;RV.rewardEligible=RV.words.filter(x=>x.rewardEligible).length;RV.rewardCorrect=0;RV._locked=false;
  openReviewQuestion();
}
function openReviewQuestion(){
  if(RV.idx>=RV.words.length){finishReview();return;}
  const item=RV.words[RV.idx],w=item.w;
  RV.qType=Math.random()<.5?'e2c':'c2e';
  const tier=item.tier||findTierOf(w.en)||'ket';
  const used=shuffle(TIERS[tier].words.filter(x=>x.en!==w.en));
  const p=[];let pick;
  if(RV.qType==='e2c'){for(const c of used){if(!p.includes(c.cn)&&c.cn!==w.cn){p.push(c.cn);if(p.length>=3)break;}}while(p.length<3)p.push('其他释义'+(p.length+1));pick=w.cn;}
  else{for(const c of used){if(!p.includes(c.en)){p.push(c.en);if(p.length>=3)break;}}while(p.length<3)p.push('word'+(p.length+1));pick=w.en;}
  const opts=shuffle([pick,...p]);
  RV.opts=opts;RV.ans=opts.indexOf(pick);
  $('rqType').textContent=RV.qType==='e2c'?'英→中':'中→英';
  $('rqPos').textContent=w.pos||'';
  $('rqHint').textContent=RV.qType==='e2c'?('选择「'+w.en+'」的释义'):('选择「'+w.cn+'」对应的单词');
  $('rqWord').textContent=RV.qType==='e2c'?w.en:w.cn;
  $('rqProg').textContent=(RV.idx+1)+'/'+RV.words.length;
  const box=$('rqOptions');box.innerHTML='';const letters=['A','B','C','D'];
  RV.opts.forEach((o,i)=>{const b=document.createElement('div');b.className='opt';b.innerHTML='<span class="letter">'+letters[i]+'</span>'+o;b.onclick=()=>reviewAnswer(i,b);box.appendChild(b);});
  $('rqFeedback').textContent='';$('rqFeedback').className='';
  const q=$('reviewQuiz');if(q)q.classList.add('show');
}
function reviewAnswer(i,el){
  if(RV._locked)return;RV._locked=true;
  const box=$('rqOptions');
  [...box.children].forEach(b=>b.disabled=true);
  const item=RV.words[RV.idx],w=item.w;
  const btns=[...box.children];
  const rightBtn=btns[RV.ans];
  const isRight=RV.opts[i]===RV.opts[RV.ans];
  if(isRight){if(rightBtn)rightBtn.classList.add('correct');}
  else{el.classList.add('wrong');if(rightBtn)rightBtn.classList.add('correct');}
  touchWord(item.tier,w.en,isRight);
  bumpReviewToday();
  if(isRight){RV.correct++;if(item.rewardEligible){RV.star++;RV.rewardCorrect++;}}
  else{RV.wrong++;}
  $('rqFeedback').textContent=isRight?('✓ 正确'+(item.rewardEligible?' · +1 星尘':'')):('✗ 答错，正确：'+(RV.qType==='e2c'?w.cn:w.en));
  $('rqFeedback').className=isRight?'ok':'bad';
  setTimeout(()=>{RV._locked=false;RV.idx++;openReviewQuestion();},800);
}
function finishReview(){
  const q=$('reviewQuiz');if(q)q.classList.remove('show');
  if(RV.wrong===0&&RV.rewardEligible>=5&&RV.rewardCorrect===RV.rewardEligible)RV.star+=3;
  META.star+=RV.star;saveMeta();
  const h=$('reviewHero');if(h){
    h.innerHTML='<div class="rv-done">复习完成！</div>'+
      '<div class="rv-row"><span class="rv-k">答对 / 答错</span><span class="rv-v">'+RV.correct+' / '+RV.wrong+'</span></div>'+
      '<div class="rv-row"><span class="rv-k">获得星尘</span><span class="rv-v">✨ +'+RV.star+'</span></div>'+
      '<div class="rv-desc">今日已复习 '+(META.reviewToday||0)+' 词，明日再来巩固！</div>';
  }
  if(typeof sfx==='function')sfx('victory');
  toast('📚 复习完成 +'+RV.star+' 星尘');
  updateReviewBtn();
  if(typeof renderWrongBook==='function')renderWrongBook();
}
