export type PickType = '达人' | '商家' | 'AI'
export type ContentId = string | number

export type Pick = {
  id: ContentId
  rank: number
  type: PickType
  title: string
  product: string
  author: string
  thumbnail: string
  views: string
  growth: number
  likes: string
  estimatedGMV: string
  hook: string
  reasons: string[]
  isFavorite: boolean
  videoUrl?: string
}

export type NewProduct = {
  id: ContentId
  rank: number
  product: string
  title: string
  brand: string
  thumbnail: string
  estimatedSales: string
  relatedVideos: string
  growth: number
  price: string
  estimatedGMV: string
  hook: string
  reasons: string[]
  isFavorite: boolean
}

export const SORT_OPTIONS = ['综合热度', '增长最快', '播放量最高', 'GMV最高'] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=70`

/* ================= 15 条爆款视频：每类各 1-5 名 ================= */

export const MOCK_PICKS: Pick[] = [
  /* ---- 达人视频 1-5 ---- */
  {
    id: 1,
    rank: 1,
    type: '达人',
    title: '夏季通勤降温实测，一路凉到公司',
    product: '便携手持小风扇',
    author: '@levi.perez',
    thumbnail: IMG('photo-1527689368864-3a821dbccc34'),
    views: '1.2M',
    growth: 286,
    likes: '98.6K',
    estimatedGMV: '$187.6K',
    hook: '高温季节便携降温刚需爆发，户外场景覆盖广，达人种草与实用测评推动转化。',
    reasons: ['极致便携，户外使用场景覆盖广', '真实测评加前后对比，信任感高', '价格带合适，购买决策成本低'],
    isFavorite: false,
  },
  {
    id: 2,
    rank: 2,
    type: '达人',
    title: '敏感肌洗脸实录，泡沫细到能立住',
    product: '云朵氨基酸洁面慕斯',
    author: '@skinbylina',
    thumbnail: IMG('photo-1556228720-195a672e8a03'),
    views: '742.1K',
    growth: 143,
    likes: '57.8K',
    estimatedGMV: '$126.4K',
    hook: '敏感肌人群基数大，泡沫视觉冲击强，测评类内容天然适合转化。',
    reasons: ['泡沫质感画面极具视觉记忆点', '敏感肌痛点精准，评论区自发种草', '复购属性强，客单价接受度高'],
    isFavorite: false,
  },
  {
    id: 3,
    rank: 3,
    type: '达人',
    title: '三步搞定卷发，早八也能出门',
    product: '负离子速干卷发棒',
    author: '@hairwithnaomi',
    thumbnail: IMG('photo-1522337360788-8b13dee7a37e'),
    views: '689.4K',
    growth: 121,
    likes: '54.2K',
    estimatedGMV: '$142.8K',
    hook: '早八通勤场景痛点明确，前后对比强烈，教程型内容完播率高。',
    reasons: ['前后对比反差大，停留时长高', '教程结构清晰，收藏率突出', '美发品类复购与连带率强'],
    isFavorite: false,
  },
  {
    id: 4,
    rank: 4,
    type: '达人',
    title: '健身房实拍，一周喝水量翻倍',
    product: '大容量吸管运动水杯',
    author: '@fitwithmarcus',
    thumbnail: IMG('photo-1602143407151-7111542de6e8'),
    views: '612.7K',
    growth: 108,
    likes: '46.9K',
    estimatedGMV: '$98.3K',
    hook: '健康饮水话题长期稳定，健身场景带动实用属性，低客单易冲动下单。',
    reasons: ['健身场景真实，可信度高', '实用属性明确，无决策门槛', '颜色款式多，连带购买率高'],
    isFavorite: false,
  },
  {
    id: 5,
    rank: 5,
    type: '达人',
    title: '露营三天，这块电池救了全场',
    product: '户外便携储能电源',
    author: '@camp.with.tay',
    thumbnail: IMG('photo-1504280390367-361c6d9f38f4'),
    views: '548.2K',
    growth: 96,
    likes: '41.3K',
    estimatedGMV: '$213.5K',
    hook: '露营热度持续，高客单靠真实场景背书，转化虽慢但 GMV 贡献大。',
    reasons: ['露营场景叙事完整，代入感强', '解决续航焦虑，痛点足够硬', '高客单价拉动整体 GMV'],
    isFavorite: false,
  },

  /* ---- 商家自制 1-5 ---- */
  {
    id: 6,
    rank: 1,
    type: '商家',
    title: '再也不怕杯子出汗，桌面终于干净了',
    product: '防漏玻璃吸管杯',
    author: '@sipjoy_official',
    thumbnail: IMG('photo-1544145945-f90425340c7e'),
    views: '958.3K',
    growth: 179,
    likes: '71.4K',
    estimatedGMV: '$143.2K',
    hook: '商家自制强调产品细节演示，防漏测试画面直击痛点，成本低复制性强。',
    reasons: ['倒置防漏测试，说服力直接', '桌面美学契合家居审美趋势', '素材可批量复用，投产比高'],
    isFavorite: false,
  },
  {
    id: 7,
    rank: 2,
    type: '商家',
    title: '客厅光线终于对了，晚上不刺眼',
    product: '可调光护眼台灯',
    author: '@brighthome.co',
    thumbnail: IMG('photo-1507473885765-e6ed057f782c'),
    views: '689.3K',
    growth: 121,
    likes: '51.6K',
    estimatedGMV: '$94.8K',
    hook: '居家氛围类目稳定增长，明暗对比画面强，商家自制成本可控。',
    reasons: ['明暗对比拍摄，视觉差异明显', '护眼诉求覆盖学生与办公人群', '家居布景可反复使用'],
    isFavorite: false,
  },
  {
    id: 8,
    rank: 3,
    type: '商家',
    title: '厨房收纳前后对比，柜子多出一半空间',
    product: '可堆叠密封收纳罐',
    author: '@tidykitchenus',
    thumbnail: IMG('photo-1584622650111-993a426fbf0a'),
    views: '634.8K',
    growth: 112,
    likes: '48.2K',
    estimatedGMV: '$88.1K',
    hook: '收纳整理长期热门，前后对比是天然爆款结构，套装带动客单价。',
    reasons: ['前后对比结构，完播率稳定', '收纳需求全年无淡季', '套装销售拉高客单价'],
    isFavorite: false,
  },
  {
    id: 9,
    rank: 4,
    type: '商家',
    title: '三秒贴合手机，开车导航不再手忙脚乱',
    product: '磁吸车载手机支架',
    author: '@drivegear.shop',
    thumbnail: IMG('photo-1517336714731-489689fd1ca8'),
    views: '571.6K',
    growth: 104,
    likes: '43.7K',
    estimatedGMV: '$76.4K',
    hook: '车载配件刚需，安装演示短平快，适合高频投放素材。',
    reasons: ['三秒完成演示，节奏干脆', '驾驶安全话题易引发共鸣', '低客单价，转化路径短'],
    isFavorite: false,
  },
  {
    id: 10,
    rank: 5,
    type: '商家',
    title: '宠物掉毛救星，沙发一遍就干净',
    product: '静电除毛滚筒刷',
    author: '@petcarelab',
    thumbnail: IMG('photo-1425082661705-1834bfd09dca'),
    views: '498.5K',
    growth: 98,
    likes: '38.4K',
    estimatedGMV: '$62.9K',
    hook: '宠物家庭痛点明确，清洁效果可视化强，属于典型低价高频品。',
    reasons: ['清洁效果肉眼可见，说服力强', '宠物人群规模大且愿意付费', '低价高频，复购稳定'],
    isFavorite: false,
  },

  /* ---- AI 生成 1-5 ---- */
  {
    id: 11,
    rank: 1,
    type: 'AI',
    title: '一面墙变成家庭影院，只用了这台',
    product: '迷你智能投影仪',
    author: '@future.finds',
    thumbnail: IMG('photo-1478720568477-152d9b164e26'),
    views: '815.6K',
    growth: 156,
    likes: '63.2K',
    estimatedGMV: '$126.7K',
    hook: 'AI 生成场景补足实拍难度，家庭影院想象空间大，高客单靠氛围驱动。',
    reasons: ['AI 场景渲染放大使用想象', '家庭娱乐升级需求持续增长', '高客单价带来可观 GMV'],
    isFavorite: false,
  },
  {
    id: 12,
    rank: 2,
    type: 'AI',
    title: '桌面一秒变太空舱，同事都问链接',
    product: '氛围投影小夜灯',
    author: '@ai.deskscape',
    thumbnail: IMG('photo-1534073828943-f801091bb18c'),
    views: '723.4K',
    growth: 138,
    likes: '58.1K',
    estimatedGMV: '$71.5K',
    hook: '氛围感产品适合 AI 表现，视觉冲击直接决定完播，价格带友好。',
    reasons: ['AI 视觉冲击强，前三秒抓人', '桌面氛围是社交货币型消费', '低客单价，冲动购买占比高'],
    isFavorite: false,
  },
  {
    id: 13,
    rank: 3,
    type: 'AI',
    title: '出差第三天，衬衫还是平整的',
    product: '折叠便携挂烫机',
    author: '@travel.gear.ai',
    thumbnail: IMG('photo-1553062407-98eeb64c6a62'),
    views: '667.2K',
    growth: 127,
    likes: '52.8K',
    estimatedGMV: '$103.9K',
    hook: '差旅场景用 AI 补拍成本低，痛点清晰，商务人群付费能力强。',
    reasons: ['差旅场景连续叙事，代入感强', '商务人群客单价接受度高', 'AI 补拍降低素材成本'],
    isFavorite: false,
  },
  {
    id: 14,
    rank: 4,
    type: 'AI',
    title: '早餐从十分钟压缩到三分钟',
    product: '多功能早餐三明治机',
    author: '@kitchen.ai.daily',
    thumbnail: IMG('photo-1466637574441-749b8f19452f'),
    views: '592.8K',
    growth: 115,
    likes: '45.6K',
    estimatedGMV: '$84.2K',
    hook: '效率型厨房小家电稳定出单，AI 生成流程演示节奏紧凑。',
    reasons: ['省时痛点直击上班族', '流程演示节奏紧凑，完播高', '厨房小家电全年需求稳定'],
    isFavorite: false,
  },
  {
    id: 15,
    rank: 5,
    type: 'AI',
    title: '睡前十分钟，肩颈终于松了',
    product: '颈部热敷按摩仪',
    author: '@wellness.render',
    thumbnail: IMG('photo-1544367567-0f2fcb009e0b'),
    views: '534.1K',
    growth: 102,
    likes: '40.7K',
    estimatedGMV: '$118.6K',
    hook: '久坐人群基数庞大，放松场景适合 AI 表现，高客单转化靠情绪价值。',
    reasons: ['久坐肩颈痛点覆盖面极广', '放松氛围渲染带动情绪购买', '客单价较高，GMV 表现好'],
    isFavorite: false,
  },
]

/* ================= 12 条每日新品 ================= */

export const MOCK_PRODUCTS: NewProduct[] = [
  {
    id: 101, rank: 1, product: '冰感速干运动毛巾', title: '高温季节持续走量，健身房场景渗透快',
    brand: 'CoolFiber', thumbnail: IMG('photo-1517836357463-d25dfeac3438'),
    estimatedSales: '38.9K', relatedVideos: '412', growth: 214, price: '$12.99', estimatedGMV: '$505.2K',
    hook: '夏季运动降温需求集中释放，低客单高频复购，适合新手快速起量。',
    reasons: ['季节性需求集中，起量速度快', '低客单价，转化门槛低', '健身达人素材充足'],
    isFavorite: false,
  },
  {
    id: 102, rank: 2, product: '猫咪自动喂食器', title: '养宠人群外出刚需，客单价稳定',
    brand: 'PetEase', thumbnail: IMG('photo-1514888286974-6c03e2ca1dba'),
    estimatedSales: '21.4K', relatedVideos: '268', growth: 168, price: '$45.90', estimatedGMV: '$982.3K',
    hook: '宠物智能硬件持续增长，外出喂养痛点明确，客单价与利润空间兼顾。',
    reasons: ['宠物经济长期上行', '外出喂养痛点刚性', '中高客单，利润空间充足'],
    isFavorite: false,
  },
  {
    id: 103, rank: 3, product: '磁吸无线充电宝', title: '苹果生态配件持续放量',
    brand: 'MagPow', thumbnail: IMG('photo-1609091839311-d5365f9ff1c5'),
    estimatedSales: '29.7K', relatedVideos: '531', growth: 152, price: '$29.99', estimatedGMV: '$890.6K',
    hook: '磁吸生态配件需求稳定，出行场景高频，视频素材易复制。',
    reasons: ['苹果生态用户付费意愿强', '出行场景高频刚需', '素材制作门槛低'],
    isFavorite: false,
  },
  {
    id: 104, rank: 4, product: '厨房隔油沥水架', title: '收纳类目稳定出单，评论区自发种草',
    brand: 'TidyKit', thumbnail: IMG('photo-1556909212-d5b604d0c90d'),
    estimatedSales: '18.2K', relatedVideos: '196', growth: 141, price: '$18.50', estimatedGMV: '$336.7K',
    hook: '厨房整理需求全年无淡季，前后对比结构天然适合短视频。',
    reasons: ['收纳需求全年稳定', '前后对比内容易爆', '低价高频，复购良好'],
    isFavorite: false,
  },
  {
    id: 105, rank: 5, product: '便携电动剃须刀', title: '男性个护稳步上升，礼赠场景明确',
    brand: 'SharpGo', thumbnail: IMG('photo-1621607512214-68297480165e'),
    estimatedSales: '16.8K', relatedVideos: '174', growth: 133, price: '$34.99', estimatedGMV: '$587.7K',
    hook: '男性个护类目竞争相对温和，礼赠场景在节点期爆发力强。',
    reasons: ['男性个护竞争相对分散', '礼赠场景节点爆发', '客单价适中，利润可观'],
    isFavorite: false,
  },
  {
    id: 106, rank: 6, product: '折叠露营月亮椅', title: '户外场景热度延续，高客单高 GMV',
    brand: 'MoonRest', thumbnail: IMG('photo-1537225228614-56cc3556d7ed'),
    estimatedSales: '9.6K', relatedVideos: '148', growth: 128, price: '$79.00', estimatedGMV: '$758.4K',
    hook: '露营热度延续，高客单产品靠场景氛围驱动，GMV 贡献显著。',
    reasons: ['户外露营热度延续', '场景氛围强，适合种草', '高客单显著拉动 GMV'],
    isFavorite: false,
  },
  {
    id: 107, rank: 7, product: '智能体脂秤', title: '健康管理需求稳定，数据可视化易传播',
    brand: 'FitScale', thumbnail: IMG('photo-1571019613454-1cb2f99b2d8b'),
    estimatedSales: '14.3K', relatedVideos: '203', growth: 119, price: '$26.99', estimatedGMV: '$385.9K',
    hook: '健康管理长期需求，App 数据可视化内容天然具备传播性。',
    reasons: ['健康管理需求长期存在', '数据可视化内容易传播', '客单价适中，决策轻'],
    isFavorite: false,
  },
  {
    id: 108, rank: 8, product: '车载迷你吸尘器', title: '车主人群刚需，清洁效果可视化',
    brand: 'AutoClean', thumbnail: IMG('photo-1552519507-da3b142c6e3d'),
    estimatedSales: '17.5K', relatedVideos: '221', growth: 112, price: '$21.99', estimatedGMV: '$384.7K',
    hook: '车内清洁痛点明确，效果对比画面直接，属于稳定走量款。',
    reasons: ['车主基数大，痛点明确', '清洁效果可视化强', '价格带友好，冲动购买多'],
    isFavorite: false,
  },
  {
    id: 109, rank: 9, product: '硅胶折叠沥水篮', title: '厨房小工具，低价高频复购',
    brand: 'FlexKitchen', thumbnail: IMG('photo-1590794056226-79ef3a8147e1'),
    estimatedSales: '22.1K', relatedVideos: '164', growth: 106, price: '$9.99', estimatedGMV: '$220.8K',
    hook: '厨房小工具低价高频，折叠演示画面短平快，适合批量铺素材。',
    reasons: ['低价高频，转化门槛极低', '折叠演示视觉记忆点强', '素材可批量生产'],
    isFavorite: false,
  },
  {
    id: 110, rank: 10, product: '香薰加湿一体机', title: '居家氛围类目，颜值驱动购买',
    brand: 'AromaMist', thumbnail: IMG('photo-1602928321679-560bb453f190'),
    estimatedSales: '13.7K', relatedVideos: '187', growth: 101, price: '$32.50', estimatedGMV: '$445.3K',
    hook: '居家氛围产品靠颜值和使用画面驱动，社交属性强。',
    reasons: ['颜值驱动，视觉表现力强', '居家氛围是社交货币', '中等客单，利润稳定'],
    isFavorite: false,
  },
  {
    id: 111, rank: 11, product: '儿童防摔水杯', title: '母婴人群稳定复购，安全诉求明确',
    brand: 'KidSip', thumbnail: IMG('photo-1595246140625-573b715d11dc'),
    estimatedSales: '15.9K', relatedVideos: '142', growth: 97, price: '$16.99', estimatedGMV: '$270.1K',
    hook: '母婴人群对安全诉求敏感，复购稳定，测试类内容可信度高。',
    reasons: ['安全诉求刚性，家长愿付费', '防摔测试内容可信度高', '复购频次稳定'],
    isFavorite: false,
  },
  {
    id: 112, rank: 12, product: '桌面无线键鼠套装', title: '居家办公升级，套装拉高客单',
    brand: 'DeskFlow', thumbnail: IMG('photo-1587829741301-dc798b83add3'),
    estimatedSales: '8.9K', relatedVideos: '119', growth: 93, price: '$52.00', estimatedGMV: '$462.8K',
    hook: '居家办公场景持续存在，套装形式天然拉高客单价。',
    reasons: ['居家办公需求长期存在', '套装形式拉高客单价', '桌面美学内容易传播'],
    isFavorite: false,
  },
]

/* ================= 工具函数 ================= */

/** "1.2M" / "958.3K" → 数值，用于排序 */
export function parseCount(s: string): number {
  const n = parseFloat(s.replace(/[^\d.]/g, ''))
  if (Number.isNaN(n)) return 0
  if (s.includes('M')) return n * 1_000_000
  if (s.includes('K')) return n * 1_000
  return n
}

/** "$187.6K" → 数值 */
export function parseMoney(s: string): number {
  return parseCount(s.replace('$', ''))
}
