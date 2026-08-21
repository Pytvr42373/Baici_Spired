/* ============================================================
   《词域远征》 数据层 (data.js)
   TIERS / HEROES / DIFFS / ENEMIES / BOSSES / RELICS
   POTIONS / SFX / MUSIC / MONSTER_SVGS
============================================================ */

/* ============ KET 词库 ============ */
const TIERS={ket:{name:"KET",rate:1,desc:"剑桥 A2 核心词",words:[{en:"able",cn:"能够的",pos:"adj."},{en:"about",cn:"关于；大约",pos:"prep./adv."},{en:"above",cn:"在……上面",pos:"prep."},
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
  {en:"wrong",cn:"错误的",pos:"adj."},{en:"yesterday",cn:"昨天",pos:"adv./n."},{en:"young",cn:"年轻的",pos:"adj."}]},
  pet:{name:"PET",rate:1.5,desc:"剑桥 B1 核心词",words:[{en:"achievement",cn:"成就",pos:"n."},{en:"advertise",cn:"做广告",pos:"v."},{en:"ancient",cn:"古代的",pos:"adj."},{en:"anniversary",cn:"周年纪念",pos:"n."},{en:"apologize",cn:"道歉",pos:"v."},{en:"appointment",cn:"预约",pos:"n."},{en:"arrange",cn:"安排",pos:"v."},{en:"atmosphere",cn:"气氛",pos:"n."},{en:"audience",cn:"观众",pos:"n."},{en:"avoid",cn:"避免",pos:"v."},{en:"balance",cn:"平衡",pos:"n."},{en:"bargain",cn:"便宜货",pos:"n."},{en:"behaviour",cn:"行为",pos:"n."},{en:"benefit",cn:"益处",pos:"n."},{en:"budget",cn:"预算",pos:"n."},{en:"campaign",cn:"活动；运动",pos:"n."},{en:"career",cn:"职业",pos:"n."},{en:"century",cn:"世纪",pos:"n."},{en:"character",cn:"性格",pos:"n."},{en:"charity",cn:"慈善",pos:"n."},{en:"climate",cn:"气候",pos:"n."},{en:"colleague",cn:"同事",pos:"n."},{en:"communicate",cn:"交流",pos:"v."},{en:"community",cn:"社区",pos:"n."},{en:"compete",cn:"竞争",pos:"v."},{en:"confident",cn:"自信的",pos:"adj."},{en:"convenient",cn:"方便的",pos:"adj."},{en:"courage",cn:"勇气",pos:"n."},{en:"creative",cn:"有创造力的",pos:"adj."},{en:"culture",cn:"文化",pos:"n."},{en:"damage",cn:"损害",pos:"n./v."},{en:"decision",cn:"决定",pos:"n."},{en:"decorate",cn:"装饰",pos:"v."},{en:"department",cn:"部门",pos:"n."},{en:"destination",cn:"目的地",pos:"n."},{en:"develop",cn:"发展",pos:"v."},{en:"direction",cn:"方向",pos:"n."},{en:"disaster",cn:"灾难",pos:"n."},{en:"discount",cn:"折扣",pos:"n."},{en:"distance",cn:"距离",pos:"n."},{en:"economy",cn:"经济",pos:"n."},{en:"education",cn:"教育",pos:"n."},{en:"effort",cn:"努力",pos:"n."},{en:"emergency",cn:"紧急情况",pos:"n."},{en:"environment",cn:"环境",pos:"n."},{en:"equipment",cn:"设备",pos:"n."},{en:"experience",cn:"经验",pos:"n."},{en:"explore",cn:"探索",pos:"v."},{en:"facility",cn:"设施",pos:"n."},{en:"famous",cn:"著名的",pos:"adj."},{en:"favourite",cn:"最喜爱的",pos:"adj."},{en:"finance",cn:"财务",pos:"n."},{en:"fitness",cn:"健身",pos:"n."},{en:"flexible",cn:"灵活的",pos:"adj."},{en:"foreign",cn:"外国的",pos:"adj."},{en:"frequent",cn:"频繁的",pos:"adj."},{en:"furniture",cn:"家具",pos:"n."},{en:"generation",cn:"一代人",pos:"n."},{en:"global",cn:"全球的",pos:"adj."},{en:"goal",cn:"目标",pos:"n."},{en:"government",cn:"政府",pos:"n."},{en:"habit",cn:"习惯",pos:"n."},{en:"healthy",cn:"健康的",pos:"adj."},{en:"improve",cn:"改进",pos:"v."},{en:"income",cn:"收入",pos:"n."},{en:"industry",cn:"工业",pos:"n."},{en:"influence",cn:"影响",pos:"n./v."},{en:"insurance",cn:"保险",pos:"n."},{en:"international",cn:"国际的",pos:"adj."},{en:"journey",cn:"旅程",pos:"n."},{en:"knowledge",cn:"知识",pos:"n."},{en:"language",cn:"语言",pos:"n."},{en:"legal",cn:"合法的",pos:"adj."},{en:"library",cn:"图书馆",pos:"n."},{en:"lifestyle",cn:"生活方式",pos:"n."},{en:"local",cn:"当地的",pos:"adj."},{en:"manage",cn:"管理",pos:"v."},{en:"market",cn:"市场",pos:"n."},{en:"material",cn:"材料",pos:"n."},{en:"medicine",cn:"药",pos:"n."},{en:"mention",cn:"提到",pos:"v."},{en:"method",cn:"方法",pos:"n."},{en:"modern",cn:"现代的",pos:"adj."},{en:"museum",cn:"博物馆",pos:"n."},{en:"necessary",cn:"必要的",pos:"adj."},{en:"opportunity",cn:"机会",pos:"n."},{en:"organize",cn:"组织",pos:"v."},{en:"passenger",cn:"乘客",pos:"n."},{en:"perform",cn:"表演",pos:"v."},{en:"permission",cn:"许可",pos:"n."},{en:"popular",cn:"受欢迎的",pos:"adj."},{en:"positive",cn:"积极的",pos:"adj."},{en:"pressure",cn:"压力",pos:"n."},{en:"prevent",cn:"阻止",pos:"v."},{en:"private",cn:"私人的",pos:"adj."},{en:"professional",cn:"专业的",pos:"adj."},{en:"project",cn:"项目",pos:"n."},{en:"promise",cn:"承诺",pos:"n./v."},{en:"protect",cn:"保护",pos:"v."},{en:"provide",cn:"提供",pos:"v."},{en:"quality",cn:"质量",pos:"n."},{en:"realize",cn:"意识到",pos:"v."},{en:"recommend",cn:"推荐",pos:"v."},{en:"reduce",cn:"减少",pos:"v."},{en:"region",cn:"地区",pos:"n."},{en:"relationship",cn:"关系",pos:"n."},{en:"report",cn:"报告",pos:"n."},{en:"research",cn:"研究",pos:"n."},{en:"resource",cn:"资源",pos:"n."},{en:"responsible",cn:"负责的",pos:"adj."},{en:"result",cn:"结果",pos:"n."},{en:"salary",cn:"薪水",pos:"n."},{en:"schedule",cn:"日程",pos:"n."},{en:"science",cn:"科学",pos:"n."},{en:"serious",cn:"严肃的",pos:"adj."},{en:"service",cn:"服务",pos:"n."},{en:"situation",cn:"情况",pos:"n."},{en:"skill",cn:"技能",pos:"n."},{en:"society",cn:"社会",pos:"n."},{en:"solution",cn:"解决方案",pos:"n."},{en:"strategy",cn:"策略",pos:"n."},{en:"stress",cn:"压力",pos:"n."},{en:"success",cn:"成功",pos:"n."},{en:"suggest",cn:"建议",pos:"v."},{en:"support",cn:"支持",pos:"n./v."},{en:"system",cn:"系统",pos:"n."},{en:"technology",cn:"科技",pos:"n."},{en:"temperature",cn:"温度",pos:"n."},{en:"valuable",cn:"有价值的",pos:"adj."},{en:"variety",cn:"多样",pos:"n."},{en:"weather",cn:"天气",pos:"n."},{en:"website",cn:"网站",pos:"n."}]},
  fce:{name:"FCE",rate:2,desc:"剑桥 B2 核心词",words:[{en:"abstract",cn:"抽象的",pos:"adj."},{en:"accelerate",cn:"加速",pos:"v."},{en:"access",cn:"进入；访问",pos:"n./v."},{en:"acknowledge",cn:"承认",pos:"v."},{en:"acquire",cn:"获得",pos:"v."},{en:"adapt",cn:"适应",pos:"v."},{en:"adequate",cn:"足够的",pos:"adj."},{en:"analyze",cn:"分析",pos:"v."},{en:"anticipate",cn:"预期",pos:"v."},{en:"apparent",cn:"明显的",pos:"adj."},{en:"appreciate",cn:"欣赏",pos:"v."},{en:"approach",cn:"方法",pos:"n."},{en:"appropriate",cn:"恰当的",pos:"adj."},{en:"assess",cn:"评估",pos:"v."},{en:"assume",cn:"假定",pos:"v."},{en:"attribute",cn:"归因于",pos:"v."},{en:"authentic",cn:"真实的",pos:"adj."},{en:"available",cn:"可获得的",pos:"adj."},{en:"aware",cn:"意识到的",pos:"adj."},{en:"capacity",cn:"容量",pos:"n."},{en:"challenge",cn:"挑战",pos:"n./v."},{en:"coherent",cn:"连贯的",pos:"adj."},{en:"collaborate",cn:"合作",pos:"v."},{en:"comprehensive",cn:"全面的",pos:"adj."},{en:"concept",cn:"概念",pos:"n."},{en:"conduct",cn:"进行",pos:"v."},{en:"confirm",cn:"确认",pos:"v."},{en:"confront",cn:"面对",pos:"v."},{en:"consequence",cn:"后果",pos:"n."},{en:"consistent",cn:"一致的",pos:"adj."},{en:"construct",cn:"建造",pos:"v."},{en:"contemporary",cn:"当代的",pos:"adj."},{en:"context",cn:"背景",pos:"n."},{en:"contradict",cn:"反驳",pos:"v."},{en:"convey",cn:"传达",pos:"v."},{en:"crucial",cn:"关键的",pos:"adj."},{en:"debate",cn:"辩论",pos:"n./v."},{en:"decline",cn:"下降",pos:"n./v."},{en:"deduce",cn:"推断",pos:"v."},{en:"define",cn:"定义",pos:"v."},{en:"demonstrate",cn:"证明",pos:"v."},{en:"derive",cn:"源于",pos:"v."},{en:"detect",cn:"察觉",pos:"v."},{en:"diminish",cn:"减少",pos:"v."},{en:"distinct",cn:"明显的",pos:"adj."},{en:"diverse",cn:"多样的",pos:"adj."},{en:"document",cn:"记录",pos:"n./v."},{en:"dominate",cn:"主导",pos:"v."},{en:"dynamic",cn:"动态的",pos:"adj."},{en:"efficient",cn:"高效的",pos:"adj."},{en:"eliminate",cn:"消除",pos:"v."},{en:"emerge",cn:"出现",pos:"v."},{en:"emphasis",cn:"强调",pos:"n."},{en:"enable",cn:"使能够",pos:"v."},{en:"encounter",cn:"遇到",pos:"v."},{en:"enhance",cn:"增强",pos:"v."},{en:"enormous",cn:"巨大的",pos:"adj."},{en:"ensure",cn:"确保",pos:"v."},{en:"establish",cn:"建立",pos:"v."},{en:"estimate",cn:"估计",pos:"v."},{en:"evaluate",cn:"评估",pos:"v."},{en:"evident",cn:"明显的",pos:"adj."},{en:"evolve",cn:"演变",pos:"v."},{en:"exceed",cn:"超过",pos:"v."},{en:"exclude",cn:"排除",pos:"v."},{en:"exhibit",cn:"展示",pos:"v."},{en:"expand",cn:"扩大",pos:"v."},{en:"explicit",cn:"明确的",pos:"adj."},{en:"facilitate",cn:"促进",pos:"v."},{en:"factor",cn:"因素",pos:"n."},{en:"feasible",cn:"可行的",pos:"adj."},{en:"fluctuate",cn:"波动",pos:"v."},{en:"focus",cn:"聚焦",pos:"v./n."},{en:"framework",cn:"框架",pos:"n."},{en:"function",cn:"功能",pos:"n."},{en:"fundamental",cn:"基本的",pos:"adj."},{en:"generate",cn:"产生",pos:"v."},{en:"hypothesis",cn:"假设",pos:"n."},{en:"identify",cn:"识别",pos:"v."},{en:"illustrate",cn:"说明",pos:"v."},{en:"impact",cn:"影响",pos:"n."},{en:"implement",cn:"实施",pos:"v."},{en:"imply",cn:"暗示",pos:"v."},{en:"incorporate",cn:"包含",pos:"v."},{en:"indicate",cn:"表明",pos:"v."},{en:"individual",cn:"个人的",pos:"adj."},{en:"inevitable",cn:"不可避免的",pos:"adj."},{en:"infer",cn:"推断",pos:"v."},{en:"infrastructure",cn:"基础设施",pos:"n."},{en:"initial",cn:"最初的",pos:"adj."},{en:"initiative",cn:"主动性",pos:"n."},{en:"insight",cn:"洞察",pos:"n."},{en:"integrate",cn:"整合",pos:"v."},{en:"interpret",cn:"解释",pos:"v."},{en:"invest",cn:"投资",pos:"v."},{en:"investigate",cn:"调查",pos:"v."},{en:"justify",cn:"证明",pos:"v."},{en:"legislation",cn:"立法",pos:"n."},{en:"logical",cn:"逻辑的",pos:"adj."},{en:"maintain",cn:"维持",pos:"v."},{en:"major",cn:"主要的",pos:"adj."},{en:"mechanism",cn:"机制",pos:"n."},{en:"modify",cn:"修改",pos:"v."},{en:"monitor",cn:"监控",pos:"v."},{en:"motivate",cn:"激励",pos:"v."},{en:"mutual",cn:"相互的",pos:"adj."},{en:"negative",cn:"消极的",pos:"adj."},{en:"obtain",cn:"获得",pos:"v."},{en:"obvious",cn:"明显的",pos:"adj."},{en:"occupy",cn:"占据",pos:"v."},{en:"option",cn:"选项",pos:"n."},{en:"outcome",cn:"结果",pos:"n."},{en:"overall",cn:"总的",pos:"adj."},{en:"perceive",cn:"感知",pos:"v."},{en:"persist",cn:"坚持",pos:"v."},{en:"phase",cn:"阶段",pos:"n."},{en:"phenomenon",cn:"现象",pos:"n."},{en:"potential",cn:"潜在的",pos:"adj."},{en:"principle",cn:"原则",pos:"n."},{en:"priority",cn:"优先",pos:"n."},{en:"proceed",cn:"进行",pos:"v."},{en:"prohibit",cn:"禁止",pos:"v."},{en:"proportion",cn:"比例",pos:"n."},{en:"prospect",cn:"前景",pos:"n."},{en:"pursue",cn:"追求",pos:"v."},{en:"random",cn:"随机的",pos:"adj."},{en:"range",cn:"范围",pos:"n."},{en:"ratio",cn:"比率",pos:"n."},{en:"rational",cn:"理性的",pos:"adj."},{en:"recover",cn:"恢复",pos:"v."},{en:"reflect",cn:"反映",pos:"v."},{en:"regulate",cn:"管理",pos:"v."},{en:"reinforce",cn:"强化",pos:"v."},{en:"reject",cn:"拒绝",pos:"v."},{en:"rely",cn:"依赖",pos:"v."},{en:"reluctant",cn:"不情愿的",pos:"adj."},{en:"retain",cn:"保留",pos:"v."},{en:"reveal",cn:"揭示",pos:"v."},{en:"revenue",cn:"收入",pos:"n."},{en:"secure",cn:"安全的",pos:"adj."},{en:"seek",cn:"寻求",pos:"v."},{en:"significant",cn:"显著的",pos:"adj."},{en:"similar",cn:"相似的",pos:"adj."},{en:"solely",cn:"仅仅",pos:"adv."},{en:"specific",cn:"具体的",pos:"adj."},{en:"stable",cn:"稳定的",pos:"adj."},{en:"stimulate",cn:"刺激",pos:"v."},{en:"substantial",cn:"大量的",pos:"adj."},{en:"sufficient",cn:"足够的",pos:"adj."},{en:"technical",cn:"技术的",pos:"adj."},{en:"technique",cn:"技术",pos:"n."},{en:"temporary",cn:"暂时的",pos:"adj."},{en:"theme",cn:"主题",pos:"n."},{en:"theory",cn:"理论",pos:"n."},{en:"transfer",cn:"转移",pos:"v."},{en:"transform",cn:"转变",pos:"v."},{en:"transition",cn:"过渡",pos:"n."},{en:"trend",cn:"趋势",pos:"n."},{en:"ultimate",cn:"最终的",pos:"adj."},{en:"undergo",cn:"经历",pos:"v."},{en:"unique",cn:"独特的",pos:"adj."},{en:"utilize",cn:"利用",pos:"v."},{en:"valid",cn:"有效的",pos:"adj."},{en:"vary",cn:"变化",pos:"v."},{en:"vehicle",cn:"车辆",pos:"n."},{en:"verify",cn:"核实",pos:"v."},{en:"virtual",cn:"虚拟的",pos:"adj."},{en:"visible",cn:"可见的",pos:"adj."},{en:"volume",cn:"体积",pos:"n."},{en:"welfare",cn:"福利",pos:"n."},{en:"widespread",cn:"广泛的",pos:"adj."}]}
};
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

/* ============ 配乐配置（WebAudio 程序化合成，更丰富更长的旋律） ============ */
const MUSIC={
  menu:{bpm:80,mode:'major',drums:0,pad:1,roots:[60,64,67,72,69,65,62,60]},
  battle_calm:{bpm:96,mode:'major',drums:1,pad:1,roots:[60,65,67,60,55,60,65,67]},
  battle_intense:{bpm:142,mode:'minor',drums:3,pad:0,roots:[57,53,48,55,57,53,52,55]},
  boss:{bpm:152,mode:'minor',drums:3,pad:1,roots:[52,52,53,52,50,52,53,52]},
  result:{bpm:100,mode:'major',drums:1,pad:1,roots:[60,65,67,72,69,67,72,60]}
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
/* ============================================================
   爬塔节点系统：奇遇事件 / 商店 / 休息处
   choice: {label,tip,run} 直接执行 或 {label,tip,quiz,ok,bad} 弹内嵌答题
============================================================ */
const NODE_WEIGHT={event:55,shop:25,rest:20}; // 普通层清空后，遇到三类节点的权重(%)
const EVENT_POOL=[
  {
    id:'ewander',title:'🗺 词源漫游者',
    text:`一位身披旧羊皮纸斗篷的老者从路旁树下抬起头，像是等你很久了。

「每个词都是一段迁徙史。」他摊开一卷发黄的地图，「你看 atlas——希腊神话里那位被罚永远扛着天球的泰坦。十六世纪，地理学家墨卡托把扛天的巨神画在地图册扉页，从此『地图册』就叫 atlas 了。」

他递来一张羊皮纸：「考你一个，答对了，这点星尘归你。答错了……就当交学费。」`,
    choices:[
      {label:'接受词源考验',tip:'答对 +3 星尘 / 答错 -1 星尘',
       quiz:{q:'「atlas」得名于希腊神话中的人物，他原本的职责是？',opts:['守护冥河渡口','扛起天空的天神','掌管海上风暴','铸炼雷霆的工匠'],ans:1,
         ok:()=>{nodeGiveStar(3);},
         bad:()=>{nodeGiveStar(-1);}}},
      {label:'婉拒赶路',tip:'礼貌道别，老者微笑点头',run:()=>{toast('🍃 老者目送你远去');}}
    ]
  },
  {
    id:'shakespeare',title:'🎭 莎士比亚的幽灵',
    text:`浓雾里浮出一位穿着伊丽莎白时代紧身衣、手持鹅毛笔的幽灵。他上下打量你，突然抑扬顿挫地吟道：

「To be, or not to be——那孩子当年写得可真不赖，是不是？」他眯起眼，「可我更好奇，如今的远征者，还认不认得我们那时的词儿。」

他在空中写下几个发光的字母：「接我一题，赢家拿钱走人。」`,
    choices:[
      {label:'接住莎翁的考题',tip:'答对 +25 金币 / 答错 -5 生命',
       quiz:{q:'《哈姆雷特》中那句最著名的独白，开头是？',opts:["All the world's a stage",'To be, or not to be','A rose by any other name','Brevity is the soul of wit'],ans:1,
         ok:()=>{nodeGiveGold(25);},
         bad:()=>{nodeDamage(5);}}},
      {label:'也引一句名言回应',tip:'赌 50%：幽灵击节赞赏 / 或嘲笑你班门弄斧',
       run:()=>{if(Math.random()<0.5){toast('🎭 「妙哉！」幽灵大笑，撒下一把金币');nodeGiveGold(20);}else{toast('🪶 「班门弄斧。」幽灵撇撇嘴，飘走了');}}},
      {label:'礼貌告退',tip:'幽灵欠身行礼',run:()=>{toast('🎭 幽灵鞠躬：「愿你的词句永不褪色。」');}}
    ]
  },
  {
    id:'witch',title:'🧙 拼写女巫',
    text:`路旁歪斜的木屋上，挂着一串被风吹得叮当作响的字母。女巫从沸腾的坩埚里舀起一勺金色的气泡，笑眯眯地看着你。

「远征者，魔法世界的法则很简单——拼对，我就把力量灌进你体内；拼错……就得交一点『学费』。」

她用魔杖在空气里划出一个词，字母散落一地。`,
    choices:[
      {label:'接受拼写挑战',tip:'答对 +8 生命上限 / 答错 -6 生命',
       quiz:{q:'哪个拼写是正确的？',opts:['necessary','necessery','neccessary','necessarry'],ans:0,
         ok:()=>{S.maxHp+=8;S.hp=Math.min(S.maxHp,S.hp+8);toast('✨ 女巫点点头，生命上限 +8');updatePlayer();},
         bad:()=>{nodeDamage(6);}}},
      {label:'花 50 金币买一枚护身符',tip:'获得一瓶「格挡药」',run:()=>{if(S.gold>=50){S.gold-=50;nodeGivePotion('block');}else{toast('🪙 金币不够……女巫遗憾地摇头');}}}
    ]
  },
  {
    id:'jester',title:'🤡 双关语小丑',
    text:`一个戴尖帽的小丑从树丛后蹦出来，夸张地鞠了一躬：「远征者！来都来了，赏脸听个谜呗？」

他清清嗓子：「为什么英语老师总在讲台边放一架梯子？」他得意地眨眼，「——Because they want to raise the level of the class！level 既是『水平』，也是『楼层』，一举两得！哈哈哈哈！」

他笑得前仰后合，从口袋里掏出一把金币晃了晃：「笑一个，分你点。」`,
    choices:[
      {label:'礼貌地笑一笑',tip:'+15 金币',run:()=>{toast('🤡 「上道！」小丑抛来一把金币');nodeGiveGold(15);}},
      {label:'讲个双关语反击',tip:'赌 50%：逗笑全场 +30 金币 / 冷场被取笑',run:()=>{if(Math.random()<0.5){toast('🤡 「哈哈哈哈！这招妙！」小丑捧腹，金币哗哗作响');nodeGiveGold(30);}else{toast('😅 全场安静……小丑干笑两声：「呃，下次改进。」');}}},
      {label:'面无表情地路过',tip:'小丑耸耸肩',run:()=>{toast('🤡 「冷面远征者，有性格。」小丑自己笑场了');}}
    ]
  },
  {
    id:'librarian',title:'📚 图书馆馆长',
    text:`一座高耸入云的图书馆毫无征兆地矗立在路中央，大门洞开。馆长从柜台后探出头，食指竖在唇边：「嘘——这里的书，按字母顺序活着。」

「library 这个词，来自拉丁语 liber，意思是『树皮』——最早的『书』，是刻在树皮上的。」他推了推眼镜，「要借点『知识』上路吗？不过得先通过我的索引考验：按字典序，哪个词排最前面？」`,
    choices:[
      {label:'通过索引考验',tip:'答对 +3 秒答题时间 / 答错 -5 生命',
       quiz:{q:'按字典序，哪个词排在「最前面」？',opts:['able','about','abandon','ability'],ans:2,
         ok:()=>{S.timeBonus=(S.timeBonus||0)+3;toast('📖 「索引无误。」答题时间 +3 秒');},
         bad:()=>{nodeDamage(5);}}},
      {label:'花 30 金币买一本《时间之书》',tip:'答题时间 +3 秒（本局）',run:()=>{if(S.gold>=30){S.gold-=30;S.timeBonus=(S.timeBonus||0)+3;toast('📖 获得《时间之书》：答题时间 +3 秒');updateTop();}else{toast('🪙 金币不够，馆长摇头');}}},
      {label:'不打扰，继续赶路',tip:'',run:()=>{toast('📚 馆长轻声：「愿字母保佑你。」');}}
    ]
  },
  {
    id:'viking',title:'🛶 维京长船水手',
    text:`一位胡须结霜的维京水手靠在他的长船边，正用牛角杯喝着蜂蜜酒。看见你，他咧嘴一笑。

「小子，英语里一大半的『家常词』——sky、egg、knife、window——都是我们北欧人带来的！你航船时喊的 wind，看天看的 weather，全是维京人教给撒克逊人的。」

他拍了拍腰间鼓鼓的钱袋：「用一句话换我的战利品。答对了，金币归你。」`,
    choices:[
      {label:'答维京人的题',tip:'答对 +25 金币 / 答错无事',
       quiz:{q:'下面哪个词「不是」从古诺尔斯语（维京人）传入英语的？',opts:['sky','window','knife','mountain'],ans:3,
         ok:()=>{nodeGiveGold(25);},
         bad:()=>{toast('🛶 「哈哈，撒克逊词！」水手大笑，但没计较');}}},
      {label:'和他干一杯蜂蜜酒',tip:'+8 生命',run:()=>{S.hp=Math.min(S.maxHp,S.hp+8);toast('🍯 蜂蜜酒暖透胸膛，生命 +8');updatePlayer();}}
    ]
  },
  {
    id:'madtea',title:'☕ 疯帽匠的茶会',
    text:`一棵歪脖子树下，铺着一条望不到头的长桌，堆满热腾腾的茶杯。三月兔和疯帽匠冲你拼命挥手：「换位子！换位子！」

疯帽匠晃着一块停摆的怀表，神神秘秘地压低声音：「时间为什么永远停在六点？」他眨眨眼，「——因为六点是 tea time（下午茶时间）！答案就藏在单词里。」

他推来一杯茶：「坐下来，答对我们的谜题，这块表送你。」`,
    choices:[
      {label:'坐下喝茶答题',tip:'答对 +3 秒答题时间 / 答错 -5 生命',
       quiz:{q:'《爱丽丝漫游奇境》里，疯帽匠的怀表为什么停在「六点」？',opts:['六点是下午茶时间','表真的坏了','他讨厌六这个数字','表是三月兔偷来的'],ans:0,
         ok:()=>{S.timeBonus=(S.timeBonus||0)+3;toast('⏰ 疯帽匠鼓掌：「正是 tea time！」答题时间 +3 秒');},
         bad:()=>{nodeDamage(5);}}},
      {label:'不喝茶，拒绝谜题',tip:'',run:()=>{toast('☕ 「随你吧。」疯帽匠自顾自往茶杯里倒时间');}}
    ]
  },
  {
    id:'rootstele',title:'🪨 词根石碑',
    text:`一块开裂的石碑立在路边，上面刻着拉丁词根：port（携带）。

下方的小字密密麻麻：「port + able = 可携带的；port + er = 搬运工；import 进口、export 出口、transport 运输、portable 便携……」

一个低沉的声音在你脑中响起：「远征者，选一个真正『承托』这个词根意义的词，我便赐你祝福。」`,
    choices:[
      {label:'选出真正的派生词',tip:'答对 +6 生命上限 / 答错 -5 生命',
       quiz:{q:'哪个词与词根 port（携带）的「意思最相关」？',opts:['portable（可携带的）','portrait（肖像）','portion（一份）','poster（海报）'],ans:0,
         ok:()=>{S.maxHp+=6;S.hp=Math.min(S.maxHp,S.hp+6);toast('🪨 石碑泛起微光：生命上限 +6');updatePlayer();},
         bad:()=>{nodeDamage(5);}}},
      {label:'默默记下石碑，继续赶路',tip:'',run:()=>{toast('📜 你把词根记在心里：port = 携带');}}
    ]
  },
  {
    id:'pirate',title:'🏴☠️ 海盗的宝箱',
    text:`沙滩上埋着一只半露的橡木宝箱，旁边坐着独眼海盗，抱着吉他弹一支慵懒的小调。

「A pirate's life for me～」他抬眼，「你晓得 pirate 这个词打哪儿来不？希腊语 peirates，意思是『尝试者、袭击者』——敢试的人，才配当海盗。」

他弹了个扫弦：「我出个词，你接住。赢的人，箱子里随便挑。」`,
    choices:[
      {label:'和海盗比一比',tip:'答对得一瓶「攻击药」/ 答错 -6 生命',
       quiz:{q:'pirate 源自希腊语 peirates，其本意最接近？',opts:['尝试者 / 袭击者','航海家','沿海商人','皇家船长'],ans:0,
         ok:()=>{nodeGivePotion('atk');},
         bad:()=>{nodeDamage(6);}}},
      {label:'趁他不注意偷开宝箱',tip:'赌 50%：得随机遗物 / 触发陷阱 -8 生命',run:()=>{if(Math.random()<0.5){const r=RELICS[Math.floor(Math.random()*RELICS.length)];S.relics.push(r);if(typeof renderRelicBar==='function')renderRelicBar();r.apply();toast('🏴☠️ 得手！遗物「'+r.name+'」');}else{nodeDamage(8);toast('🪤 宝箱弹出一条木蛇，咬了你一口！');}}}
    ]
  },
  {
    id:'midas',title:'🌟 迈达斯的金苹果',
    text:`一个浑身金光闪闪的国王站在路中央，指尖托着一颗金苹果，神情却莫名落寞。

「你听过 Midas 的故事么？」他叹道，「希腊传说里，他碰到什么，什么就变成金子——连晚餐、连女儿，都成了冷冰冰的金像。语言的讽刺在于：gold 一词出自古英语，而 golden age（黄金时代）……那是个一去不返的时代。」

他把金苹果递向你：「拿去吧。但记住——有些东西，比金子更珍贵。」`,
    choices:[
      {label:'收下金苹果',tip:'+30 金币，但 -3 生命（贪婪的代价）',run:()=>{nodeGiveGold(30);nodeDamage(3);toast('🍎 金苹果沉甸甸的，闪着耀眼的光……');}},
      {label:'婉拒，向他请教典故',tip:'+2 星尘（智者之路）',run:()=>{nodeGiveStar(2);toast('🌟 迈达斯欣慰地笑了：「明智的选择。」');}},
      {label:'追问词源细节',tip:'答对 +3 星尘 / 答错无事',quiz:{q:'Midas 点石成金的故事，结局最接近哪个？',opts:['连女儿也变成金像，他悔恨不已','他成为众神之王','他在冥河解除了魔法','他把金苹果献给了国王'],ans:0,
        ok:()=>{nodeGiveStar(3);},
        bad:()=>{toast('🌟 迈达斯苦笑：「细节早已被传说磨平了。」');}}}
    ]
  }
];
const SHOP_ITEMS=[
  {id:'heal',name:'回血药',icon:'potion-heal',desc:'回复 20% 最大生命',price:40,
   run:()=>{nodeGivePotion('heal');}},
  {id:'strength',name:'力量药',icon:'potion-str',desc:'本局攻击系数 +25%',price:55,
   run:()=>{nodeGivePotion('strength');}},
  {id:'time',name:'时间之沙',icon:'hourglass',desc:'答题时间 +3 秒（本局）',price:45,
   run:()=>{S.timeBonus=(S.timeBonus||0)+3;toast('⏳ 沙粒缓缓流下，答题时间 +3 秒');}},
  {id:'blade',name:'锋利之刃',icon:'sword',desc:'遗物：攻击系数 +20%',price:70,
   run:()=>{const r=RELICS.find(x=>x.name==='锋利之刃')||RELICS[0];S.relics.push(r);if(typeof renderRelicBar==='function')renderRelicBar();r.apply();toast('⚔️ 获得遗物「'+r.name+'」');}},
  {id:'cleanse',name:'遗忘卷轴',icon:'scroll',desc:'清除本局全部错题标记',price:30,
   run:()=>{S.wrongWords={};toast('📜 卷轴化作尘埃，错题记忆被抹去');}}
];
const REST_HEAL=0.35; // 篝火回血比例


/* ============ 玩家自绘 SVG 立绘（复用怪物渲染逻辑，随主题 currentColor） ============ */
const PLAYER_SVGS={
  warrior:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 26c0-10 4-14 10-14s10 4 10 14"/><path d="M22 26c-3 8-2 16 10 16s13-8 10-16"/><path d="M32 12v5"/><path d="M24 26h16"/><path d="M14 24l8 3"/><path d="M48 22l4 3-2 6-5-2z"/><circle cx="27" cy="34" r="1.7" fill="currentColor" stroke="none"/><circle cx="37" cy="34" r="1.7" fill="currentColor" stroke="none"/><path d="M30 42h4"/></svg>',
  mage:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M26 24l6-10 6 10"/><path d="M23 24h18"/><path d="M26 24c-3 7-2 14 6 14s9-7 6-14"/><path d="M25 40c2 4 4 6 7 6s5-2 7-6"/><path d="M42 30l7 7"/><circle cx="29" cy="30" r="1.6" fill="currentColor" stroke="none"/><circle cx="35" cy="30" r="1.6" fill="currentColor" stroke="none"/></svg>',
  rogue:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 28c0-10 4-14 10-14s10 4 10 14"/><path d="M22 28l6 2-6 4z"/><path d="M42 28l-6 2 6 4z"/><path d="M22 30c-3 8-1 16 10 16s13-8 10-16"/><path d="M13 16c2 9 2 17 0 26"/><path d="M13 16v26"/><path d="M11 26l5 2-4 5z" fill="currentColor" stroke="none"/><circle cx="28" cy="32" r="1.6" fill="currentColor" stroke="none"/><circle cx="36" cy="32" r="1.6" fill="currentColor" stroke="none"/><path d="M30 40h4"/></svg>',
  healer:'<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="12" r="4"/><path d="M24 24c0-8 3-12 8-12s8 4 8 12"/><path d="M24 24c-3 8-2 16 8 16s11-8 8-16"/><path d="M32 30v8"/><path d="M28 34h8"/><path d="M45 24l5-2"/><circle cx="28" cy="28" r="1.6" fill="currentColor" stroke="none"/><circle cx="36" cy="28" r="1.6" fill="currentColor" stroke="none"/></svg>'
};
function playerSVG(key){return PLAYER_SVGS[key]||PLAYER_SVGS.warrior;}

/* ============ 网状爬塔地图（类杀戮尖塔） ============ */
const MAP_ROW_W=[3,4,4,4,4,3,1]; // 每行节点数（row0 起点最下，row6 Boss）每幕 7 层
const MAP_TYPE_ICON={battle:'⚔️',elite:'💀',shop:'🏪',rest:'⛺',event:'❓',treasure:'🎁',boss:'👹'};
const MAP_TYPE_NAME={battle:'战斗',elite:'精英',shop:'商店',rest:'休息',event:'奇遇',treasure:'宝箱',boss:'Boss'};

/* ============ 星尘天赋树（局外成长） ============ */
// 分支 id: power力量 / lore学识；cost(n)=第 n→n+1 级花费；prereq=前置节点（全满足才可点）
const TALENT_BRANCHES=[
  {id:'power',name:'力量',icon:'⚔️',color:'#ff6b6b',nodes:[
    {id:'P1',name:'锋刃磨砺',desc:'局内攻击 +5% / 级',cost:n=>4+3*n,max:5,prereq:[]},
    {id:'P2',name:'致命一击',desc:'暴击率 +4% / 级（暴击伤害 ×1.5）',cost:n=>6+4*n,max:5,prereq:['P1']},
    {id:'P3',name:'双刃乱舞',desc:'每答对 2 题，本击 +1 伤害',cost:n=>8+5*n,max:3,prereq:['P1']},
    {id:'P5',name:'破甲之锋',desc:'对 BOSS 伤害 +12% / 级',cost:n=>10+6*n,max:3,prereq:['P2']},
    {id:'P4',name:'战意昂扬',desc:'连击 ≥5 时回复 2 生命',cost:n=>18,max:1,prereq:['P2','P3']}
  ]},
  {id:'lore',name:'学识',icon:'📚',color:'#5eead4',nodes:[
    {id:'L1',name:'词库扩充',desc:'战斗词池 +5 / 级',cost:n=>4+3*n,max:5,prereq:[]},
    {id:'L2',name:'融会贯通',desc:'答对金币 +1 / 级',cost:n=>6+4*n,max:3,prereq:['L1']},
    {id:'L3',name:'过目不忘',desc:'错题权重 +20% / 级',cost:n=>8+5*n,max:3,prereq:['L1']},
    {id:'L4',name:'智慧之眼',desc:'答题时间 +2 秒 / 级',cost:n=>10+6*n,max:3,prereq:['L2','L3']},
    {id:'L5',name:'学者之心',desc:'答对 25% 概率回复 2 生命',cost:n=>22,max:1,prereq:['L4']}
  ]}
];
