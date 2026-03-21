# AI 面试八股文博客

专注于 AI Agent、RAG、LLM 等前沿技术的面试八股文与深度解析博客，基于 Next.js 15 构建。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS 3.4 + CSS 自定义属性主题系统
- **内容**: Markdown 文件 + JSON 元数据
- **SEO**: JSON-LD 结构化数据、Open Graph、动态 Sitemap

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/JackYinpei/AI-Interview.git
cd AI-Interview

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，设置 ADMIN_PASSWORD

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000 查看博客。

## 环境变量

| 变量 | 说明 | 必填 |
|------|------|------|
| `ADMIN_PASSWORD` | 管理后台登录密码 | 是 |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL（用于 SEO） | 部署时 |

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── page.js             # 首页
│   ├── article/[slug]/     # 文章详情页
│   ├── admin/              # 管理后台（密码保护）
│   │   └── login/          # 登录页
│   └── api/                # API 路由
├── components/             # React 组件
├── content/articles/       # Markdown 文章内容
├── data/articles.json      # 文章元数据
├── lib/                    # 工具函数
├── middleware.js            # 管理后台鉴权中间件
└── public/                 # 静态资源
```

## 贡献面试题

欢迎通过 Pull Request 提交新的面试题文章！

### 提交步骤

1. **Fork** 本仓库

2. **创建文章内容** — 在 `content/articles/` 目录下新建 Markdown 文件：

   ```
   content/articles/your-topic-interview-guide.md
   ```

   参考现有文章的格式，使用清晰的标题层级（`##` 大标题、`###` 小标题），每道面试题以 `###` 开头。

3. **添加文章元数据** — 在 `data/articles.json` 中添加一条记录：

   ```json
   {
     "id": "时间戳ID",
     "slug": "your-topic-interview-guide",
     "title": "你的主题 面试八股文完全指南",
     "excerpt": "简短摘要（1-2句话）",
     "description": "用于SEO的详细描述，包含关键词",
     "coverImage": "封面图URL",
     "category": "AI",
     "tags": ["标签1", "标签2"],
     "keywords": ["关键词1", "关键词2"],
     "author": "你的名字",
     "authorAvatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=your-seed",
     "authorBio": "简短的作者介绍",
     "publishedAt": "2025-03-21",
     "readingTime": "30 分钟",
     "featured": false
   }
   ```

4. **本地验证** — 运行 `npm run build` 确保构建通过

5. **提交 PR** — 提交 Pull Request，在描述中说明：
   - 面试题覆盖的主题
   - 包含的知识点数量
   - 适合的面试场景（初级/中级/高级）

### 内容规范

- 使用中文撰写，技术术语保留英文
- 每道面试题包含：问题标题 + 详细解答
- 适当使用代码示例、表格、列表增强可读性
- 引用权威来源和论文
- Markdown 文件名使用英文小写 + 短横线（kebab-case）

### 审核流程

1. 提交 PR 后，维护者会审核内容质量和格式
2. 如需修改，会在 PR 中留下评论
3. 审核通过后合并，自动部署上线

## 本地开发

```bash
npm run dev     # 启动开发服务器
npm run build   # 构建生产版本
npm run start   # 启动生产服务器
npm run lint    # 运行 ESLint
```

## License

MIT
