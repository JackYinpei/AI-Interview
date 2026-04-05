export const portfolioContent = {
  zh: {
    locale: 'zh-CN',
    brand: 'Jack Yinpei',
    header: {
      githubLabel: 'GitHub',
      languageAriaLabel: '切换站点语言',
    },
    switcher: {
      zh: '中文',
      en: 'EN',
    },
    nav: [
      { href: '#work', label: '作品' },
      { href: '#systems', label: '能力' },
      { href: '#writing', label: '创作' },
      { href: '/journal', label: '博客' },
      { href: '/reading', label: '书架' },
      { href: '#connect', label: '联系' },
    ],
    hero: {
      eyebrow: 'FULL-STACK DEVELOPER / AI PRODUCT BUILDER / NARRATIVE SYSTEMS',
      lead: '做能被',
      accentA: '观看',
      middle: '、能被',
      accentB: '聆听',
      tail: '也能被续写的产品。',
      description:
        '我把媒体下载链路、AI 音频交互和叙事设计放进同一套产品方法里。关心的不只是功能上线，而是从输入、处理、分发到最终体验，整条链路是否足够顺。',
      primaryCta: '查看项目',
      secondaryCta: '进入 GitHub',
      highlightTitle: '当前关注',
      highlights: [
        {
          title: '媒体管线',
          text: '把 magnet、下载任务、海报元数据和 S3 播放链路接到一起。',
        },
        {
          title: 'AI 音频体验',
          text: '用端到端音频模型和新闻对话，把“练语言”做成更自然的输入方式。',
        },
        {
          title: '叙事系统',
          text: '先定义世界观和主要矛盾，再让 AI 在明确约束下扩写故事。',
        },
      ],
      quickFacts: [
        { label: '作品形态', value: 'Web App / 小程序 / OSS / Fiction' },
        { label: '公开入口', value: 'GitHub Profile + LingDaily Repo' },
      ],
      stats: [
        { value: 'Magnet2Video', label: '媒体下载与播放系统' },
        { value: 'WeChat Music', label: 'Spotify 风格小程序' },
        { value: 'LingDaily', label: '新闻对话学语言' },
        { value: 'AI Fiction', label: '世界观驱动写作' },
      ],
    },
    work: {
      eyebrow: 'SELECTED WORK',
      title: '四种不同形态的产品实践',
      description:
        '网站、小程序、开源项目和创作流程虽然表面不同，但我做的始终是同一件事：把复杂系统整理成更自然的体验。',
    },
    projects: [
      {
        slug: 'magnet2video',
        label: 'Web App',
        status: 'Private Product',
        title: 'Magnet2Video',
        description:
          '用户先拿到 magnet，再提交到网站；后端服务器负责下载到本地、整理资源并上传到 S3，让后续在线播放更稳定、更流畅。',
        details: [
          '把“提交资源、等待下载、转存对象存储、开始观看”整合成一条连续流程。',
          '支持用户直接上传海报，也支持通过 IMDB 号自动找到更合适的封面。',
          '重点不只是下载成功，而是把资源组织、元数据补齐和播放体验都做完整。',
        ],
        stack: ['Next.js', 'Node.js', 'Torrent Jobs', 'AWS S3', 'IMDB Metadata'],
        metrics: ['Magnet Intake', 'Poster Automation', 'S3 Streaming'],
        link: { href: '#connect', label: '聊聊这个系统' },
        visual: 'magnet',
      },
      {
        slug: 'wechat-music',
        label: 'Mini Program',
        status: 'Mobile Listening',
        title: 'Spotify-style WeChat Music Player',
        description:
          '一个偏 Spotify 风格的微信小程序音乐播放器，重点在歌单组织、播放状态、封面层次和移动端沉浸式聆听体验。',
        details: [
          '把熟悉的流媒体交互节奏翻译到微信小程序环境里，而不是简单复刻网页播放器。',
          '围绕触屏手势、播放中的状态切换和列表浏览效率设计信息层级。',
          '关注的是“像播放器”还不够，还要像一个真正让人愿意停留的播放器。',
        ],
        stack: ['WeChat Mini Program', 'Audio APIs', 'Playlist UX', 'Mobile Interaction'],
        metrics: ['Now Playing', 'Playlist Flow', 'Small-screen Rhythm'],
        link: { href: '#connect', label: '查看更多作品说明' },
        visual: 'music',
      },
      {
        slug: 'lingdaily',
        label: 'Open Source',
        status: 'GitHub Repository',
        title: 'LingDaily',
        description:
          '一个让用户通过和 AI 聊今天的新闻来学习语言的开源项目。核心亮点是端到端音频模型，以及新闻、生字词的自动抽取能力。',
        details: [
          '把“读新闻”改造成“围绕新闻进行真实对话”，降低语言学习的进入门槛。',
          '利用音频优先的交互方式，让输入更接近日常开口表达，而不是只靠文本。',
          '把新闻内容、词汇提取和对话节奏组合成完整学习闭环。',
        ],
        stack: ['OpenAI Audio', 'News Pipeline', 'Vocabulary Extraction', 'Conversation Design'],
        metrics: ['Speech-first', 'Daily News', 'Language Practice'],
        link: { href: 'https://lingdaily.yasobi.xyz/', label: '打开 LingDaily' },
        visual: 'lingdaily',
      },
      {
        slug: 'ai-fiction',
        label: 'Creative Practice',
        status: 'Human-led / AI-assisted',
        title: 'AI-assisted Fiction',
        description:
          '我的写作不是直接让 AI 代写，而是先由我设计小说世界观、主要矛盾和人物驱动，再让 AI 在这些边界内继续展开。',
        details: [
          '世界规则、冲突结构和叙事方向由人先定，AI 负责提高延展速度和版本探索效率。',
          '提示词更像叙事控制面板，而不是把判断权完全交给模型。',
          '最终目标不是“生成一篇文”，而是建立一套可以持续推进的创作工作流。',
        ],
        stack: ['Worldbuilding', 'Conflict Design', 'AI Continuation', 'Editing Passes'],
        metrics: ['Lore System', 'Character Tension', 'Narrative Control'],
        link: { href: '#writing', label: '看创作方法' },
        visual: 'fiction',
      },
    ],
    systems: {
      eyebrow: 'CORE COMPETENCIES',
      title: '我通常从三层同时思考产品',
      description:
        '既看系统怎么跑，也看界面怎么被感知，最后还要看用户如何记住它。对我来说，工程和叙事不是两件分开的事。',
      pillars: [
        {
          title: 'Pipeline Thinking',
          description: '把输入、处理、存储和分发当成一条产品链，而不是四个孤立模块。',
          items: ['Media ingestion', 'Async jobs', 'Storage delivery', 'Playback continuity'],
        },
        {
          title: 'Voice-first UX',
          description: '当交互从文本转向语音，界面节奏、反馈时机和容错方式都要重写。',
          items: ['Speech input', 'Audio response', 'News conversation', 'Learning loop'],
        },
        {
          title: 'Narrative Control',
          description: '不管是应用还是小说，都需要世界规则、角色关系和长期可扩展性。',
          items: ['Worldbuilding', 'Conflict mapping', 'Prompt constraints', 'Editorial review'],
        },
      ],
    },
    writing: {
      eyebrow: 'WRITING SYSTEM',
      title: '创作是我处理复杂度的另一种方式',
      description:
        '写小说这件事，反过来也影响我做产品。我会先建立边界，再让系统在边界内自由生长；这套思路对 AI 协作尤其有效。',
      quote: '先定义世界，再让模型在世界里行动。',
      processTitle: '创作流程',
      steps: [
        {
          index: '01',
          title: '世界观与矛盾先行',
          text: '先搭建时代背景、规则与主要冲突，保证每一次续写都有可追溯的依据。',
        },
        {
          index: '02',
          title: '给 AI 明确边界',
          text: '控制人物动机、情节范围和语气基调，让生成结果始终服务于作品目标。',
        },
        {
          index: '03',
          title: '人工回收与重写',
          text: '把 AI 的扩写结果重新整理、删减、合并，恢复章节节奏和叙事张力。',
        },
      ],
      cards: [
        {
          eyebrow: 'Archive',
          title: 'World Bible',
          text: '记录世界规则、阵营关系和不可打破的底层设定。',
        },
        {
          eyebrow: 'Tension',
          title: 'Conflict Board',
          text: '拆出长期矛盾、阶段目标和人物选择的代价。',
        },
        {
          eyebrow: 'Loop',
          title: 'Continuation Loop',
          text: 'AI 提案，人类判断，再进入下一轮细化与改写。',
        },
      ],
    },
    connect: {
      eyebrow: 'CONNECT',
      title: '公开入口目前在 GitHub',
      description:
        '如果你想聊媒体基础设施、AI 音频产品、微信小程序体验，或者叙事驱动型应用，可以先从 GitHub 找到我。',
      links: [
        {
          href: 'https://github.com/JackYinpei',
          label: 'GitHub Profile',
          meta: '查看所有公开仓库与最近项目',
        },
        {
          href: 'https://github.com/JackYinpei/lingdaily',
          label: 'LingDaily Repo',
          meta: '开源语言学习项目，围绕新闻与语音对话',
        },
      ],
      footnote: '目前这是这个作品集的第一版，后续还会继续补充更多案例细节与视觉资产。',
    },
    footer: 'Bridging systems, audio, and narrative.',
  },
  en: {
    locale: 'en',
    brand: 'Jack Yinpei',
    header: {
      githubLabel: 'GitHub',
      languageAriaLabel: 'Switch site language',
    },
    switcher: {
      zh: '中文',
      en: 'EN',
    },
    nav: [
      { href: '#work', label: 'Work' },
      { href: '#systems', label: 'Systems' },
      { href: '#writing', label: 'Writing' },
      { href: '/journal', label: 'Blog' },
      { href: '/reading', label: 'Bookshelf' },
      { href: '#connect', label: 'Connect' },
    ],
    hero: {
      eyebrow: 'FULL-STACK DEVELOPER / AI PRODUCT BUILDER / NARRATIVE SYSTEMS',
      lead: 'I build products that can be',
      accentA: 'watched',
      middle: ',',
      accentB: 'heard',
      tail: 'and continuously re-authored.',
      description:
        'My work sits between media pipelines, AI audio interfaces, and narrative design. I care about the entire chain: input, processing, delivery, and the moment the user finally hits play.',
      primaryCta: 'See Projects',
      secondaryCta: 'Open GitHub',
      highlightTitle: 'Current Focus',
      highlights: [
        {
          title: 'Media Pipelines',
          text: 'Connecting magnet intake, download jobs, poster metadata, and S3 delivery into one usable system.',
        },
        {
          title: 'AI Audio UX',
          text: 'Turning news conversations and end-to-end audio models into a more natural language-learning flow.',
        },
        {
          title: 'Narrative Systems',
          text: 'Defining world rules and central conflicts first, then letting AI expand inside those constraints.',
        },
      ],
      quickFacts: [
        { label: 'Formats', value: 'Web App / Mini Program / OSS / Fiction' },
        { label: 'Public Entry', value: 'GitHub Profile + LingDaily Repo' },
      ],
      stats: [
        { value: 'Magnet2Video', label: 'media download and playback pipeline' },
        { value: 'WeChat Music', label: 'Spotify-style mini program' },
        { value: 'LingDaily', label: 'news-driven language learning' },
        { value: 'AI Fiction', label: 'worldbuilding-led writing workflow' },
      ],
    },
    work: {
      eyebrow: 'SELECTED WORK',
      title: 'Four different forms of product building',
      description:
        'A website, a mini program, an open-source product, and a writing workflow may look unrelated, but they all come from the same instinct: turning complex systems into more natural experiences.',
    },
    projects: [
      {
        slug: 'magnet2video',
        label: 'Web App',
        status: 'Private Product',
        title: 'Magnet2Video',
        description:
          'Users acquire a magnet link and submit it to the site. The back-end downloads the content, organizes the assets, and uploads them to S3 so playback can be smoother and more reliable.',
        details: [
          'The flow treats submission, download, storage, and playback as one continuous product experience.',
          'Users can upload custom posters or provide an IMDB ID so the system can find a more appropriate cover automatically.',
          'The point is not just “download succeeded,” but that metadata, catalog quality, and viewing experience all hold together.',
        ],
        stack: ['Next.js', 'Node.js', 'Torrent Jobs', 'AWS S3', 'IMDB Metadata'],
        metrics: ['Magnet Intake', 'Poster Automation', 'S3 Streaming'],
        link: { href: '#connect', label: 'Discuss the system' },
        visual: 'magnet',
      },
      {
        slug: 'wechat-music',
        label: 'Mini Program',
        status: 'Mobile Listening',
        title: 'Spotify-style WeChat Music Player',
        description:
          'A Spotify-inspired WeChat mini program focused on playlist structure, playback state, cover art hierarchy, and a more immersive mobile listening experience.',
        details: [
          'It translates streaming-native interaction patterns into the constraints of the WeChat mini program runtime.',
          'The information hierarchy is designed around touch gestures, queue awareness, and efficient browsing on small screens.',
          'The goal is not just to look like a player, but to feel like one people actually want to stay inside.',
        ],
        stack: ['WeChat Mini Program', 'Audio APIs', 'Playlist UX', 'Mobile Interaction'],
        metrics: ['Now Playing', 'Playlist Flow', 'Small-screen Rhythm'],
        link: { href: '#connect', label: 'See more context' },
        visual: 'music',
      },
      {
        slug: 'lingdaily',
        label: 'Open Source',
        status: 'GitHub Repository',
        title: 'LingDaily',
        description:
          'An open-source project that helps users learn a language by talking with AI about the day’s news. Its key strengths are end-to-end audio and automatic vocabulary extraction.',
        details: [
          'It reframes language learning around conversation instead of passive reading.',
          'Speech-first interaction brings practice closer to how people actually speak, not just how they type.',
          'News input, vocabulary mining, and AI dialogue are combined into one complete learning loop.',
        ],
        stack: ['OpenAI Audio', 'News Pipeline', 'Vocabulary Extraction', 'Conversation Design'],
        metrics: ['Speech-first', 'Daily News', 'Language Practice'],
        link: { href: 'https://lingdaily.yasobi.xyz/', label: 'Open LingDaily' },
        visual: 'lingdaily',
      },
      {
        slug: 'ai-fiction',
        label: 'Creative Practice',
        status: 'Human-led / AI-assisted',
        title: 'AI-assisted Fiction',
        description:
          'My fiction workflow does not start by asking AI to write everything. I define the worldbuilding, central conflict, and character drives first, then let AI continue inside that frame.',
        details: [
          'World rules, conflict structure, and narrative direction are owned by the human before expansion begins.',
          'Prompts act more like a narrative control panel than a substitute for judgment.',
          'The end goal is not a single generated text, but a workflow that can keep producing stronger chapters over time.',
        ],
        stack: ['Worldbuilding', 'Conflict Design', 'AI Continuation', 'Editing Passes'],
        metrics: ['Lore System', 'Character Tension', 'Narrative Control'],
        link: { href: '#writing', label: 'View the writing process' },
        visual: 'fiction',
      },
    ],
    systems: {
      eyebrow: 'CORE COMPETENCIES',
      title: 'I usually think about products on three layers at once',
      description:
        'I care about how the system runs, how the interface is perceived, and what kind of memory the product leaves behind. To me, engineering and narrative belong in the same conversation.',
      pillars: [
        {
          title: 'Pipeline Thinking',
          description: 'Treating input, processing, storage, and delivery as a product chain instead of isolated modules.',
          items: ['Media ingestion', 'Async jobs', 'Storage delivery', 'Playback continuity'],
        },
        {
          title: 'Voice-first UX',
          description: 'When interaction shifts from text to speech, timing, feedback, and error recovery all need new rules.',
          items: ['Speech input', 'Audio response', 'News conversation', 'Learning loop'],
        },
        {
          title: 'Narrative Control',
          description: 'Whether it is an app or a novel, world rules, relationship tension, and long-range extensibility still matter.',
          items: ['Worldbuilding', 'Conflict mapping', 'Prompt constraints', 'Editorial review'],
        },
      ],
    },
    writing: {
      eyebrow: 'WRITING SYSTEM',
      title: 'Writing is another way I handle complexity',
      description:
        'Fiction feeds back into my product work. I define boundaries first, then let the system grow inside them. That mindset becomes especially useful when collaborating with AI.',
      quote: 'Define the world first, then let the model act inside it.',
      processTitle: 'Workflow',
      steps: [
        {
          index: '01',
          title: 'World and conflict first',
          text: 'I establish era, rules, and central conflict before continuation so every expansion has something concrete to anchor to.',
        },
        {
          index: '02',
          title: 'Constrain the model clearly',
          text: 'Character motives, plot range, and tonal guardrails are specified so the output serves the story instead of drifting away from it.',
        },
        {
          index: '03',
          title: 'Human rewrite and recovery',
          text: 'AI drafts are reorganized, compressed, merged, and rewritten until chapter rhythm and tension return.',
        },
      ],
      cards: [
        {
          eyebrow: 'Archive',
          title: 'World Bible',
          text: 'Rules, factions, and non-negotiable constraints for the fictional universe.',
        },
        {
          eyebrow: 'Tension',
          title: 'Conflict Board',
          text: 'Long-range tension, stage goals, and the cost of each character decision.',
        },
        {
          eyebrow: 'Loop',
          title: 'Continuation Loop',
          text: 'AI proposes, the human judges, then the next iteration becomes sharper.',
        },
      ],
    },
    connect: {
      eyebrow: 'CONNECT',
      title: 'GitHub is the current public doorway',
      description:
        'If you want to talk about media infrastructure, AI audio products, WeChat mini program UX, or narrative-driven applications, GitHub is the best place to start.',
      links: [
        {
          href: 'https://github.com/JackYinpei',
          label: 'GitHub Profile',
          meta: 'Browse public repositories and current work',
        },
        {
          href: 'https://github.com/JackYinpei/lingdaily',
          label: 'LingDaily Repo',
          meta: 'Open-source language learning built around news and voice',
        },
      ],
      footnote: 'This is the first portfolio version. More case-study depth and visual assets can be layered in next.',
    },
    footer: 'Bridging systems, audio, and narrative.',
  },
}
