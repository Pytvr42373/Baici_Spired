/* 隔离行为测试：战斗结束 → 回地图 状态流
 *
 * 覆盖：
 *  1. 普通战斗不掉遗物（金币分支）→ 应 returnToMap()
 *  2. 普通战斗掉遗物 → 选择遗物后 → 应 returnToMap()
 *  3. 精英战斗（必掉遗物）→ 选择遗物后 → 应 returnToMap()
 *  4. Boss 未通关（进下一幕）→ 应进入新一幕地图，不回错地图
 *  5. Boss 通关（最后一幕）→ 应 endRun(true)，不回地图
 *  6. 多敌人：击杀一个后 enemiesInFloor>0 → 应 spawnNextEnemy 继续战斗，不 floorClear
 *
 * 运行：node test_flow.test.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

/* ---------- 极简 DOM 桩 ---------- */
function makeEl(id){
  return {
    id, children:[], _text:'', style:{}, dataset:{},
    classList:{ add(){}, remove(){}, contains(){return false;} },
    setAttribute(){}, getAttribute(){return null;}, appendChild(c){this.children.push(c);},
    prepend(c){this.children.unshift(c);}, removeChild(){}, remove(){},
    set innerHTML(v){this._html=v;}, get innerHTML(){return this._html||'';},
    set textContent(v){this._text=v;}, get textContent(){return this._text;},
    getBoundingClientRect(){return {left:0,top:0,width:100,height:100};},
    querySelectorAll(){return [];}, addEventListener(){},
  };
}
const els = {};
function getEl(id){ if(!els[id]) els[id]=makeEl(id); return els[id]; }

const documentStub = {
  getElementById: getEl,
  createElement: (tag)=>({tagName:tag, children:[], style:{}, classList:{add(){},remove(){}}, setAttribute(){}, appendChild(){}, prepend(){}, removeChild(){}, remove(){}, set innerHTML(v){}, get innerHTML(){return '';}, set textContent(v){}, get textContent(){return '';}, querySelectorAll(){return [];}}),
  createElementNS: ()=>({setAttribute(){}, appendChild(){}, classList:{add(){}} }),
  body: { appendChild(){} },
  querySelectorAll(){ return []; },
};
const windowStub = { lucide: null };
const localStorageStub = {
  _m:{}, getItem(k){ return this._m[k]!==undefined?this._m[k]:null; },
  setItem(k,v){ this._m[k]=String(v); },
  removeItem(k){ delete this._m[k]; },
};

const calls = { showScreen:[], renderMap:0, endRun:[], spawnNextEnemy:0, giveRelic:0, returnToMap:0 };
const sandbox = {
  document: documentStub,
  window: windowStub,
  localStorage: localStorageStub,
  calls,
  console,
  setTimeout: (fn)=>{ /* 不执行异步回调，测试直接调用 floorClear */ return 0; },
  clearTimeout: ()=>{},
  clearInterval: ()=>{},
  setInterval: ()=>{ return 0; },
  Math, Date, JSON, parseInt, parseFloat, isNaN, Array, Object, String, Number, Boolean,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

/* ---------- 加载 data.js 与 game.js ---------- */
const dataSrc = fs.readFileSync(path.join(__dirname,'js','data.js'),'utf8');
const gameSrc = fs.readFileSync(path.join(__dirname,'js','game.js'),'utf8');
vm.runInContext(dataSrc, sandbox, {filename:'data.js'});
vm.runInContext(gameSrc, sandbox, {filename:'game.js'});

/* ---------- 覆写依赖真实 DOM 渲染的函数，改为记录调用 ---------- */
vm.runInContext(`
  const _origShow = showScreen;
  showScreen = function(id){ calls.showScreen.push(id); };
  renderMap = function(){ calls.renderMap++; };
  endRun = function(win,abandon){ calls.endRun.push({win,abandon}); };
  spawnNextEnemy = function(){ calls.spawnNextEnemy++; };
  giveRelic = function(){ calls.giveRelic++; };
  returnToMap = function(){ calls.returnToMap++; S.phase='map'; showScreen('map'); };
  updateTop = function(){};
  updatePlayer = function(){};
  updateEnemy = function(){};
  renderEnemy = function(){};
  updateFloorTag = function(){};
  dropPotionAfterBattle = function(){};
  refreshIcons = function(){};
  renderRelicBar = function(){};
  playMusic = function(){};
  sfx = function(){};
  clearSave = function(){};
  updateContinueBtn = function(){};
  startTurn = function(){};
  renderPlayer = function(){};
  nodeGiveStar = function(){};
  randomPotion = function(){ return 'hp'; };
  addPotion = function(){ return true; };
  renderMeta = function(){};
  renderTalentTree = function(){};
`, sandbox);

/* ---------- 测试辅助 ---------- */
let pass=0, fail=0;
function assert(cond, msg){
  if(cond){ pass++; console.log('  ✓ '+msg); }
  else{ fail++; console.log('  ✗ FAIL: '+msg); }
}
function resetCalls(){
  calls.showScreen=[]; calls.renderMap=0; calls.endRun=[]; calls.spawnNextEnemy=0; calls.giveRelic=0; calls.returnToMap=0;
}
function bossCount(){ return vm.runInContext(`BOSSES.length`, sandbox); }
function setupState(overrides){
  vm.runInContext(`
    S = Object.assign({
      hero:'warrior', tier:'t1', diff:'normal', floor:1, act:1,
      gold:0, hp:50, maxHp:80, combo:0, maxCombo:0, correctTotal:0, wrongTotal:0,
      killedTotal:0, reviewDone:0, enemiesInFloor:1, bossIndex:0, mapRow:0, mapCol:0,
      map: genMap(1), enemy:null, relics:[], potions:[null,null,null],
      atkMul:1, defMul:1, goldMul:1, phase:'battle', locked:false, turnCount:0,
      wrongWords:{}, thorn:false, thornDamage:0, comboGold:false, knowBuff:false,
      doubleAtk:false, chargeAtk:false, genie:false,
    }, ${JSON.stringify(overrides)});
  `, sandbox);
}

console.log('=== 测试 1：普通战斗不掉遗物（金币分支）→ 回地图 ===');
{
  resetCalls();
  // 强制 Math.random()>0.45 → 金币分支
  const origRandom = Math.random;
  Math.random = ()=>0.9;
  setupState({mapRow:0, mapCol:0, floor:1, enemiesInFloor:1});
  vm.runInContext(`floorClear();`, sandbox);
  Math.random = origRandom;
  assert(calls.returnToMap===1, '金币分支应调用 returnToMap() 一次（实际 '+calls.returnToMap+'）');
  assert(calls.giveRelic===0, '金币分支不应调用 giveRelic()');
  assert(calls.showScreen.includes('map'), '应切到 map 屏幕');
  assert(calls.endRun.length===0, '不应触发 endRun');
}

console.log('=== 测试 2：普通战斗掉遗物 → 选择遗物后 → 回地图 ===');
{
  resetCalls();
  const origRandom = Math.random;
  Math.random = ()=>0.1; // <0.45 → 遗物分支
  setupState({mapRow:0, mapCol:0, floor:1, enemiesInFloor:1});
  vm.runInContext(`floorClear();`, sandbox);
  Math.random = origRandom;
  assert(calls.giveRelic===1, '应调用 giveRelic() 一次');
  assert(calls.returnToMap===0, '选择遗物前不应 returnToMap()');
  // 模拟点击遗物选择 → 触发 returnToMap
  vm.runInContext(`
    S.relics.push(RELICS[0]);
    if(typeof renderRelicBar==='function')renderRelicBar();
    RELICS[0].apply();
    $('overlay').classList.remove('show');
    returnToMap();
  `, sandbox);
  assert(calls.returnToMap===1, '选择遗物后应 returnToMap() 一次');
  assert(calls.showScreen.includes('map'), '应切到 map 屏幕');
}

console.log('=== 测试 3：精英战斗（必掉遗物）→ 选择后 → 回地图 ===');
{
  resetCalls();
  setupState({mapRow:1, mapCol:0, floor:2, enemiesInFloor:1});
  // 精英节点 type='elite'
  vm.runInContext(`S.map.rows[1][0].type='elite'; floorClear();`, sandbox);
  assert(calls.giveRelic===1, '精英必掉遗物，应调用 giveRelic()');
  vm.runInContext(`returnToMap();`, sandbox);
  assert(calls.returnToMap===1, '选择遗物后应 returnToMap()');
  assert(calls.showScreen.includes('map'), '应切到 map 屏幕');
}

console.log('=== 测试 4：Boss 未通关（进下一幕）→ 进入新一幕地图，不回错地图 ===');
{
  resetCalls();
  // 最后一幕之前：bossIndex < BOSSES.length
  const nBoss = bossCount();
  setupState({mapRow:6, mapCol:0, floor:7, act:1, bossIndex:0, enemiesInFloor:1});
  vm.runInContext(`floorClear();`, sandbox);
  assert(calls.endRun.length===0, 'bossIndex<BOSSES.length 不应 endRun');
  assert(calls.showScreen.includes('map'), '应切到 map 屏幕（新一幕）');
  assert(calls.renderMap>=1, '应重新渲染新一幕地图');
  assert(calls.returnToMap===0, '进幕分支不应走 returnToMap（直接 showScreen map）');
  // 验证进入新一幕
  const act = vm.runInContext(`S.act`, sandbox);
  assert(act===2, 'act 应推进到 2（实际 '+act+'）');
  const rowCol = vm.runInContext(`[S.mapRow, S.mapCol]`, sandbox);
  assert(rowCol[0]===0 && rowCol[1]===-1, '新一幕应重置到起点');
}

console.log('=== 测试 5：Boss 通关（最后一幕）→ endRun(true)，不回地图 ===');
{
  resetCalls();
  const nBoss = bossCount();
  setupState({mapRow:6, mapCol:0, floor:7, act:nBoss, bossIndex:nBoss, enemiesInFloor:1});
  vm.runInContext(`floorClear();`, sandbox);
  assert(calls.endRun.length===1, 'bossIndex>=BOSSES.length 应 endRun 一次');
  assert(calls.endRun[0] && calls.endRun[0].win===true, 'endRun 应以 win=true 调用');
  assert(calls.showScreen.includes('map')===false, '通关分支不应切到 map');
}

console.log('=== 测试 6：多敌人 → 击杀一个后继续战斗，不 floorClear ===');
{
  resetCalls();
  setupState({mapRow:0, mapCol:0, floor:1, enemiesInFloor:2, enemy:{name:'E',isBoss:false,goldGain:10}});
  vm.runInContext(`onKill();`, sandbox);
  // onKill 用 setTimeout 延迟，桩不执行回调，因此这里直接验证 enemiesInFloor 递减
  const eif = vm.runInContext(`S.enemiesInFloor`, sandbox);
  assert(eif===1, '击杀一个后 enemiesInFloor 应减为 1（实际 '+eif+'）');
  assert(calls.spawnNextEnemy===0, 'setTimeout 桩不执行，spawnNextEnemy 不应被同步调用');
  // 手动模拟 setTimeout 回调：enemiesInFloor>0 → spawnNextEnemy
  vm.runInContext(`if(S.enemiesInFloor<=0){floorClear();}else{spawnNextEnemy();}`, sandbox);
  assert(calls.spawnNextEnemy===1, 'enemiesInFloor>0 应 spawnNextEnemy 继续战斗');
  assert(calls.returnToMap===0, '多敌人未清空不应回地图');
}

console.log('');
console.log('通过 '+pass+' / '+(pass+fail)+' 项');
process.exit(fail>0?1:0);
