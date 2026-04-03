export interface VideoProduct {
  id: string
  title: string
  slug: string
  coverImage: string
  videoUrl: string
  category: string
  tags: string[]
  shortDescription: string
  punchline: string
  roi: string
  beginnerFriendly: boolean
  analysis: {
    whyViral: string[]
    marketSize: string
    competitionLevel: '低' | '中' | '高'
    profitMargin: string
    trendScore: number
  }
  verdict: {
    recommendation: number
    shouldDo: boolean
    targetSeller: string
    contentApproach: string
    riskLevel: '低' | '中' | '高'
  }
  targetAudience: string[]
  contentStrategy: string[]
  riskNotes: string[]
  content_type?: string | null
  video_source_type?: string | null
  video_file_url?: string | null
  isFeatured: boolean
  viewCount: number
  likeCount: number
  publishedAt: string
}

export const mockVideos: VideoProduct[] = [
  {
    id: '1',
    title: '迷你便携榨汁杯：30秒出杯，TikTok单周销售破万单',
    slug: 'mini-portable-juicer-cup',
    coverImage: 'https://images.unsplash.com/photo-1622597467836-f3e6707b5699?w=600&h=800&fit=crop',
    videoUrl: '',
    category: '厨房好物',
    tags: ['便携', '健康生活', '爆款', '高复购'],
    shortDescription: '无线充电底座 + 一键榨汁，30秒做好一杯果汁。主打"懒人健康"，完美契合 TikTok 健康生活赛道。',
    punchline: '30秒出杯，懒人健康赛道天花板级爆款，单周破万单已验证',
    roi: 'ROI 3.2x',
    beginnerFriendly: true,
    analysis: {
      whyViral: [
        '视觉冲击强：榨汁过程颜色鲜艳，拍摄出来天然好看',
        '演示感强：30秒出杯，整个过程可以完整展示在短视频里',
        '痛点精准：外出健身、办公室都能用，打中白领和健身人群',
        '价格区间友好：客单价$25-35，用户决策门槛低'
      ],
      marketSize: '全球便携榨汁机市场规模超 $15亿，年增长率 8.5%',
      competitionLevel: '中',
      profitMargin: '55%-65%',
      trendScore: 92
    },
    verdict: {
      recommendation: 92,
      shouldDo: true,
      targetSeller: '有一定内容基础的卖家，健康生活赛道新手也可快速切入',
      contentApproach: '颜色冲击开场 + 懒人场景痛点共鸣 + 30秒出杯完整演示',
      riskLevel: '中'
    },
    targetAudience: [
      '25-35岁城市白领，关注健康但没时间做复杂饮食',
      '健身人群，需要运动后快速补充营养',
      '学生党，宿舍场景使用',
      '礼品采购场景：生日、节日送礼'
    ],
    contentStrategy: [
      '开头3秒：直接展示颜色鲜艳的水果被吸入并瞬间出汁的画面',
      '痛点共鸣：外出想喝新鲜果汁但买不到 → 这个杯子解决问题',
      'Before/After：对比瓶装果汁和自制的新鲜度差异',
      '结尾CTA：限时折扣 + 评论区留言截图送优惠券'
    ],
    riskNotes: [
      '电机类产品需注意目标市场的电压兼容性（110V vs 220V）',
      '刀片属于敏感品类，部分平台需要额外审核',
      '复购率虽高，但需要持续更新视频内容维持曝光'
    ],
    isFeatured: true,
    viewCount: 2800000,
    likeCount: 186000,
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    title: '磁吸手机支架折叠钱包：极简 EDC 必备，爆单 3 个月',
    slug: 'magsafe-wallet-phone-stand',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
    videoUrl: '',
    category: '数码配件',
    tags: ['MagSafe', '极简', '男生好物', '高客单'],
    shortDescription: '磁吸贴合手机背面，内置3张卡位，支持折叠立架。主打极简男性 EDC 场景，在 TikTok 科技赛道持续爆单。',
    punchline: '磁吸一秒贴合，男性EDC领域持续爆单3个月，ASMR感天然吸流',
    roi: 'ROI 2.8x',
    beginnerFriendly: false,
    analysis: {
      whyViral: [
        '磁吸吸附画面非常满足，ASMR 感强，天然适合短视频',
        '场景切换展示流畅：付款 → 看视频 → 收纳，一个产品多场景',
        '男性消费者愿意为"有设计感的东西"溢价',
        '可以蹭 Apple MagSafe 生态流量，自带搜索热度'
      ],
      marketSize: '手机周边配件市场年销售额超 $800亿',
      competitionLevel: '中',
      profitMargin: '60%-70%',
      trendScore: 88
    },
    verdict: {
      recommendation: 88,
      shouldDo: true,
      targetSeller: '男性科技类内容创作者，需要一定审美和拍摄能力',
      contentApproach: '极简对比开场 + MagSafe吸附ASMR瞬间 + 日常EDC场景跟拍',
      riskLevel: '中'
    },
    targetAudience: [
      '20-35岁男性，追求极简生活方式',
      'iPhone 12及以上用户（MagSafe兼容）',
      '商务人士，减少携带钱包的负担',
      '科技爱好者，喜欢新奇配件'
    ],
    contentStrategy: [
      '开头展示传统厚钱包 vs 这款产品的极简对比',
      '展示磁吸吸上去的瞬间，配合清脆音效',
      '日常 vlog 风格：早上出门只带手机就够了',
      '用户证言：真实买家展示自己的使用场景'
    ],
    riskNotes: [
      '需确认目标地区信用卡RFID屏蔽法规',
      '磁力可能影响部分老款银行卡磁条，需在描述中说明',
      '同类产品多，需要在品质和颜值上做差异化'
    ],
    isFeatured: true,
    viewCount: 1500000,
    likeCount: 98000,
    publishedAt: '2024-01-22'
  },
  {
    id: '3',
    title: '硅藻泥速干浴室地垫：踩上去不湿脚，宝妈圈狂转',
    slug: 'diatomite-bath-mat',
    coverImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&h=800&fit=crop',
    videoUrl: '',
    category: '家居生活',
    tags: ['宝妈必备', '防滑', '速干', '高复购'],
    shortDescription: '硅藻土天然快速吸水，站上去3秒脚底全干。拍摄效果极好，在家居赛道TikTok长期稳居爆款榜。',
    punchline: '倒水瞬间消失，宝妈圈口碑裂变最强，家居赛道永久长红品',
    roi: 'ROI 2.5x',
    beginnerFriendly: true,
    analysis: {
      whyViral: [
        '水渍消失的画面极具满足感，天然适合做"Before/After"内容',
        '宝妈群体分享欲极强，口碑裂变效率高',
        '解决真实痛点：洗澡后湿脚踩到地板是普遍困扰',
        '价格带宽，$15-45都有市场，可以分层运营'
      ],
      marketSize: '家居浴室用品市场规模$600亿+，刚需高频',
      competitionLevel: '低',
      profitMargin: '50%-60%',
      trendScore: 85
    },
    verdict: {
      recommendation: 85,
      shouldDo: true,
      targetSeller: '宝妈、家居类创作者，零基础新手友好，直接复制打法即可',
      contentApproach: '倒水消失视觉奇观 + 普通地垫对比测评 + 速干过程慢动作',
      riskLevel: '低'
    },
    targetAudience: [
      '有孩子的家庭，注重家居安全和整洁',
      '租房一族，希望提升生活品质',
      '注重家居美感的年轻女性',
      '老年群体，需要防滑安全保障'
    ],
    contentStrategy: [
      '核心视频：把一杯水倒在垫子上，10秒内消失，震撼效果',
      '对比视频：普通地垫 vs 硅藻泥地垫，吸水速度差异',
      '生活场景：展示早晨洗漱后的浴室整洁感',
      '清洁教程：如何正确打磨恢复吸水性（增加信任感）'
    ],
    riskNotes: [
      '硅藻泥产品质量差异大，需要严格把控供应商',
      '运输过程易碎，需要注意包装和退换货率',
      '部分消费者对"天然材料"有过高期待，需在描述中设定合理预期'
    ],
    isFeatured: true,
    viewCount: 3200000,
    likeCount: 245000,
    publishedAt: '2024-02-01'
  },
  {
    id: '4',
    title: '迷你冷热两用化妆品冰箱：美妆博主同款，开箱即爆',
    slug: 'mini-skincare-fridge',
    coverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop',
    videoUrl: '',
    category: '美妆工具',
    tags: ['美妆博主', '护肤', '开箱爆款', '礼品'],
    shortDescription: '4升容量，可冷可热，专为护肤品设计。美妆博主最爱开箱道具，在TikTok美妆赛道屡次登上爆款榜。',
    punchline: '开箱即爆，美妆博主必备道具，节日礼品属性让销量自带峰值',
    roi: 'ROI 2.4x',
    beginnerFriendly: false,
    analysis: {
      whyViral: [
        '颜值极高，透明门板展示护肤品排列，画面精致',
        '美妆博主的"战利品"展示内容天然适合这个产品',
        '冷藏护肤品能延长保质期的"专业感"说法受众买单',
        '礼品属性强，节日前后销量暴增'
      ],
      marketSize: '美容护肤设备市场年增长超20%，Mini冰箱是新兴品类',
      competitionLevel: '中',
      profitMargin: '45%-55%',
      trendScore: 90
    },
    verdict: {
      recommendation: 90,
      shouldDo: true,
      targetSeller: '美妆类博主或礼品选手，需要具备一定颜值布景能力',
      contentApproach: '开箱展示 + 护肤品按颜色排列填仓仪式感 + before/after化妆台对比',
      riskLevel: '中'
    },
    targetAudience: [
      '18-30岁女性美妆爱好者',
      '护肤品收藏者，有大量护肤品需要收纳',
      '想要精致化妆台布置的内容创作者',
      '节日送礼场景'
    ],
    contentStrategy: [
      '开箱视频：拆箱过程 + 第一次装满护肤品的"填仓"满足感',
      '排列收纳：把各种护肤品按颜色排列，高颜值画面',
      'Before/After：普通化妆台 vs 有Mini冰箱的精致化妆台',
      '功能展示：实测冷藏效果 + 面膜冰敷效果对比'
    ],
    riskNotes: [
      '电器类产品海外销售需要当地认证（CE、UL等）',
      '制冷效果受环境温度影响，北方冬季效果有限',
      '同类产品外观高度相似，需要在品牌故事上做差异化'
    ],
    isFeatured: false,
    viewCount: 2100000,
    likeCount: 167000,
    publishedAt: '2024-02-10'
  },
  {
    id: '5',
    title: '手持式衣物去毛球器：衣服起球救星，中老年群体刚需',
    slug: 'electric-lint-remover',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
    videoUrl: '',
    category: '家居生活',
    tags: ['刚需', '中老年', '高复购', '爆点明显'],
    shortDescription: '5秒剃掉衣物起球，结果立竿见影。在TikTok"改造旧衣服"内容赛道是永久爆款品类，复购率极高。',
    punchline: '5秒旧衣变新，全品类中最易拍爆款 + 利润率最高，新手首选',
    roi: 'ROI 4.1x',
    beginnerFriendly: true,
    analysis: {
      whyViral: [
        '效果立竿见影，剃球过程视觉满足感极强（类ASMR）',
        '每个人都有几件起球的旧衣服，痛点100%覆盖',
        '"旧衣新生"的内容角度，环保概念加分',
        '产品简单，视频内容门槛低，素人也能轻松拍出爆款'
      ],
      marketSize: '家居护理产品市场稳定，刚需品复购率高达40%+',
      competitionLevel: '低',
      profitMargin: '65%-75%',
      trendScore: 87
    },
    verdict: {
      recommendation: 87,
      shouldDo: true,
      targetSeller: '最适合新手的入门品，任何人都能拍出效果，直接套公式',
      contentApproach: '起球旧衣5秒修复强对比 + "旧衣救活挑战"互动UGC裂变',
      riskLevel: '低'
    },
    targetAudience: [
      '40岁以上中老年群体，注重节俭和物品保养',
      '有孩子的家庭，儿童衣物容易起球',
      '快时尚消费者，希望延长衣物使用寿命',
      '对生活品质有要求的精致女性'
    ],
    contentStrategy: [
      '直接展示：满是球球的毛衣 → 5秒后光滑如新的强烈对比',
      '"旧衣救活挑战"：翻出家里最旧的衣服挑战修复',
      '测评不同材质效果：毛衣、外套、裤子分别测试',
      '用户UGC：鼓励买家拍自己的使用效果并@你'
    ],
    riskNotes: [
      '刀头质量参差不齐，低质产品可能损坏衣物纤维',
      '需要做好售前说明：某些精细面料不适合使用',
      '电池续航是常见投诉点，选品时重点考察'
    ],
    isFeatured: false,
    viewCount: 4500000,
    likeCount: 312000,
    publishedAt: '2024-02-18'
  },
  {
    id: '6',
    title: '自动猫咪饮水机：流动活水，宠物健康必备神器',
    slug: 'cat-water-fountain-auto',
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=800&fit=crop',
    videoUrl: '',
    category: '宠物用品',
    tags: ['宠物经济', '猫咪', '健康', '高客单复购'],
    shortDescription: '循环过滤流动水，猫咪主动喝水频率提升3倍。宠物赛道TikTok长红品类，铲屎官群体自发传播极强。',
    punchline: '猫咪喝水画面完播率最高，铲屎官自发传播无需投流即爆',
    roi: 'ROI 3.0x',
    beginnerFriendly: false,
    analysis: {
      whyViral: [
        '猫咪喝水的画面天然可爱，视频完播率极高',
        '宠物主人的焦虑痛点：猫咪不爱喝水导致肾病',
        '铲屎官分享欲极强，UGC内容质量高',
        '宠物经济持续高增长，消费者愿意为宠物付高溢价'
      ],
      marketSize: '全球宠物用品市场超$2000亿，宠物食品&健康是增速最快的板块',
      competitionLevel: '中',
      profitMargin: '50%-60%',
      trendScore: 91
    },
    verdict: {
      recommendation: 91,
      shouldDo: true,
      targetSeller: '宠物博主或有猫的创作者，需要能持续产出萌宠内容',
      contentApproach: '猫咪初见饮水机好奇过程 + 肾脏健康科普 + 喝水次数数据对比',
      riskLevel: '中'
    },
    targetAudience: [
      '18-35岁城市养猫一族，视猫为家人',
      '多猫家庭，需要更省心的自动化工具',
      '注重宠物健康的新手铲屎官',
      '宠物博主，视频道具需求'
    ],
    contentStrategy: [
      '萌宠内容：记录猫咪第一次发现并靠近饮水机的好奇过程',
      '科普内容：猫咪不喝静水 → 流动水模拟自然环境 → 促进肾脏健康',
      '对比视频：安装前后猫咪喝水次数的数据对比',
      '清洁教程：展示滤芯更换过程，增强用户信任'
    ],
    riskNotes: [
      '过滤芯需要定期更换，需建立耗材复购体系',
      '噪音问题是差评重灾区，选品时实测噪音分贝',
      '部分猫咪个性保守，不接受新设备，需在退换货政策上做好预案'
    ],
    isFeatured: true,
    viewCount: 1900000,
    likeCount: 143000,
    publishedAt: '2024-02-25'
  }
]

export const categories = ['全部', '厨房好物', '数码配件', '家居生活', '美妆工具', '宠物用品']

export const allTags = ['便携', '健康生活', '爆款', '高复购', 'MagSafe', '极简', '男生好物', '高客单', '宝妈必备', '防滑', '速干', '美妆博主', '护肤', '开箱爆款', '礼品', '刚需', '中老年', '爆点明显', '宠物经济', '猫咪', '健康']

export const getFeaturedVideos = () => mockVideos.filter(v => v.isFeatured)

export const getVideoBySlug = (slug: string) => mockVideos.find(v => v.slug === slug)

export const getVideosByCategory = (category: string) =>
  category === '全部' ? mockVideos : mockVideos.filter(v => v.category === category)

export const formatViewCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
  return count.toString()
}
