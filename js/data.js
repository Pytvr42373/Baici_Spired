/* ============================================================
   《词域远征》 数据层 (data.js)
   TIERS / HEROES / DIFFS / ENEMIES / BOSSES / RELICS
   POTIONS / SFX / MUSIC / MONSTER_SVGS
============================================================ */

/* ============ KET 词库 ============ */
const TIERS={ket:{name:"KET",words:[
  {en:"able",cn:"能够的",pos:"adj."},{en:"about",cn:"关于；大约",pos:"prep./adv."},{en:"above",cn:"在……上面",pos:"prep."},
  {en:"across",cn:"穿过",pos:"prep."},{en:"afraid",cn:"害怕的",pos:"adj."},{en:"after",cn:"在……之后",pos:"prep./conj."},
  {en:"again",cn:"再一次",pos:"adv."},{en:"agree",cn:"同意",pos:"v."},{en:"airport",cn:"机场",pos:"n."},
  {en:"always",cn:"总是",pos:"adv."},{en:"answer",cn:"回答；答案",pos:"v./n."},{en:"arrive",cn:"到达",pos:"v."},
  {en:"ask",cn:"问；请求",pos:"v."},{en:"back",cn:"后面；返回",pos:"adv./n."},{en:"bad",cn:"坏的",pos:"adj."},
  {en:"bag",cn:"包；袋子",pos:"n."},{en:"bank",cn:"银行",pos:"n."},{en:"beautiful",cn:"美丽的",pos:"adj."},
  {en:"because",cn:"因为",pos:"conj."},{en:"become",cn:"变成",pos:"v."},{en:"before",cn:"在……之前",pos:"prep./conj."},
  {en:"begin",cn:"开始",pos:"v."},{en:"behind",cn:"在……后面",pos:"prep."},{en:"believe",cn:"相信",pos:"v."},
  {en:"between",cn:"在……之间",pos:"prep."},{en:"big",cn:"大的",pos:"adj."},{en:"bike",cn:"自行车",pos:"n."},
  {en:"boring",cn:"无聊的",pos:"adj."},{en:"borrow",cn:"借入",pos:"v."},{en:"both",cn:"两者都",pos:"det./pron."},
  {en:"break",cn:"打破；休息",pos:"v./n."},{en:"breakfast",cn:"早餐",pos:"n."},{en:"bring",cn:"带来",pos:"v."},
  {en:"build",cn:"建造",pos:"v."},{en:"busy",cn:"忙碌的",pos:"adj."},{en:"buy",cn:"买",pos:"v."},
  {en:"call",cn:"打电话；称呼",pos:"v."},{en:"carry",cn:"携带",pos:"v."},{en:"catch",cn:"抓住",pos:"v."},
  {en:"change",cn:"改变；零钱",pos:"v./n."},{en:"cheap",cn:"便宜的",pos:"adj."},{en:"choose",cn:"选择",pos:"v."},
  {en:"classroom",cn:"教室",pos:"n."},{en:"clean",cn:"干净的；打扫",pos:"adj./v."},{en:"clever",cn:"聪明的",pos:"adj."},
  {en:"climb",cn:"爬",pos:"v."},{en:"close",cn:"关闭；近的",pos:"v./adj."},{en:"cloudy",cn:"多云的",pos:"adj."},
  {en:"coat",cn:"外套",pos:"n."},{en:"cold",cn:"冷的；感冒",pos:"adj./n."},{en:"college",cn:"大学；学院",pos:"n."},
  {en:"come",cn:"来",pos:"v."},{en:"cook",cn:"做饭；厨师",pos:"v./n."},{en:"country",cn:"国家；乡村",pos:"n."},
  {en:"course",cn:"课程；路线",pos:"n."},{en:"customer",cn:"顾客",pos:"n."},{en:"cut",cn:"切；割",pos:"v."},
  {en:"dangerous",cn:"危险的",pos:"adj."},{en:"decide",cn:"决定",pos:"v."},{en:"delicious",cn:"美味的",pos:"adj."},
  {en:"different",cn:"不同的",pos:"adj."},{en:"difficult",cn:"困难的",pos:"adj."},{en:"dinner",cn:"晚餐",pos:"n."},
  {en:"direction",cn:"方向",pos:"n."},{en:"doctor",cn:"医生",pos:"n."},{en:"draw",cn:"画",pos:"v."},
  {en:"early",cn:"早的",pos:"adj./adv."},{en:"easy",cn:"容易的",pos:"adj."},{en:"eat",cn:"吃",pos:"v."},
  {en:"else",cn:"其他的",pos:"adv."},{en:"empty",cn:"空的",pos:"adj."},{en:"enough",cn:"足够的",pos:"adj./adv."},
  {en:"every",cn:"每一个",pos:"det."},{en:"exam",cn:"考试",pos:"n."},{en:"exercise",cn:"锻炼；练习",pos:"n./v."},
  {en:"expensive",cn:"昂贵的",pos:"adj."},{en:"explain",cn:"解释",pos:"v."},{en:"famous",cn:"著名的",pos:"adj."},
  {en:"favourite",cn:"最喜欢的",pos:"adj."},{en:"feel",cn:"感觉",pos:"v."},{en:"few",cn:"很少的",pos:"det./adj."},
  {en:"finish",cn:"完成",pos:"v."},{en:"floor",cn:"地板；楼层",pos:"n."},{en:"follow",cn:"跟随",pos:"v."},
  {en:"forget",cn:"忘记",pos:"v."},{en:"free",cn:"自由的；免费的",pos:"adj."},{en:"fresh",cn:"新鲜的",pos:"adj."},
  {en:"fruit",cn:"水果",pos:"n."},{en:"future",cn:"未来",pos:"n."},{en:"game",cn:"游戏",pos:"n."},
  {en:"garden",cn:"花园",pos:"n."},{en:"give",cn:"给",pos:"v."},{en:"glass",cn:"玻璃；玻璃杯",pos:"n."},
  {en:"go",cn:"去",pos:"v."},{en:"ground",cn:"地面",pos:"n."},{en:"guess",cn:"猜测",pos:"v./n."},
  {en:"half",cn:"一半",pos:"n./adj."},{en:"happen",cn:"发生",pos:"v."},{en:"hard",cn:"困难的；坚硬的",pos:"adj."},
  {en:"headache",cn:"头痛",pos:"n."},{en:"healthy",cn:"健康的",pos:"adj."},{en:"heavy",cn:"重的",pos:"adj."},
  {en:"help",cn:"帮助",pos:"v./n."},{en:"holiday",cn:"假期",pos:"n."},{en:"homework",cn:"家庭作业",pos:"n."},
  {en:"hope",cn:"希望",pos:"v./n."},{en:"hungry",cn:"饥饿的",pos:"adj."},{en:"important",cn:"重要的",pos:"adj."},
  {en:"invite",cn:"邀请",pos:"v."},{en:"journey",cn:"旅程",pos:"n."},{en:"keep",cn:"保持；保留",pos:"v."},
  {en:"key",cn:"钥匙；关键",pos:"n./adj."},{en:"know",cn:"知道",pos:"v."},{en:"learn",cn:"学习",pos:"v."},
  {en:"leave",cn:"离开",pos:"v."},{en:"lend",cn:"借出",pos:"v."},{en:"library",cn:"图书馆",pos:"n."},
  {en:"light",cn:"光；轻的",pos:"n./adj."},{en:"lose",cn:"丢失；输",pos:"v."},{en:"lucky",cn:"幸运的",pos:"adj."},
  {en:"lunch",cn:"午餐",pos:"n."},{en:"map",cn:"地图",pos:"n."},{en:"medicine",cn:"药；医学",pos:"n."},
  {en:"meeting",cn:"会议",pos:"n."},{en:"menu",cn:"菜单",pos:"n."},{en:"message",cn:"消息",pos:"n."},
  {en:"minute",cn:"分钟",pos:"n."},{en:"money",cn:"钱",pos:"n."},{en:"mountain",cn:"山",pos:"n."},
  {en:"move",cn:"移动",pos:"v."},{en:"museum",cn:"博物馆",pos:"n."},{en:"need",cn:"需要",pos:"v."},
  {en:"noise",cn:"噪音",pos:"n."},{en:"often",cn:"经常",pos:"adv."},{en:"only",cn:"仅仅；唯一的",pos:"adv./adj."},
  {en:"open",cn:"打开；开着的",pos:"v./adj."},{en:"order",cn:"点餐；订单；顺序",pos:"v./n."},{en:"own",cn:"自己的；拥有",pos:"adj./v."},
  {en:"pack",cn:"打包",pos:"v."},{en:"paper",cn:"纸；报纸",pos:"n."},{en:"pass",cn:"通过；传递",pos:"v."},
  {en:"pay",cn:"支付",pos:"v."},{en:"people",cn:"人们",pos:"n."},{en:"perhaps",cn:"也许",pos:"adv."},
  {en:"phone",cn:"电话",pos:"n./v."},{en:"picture",cn:"图片",pos:"n."},{en:"place",cn:"地方",pos:"n."},
  {en:"play",cn:"玩；演奏",pos:"v."},{en:"please",cn:"请；取悦",pos:"int./v."},{en:"police",cn:"警察",pos:"n."},
  {en:"possible",cn:"可能的",pos:"adj."},{en:"prefer",cn:"更喜欢",pos:"v."},{en:"price",cn:"价格",pos:"n."},
  {en:"problem",cn:"问题",pos:"n."},{en:"promise",cn:"承诺",pos:"v./n."},{en:"proud",cn:"自豪的",pos:"adj."},
  {en:"quiet",cn:"安静的",pos:"adj."},{en:"rain",cn:"雨；下雨",pos:"n./v."},{en:"remember",cn:"记得",pos:"v."},
  {en:"repair",cn:"修理",pos:"v."},{en:"repeat",cn:"重复",pos:"v."},{en:"rest",cn:"休息",pos:"n./v."},
  {en:"return",cn:"返回；归还",pos:"v."},{en:"ride",cn:"骑",pos:"v."},{en:"right",cn:"正确的；右边",pos:"adj./n."},
  {en:"ring",cn:"戒指；铃声",pos:"n."},{en:"road",cn:"道路",pos:"n."},{en:"save",cn:"节省；拯救",pos:"v."},
  {en:"school",cn:"学校",pos:"n."},{en:"season",cn:"季节",pos:"n."},{en:"sell",cn:"卖",pos:"v."},
  {en:"send",cn:"发送",pos:"v."},{en:"shop",cn:"商店；购物",pos:"n./v."},{en:"shopping",cn:"购物",pos:"n."},
  {en:"short",cn:"短的；矮的",pos:"adj."},{en:"show",cn:"展示",pos:"v."},{en:"sick",cn:"生病的",pos:"adj."},
  {en:"simple",cn:"简单的",pos:"adj."},{en:"sing",cn:"唱歌",pos:"v."},{en:"sleep",cn:"睡觉",pos:"v./n."},
  {en:"slow",cn:"慢的",pos:"adj."},{en:"small",cn:"小的",pos:"adj."},{en:"snow",cn:"雪；下雪",pos:"n./v."},
  {en:"sometimes",cn:"有时",pos:"adv."},{en:"soon",cn:"很快",pos:"adv."},{en:"special",cn:"特别的",pos:"adj."},
  {en:"station",cn:"车站",pos:"n."},{en:"straight",cn:"径直地；直的",pos:"adv./adj."},{en:"strange",cn:"奇怪的",pos:"adj."},
  {en:"strong",cn:"强壮的",pos:"adj."},{en:"subject",cn:"学科；主题",pos:"n."},{en:"suggest",cn:"建议",pos:"v."},
  {en:"summer",cn:"夏天",pos:"n."},{en:"sunny",cn:"晴朗的",pos:"adj."},{en:"surprise",cn:"惊喜；使惊讶",pos:"n./v."},
  {en:"sweet",cn:"甜的；糖果",pos:"adj./n."},{en:"swim",cn:"游泳",pos:"v."},{en:"table",cn:"桌子；表格",pos:"n."},
  {en:"take",cn:"拿；乘坐",pos:"v."},{en:"teach",cn:"教",pos:"v."},{en:"teacher",cn:"老师",pos:"n."},
  {en:"tell",cn:"告诉",pos:"v."},{en:"ticket",cn:"票",pos:"n."},{en:"tired",cn:"累的",pos:"adj."},
  {en:"together",cn:"一起",pos:"adv."},{en:"tomorrow",cn:"明天",pos:"adv./n."},{en:"train",cn:"火车；训练",pos:"n./v."},
  {en:"travel",cn:"旅行",pos:"v./n."},{en:"trouble",cn:"麻烦",pos:"n."},{en:"true",cn:"真实的",pos:"adj."},
  {en:"try",cn:"尝试",pos:"v."},{en:"turn",cn:"转动；轮流",pos:"v./n."},{en:"umbrella",cn:"雨伞",pos:"n."},
  {en:"understand",cn:"理解",pos:"v."},{en:"useful",cn:"有用的",pos:"adj."},{en:"usual",cn:"通常的",pos:"adj."},
  {en:"vegetable",cn:"蔬菜",pos:"n."},{en:"visit",cn:"参观；拜访",pos:"v."},{en:"wait",cn:"等待",pos:"v."},
  {en:"walk",cn:"走路",pos:"v./n."},{en:"want",cn:"想要",pos:"v."},{en:"warm",cn:"温暖的",pos:"adj."},
  {en:"wash",cn:"洗",pos:"v."},{en:"weather",cn:"天气",pos:"n."},{en:"weekend",cn:"周末",pos:"n."},
  {en:"welcome",cn:"欢迎",pos:"v./int."},{en:"wet",cn:"湿的",pos:"adj."},{en:"win",cn:"赢",pos:"v."},
  {en:"wind",cn:"风",pos:"n."},{en:"window",cn:"窗户",pos:"n."},{en:"winter",cn:"冬天",pos:"n."},
  {en:"wish",cn:"愿望；希望",pos:"n./v."},{en:"wonder",cn:"想知道",pos:"v."},{en:"wonderful",cn:"精彩的",pos:"adj."},
  {en:"work",cn:"工作",pos:"v./n."},{en:"world",cn:"世界",pos:"n."},{en:"write",cn:"写",pos:"v."},
  {en:"wrong",cn:"错误的",pos:"adj."},{en:"yesterday",cn:"昨天",pos:"adv./n."},{en:"young",cn:"年轻的",pos:"adj."}
]}};

/* ============ 角色 ============ */
const HEROES={
  warrior:{name:"战士",icon:"swords",desc:"攻击系数+30%",atkMul:1.3},
  mage:{name:"法师",icon:"wand",desc:"答题时间+3秒",time:3},
  rogue:{name:"游侠",icon:"target",desc:"连击奖励+1金币",combo:true},
  healer:{name:"牧师",icon:"heart",desc:"每层回4血",heal:4}
};
/* ============ 难度 ============ */
const DIFFS={
  easy:{name:"轻松",time:18,atkMul:.8,hpMul:1.5},
  normal:{name:"标准",time:15,atkMul:1,hpMul:2},
  hard:{name:"困难",time:11,atkMul:1.25,hpMul:2.5}
};
/* ============ 敌人（大血量+意图池+线条怪物形象） ============ */
const ENEMIES=[
  {name:"史莱姆",icon:"droplet",monster:"slime",hp:30,intents:[[0,8],[0,10],[1,8]]},
  {name:"蝙蝠",icon:"bird",monster:"bat",hp:24,intents:[[0,7],[0,9],[1,6]]},
  {name:"骷髅",icon:"skull",monster:"skull",hp:40,intents:[[0,12],[1,12],[2,2]]},
  {name:"石像鬼",icon:"landmark",monster:"gargoyle",hp:48,intents:[[0,10],[1,14],[2,2]]},
  {name:"幽灵",icon:"ghost",monster:"ghost",hp:36,intents:[[0,13],[2,3],[1,10]]},
  {name:"魔狼",icon:"dog",monster:"wolf",hp:52,intents:[[0,14],[0,16],[2,2]]},
  {name:"石魔",icon:"mountain",monster:"golem",hp:64,intents:[[1,16],[0,12],[2,3]]},
  {name:"暗影法师",icon:"sparkles",monster:"mage",hp:58,intents:[[0,16],[2,4],[1,12]]},
  {name:"巨龙",icon:"flame",monster:"dragon",hp:80,intents:[[0,18],[2,3],[0,22]]}
];
const BOSSES=[
  {name:"词灵·初阶",icon:"gem",monster:"spirit",hp:110,intents:[[0,16],[1,18],[2,2]]},
  {name:"词灵·深渊",icon:"skull",monster:"abyss",hp:160,intents:[[0,22],[2,4],[1,20]]},
  {name:"词汇魔王",icon:"trophy",monster:"demon",hp:220,intents:[[0,26],[2,5],[1,24]]}
];
/* 意图: [0=攻击,1=防御,2=蓄力] */
const INTENT_ICON=['sword','shield','flame'];
const INTENT_LABEL=['攻击','防御','蓄力'];
const ATK_RATE=2.2;   // 每剩余秒伤害
const DEF_RATE=2.6;   // 每剩余秒格挡
const META_KEY='lexicon_meta';

/* ============ 遗物 ============ */
const RELICS=[
  {name:'锋利之刃',icon:'sword',desc:'攻击系数 +20%',apply:()=>{S.atkMul=(S.atkMul||1)*1.2;}},
  {name:'坚固之盾',icon:'shield',desc:'防御系数 +20%',apply:()=>{S.defMul=(S.defMul||1)*1.2;}},
  {name:'聚宝盆',icon:'coins',desc:'金币 +50%',apply:()=>{S.goldMul=(S.goldMul||1)*1.5;}},
  {name:'生命之石',icon:'gem',desc:'最大生命 +15 并回 15',apply:()=>{S.maxHp+=15;S.hp=Math.min(S.maxHp,S.hp+15);updatePlayer();}},
  {name:'蓄力预知',icon:'eye',desc:'看到敌人蓄力时，下次攻击翻倍',apply:()=>{S.knowBuff=true;}},
  {name:'时间之沙',icon:'hourglass',desc:'答题时间 +3 秒',apply:()=>{S.timeBonus=(S.timeBonus||0)+3;}},
  {name:'荆棘',icon:'svg-thorns',desc:'敌人攻击你时反弹 4 伤害',apply:()=>{S.thorn=true;}},
  {name:'连击之心',icon:'flame',desc:'连击每 3 次额外 +2 金币',apply:()=>{S.comboGold=true;}}
];

/* ============ 药水（仿杀戮尖塔） ============
   rarity: 0=普通(65%) 1=罕见(25%) 2=稀有(10%)
============================================ */
const POTIONS={
  heal:{name:'回血药',rarity:0,desc:'回复 20% 最大生命',color:'#ff6b6b',icon:'potion-heal'},
  block:{name:'格挡药',rarity:0,desc:'+14 格挡',color:'#4da3ff',icon:'potion-block'},
  atk:{name:'攻击药',rarity:0,desc:'对敌造成 20 伤害',color:'#ff7043',icon:'potion-atk'},
  strength:{name:'力量药',rarity:0,desc:'本局攻击系数 +25%',color:'#ffd54f',icon:'potion-str'},
  time:{name:'时间药',rarity:1,desc:'答题时间 +5 秒',color:'#26c6da',icon:'potion-time'},
  double:{name:'双倍药',rarity:1,desc:'下次攻击 ×2',color:'#ab47bc',icon:'potion-double'},
  thorn:{name:'荆棘药',rarity:1,desc:'敌人攻击你反弹 6 伤害',color:'#66bb6a',icon:'potion-thorn'},
  gold:{name:'金币药',rarity:1,desc:'本战金币 +',color:'#f9a825',icon:'potion-gold'},
  genie:{name:'瓶中精灵',rarity:2,desc:'免死一次',color:'#7e57c2',icon:'potion-genie'},
  juice:{name:'果汁',rarity:2,desc:'永久 +12 最大生命',color:'#ec407a',icon:'potion-juice'},
  chaos:{name:'混沌药',rarity:2,desc:'随机再得 2 瓶药水',color:'#8d6e63',icon:'potion-chaos'},
  charge:{name:'蓄力药',rarity:2,desc:'敌人蓄力时攻击 ×2(一次)',color:'#ff7043',icon:'potion-charge'}
};
/* 稀有度掉落权重：普通65 / 罕见25 / 稀有10 */
const POTION_RARITY=[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2];
const POTION_SLOTS=3;

/* ============ 音效数据（WebAudio 程序化） ============ */
const SFX={
  button:{type:'sine',freq:520,freqEnd:620,dur:.07,vol:.12},
  correct:{type:'triangle',freq:660,freqEnd:990,dur:.18,vol:.16},
  wrong:{type:'sawtooth',freq:230,freqEnd:130,dur:.2,vol:.13},
  attack:{type:'square',freq:210,freqEnd:80,dur:.12,vol:.16},
  block:{type:'triangle',freq:330,freqEnd:260,dur:.1,vol:.13},
  kill:{type:'square',freq:400,freqEnd:920,dur:.28,vol:.16},
  victory:{type:'triangle',freq:523,freqEnd:1046,dur:.5,vol:.18},
  defeat:{type:'sawtooth',freq:300,freqEnd:90,dur:.6,vol:.16},
  timeout:{type:'square',freq:180,dur:.15,vol:.11},
  potion:{type:'sine',freq:500,freqEnd:950,dur:.22,vol:.16}
};

/* ============ 配乐配置（占位路径，文件缺失自动降级） ============ */
const MUSIC={
  menu:{bpm:560,type:'sine',vol:0.07,notes:[
    {f:261.6,dur:1.1},{f:329.6,dur:1.1},{f:392.0,dur:1.1},{f:329.6,dur:1.1},
    {f:293.7,dur:1.1},{f:349.2,dur:1.1},{f:440.0,dur:1.1},{f:349.2,dur:1.1}]},
  battle:{bpm:290,type:'square',vol:0.045,notes:[
    {f:220,dur:0.4},{f:220,dur:0.4},{f:261.6,dur:0.4},{f:220,dur:0.4},
    {f:196,dur:0.4},{f:220,dur:0.4},{f:293.7,dur:0.6},{f:246.9,dur:0.4}]},
  boss:{bpm:190,type:'sawtooth',vol:0.04,notes:[
    {f:110,dur:0.3},{f:116.5,dur:0.3},{f:123.5,dur:0.3},{f:116.5,dur:0.3},
    {f:110,dur:0.3},{f:103.8,dur:0.3},{f:98,dur:0.6},{f:103.8,dur:0.3}]},
  result:{bpm:400,type:'triangle',vol:0.09,notes:[
    {f:392,dur:0.5},{f:523.3,dur:0.5},{f:659.3,dur:1.1}]}
};

/* ============ 自绘 SVG 线条怪物（单色描边，随主题 currentColor 着色） ============ */
const MONSTER_SVGS={
  slime:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 38c0-12 7-22 18-22s18 10 18 22c0 9-7 14-18 14S14 47 14 38z"/><circle cx="24" cy="38" r="2.6" fill="currentColor" stroke="none"/><circle cx="40" cy="38" r="2.6" fill="currentColor" stroke="none"/><path d="M27 46c3.5 2.5 6.5 2.5 10 0"/></svg>',
  bat:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 30c-5-10-16-12-20-7 3 7 1 12-3 16"/><path d="M32 30c5-10 16-12 20-7-3 7-1 12 3 16"/><path d="M9 39c5 3 11 2 14-2"/><path d="M55 39c-5 3-11 2-14-2"/><path d="M32 30v-8"/><circle cx="28" cy="34" r="1.6" fill="currentColor" stroke="none"/><circle cx="36" cy="34" r="1.6" fill="currentColor" stroke="none"/></svg>',
  skull:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 30c0-8 4-14 10-14s10 6 10 14c0 5-2 8-5 10v7h-10v-7c-3-2-5-5-5-10z"/><circle cx="27" cy="31" r="2.4" fill="currentColor" stroke="none"/><circle cx="37" cy="31" r="2.4" fill="currentColor" stroke="none"/><path d="M29 45h6"/></svg>',
  gargoyle:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 22c0-6 4-9 10-9s10 3 10 9v4l6 3-4 5-4-2"/><path d="M22 22l-6 3 4 5 4-2"/><path d="M22 32c-4 8-2 14 10 14s14-6 10-14"/><circle cx="28" cy="28" r="1.8" fill="currentColor" stroke="none"/><circle cx="36" cy="28" r="1.8" fill="currentColor" stroke="none"/></svg>',
  ghost:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M26 30c0-8 3-14 6-14s6 6 6 14v18l-3-3-3 3-3-3-3 3z"/><path d="M26 40h12"/><circle cx="28" cy="26" r="1.8" fill="currentColor" stroke="none"/><circle cx="36" cy="26" r="1.8" fill="currentColor" stroke="none"/></svg>',
  wolf:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 22l6 3 4-7 4 7 6-3"/><path d="M48 22l-6 3-4-7-4 7"/><path d="M20 25c-4 6-4 20 12 20s16-14 12-20"/><path d="M24 34h16"/><path d="M28 30l-2-3"/><path d="M36 30l2-3"/></svg>',
  golem:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 26h20v24H22z"/><path d="M26 26v-6c0-3 3-5 6-5s6 2 6 5v6"/><path d="M18 30h-4M46 30h4"/><circle cx="28" cy="34" r="1.8" fill="currentColor" stroke="none"/><circle cx="36" cy="34" r="1.8" fill="currentColor" stroke="none"/><path d="M28 42h8"/></svg>',
  mage:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 14l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/><path d="M32 32v12"/><path d="M20 56c2-4 4-6 8-6h8c4 0 6 2 8 6"/><circle cx="26" cy="44" r="1.6" fill="currentColor" stroke="none"/><circle cx="38" cy="44" r="1.6" fill="currentColor" stroke="none"/></svg>',
  dragon:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 16c6 0 10 8 10 16 0 8-4 14-10 14s-10-6-10-14c0-8 4-16 10-16z"/><path d="M22 24c-6-2-8-8-8-8 4 2 8 2 10 0"/><path d="M42 24c6-2 8-8 8-8-4 2-8 2-10 0"/><path d="M32 30v6"/><path d="M26 30h12"/><path d="M24 44c4 3 12 3 16 0"/></svg>',
  spirit:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 20h20l8 12-18 16-18-16z"/><path d="M22 20l10 12 10-12M14 32h12M38 32h12M22 32l10 16M42 32l-10 16"/></svg>',
  abyss:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="16"/><circle cx="32" cy="32" r="9"/><circle cx="27" cy="28" r="1.8" fill="currentColor" stroke="none"/><circle cx="37" cy="28" r="1.8" fill="currentColor" stroke="none"/><path d="M32 32v8"/></svg>',
  demon:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 26c0-7 3-11 8-11s8 4 8 11v4l6 2-3 6-5-2"/><path d="M24 26l-6 2 3 6 5-2"/><path d="M24 32c-3 7-1 14 8 14s11-7 8-14"/><path d="M30 26l-2-4"/><path d="M34 26l2-4"/><path d="M27 38h10"/><circle cx="27" cy="30" r="1.8" fill="currentColor" stroke="none"/><circle cx="37" cy="30" r="1.8" fill="currentColor" stroke="none"/></svg>'
};
function monsterSVG(key){return MONSTER_SVGS[key]||MONSTER_SVGS.slime;}
